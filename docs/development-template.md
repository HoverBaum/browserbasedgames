# Development

Documentation for games development. Each game should be written as a file exposing a single global variable 'GAME'.

To keep the global namespace from being polluted we use the 'Revealing Module' pattern. That means our code will look like this:
```JavaScript
const GAME = (function(){

}());
```

Check out the documentation below to see the interface expected from a game. For convenience you can copy the `games/standard.js` file to start writing a new game.

{{>main}}
