import axios  from '@/request/test.js';

// 放置接口
export const getUser = () => {
  axios.request({
    url: '/user',
    method: 'get'
  })
}