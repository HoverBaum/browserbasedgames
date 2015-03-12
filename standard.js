/**
*	Base file for a game.
*	Provides basic framework.	
*
*/

Game = (function() {

	//The interval for the tick.
	var interval = null;
	
	//Boolean wether or not the game is running.
	//Generally the game is on-going. Not indicating wether or not game is paused.
	var running = false;
	
	//The function to be called once the game is over.
	var gameOverCallback = null;
	
	/**
	*	Start the game.
	*/
	function startGame() {
		resume();
		running = true;
	}
	
	/**
	*	The tick of the game that gets called rappidly.
	*/
	function tick() {
		if(!running) return false;
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
		if(!running) return;
		interval = setInterval(tick, 50);
	}
	
	/**
	*	Called when the game is over, the player looses.
	*/
	function gameOver() {
		pause();
		running = false;
		if(gameOverCallback !== null) {
			var text = '';
			gameOverCallback(text);
		}
	}
	
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