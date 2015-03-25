/**
*	In this game you are a cube that has to run through a procedurally generated endless level.
*
*/

/*
Colors:
play: FF2939
Yellow: FFFA43
Blue: 147CB2
lighter blue 0D8ACC

*/
	
Game = (function() {

	//The interval for the tick.
	var interval = null;
	
	//Boolean wether or not the game is running.
	//Generally the game is on-going. Not indicating wether or not game is paused.
	var running = false;
	
	//The function to be called once the game is over.
	var gameOverCallback = null;
	
	var player = null;
	
	var baseDimension = 20;
	var baseLine = 0;
	var canvas = null;
	
	var blocks = [];
	
	//How far we have build ground already.
	var groundReach = 0;
	
	//How far the last obstacle reaches.
	var obstacleReach = 0;
	
	var groundColor = '#147CB2';
	var obstacleColor = '#0D8ACC';
	
	//Remember to only jump once.
	var jumping = false;
	var jumpStart = 0;
	
	/**
	*	Start the game.
	*/
	function startGame(gameCanvas) {
		
		//Fill basic variables
		canvas = gameCanvas;
		baseDimension = Math.floor(window.innerWidth / 10);
		
		//Make sure we can fit at least 5 blocks vertically.
		if(Math.floor(window.innerHeight/5) > baseDimension) {
			baseDimension = Math.floor(window.innerHeight/5);
		}
		baseLine = Math.round(window.innerHeight - (baseDimension * 1.5));
		
		//Create player and starting ground.
		var base = baseDimension / 2;
		player = createEntity(baseDimension, baseLine-base, base, base, "#FF2939");
		player.angle = 45;

		obstacleReach = window.innerWidth / 2;
		
		registerListener();
		running = true;
		resume();
	}
	
	/**
	*	Creates a new entity with the gives parameters.
	*/
	function createEntity(x, y, width, height, color) {
		return {
			x: x,
			y: y,
			width: width,
			height: height,
			color: color
		};
	}
	
	/**
	*	The tick of the game that gets called rappidly.
	*/
	function tick() {
		if(!running) return false;
		player.x += baseDimension / 30;
		jump();
		
		//Keep the player entertained with obstacles.
		if((player.x + window.innerWidth) > obstacleReach) {
			
			//We are nice and ensuring that the player can land and take of again.
			generateObstacle(obstacleReach + baseDimension * 5);
		}
		
		checkCollosion();
		drawFrame();
	}
	
	/**
	*	Checks for collision between the player and any object.
	*/
	function checkCollosion() {
		var right = player.x + player.width;
		var bottom = player.y + player.height;
		blocks.forEach(function(block) {
			
			//Check if collides with player, easy since player can only approach from left.
			if(bottom >= block.y && right >= block.x && player.x <= (block.x + block.width)) {
				gameOver();
			}
			
			//Remove if out of view for sure.
			if(block.x < (player.x - window.innerWidth)) {
				blocks.splice(blocks.indexOf(block), 1);
			}
				
		})
	}
	
	/**
	*	Draws the current frame of the game.
	*/
	function drawFrame() {
		
		//Get context and clear canvas.
		var ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		//Draw the ground.
		ctx.fillStyle = groundColor;
		ctx.fillRect(0, baseLine, window.innerWidth, window.innerHeight-baseLine);
		
		//Draw the blocks.
		blocks.forEach(function(block) {
			ctx.fillStyle = block.color;
			ctx.fillRect(block.x-player.x+baseDimension, block.y, block.width+1, block.height);
		})
		
		//Draw the player
		ctx.fillStyle = player.color;
		ctx.fillRect(baseDimension, player.y, player.width, player.height);
	}
	
	/**
	*	Pause the game.
	*/
	function pause() {
		clearInterval(interval);
	}
	
	/**
	*	Resume the game.
	*/
	function resume() {
		tick();
		interval = setInterval(tick, 10);
	}
	
	/**
	*	Called when the game is over, the player looses.
	*/
	function gameOver() {
		pause();
		running = false;
		if(gameOverCallback !== null) {
			var m = player.x / baseDimension;
			m = m.toString().substr(0,4);
			var text = 'You traveled ' + m + 'm.';
			gameOverCallback(text);
		}
	}
	
	/**
	*	Registers all listeners to player input.
	*/
	function registerListener() {
		window.addEventListener('keydown', function(e) {
			if((e.keyCode === 32 || e.keyCode === 87 || e.keyCode === 38) && running) {
				startJump();
			}
		})
	}
	
	/**
	*	Starts a jump.
	*/	
	function startJump() {
		jumping = true;
		jumpStart = Date.now();
	}
	
	/**
	*	Performs a jump.
	*/
	function jump() {
		
		//Do the jump. Wurf nach http://de.wikipedia.org/wiki/Wurfparabel
		var t = (Date.now() - jumpStart) / 100;
		var y = 80 * t - (10 * t * t) / 2; 	//TODO die 70 ist momentan geraten, berechnen ^^ 
		player.y = baseLine - player.height - y;

		//Check for finish.
		if(y <= 0) {
			jumping = false;
			player.y = baseLine - player.height;
			return true;
		}
	}
	
	/**
	*	Will generate and obstacle starting at a given x index.
	*/
	function generateObstacle(base) {
		var index = Math.round(Math.random() * possibleObstacles.length);
		var obstacle = possibleObstacles[index];
		obstacle.elements.forEach(function(obst) {
			var width = obst.width * baseDimension;
			var height = obst.height * baseDimension;
			var y = baseLine + (height * obst.y);
			var x = (width * obst.x) + base;
			var color = obst.color || obstacleColor;
			var block = createEntity(x, y, width, height, color);
			blocks.push(block);
		});
		var longer = (Math.random() > 0.8) ? baseDimension * Math.random() * 5 : 0;
		if(longer < 0) longer = baseDimension;
		obstacleReach = base + obstacle.width * baseDimension + longer;
	}
	
	/**
	*	A list of obstacles the player can encounter;
		
		width: increment obstacleReach with width * baseDimension.
		elements:
			y: factor to multiplay width with to add to baseLine
			width, height: factors for baseDimension
			x: factor to multiplay width with to add to start of obstacle
	*/
	var possibleObstacles = [
		{
			width: 1,
			elements: [
				{
					x: 0,
					y: -1,
					width: 0.5,
					height: 1
				},
				{
					x: 2,
					y: -1,
					width: 0.5,
					height: 0.5
				}
			]
		},
		{
			width: 1,
			elements: [
				{
					x: 0,
					y: -1,
					width: 0.5,
					height: 1
				},
				{
					x: 1,
					y: -1,
					width: 0.5,
					height: 1.5
				}
			]
		},
		{
			width: 2,
			elements: [
				{
					x: 0,
					y: -1,
					width: 0.5,
					height: 1
				},
				{
					x: 2,
					y: -1,
					width: 0.5,
					height: 1
				}
			]
		},
		{
			width: 1,
			elements: [
				{
					x: 1,
					y: -1,
					width: 0.5,
					height: 1
				},
				{
					x: 2,
					y: -1,
					width: 0.5,
					height: 1.5
				},
				{
					x: 0,
					y: -1,
					width: 0.5,
					height: 0.5
				}
			]
		}
	]
	
	/**
	*	Set the callback for gameOver.
	*/
	function setGameOverCallback(func) {
		gameOverCallback = func;
	}
	
	/**
	*	Return an object with all functions that should be publically accessable.
	*/
	return {
		start: startGame,
		pause: pause,
		resume: resume,
		setGameOverCallback: setGameOverCallback
	};
	
}());