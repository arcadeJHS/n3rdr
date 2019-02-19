# n3rdr

A PWA UI for a quiz game, made with Vue, Bulma, CSS animations, and a bit of arcade graphics. 


## Screenshots
| What        | am           | I?  |
| ------------- |:-------------:| -----:|
| ![login](screenshots/01-login.png) | ![homescreen](screenshots/02-homescreen.png) | ![mobile-menu](screenshots/04-mobile-menu.png) |
| ![game-rules](screenshots/03-game-rules.png) | ![game](screenshots/05-game.png) | ![your-bet](screenshots/08-your-bet.png) |
| ![user-profile](screenshots/06-user-profile.png) | ![scoreboard](screenshots/07-scoreboard.png) | ![your-wins](screenshots/09-your-wins.png) |


## Project setup
```
npm install
```

### Dev server
Start the app on a local web server:

```
npm run serve
```

Data from proxied .json mock files in `public/mock`.
If game is expired, change the `deadLine` property inside `mock/game.json`
See `vue.config.js` file.


### Compiles and minifies for production
Build for production:

```
npm run build
```
