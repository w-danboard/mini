const BASE_URL = '/api/user';

const API = {
  SIGNUP: {
    url: `${BASE_URL}/signup`,
    method: 'POST'
  }
}

export default {
  methods: {
    signup(params) {
      this.$request({
        ...API.SIGNUP,
        data: {
          ...params
        }
      }).then(data => {
        this.loading = false;
        if (data.code === 0) {
          this.$message({
          message: '恭喜你，注册成功',
          type: 'success'
        });
          this.$router.push('/login');
        } else {
          this.$message.error(data.message || '注册失败！');
        }
      });
    }
  }
}