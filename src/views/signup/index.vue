<template>
  <div class="app-signup">
    <!-- 登录框 -->
    <div class="signup">
      我是好丑的注册页啊 咋办啊~~~~
      <!-- model为表单数据对象 -->
      <el-form ref="signupForm" :rules="rules" :model="signupForm" label-width="0">
        <el-form-item prop="username">
          <el-input
            v-model="signupForm.username"
            placeholder="请输入用户名"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="signupForm.password"
            type="password"
            placeholder="请输入密码"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="signupForm.email"
            placeholder="请输入邮箱"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="large-button" type="primary" :loading="loading" @click="submit('signupForm')">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from './api/index';
export default {
  name: 'app-signup',
  mixins: [ api ],
  data() {
    return {
      loading: false,
      signupForm: {
        username: '',
        password: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submit(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          let signupForm = this.signupForm;
          let password = this.$md5(signupForm.password);
          this.loading = true;
          await this.signup({
            ...signupForm,
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
  .app-signup {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .signup {
      width: 380px;
    }
  }
</style>