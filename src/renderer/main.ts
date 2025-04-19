import Vue from 'vue'; // 默认导入 Vue 构造函数
import App from './App.vue';

// Vue 2.7 风格
new Vue({
  render: h => h(App),
}).$mount('#app');

console.log('Renderer process started.');

// 示例:如果使用了 preload 脚本暴露的 API
// if (window.electronAPI) {
//   console.log('Node version via preload:', window.electronAPI.nodeVersion);
// }