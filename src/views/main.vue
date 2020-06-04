<template>
  <div class="app-main">
    <!-- 进度条 -->
    <vue-progress-bar></vue-progress-bar>
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
  },
  mounted () {
    // 开启 & 关闭 顶部进度条
    this.$router.beforeEach((to, from, next) => {
      console.log('我要取消eslint-loader, 传参数不使用还不行， 啥玩意啊~~~', to, from);
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      console.log('我要取消eslint-loader, 传参数不使用还不行， 啥玩意啊~~~', to, from);
      this.$Progress.finish()
    })
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