<template>
  <div class="app-main">
    <!-- 头部 -->
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>
<script>
import appHeader from '@/views/layouts/app-header.vue'
export default {
  name: 'app-main',
  components: {
    appHeader
  },
  data() {
    return {
      
    }
  }
}
</script>
<style lang="postcss" scoped>
.app-main {
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
  margin-top: 50px;
}
</style>