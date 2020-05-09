## 说明

此 Demo 用于演示 Web Worker，利用 URL.createObjectURL 将 Blob 对象转换为对象 URL 传入创建 Worker。[动态创建 Web Worker 实践指南](https://hijiangtao.github.io/2019/03/21/Create-A-Dynamic-Web-Worker-With-Blob/)。

## 如果使用 worket-loader

worker-loader 是一个 webpack 插件，可以将一个 js 文件的全部依赖提取后打包并替换调用处，以 Blob 形式内联在源码中，worker 文件一般命名为 `xxx.worker.js`，可以在 webpack 中这样配置：

```js
{
  module: {
    rules: [
      {
        // 匹配 *.worker.js
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: '[name]:[hash:8].js',
            // inline: true,
            // fallback: false
            // publicPath: '/scripts/workers/'
          }
        }
      }
    ]
  }
}
```

- [怎么在 ES6+Webpack 下使用 Web Worker](https://juejin.im/post/5acf348151882579ef4f5a77#heading-15)
- [你可能不需要work-loader来处理worker](https://juejin.im/post/5d70bbb7518825346e5f262b)