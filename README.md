# wpkfg

### Install dependencies
```
npm i webpack
npm i webpack-dev-server
npm i wpkfg
```

### Webpack configuration file `webpack.config.js`

```
module.exports = require('wpkfg');
```

### Example `package.json` scripts section

```
"scripts": {
    "build:dev": "webpack --env.config=base,vue,app,inline-css --env.env=development",
    "build:dev:dashboard": "webpack-dashboard --env.config=base,vue,app,inline-css,dashboard --env.env=development",
    "build:prod": "webpack --env.config=base,vue,app,extract-css --env.env=production",
    "build:prod:uglify": "webpack -p --env.config=base,vue,app,extract-css --env.env=production",
    "build:prod:uglify:dashboard": "webpack-dashboard -- webpack -p --env.config=base,apract-css,dashboard --env.env=production",
    "wds": "webpack-dev-server --hot --env.config=base,vue,app,inline-css,wds --env.env=development",
    "wds:dashboard": "webpack-dashboard -- webpack-dev-server --hot --env.config=base,vue,app,inline-css,wds,dashboard --env.env=development",
}
```