<template>
  <div class="app-container">
    <!-- 列表 -->
    <el-table :data="list" stripe>
      <el-table-column
        align="center"
        label="序号"
        width="50"
        type="index"
      ></el-table-column>
      <el-table-column
        prop="lendNo"
        label="标的编号"
        width="190"
      ></el-table-column>
      <el-table-column prop="amount" label="标的金额"></el-table-column>
      <el-table-column prop="period" label="投资期数"></el-table-column>
      <el-table-column label="年化利率">
        <template slot-scope="scope">
          {{ scope.row.lendYearRate * 100 }}%
        </template>
      </el-table-column>
      <el-table-column label="还款方式" width="100">
        <template slot-scope="scope">
          {{ scope.row.param.returnMethod }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.param.status }}
        </template>
      </el-table-column>
      <el-table-column prop="investAmount" label="已投金额"></el-table-column>
      <el-table-column prop="investNum" label="投资人数"></el-table-column>
      <el-table-column
        prop="lendStartDate"
        label="开始日期"
        width="100"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="lendEndDate"
        label="结束日期"
      ></el-table-column>
      <el-table-column
        prop="publishDate"
        label="发布时间"
        width="160"
      ></el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">
            <router-link :to="'/core/lend/detail/' + scope.row.id">
              查看
            </router-link>
          </el-button>
          <el-button
            v-if="scope.row.status == 1"
            type="warning"
            size="mini"
            @click="makeLoan(scope.row.id)"
          >
            放款
          </el-button>
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
import lendApi from '@/api/core/lend'

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
      lendApi.getPageList(this.page, this.limit).then((res) => {
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
    makeLoan(id) {
      this.$confirm('是否确认放款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          lendApi.makeLoan(id).then((res) => {
            this.fetchData()
            this.$message({
              type: 'success',
              message: res.message,
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消放款',
          })
        })
    },
  },
}
</script>
