/**
 * 文件处理
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./constants');
const lessLoaderVars = {};
// 将babel-loader的配置独立出来, 因为webpack的限制: http://stackoverflow.com/questions/33117136/how-to-add-a-query-to-a-webpack-loader-with-multiple-loaders
const babelLoaderConfig = {
  presets: ['latest', 'stage-0', 'react'], // 开启ES6、部分ES7、react特性, preset相当于预置的插件集合
  plugins: [
    ['import', { libraryName: 'antd', style: true }],
    'add-module-exports',
    'transform-runtime']
};
const postCSSConfig = JSON.stringify(require('./utils').postCSSConfig);
let rules = [ // 定义各种loader
  {
    test: /\.(js|jsx)$/,
    use: ['source-map-loader'],
    exclude: /(node_modules)/,
    enforce: 'pre'
  },
  ...require('./rulesOfCss')({
    __DEV__,
    lessLoaderVars,
    postCSSConfig
  }, false, !__DEV__),
  //files
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'images/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'media/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
];

if (__DEV__) {
  rules.push({
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    use: [
      { loader: 'react-hot-loader' },
      {
        loader: 'babel-loader',
        options: Object.assign(babelLoaderConfig, { cacheDirectory: true })
      }
    ]
  });
} else {
  //生产环境
  rules.push({
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'babel-loader',
      options: babelLoaderConfig,
    },
    {
      loader: 'strip-loader',
      options: { strip: ['logger.info', 'logger.debug', 'console.log', 'console.debug'] }
    }
    ]
  });
}
module.exports = rules;
