# Development

Documentation for games development.

To keep the global namespace from being polluted we use the 'Revealing Module' pattern. That means our code will look like this:
```JavaScript
const GAME = (function(){

}());
```

Check out the documentation below to see the interface expected from a game. For convenience you can copy the `games/standard.js` file to start writing a new game.

## Browserbasedgames.net

On GitHub we develop all the games. They get compiled into a single JS file. We also create a website. The idea is that you can just drop that somehwere and call the website with some query parameter. It will then run the specified game. We also procide a global `GAMES` object which exposes all games so that their info can be used to generate previews. This approach will become somewhat lacking once we create more games or once with many resources. But for now it will work really good to keep development simple.

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

