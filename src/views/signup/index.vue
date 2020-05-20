<template>
  <div class="app-signup">
    <!-- 登录框 -->
    <div class="signup">
      <!-- model为表单数据对象 -->
      <el-form ref="signupForm" :model="signupForm" label-width="0">
        <el-form-item>
          <el-input
            v-model="signupForm.userName"
            placeholder="请输入用户名"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="signupForm.passWord"
            type="password"
            placeholder="请输入密码"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="signupForm.email"
            placeholder="请输入邮箱"
            autofocus
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app-signup',
  data() {
    return {
      loading: false,
      signupForm: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    submit() {
      console.log('submit');
      this.$post('/api/user/signup', {
        data : this.signupForm
      }).then(data => {
        console.log('data===>', data);
      });
    }
  }
}
</script>
<style lang="postcss" scoped>

</style>