let { apiUrl, isWebpackDevServer } = require('./globalConfig');
const { __DEV__ } = require('./constants');
/**
 * 反向代理配置
 */
if (apiUrl && __DEV__) {
    isWebpackDevServer && console.log(`\n######################proxy to ${apiUrl}######################\n`);
    module.exports = {
        // URL 匹配规则
        '/__api__/': {
            // 目标机器 IP
            target: apiUrl,
            // URL 重写
            pathRewrite: { '^/__api__': '' },
            // 是否使用 Https
            secure: false,
            changeOrigin: true,
        }
    };
}