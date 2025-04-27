import { protocol } from 'electron';
import * as path from 'path';
import { readFile } from 'fs/promises'; // 使用 Promise 版本的 readFile
import mime from 'mime-types';

export default (scheme: string) => {
  protocol.handle(scheme, async (request) => {
    let pathName = new URL(request.url).pathname;
    pathName = decodeURI(pathName); // 解码路径中的特殊字符

    // 确保路径指向正确的资源目录
    const resolvedPath = path.resolve(
      path.join(__dirname, '../renderer', pathName) // 修改为 dist/renderer
    );

    // 验证路径是否在应用目录范围内
    if (!resolvedPath.startsWith(path.join(__dirname, '../renderer'))) {
      console.error('Invalid path:', pathName);
      return new Response(null, { status: 404 }); // 返回 404 错误
    }
    try {
      // 读取文件内容
      const data = await readFile(resolvedPath);

      // 动态获取 MIME 类型
      const mimeType = mime.lookup(pathName) || 'application/octet-stream';

      // 返回响应
      return new Response(data, {
        headers: { 'Content-Type': mimeType },
      });
    } catch (error) {
      console.error(`Failed to read ${pathName} on ${scheme} protocol`, error);
      return new Response(null, { status: 404 }); // 返回 404 错误
    }
  });
};