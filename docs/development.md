# Development

Documentation for games development. Each game should be written as a file exposing a single global variable 'GAME'.

To keep the global namespace from being polluted we use the 'Revealing Module' pattern. That means our code will look like this:
```JavaScript
const GAME = (function(){

}());
```

Check out the documentation below to see the interface expected from a game. For convenience you can copy the `games/standard.js` file to start writing a new game.

<a name="GAME"></a>

## GAME : <code>object</code>
Global GAME.	Reference it via the `GAME` variable.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| info | <code>[infoObject](#GAME+infoObject)</code> | Infos about this game. |


* [GAME](#GAME) : <code>object</code>
    * [.start()](#GAME+start)
    * [.pause()](#GAME+pause)
    * [.resume()](#GAME+resume)
    * [.setGameOverCallback()](#GAME+setGameOverCallback)
    * [.infoObject](#GAME+infoObject) : <code>object</code>

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
<a name="GAME+infoObject"></a>

### gamE.infoObject : <code>object</code>
**Kind**: instance typedef of <code>[GAME](#GAME)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of this game. |
| description | <code>string</code> | Desciption for this game. |
| imgUrl | <code>string</code> | URL to a preview image for this game. |
| manual | <code>string</code> | Information on how to play this game. |

