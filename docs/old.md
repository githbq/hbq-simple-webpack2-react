```js
const babelLoaderConfig = {
  presets: ['latest', 'stage-0', 'react'], // 开启ES6、部分ES7、react特性, preset相当于预置的插件集合
  plugins: [
    ['import', { libraryName: 'antd', style: true }],
    'add-module-exports',
    'transform-runtime']
};
```
