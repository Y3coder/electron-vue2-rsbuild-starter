import { ipcMain } from "electron";

export function doSomething() {
  // 注册事件处理程序
  ipcMain.handle('do-something', async (event, arg) => {
    console.log('Received request:', arg);
    // 执行某些操作
    return 'Response from main process';
  });
}