const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;
const proxy = `http://${host}:${port}`;


const browserSyncPlugin = () => new BrowserSyncPlugin({
  host,
  port,
  proxy,
},
{
  reload: false,
});

module.exports = browserSyncPlugin;
