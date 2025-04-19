<template>
  <div>
    16565
    <button @click="handleClick">点我</button>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'aaa',
    setup() {
      const handleClick = () => {
        console.log('clicked aaa');
      };
      return {
        handleClick,
      };
    },
  });
</script>

<style scoped></style>