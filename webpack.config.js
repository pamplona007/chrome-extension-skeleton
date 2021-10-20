const path = require('path');
const fileSystem = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('./utils/env');

let alias = {};

const secretsPath = path.join(__dirname, ('secrets.' + env.NODE_ENV + '.js'));
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'ttf', 'woff', 'woff2', 'svg'];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

const options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    content: path.join(__dirname, 'src', 'content.js'),
    popup: path.join(__dirname, 'src', 'popup.js'),
    options: path.join(__dirname, 'src', 'options.js'),
    background: path.join(__dirname, 'src', 'background.js'),
  },
  noHotReload: [
    'content'
  ],
  output: {
    publicPath: 'http://localhost:' + env.PORT + '/',
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [{
          // inject CSS to page
          loader: 'style-loader'
        }, {
          // translates CSS into CommonJS modules
          loader: 'css-loader'
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        use: {
          loader: 'file-loader?name=[name].[ext]',
          options: {
            esModule: false
          }
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      }
    ]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/manifest.json',
          transform: function (content) {
            // generates the manifest file using the package.json informations
            const localUrl = 'http://localhost:' + env.PORT;
            const originalJson = JSON.parse(content.toString());

            if ('development' === env.NODE_ENV) {
              originalJson.content_security_policy = `script-src 'self' ${localUrl} 'unsafe-eval'; object-src 'self'`;
            }

            return Buffer.from(JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...originalJson
            }));
          }
        },
        {
          from: 'src/_locales',
          to: '_locales'
        },
        {
          from: 'src/assets/img',
          to: 'img'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "options.html"),
      filename: "options.html",
      chunks: ["options"]
    }),
  ]
};

if (env.NODE_ENV === "development") {
  options.devtool = "eval-source-map";
}

module.exports = options;
