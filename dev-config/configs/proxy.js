let apiPort = require('./globalConfig').apiPort;
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./paths');

if (apiPort) {
    if (__DEV__) {
        console.log(`######################proxy to 127.0.0.1:${apiPort}######################`);
    }
    module.exports = {
        // URL 匹配规则
        '/api/': {
            // 目标机器 IP
            target: 'http://127.0.0.1:' + apiPort,
            // URL 重写
            pathRewrite: { '^/api': '' }
            // 是否使用 Https
            // secure: false
        }
    };
}