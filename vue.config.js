const path = require("path");
const port = 8080;

module.exports = {
  baseUrl: '/',
  outputDir: path.resolve(__dirname, "./dist"),
  assetsDir: 'static',
  pwa: {
		workboxOptions: {
			exclude: [/\.json$/]
		}
  },
  devServer: {
    port: port,
    proxy: {
      '/login': {
        target: `http://localhost:${port}`,
        pathRewrite: function (p, req) {
          req.method = 'GET';
          return 'mock/login.json';
        }
      },
      '/scoreBoard': {
        target: `http://localhost:${port}`,
        pathRewrite: function (p, req) {
          return 'mock/scoreBoard.json';
        }
	  },
	  '/userWins': {
        target: `http://localhost:${port}`,
        pathRewrite: function (p, req) {
          return 'mock/userWins.json';
        }
      },
      '/user': {
        target: `http://localhost:${port}`,
        pathRewrite: function (p, req) {
          return 'mock/user.json';
        }
      },
      '/game/': {
        target: `http://localhost:${port}`,
        pathRewrite: function (p, req) {
          req.method = 'GET';
          return p.replace(/^\/game\/(.+)$/,'mock/confirmBet.json');
        }
      },
      '/game': {
        target: `http://localhost:${port}`,
        pathRewrite: function (p, req) {
          return 'mock/game.json';
        }
	  }
    }
  }
}