<template>
  <div id="app-content">
    <h1>{{ message }}</h1>
    <HelloWorld />
    <button @click="handleClick">点我</button>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue';
  // Vue 2.7 可以使用 <script setup> 或 Options API
  // 这里用 Options API 示例
  export default {
    name: 'App',
    components: {
      HelloWorld
    },
    data() {
      return {
        message: 'Welcome to Your Vue 2.7 + Rsbuild + Electron App!'
      };
    },
    methods: {
      handleClick() {
        console.log('Clicked the button.');
      }
    }
  };
</script>
<!-- 如果使用 <script setup lang="ts">
<script setup lang="ts">
import { ref } from 'vue'; // Vue 2.7 需要 @vue/composition-api 或 Vue 2.7 本身支持
import HelloWorld from './components/HelloWorld.vue';
const message = ref('Welcome to Your Vue 2.7 + Rsbuild + Electron App!');
</script>
-->

<style>
  #app-content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>