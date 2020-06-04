const BASE_URL = '/api/user';

const API = {
  LOGIN: {
    url: `${BASE_URL}/login`,
    method: 'POST'
  }
}

export default {
  methods: {
    login(params) {
      this.$request({
        ...API.LOGIN,
        data: {
          ...params
        }
      }).then(data => {
        this.loading = false;
        if (data.code === 0) {
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          });
          this.$router.push('/index');
        } else {
          this.loading = false;
          this.$message.error(data.message || '登录失败！');
        }
      });
    }
  }
}