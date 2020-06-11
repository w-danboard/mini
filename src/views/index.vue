<template>
  <div>
    <form method="post" role="form" action="/api/user/uploads" enctype="multipart/form-data">
      <input required type="file" id="avatar" name="avatar">
      <button>上传</button>
    </form>
<el-form>
    <el-form-item label="文件" label-width="120px">
        <el-upload class="upload-demo" action="" :auto-upload="false"  ref="upload" :http-request="upload" multiple>
          <el-button size="small" type="primary">模拟上传2</el-button>
        </el-upload>
      </el-form-item>
</el-form>
 <el-button class="btn" size="small" type="primary" @click="upload">确定上传2</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    upload() {
      const formData = new FormData()
      console.log(formData, 1)
      const file = this.$refs.upload.uploadFiles[0]
      console.log(this.$refs.upload.uploadFiles)
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      console.log(formData, 2)
      this.$request({
        url: '/api/user/uploads',
        method: 'POST',
        data: {
          formData: new FormData(),
          ...headerConfig
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>