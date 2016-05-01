# Development

Documentation for games development. Each game should be written as a file exposing a single global variable 'GAME'.

To keep the global namespace from being polluted we use the 'Revealing Module' pattern. That means our code will look like this:
```JavaScript
const GAME = (function(){

}());
```

<a name="GAME"></a>

## GAME : <code>object</code>
Global namespace for the implemented game.	Reference it via the `GAME` variable.

**Kind**: global namespace  

* [GAME](#GAME) : <code>object</code>
    * [.start()](#GAME+start)
    * [.pause()](#GAME+pause)
    * [.resume()](#GAME+resume)
    * [.setGameOverCallback()](#GAME+setGameOverCallback)

<a name="GAME+start"></a>

### gamE.start()
Start the game.

**Kind**: instance method of <code>[GAME](#GAME)</code>  
<a name="GAME+pause"></a>

### gamE.pause()
Pause the game.

**Kind**: instance method of <code>[GAME](#GAME)</code>  
<a name="GAME+resume"></a>

### gamE.resume()
Resume the game.

**Kind**: instance method of <code>[GAME](#GAME)</code>  
<a name="GAME+setGameOverCallback"></a>

### gamE.setGameOverCallback()
Set the callback for gameOver.

**Kind**: instance method of <code>[GAME](#GAME)</code>  
