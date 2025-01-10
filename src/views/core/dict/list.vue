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
    <el-dialog title="數據字典導入" :visible.sync="dialogVisible" width="30%">
      對話框
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否顯示對話框
      dialogVisible: false,
    }
  },
}
</script>
