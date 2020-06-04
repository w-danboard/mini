const BASE_URL = '/api/user';

const API = {
  LOGIN: {
    url: `${BASE_URL}/login`,
    method: 'POST'
  }
}

import { setLocal } from '@/lib/local';
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
          // 将token 保存到客户端上 每次请求时代上token 服务端每次校验token 如果token不正确活着过期 相当于没登录
          setLocal('token', data.token);
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