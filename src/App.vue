<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>
<script>
import appHeader from '@/views/layouts/app-header.vue'
export default {
  name: 'app',
  components: {
    appHeader
  },
  data() {
    return {
    }
  }
}
</script>