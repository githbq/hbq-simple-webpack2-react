let defaultPort = require('./globalConfig').apiPort;
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./paths');
if (__DEV__) {
    console.log(`######################proxy to 127.0.0.1:${defaultPort}######################`);
}
module.exports = {
    '/socket.io/': {
        // 目标机器 IP
        target: 'http://127.0.0.1:' + defaultPort,
    },
    // URL 匹配规则
    '/api/': {
        // 目标机器 IP
        target: 'http://127.0.0.1:' + defaultPort,
        // URL 重写
        pathRewrite: { '^/api': '' }
        // 是否使用 Https
        // secure: false
    },
    '/staticpath/': {
        // 目标机器 IP
        target: 'http://127.0.0.1:' + defaultPort,
        // URL 重写
        pathRewrite: { '^/staticpath': '' },
        // 是否使用 Https
        // secure: false
    }
};