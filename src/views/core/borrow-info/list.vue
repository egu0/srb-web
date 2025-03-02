<template>
  <div class="app-container">
    <!-- 列表 -->
    <el-table :data="list">
      <el-table-column
        header-align="center"
        label="序号"
        width="60"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="借款人姓名"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="120"
      ></el-table-column>
      <el-table-column prop="amount" label="借款金额"></el-table-column>
      <el-table-column label="借款期限">
        <template slot-scope="scope">{{ scope.row.period }} 个月</template>
      </el-table-column>
      <el-table-column
        prop="param.returnMethod"
        label="还款方式"
      ></el-table-column>
      <el-table-column prop="param.moneyUse" label="资金用途"></el-table-column>
      <el-table-column label="年化利率">
        <template slot-scope="scope">
          {{ scope.row.borrowYearRate * 100 }}%
        </template>
      </el-table-column>
      <el-table-column prop="param.status" label="状态"></el-table-column>
      <el-table-column
        prop="createTime"
        label="申请时间"
        width="160"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="'/core/borrower/info-detail/' + scope.row.id">
            <el-button type="primary" size="mini">查看</el-button>
            <el-button
              v-if="scope.row.status === 1"
              type="warning"
              @click="showApproval(scope.row)"
              size="mini"
            >
              审批
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[10, 20, 30]"
      style="padding: 30px 0"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    ></el-pagination>
  </div>
</template>

<script>
import borrowInfoApi from '@/api/core/borrow-info'

export default {
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      limit: 10,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      borrowInfoApi.getPageList(this.page, this.limit).then((res) => {
        this.list = res.data.list.records
        this.total = res.data.list.total
      })
    },
    resetData() {
      this.fetchData()
    },
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },
    showApproval(data) {},
  },
}
</script>
