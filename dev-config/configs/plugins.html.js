const HtmlWebpackPlugin = require('html-webpack-plugin')
const { root, pathTool, TEMPLATE_PATH, TEMPLATE_PATH_PUG } = require('./constants')
const entry = require('./entry')
const { templateSuffix, regTemplate } = entry
const globalConfig = require('./globalConfig')
const chunks = ['vendor', 'common']
//createHtmlPlugin
function createHtmlPlugin(name, isDev = false, template = null) {
  //默认使用 ./index.template.pug 模板
  template = template || TEMPLATE_PATH_PUG
  const data = {
    ...globalConfig
  }
  // 生成html文件
  return new HtmlWebpackPlugin({
    ...(!isDev ? {
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true, // 引入js/css的时候加个hash, 防止cdn的缓存问题
    } : {}),
    filename: `${name}.html`,
    ...(template ? { template } : {}),
    inject: 'body',
    chunks: chunks.concat(name), //选定需要插入的chunk名,
    chunksSortMode: 'dependency',
    data
  })
}

//通过entry上设计的入口配置，生成html插件数组
module.exports.getHtmlPlugins = (isDev = false) => {
  //entry.all 同时包含 entry 以及 template
  return Object.keys(entry.all)
    //排除掉模板
    .filter(key => !regTemplate.test(key))
    .map(key => {
      return createHtmlPlugin(key, isDev, entry.all[`${key}${templateSuffix}`])
    })
}

