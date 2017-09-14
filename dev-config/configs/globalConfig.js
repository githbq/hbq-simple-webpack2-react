/**
 * 全局配置
 */
const pathTool = require('path')
const { templateObject } = require('./entry')

const { APPS_PATH } = require('./constants')
const srcRelative = pathTool.relative.bind(pathTool, APPS_PATH)
const htmlPaths = Object.keys(templateObject).map(n => srcRelative(templateObject[n]))

console.log(`entryHtmlPathsentryHtmlPathsentryHtmlPathsentryHtmlPaths`, htmlPaths)

module.exports = {
  htmlPaths,
  title: 'react-boilerplate',
  apiUrl: `http://localhost:3604`, //如果配了这个  就会走后端的反向代理
  favicon: '/assets/favicon.ico',
  isWebpackDevServer: isWebpackDevServer()
}

function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]))
}
