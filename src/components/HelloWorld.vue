<template>
  <div class="hello">
    <p>This is the HelloWorld component.</p>
    <button @click="handleClick">点我</button>
    <aaa />
  </div>
</template>

<script setup lang="ts">
  import core from '../core/index'
  import aaa from '../views/aaa.vue'
  console.log("HelloWorld component script started.")
  const handleClick = () => {
    const aaa = "bbb"
    debugger
    core.sayHello()
    console.log("Clicked the button.")
  }
</script>

<style scoped>
  .hello {
    margin-top: 20px;
    color: green;
  }
</style>