import { app, BrowserWindow, screen, ipcMain, protocol } from 'electron';
import path from 'path';
import url from 'url';
import createProtocol from './utils/createProtocol';

const isDevelopment = process.env.NODE_ENV !== 'production';

console.log('Main process script started.'); // 在最开始加日志
console.log("ssss")
console.log("qq")

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: Math.min(1200, width),
    height: Math.min(800, height),
    webPreferences: {
      // (可选但推荐) 预加载脚本,用于安全地暴露 Node API 给渲染进程
      preload: path.join(__dirname, 'preload.js'), // 注意这里的路径是编译后的路径
      nodeIntegration: false, // 禁用 Node.js 集成以提高安全性
      contextIsolation: true, // 启用上下文隔离以提高安全性
      // 在 Vue 2.7 开发模式下可能需要关闭 webSecurity 以加载本地资源,生产环境应开启
      // webSecurity: !isDevelopment,
    },
  });
  console.log(process.env.NODE_ENV)
  if (!isDevelopment) {
    // 开发环境:加载 Rsbuild dev server URL
    // 等待 Rsbuild server 启动后再加载 (由 wait-on 处理)
    const devServerUrl = `http://localhost:${process.env.DEV_SERVER_PORT || 3000}`; // 与 Rsbuild dev port 匹配
    console.log(`Loading URL: ${devServerUrl}`);
    mainWindow.loadURL(devServerUrl).catch(err => {
      console.error("Failed to load dev server URL:", err);
      console.log("Ensure the Rsbuild development server is running.");
    });
    // 打开开发者工具
    mainWindow.webContents.openDevTools();
  } else {
    // 生产环境:加载构建后的 HTML 文件
    // const indexPath = path.join(__dirname, '../renderer/index.html'); // 相对于编译后的 main/index.js
    // console.log(`Loading file: ${indexPath}`);
    // mainWindow.loadFile(indexPath).catch(err => {
    //   console.error("Failed to load production file:", err);
    // });
    createProtocol('app'); // 注册协议
    mainWindow.loadURL('app://renderer/index.html');
  }

  // 可以在这里处理来自渲染进程的 IPC 消息
  // ipcMain.handle('some-channel', async (event, ...args) => { /* ... */ });

  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // mainWindow = null; // If not using TS nullability or keeping track
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, applications and their menu bar stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

// 确保在文件末尾添加一个日志,看是否能执行到最后
console.log('Main process script finished initial execution.');