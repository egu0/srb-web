<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手機號">
        <el-input v-model="searchObj.mobile" placeholder="手機號"></el-input>
      </el-form-item>
      <el-form-item label="用戶類型">
        <el-select v-model="searchObj.userType" placeholder="請選擇">
          <el-option label="投資人" value="1"></el-option>
          <el-option label="借款人" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用戶狀態">
        <el-select v-model="searchObj.status" placeholder="用戶狀態">
          <el-option label="正常" value="1" />
          <el-option label="鎖定" value="0" />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">
        查詢
      </el-button>
      <el-button type="primary" @click="resetFrom()">清空</el-button>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" :border="true" stripe>
      <el-table-column label="#" width="50" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用戶類型" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.userType === 1" size="mini">
            投資人
          </el-tag>
          <el-tag
            v-else-if="scope.row.userType === 2"
            type="warning"
            size="mini"
          >
            借款人
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        align="center"
        label="手機號"
        width="120"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="用戶姓名"
        width="130"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="idCard"
        label="身份證號"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="integral"
        label="用戶積分"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="註冊時間"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope" slot="header">
          <span>
            綁定狀態
            <el-tooltip
              class="item"
              effect="dark"
              content="是否綁定到資金託管平台"
              placement="top-start"
            >
              <i
                class="el-icon-question"
                style="font-size: 14px; vertical-align: baseline"
              ></i>
            </el-tooltip>
          </span>
        </template>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.bindStatus === 0" type="warning" size="mini">
            未綁定
          </el-tag>
          <el-tag
            v-else-if="scope.row.bindStatus === 1"
            type="success"
            size="mini"
          >
            已綁定
          </el-tag>
          <el-tag v-else type="danger">綁定失敗</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用戶狀態" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="danger" size="mini">
            鎖定
          </el-tag>
          <el-tag v-else type="success" size="mini">正常</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分頁組件 -->
    <el-pagination
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[1, 2, 3]"
      style="padding: 30px 0"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentSize"
    ></el-pagination>
  </div>
</template>

<script>
import userInfoApi from '@/api/core/user-info'
export default {
  data() {
    return {
      list: null, // 數據
      total: 0, // 數據庫中的總記錄數
      page: 1, // 默認頁碼
      limit: 2, // 每頁記錄數
      searchObj: {}, // 查詢條件
      loginRecordList: [], // 會員登錄日誌
      dialogTableVisible: false, //對話框是否顯示
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    resetFrom() {
      this.searchObj = {}
      this.fetchData()
    },
    fetchData() {
      userInfoApi
        .getPageList(this.page, this.limit, this.searchObj)
        .then((res) => {
          this.list = res.data.pageModel.records
          this.total = res.data.pageModel.total
        })
    },
    changePageSize(newPageSize) {
      this.limit = newPageSize
      this.fetchData()
    },
    changeCurrentSize(newPage) {
      this.page = newPage
      this.fetchData()
    },
  },
}
</script>
