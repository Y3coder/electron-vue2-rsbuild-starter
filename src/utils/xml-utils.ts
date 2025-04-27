/**
 * XML工具类,提供XML与JavaScript对象之间的转换功能
 */
export class XmlUtils {
  /**
   * 将XML字符串解析为JavaScript对象
   * @param xmlString XML字符串
   * @returns 解析后的JavaScript对象
   */
  static parseXml(xmlString: string): any {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      return this.xmlToJson(xmlDoc.documentElement);
    } catch (error) {
      console.error('XML解析错误:', error);
      throw new Error('无效的XML格式');
    }
  }

  /**
   * 将JavaScript对象序列化为XML字符串
   * @param obj 要序列化的JavaScript对象
   * @param rootName 根节点名称,默认为'root'
   * @returns 生成的XML字符串
   */
  static stringifyToXml(obj: any, rootName: string = 'root'): string {
    let xml = '';
    const buildXml = (node: any, nodeName: string) => {
      if (node === null || node === undefined) return;

      if (Array.isArray(node)) {
        node.forEach((item) => buildXml(item, nodeName));
      } else if (typeof node === 'object') {
        xml += `<${nodeName}>`;
        for (const key in node) {
          if (node.hasOwnProperty(key)) {
            buildXml(node[key], key);
          }
        }
        xml += `</${nodeName}>`;
      } else {
        xml += `<${nodeName}>${node}</${nodeName}>`;
      }
    };

    buildXml(obj, rootName);
    return `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
  }

  /**
   * 验证XML字符串格式是否正确
   * @param xmlString 要验证的XML字符串
   * @returns 验证结果,true表示格式正确
   */
  static validateXml(xmlString: string): boolean {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      return xmlDoc.getElementsByTagName("parsererror").length === 0;
    } catch (error) {
      return false;
    }
  }


  /**
   * 内部方法:将XML节点转换为JSON对象
   * @param node XML节点
   * @returns 转换后的JSON对象
   */
  private static xmlToJson(node: Node): any {
    const result: any = {};

    // 处理元素节点
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      // 处理属性
      if (element.attributes.length > 0) {
        result["@attributes"] = {};
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          result["@attributes"][attr.nodeName] = attr.nodeValue;
        }
      }

      // 处理子节点
      for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i];
        const childName = child.nodeName;

        if (child.nodeType === Node.TEXT_NODE) {
          if (child.nodeValue?.trim()) {
            result["#text"] = child.nodeValue.trim();
          }
        } else {
          if (!result[childName]) {
            result[childName] = this.xmlToJson(child);
          } else {
            if (!Array.isArray(result[childName])) {
              result[childName] = [result[childName]];
            }
            result[childName].push(this.xmlToJson(child));
          }
        }
      }

      return result;
    }

    return null;
  }
}

// 默认导出实例
export default new XmlUtils();
