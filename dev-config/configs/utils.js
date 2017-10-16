/**
 * 其他配置或工具
 */
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')

//使用postcss作为默认的CSS编译器
exports.postCSSConfig = [
  // px2rem({ remUnit: 75 }),
  autoprefixer({
    browsers: [
      '> 5%'
    ]
  })
]
