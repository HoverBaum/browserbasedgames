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

{{>main}}
