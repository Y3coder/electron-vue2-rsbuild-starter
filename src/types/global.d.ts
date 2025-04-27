// 扩展Window接口以包含electronAPI
interface Window {
  electronAPI: {
    doSomething: (data: string) => Promise<any>;
    fs: {
      readFile: (filePath: string) => Promise<string>;
    };
    path: {
      join: (...args: string[]) => string;
      dirname: (p: string) => string;
      resolve: (...args: string[]) => string;
    };
  };
}
