<template>
  <div class="app-login">
    <!-- 登录框 -->
    <div class="logo">
      <!-- model为表单数据对象 -->
      <el-form ref="loginForm" :model="loginForm" label-width="0">
        <el-form-item>
          <el-input
            v-model="loginForm.userName"
            placeholder="请输入用户名"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.passWord"
            type="password"
            placeholder="请输入密码"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app-login',
  data() {
    return {
      loading: false,
      loginForm: {
        userName: '',
        passWord: ''
      }
    }
  },
  methods: {
    submit() {
      console.log('submit');
    }
  }
}
</script>
<style lang="postcss" scoped>

</style>