<template>
  <div class="app-login">
    <!-- 登录框 -->
    <div class="login">
      我是好丑的登录页啊~~~~
      <!-- model为表单数据对象 -->
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="0">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="large-button" type="primary" :loading="loading" @click="submit('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from './api/index';
export default {
  name: 'app-login',
  mixins: [ api ],
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submit(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          let loginForm = this.loginForm;
          let password = this.$md5(loginForm.password);
          this.loading = true;
          await this.login({
            ...loginForm,
              password
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
  .app-login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login {
      width: 380px;
    }
  }
</style>