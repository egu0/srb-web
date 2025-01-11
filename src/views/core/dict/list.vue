<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button
        size="mini"
        icon="el-icon-download"
        @click="dialogVisible = true"
        type="primary"
      >
        導入 Excel
      </el-button>
    </div>
    <!-- 文件上傳表單 -->
    <el-dialog
      title="數據字典導入"
      @closed="onDialogClosed"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="請選擇 Excel 文件">
          <el-upload
            ref="upload"
            :action="BASE_API + '/admin/core/dict/import'"
            :auto-upload="true"
            :multiple="false"
            :limit="1"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            name="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" type="primary">點擊上傳</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否顯示文件上傳對話框
      dialogVisible: false,
      // 後端接口地址
      BASE_API: process.env.VUE_APP_BASE_API,
    }
  },

  methods: {
    // 對話框關閉時清空上傳的文件列表
    onDialogClosed() {
      this.$refs.upload.clearFiles()
    },

    // 後台正常返回
    fileUploadSuccess(response) {
      if (response.code === 0) {
        this.$message.success('數據導入成功')
        // 導入成功後自動關閉對話框
        this.dialogVisible = false
      } else {
        this.$message.error(response.message)
      }
    },

    // 通信失敗
    fileUploadError(error) {
      console.log(error)
      this.$message.error('數據導入失敗')
    },
  },
}
</script>
