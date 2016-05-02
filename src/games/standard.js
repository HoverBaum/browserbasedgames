/**
 *	Global GAME.
 *	Reference it via the `GAME` variable.
 * 	@namespace GAME
 * 	@property {GAME#infoObject} [info] - Infos about this game.
 */
const Game = (function() {

    //The interval for the tick.
    let interval = null;

    //Boolean wether or not the game is running.
    //Generally the game is on-going. Not indicating wether or not game is paused.
    let running = false;

    //The function to be called once the game is over.
    let gameOverCallback = null;

    /**
     *   @typedef {object} GAME#infoObject
     *   @property {string} name - Name of this game.
     *   @property {string} description - Desciption for this game.
     *   @property {string} imgUrl - URL to a preview image for this game.
     *   @property {string} manual - Information on how to play this game.
     */

    const infoObject = {
        name: 'Game',
        description: 'basic game template',
        shortDescription: 'One sentenceonly',
        imgUrl: '',
        manual: 'Press buttons to play!',
        file: 'standard.js'
    }

    /**
     *	Start the game.
     *	@method GAME#start
     */
    function startGame() {
        resume();
        running = true;
    }

    /**
     *	The tick of the game that gets called rappidly.
     *	@function
     *	@private
     */
    function tick() {
        if (!running) {
            return false;
        }
    }

    /**
     *	Pause the game.
     *	@method GAME#pause
     */
    function pause() {
        clearInterval(interval);
    }

    /**
     *	Resume the game.
     *	@method GAME#resume
     */
    function resume() {
        if (!running) {
            return;
        }
        interval = setInterval(tick, 50);
    }

    /**
     *	Called when the game is over, the player looses.
     *	@function
     *	@private
     */
    function gameOver() {
        pause();
        running = false;
        if (gameOverCallback !== null) {
            let text = '';
            gameOverCallback(text);
        }
    }

    /**
     *	Set the callback for gameOver.
     *	@method GAME#setGameOverCallback
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
        setGameOverCallback: setGameOverCallback,
        info: infoObject
    };

}());
