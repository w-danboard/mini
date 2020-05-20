<template>
  <div class="app-header">
  </div>
</template>
<script>
export default {
  name: 'app-header',
  data() {
    return {
      
    }
  }
}
</script>
<style lang="postcss" scoped>
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    z-index: 999;
  }
</style>