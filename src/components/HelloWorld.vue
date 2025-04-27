<template>
  <div class="hello">
    <p>This is the HelloWorld component.</p>
    <button @click="handleClick">点我</button>
    <button @click="handleClick2">点我2</button>
  </div>
</template>

<script setup lang="ts">
  import { XmlUtils } from '@/utils/xml-utils'
  import core from '../core/index'
  import aaa from '../views/aaa.vue'
  console.log("HelloWorld component script started.")
  const handleClick = () => {
    const aaa = "bbb"
    // debugger
    core.sayHello()
    console.log("Clicked the button.")
    const qqq = window.electronAPI.doSomething("Hello from renderer process.")
    qqq.then(res => console.log(res))
  }

  const handleClick2 = () => {
    const xmlFile = XmlUtils.readXmlFile('/static/table-config.xml', true)
    xmlFile.then(res => console.log(res))
  }
</script>

<style scoped>
  .hello {
    margin-top: 20px;
    color: green;
  }
</style>