var Game = (function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var entSpeed = 2; //Speed of entities.
    var speed = 3; //Speed of the player per tick.
    var chance = 0.2; //Chance with which new Entities are added per tick.
    var difficulty = 1;
    var cv = null; //The canvas to draw upon
    var pausStart = null;
    var right = false;
    var left = false;
    var player = null;
    var entities = [];
    var startTime = null;
    var lastDiffInc = null;
    var gameOverCallback = null;
	var running = false;
	var style = null;
	
	var css = '#HUD{position:absolute;z-index:5;top:20px;right:20px;padding:5px;display:block;background-color:#f8f8f8;-webkit-box-shadow:0 0 5px 0 rgba(0,0,0,.75);-moz-box-shadow:0 0 5px 0 rgba(0,0,0,.75);box-shadow:0 0 5px 0 rgba(0,0,0,.75);border-radius:3px}#HUD>#time{display:block}#HUD>#time>span{float:right}#HUD>h1{font-size:22px;margin:0 0 5px}#HUD>#difficulty{display:block;position:relative}#HUD>#difficulty>span{float:right}#HUD>#difficulty>#level-line-js{position:absolute;display:block;top:100%;left:0;min-width:1px;height:1px;background-color:#000}';

    function startGame() {
        left = false;
        right = false;
        player = null;
        entities = [];
        cv = document.getElementById("canvas");
        cv.width = width;
        cv.height = height;

        addHandlers();
		var playerY = window.innerHeight - 10 - 50;
		var playerX = window.innerWidth * 0.5;
		player = new Entity(playerX, playerY, "#FFD630");

        var d = new Date();
        startTime = d.getTime();
        lastDiffInc = startTime; //Last time the difficulty rose.
		
        calculateChance();
		running = true;
		displayHUD();
        startTick();
		
    }


    //calculates the chance for a drop.
    var calculateChance = function() {
        var d = new Date();
        if (d.getTime() - lastDiffInc > 20000) {
            difficulty++;
            lastDiffInc = d.getTime();
        }
        chance = width / 400 * 0.2;
    }

    var addEntity = function(ent) {
        entities.push(ent);
    }

    var removeEntity = function(ent) {
        var i = entities.indexOf(ent);
        entities.splice(i, 1);
    }

    //The tick is what makes the game fo round.
    var tick = function() {
		if(!running) return;
        movePlayer();
        calculateChance();
        for (var i = 0; i < difficulty; i++) {
            newEnemy();
        }
        moveEntities();
        checkCollision();
        draw();

        updateHUD();
    }

    var displayHUD = function() {
        var div = document.createElement("div");
		div.innerHTML = '<h1>Dodge-JS</h1>		<span id="time">time: <span id="time-js"></span></span>		<span id="difficulty">level: <span id="difficulty-js"></span>			<div id="level-line-js"></div>		</span>';
		div.setAttribute("id", "HUD");
		style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
		document.body.appendChild(div);
    }
	
	
	var updateHUD = function() {
		var d = new Date();
		
        document.getElementById("time-js").innerHTML = Math.floor((d.getTime() - startTime) / 1000) + 's';
        document.getElementById("difficulty-js").innerHTML = difficulty;

        var progress = (d.getTime() - lastDiffInc) / 1000 * 5;
        document.getElementById("level-line-js").setAttribute("style", "width:" + progress + "%;");
	}

    var checkCollision = function() {
        for (var i = 0; i < entities.length; i++) {
            var ent = entities[i];
            if (ent.x + 10 >= player.x && ent.x <= player.x + 20) {
                if (ent.y + 10 >= player.y) {
                    lost();
                }
            }
        }
    }

    var lost = function() {
		running = false;
		document.head.removeChild(style);
        stopTick();
        /*log("You Lost");
        document.getElementById("endgame").style.display = "block";
        document.getElementById("endgame").style.opacity = "1";
        var d = new Date();
        document.getElementById("eg-time").innerHTML = Math.floor((d.getTime() - this.startTime) / 1000);
        document.getElementById("play-again").addEventListener("click", function() {
            location.reload();
        })*/
        if (gameOverCallback !== null) {
			var d = new Date();
            var lasted = Math.floor((d.getTime() - startTime) / 1000);
            var text = 'You lasted for ' + lasted + ' seconds.';
            gameOverCallback(text);
        }


    }

        function setGameOverCallback(func) {
            gameOverCallback = func;
        }

    var moveEntities = function() {
        for (var i = 0; i < entities.length; i++) {
            entities[i].y += entSpeed + difficulty;
            if (entities[i].y > height - 20) {
                removeEntity(entities[i]);
            }
        }
    }

    var newEnemy = function() {
        if (Math.random() > chance) {
            return;
        }

        var x = Math.random() * width;
        var y = 0;
        var ent = new Entity(x, y, "#000");
        addEntity(ent);
    }

    var movePlayer = function() {
        if (left) {
            player.x -= speed;
        } else if (right) {
            player.x += speed;
        }
        if (player.x < 0) {
            player.x = 0;
        }
        if (player.x > width - 20) {
            player.x = width - 20;
        }
    }

    var draw = function() {
        var ctx = cv.getContext("2d");

        cv.width = window.innerWidth;
        cv.height = window.innerHeight;

        ctx.fillStyle = "#64D448";
        ctx.fillRect(0, height - 22, width, 23);

        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, 20, 50);

        if (entities.length !== 0) {
            for (var i = 0; i < entities.length; i++) {
                ent = entities[i];
                ctx.fillStyle = ent.color;
                ctx.fillRect(ent.x, ent.y, 10, 10);
            }
        }
    }


        function addHandlers() {
            window.onkeydown = onDown;
            window.onkeyup = onUp;
            window.ontouchstart = onTouchStart;
            window.ontouchend = onTouchEnd;
            window.onresize = resize;
        }

    var onDown = function(e) {
        if (e.keyCode === 65 || e.keyCode === 37) {
            left = true;
        } else if (e.keyCode === 68 || e.keyCode === 39) {
            right = true;
        }
    }

    var onUp = function(e) {

        if (e.keyCode === 65 || e.keyCode === 37) {
            left = false;
        } else if (e.keyCode === 68 || e.keyCode === 39) {
            right = false;
        }

    }

    var onTouchStart = function(e) {

        e.x = e.touches[0].pageX;
        var center = player.x + 10;
        if (e.x < center) {
            left = true;
            right = false;
        } else {
            right = true;
            left = false;
        }
    }

    var onTouchEnd = function() {
        left = false;
        right = false;
    }

    var pause = function() {
        stopTick();
        pausStart = new Date().getTime();
    }

    var continueGame = function() {
		if(!running) return;
        var pausedFor = new Date().getTime() - pausStart;
        startTime += pausedFor;
        startTick();
    }

    var resize = function() {


        var xScale = window.innerWidth / width;
        var yScale = window.innerHeight / height;
        player.x = self.player.x * xScale;
        player.y = window.innerHeight - 10 - 50;
        for (var i = 0; i < entities.length; i++) {
            entities[i].x = entities[i].x * xScale;
            entities[i].y = entities[i].y * yScale;
        }
        width = window.innerWidth;
        height = window.innerHeight;
        calculateChance();
        draw();
    }

    function startTick() {
        tickInterval = setInterval(tick, 20);
    }

    function stopTick() {
        clearInterval(tickInterval);
    }

    var Entity = function(x, y, clr) {
        this.x = x; //Top left corner
        this.y = y;
        this.color = clr;
    }


    return {
        start: startGame,
        pause: pause,
        resume: continueGame,
        setGameOverCallback: setGameOverCallback
    }

}());