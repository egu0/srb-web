<template>
  <div class="app-container">user list</div>
</template>

<script>
import userInfoApi from '@/api/core/user-info'
export default {
  data() {
    return {
      list: null, // 數據
      total: 0, // 數據庫中的總記錄數
      page: 1, // 默認頁碼
      limit: 10, // 每頁記錄數
      searchObj: {}, // 查詢條件
      loginRecordList: [], // 會員登錄日誌
      dialogTableVisible: false, //對話框是否顯示
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      userInfoApi
        .getPageList(this.page, this.limit, this.searchObj)
        .then((res) => {
          this.list = res.data.pageModel.records
          this.total = res.data.pageModel.total
        })
    },
  },
}
</script>
