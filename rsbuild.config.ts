import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const { publicVars } = loadEnv({ prefixes: ['VUE_'] })

export default defineConfig({
  plugins: [pluginVue2({})],
  source: {
    // 渲染进程入口文件
    entry: {
      index: './src/main.ts', // 或 main.js
    },
    tsconfigPath: "./tsconfig.app.json",
    exclude: [path.resolve(__dirname, 'src/main')],
    define: publicVars
  },
  output: {
    // 输出目录调整为 dist/renderer
    distPath: {
      root: 'dist/renderer',
    },
    // Electron 加载本地文件需要相对路径
    assetPrefix: './',
    sourceMap: {
      js: 'source-map',
    }
  },
  html: {
    // HTML 模板
    template: './src/index.html',
  },
  dev: {
    // 开发服务器资源也使用相对路径,确保 Electron 能加载
    assetPrefix: './',
    // 确保 HMR 正常工作 (通常默认开启)
    hmr: true,

  },
  // 如果需要 polyfill (可选)
  // output: {
  //   polyfill: 'entry', // or 'usage'
  // },
  tools: {
    // 如果需要对 rspack 进行更细致的配置 (通常不需要)
    // rspack: (config, { env, HtmlPlugin }) => {
    //   config.target = 'electron-renderer'; // 明确目标环境
    //   return config;
    // },
  },
  // 生产环境特定配置
  performance: {
    // 生产环境禁止输出 Source Map 或使用更合适的类型
    // sourceMap: false, // 或者 'hidden-source-map'
  },
});