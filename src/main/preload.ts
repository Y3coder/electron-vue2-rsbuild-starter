import { contextBridge, ipcRenderer } from 'electron';

// 安全地暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 示例:暴露一个调用主进程的方法
  // doSomething: (data) => ipcRenderer.invoke('do-something', data),

  // 示例:接收来自主进程的消息
  // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),

  // 可以暴露 node 模块的部分功能,但要谨慎
  // nodeVersion: process.versions.node,
});

console.log('Preload script loaded.');