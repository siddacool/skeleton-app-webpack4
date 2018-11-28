const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { argv } = require('yargs');
const { workboxPlugin, manifestPlugin } = require('./webpack-plugins/pwa-plugin');
const browserSyncPlugin = require('./webpack-plugins/browser-sync-plugin');
const {
  name,
  title,
  description,
  themeColor,
  backgroundColor,
  isPwa,
} = require('./src/project.json');

const isProduction = argv.mode.toString() === 'production';
const isBrowserSync = argv.watch;

const plugins = [];

if (isProduction) {
  plugins.push(new CleanWebpackPlugin(['dist/*'], { exclude: ['.git'] }));
}

if (isBrowserSync) {
  plugins.push(browserSyncPlugin());
}

plugins.push(
  new HtmlWebPackPlugin({
    favicon: (isProduction ? null : './src/images/favicon.png'),
    template: './src/index.html',
    filename: './index.html',
  }),
);

plugins.push(
  new HtmlWebpackExternalsPlugin({
    externals: [
      {
        module: '@webcomponents',
        entry: [
          'webcomponentsjs/custom-elements-es5-adapter.js',
          'webcomponentsjs/webcomponents-loader.js',
        ],
      },
    ],
  }),
);

plugins.push(
  new MiniCssExtractPlugin({
    filename: (isProduction ? 'style.[chunkhash].css' : 'style.css'),
    chunkFilename: '[id].css',
  }),
);

if (isProduction) {
  plugins.push(new FaviconsWebpackPlugin({
    logo: './src/images/favicon.png',
    background: themeColor,
  }));
}

// Progressive webapp
if (isPwa) {
  plugins.push(manifestPlugin(name, title, description, themeColor, backgroundColor));
  plugins.push(workboxPlugin());
}

module.exports = {
  output: {
    filename: (isProduction ? 'app.[hash].js' : 'app.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'ejs-webpack-loader',
            options: {
              data: {
                title,
                description,
              },
              htmlmin: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name]-[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins,
};
