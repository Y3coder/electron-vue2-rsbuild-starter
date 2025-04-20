// rsbuild.main.config.ts
import { defineConfig, type Rspack } from '@rsbuild/core';

export default defineConfig({
  server: {
    port: 3001,
  },
  // 指定源码目录和入口
  source: {
    entry: {
      index: './src/main/index.ts', // 主进程入口
      // 如果有 preload 脚本,也可以一起打包,或者单独处理
      preload: './src/main/preload.ts'
    },
    tsconfigPath: './tsconfig.main.json'
  },
  // 指定输出目录
  output: {
    target: 'node',
    distPath: {
      root: 'dist/main',
    },
    // 确保 Electron 能找到主入口文件 (通常是 index.js)
    filename: {
      js: '[name].js', // 输出 index.js, preload.js 等
    },
    // 主进程代码不需要加 assetPrefix
    assetPrefix: undefined, // 或者 false
    sourceMap: {
      js: 'source-map'
    }
  },
  // 禁用 HTML 生成,主进程不需要
  // html: {

  //   // disable: true // Rsbuild 0.6+ 之后可能不再需要显式禁用
  // },
  // (重要) 将 Electron 和其他原生 Node 模块标记为外部依赖
  // 这样 Rspack 就不会尝试打包它们,而是保留 require('electron')
  tools: {
    rspack: (config: Rspack.Configuration, { env }) => { // config 类型是 Rspack.Configuration
      // 配置 Node.js 相关行为
      config.node = {
        ...config.node, // 保留 Rsbuild 可能已经设置的其他 node 配置
        // 如果你的代码依赖原始的 Node.js 行为,设置为 false
        // target: 'electron-main' 通常会处理好,但如果遇到路径问题可以明确设置
        __dirname: false,
        __filename: false,
      };

      // 配置 externals
      // 确保 electron 和其他原生模块被排除
      config.externals = [
        // 保留 Rsbuild 可能已经设置的其他 externals
        ...(Array.isArray(config.externals)
          ? config.externals
          : config.externals ? [config.externals] : []),
        'electron',
        // 如果你依赖了其他原生 Node 模块 (如 ffi-napi, serialport) 或 Node 内置模块,也在此添加
        // 例如,强制不打包 fs 模块 (虽然 target 通常会处理)
        // 'fs',
        // 'path',
        // 使用正则表达式排除所有 node: 协议的模块
        // /^node:.*/,
      ];

      // 如果确实需要显式设置输出格式 (通常 target: 'electron-main' 就够了)
      // config.output = {
      //   ...config.output,
      //   libraryTarget: 'commonjs2', // 或者 'commonjs'
      // };
      config.target = 'electron-main';

      // 你可以在这里进行其他的 Rspack 底层配置
      // 例如,根据环境设置 devtool
      // config.devtool = env === 'development' ? 'source-map' : false;

      return config; // 必须返回修改后的 config
    },
  },
  dev: {
    // 主进程通常不需要 HMR 或 dev server
    hmr: false,
  },
  performance: {
    // 生产构建时禁用 source map 或使用 'hidden-source-map'
    // sourceMap: false,
  },
});

// 如果 preload 需要单独的配置(例如不同的 target 或 externals)
// 可以创建 rsbuild.preload.config.ts