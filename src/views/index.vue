<template>
  <div>
    <form method="post" role="form" action="/api/user/uploads" enctype="multipart/form-data">
      <input required type="file" multiple id="avatar" name="avatar">
      <button>上传文件</button>
    </form>
    
    <el-form>
      <el-form-item label="文件" label-width="120px">
        <el-upload class="upload-demo" :before-upload="beforeUpload" :data="{a:1221212}" action="/api/user/uploads" :auto-upload="false" :limit="3" ref="upload" multiple>
          <el-button size="small" type="primary">模拟上传啊</el-button>
        </el-upload>
      </el-form-item>
      <el-button class="btn" size="small" type="primary" @click="upload">确定上传2</el-button>
    </el-form>
    <br/>
    <haha
      name="我是标题"
      background="pink"
      type="ss"
      data="1601452500000"></haha>
  </div>
</template>
<script>
import haha from './ccc/index.vue'
// let axios = require('axios');
export default {
  components: {
    haha
  },
  data() {
    return {
    };
  },
  methods: {
    upload () {
      this.$refs.upload.submit()
    },
    // upload() {
    //   const formData = new FormData()
    //   const files = this.$refs.upload.uploadFiles
    //   console.log(this.$refs.upload)
    //   const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
    //   if (!files.length) { // 若未选择文件
    //     alert('请选择文件')
    //     return
    //   }
    //   // let arr = []
    //   files.forEach(item => {
    //     // arr.push(item.raw)
    //     formData.append(`avatar[]`, item.raw)
    //   })
    //   formData.append('haha', [1,2,4])
    //   let str = JSON.stringify({a:1,b:3})
    //   formData.append('jll', {a:1,b:3})
    //   formData.append('jll', str)
    //   axios.post('/api/user/uploads', formData, headerConfig).then(res => {
    //     console.log(res)
    //   })
    // },
    beforeUpload(file) {
      console.log(file)
    }
  }
}
</script>