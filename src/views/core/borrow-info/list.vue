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
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <router-link :to="'/core/borrower/info-detail/' + scope.row.id">
            <el-button type="primary" size="mini">查看</el-button>
          </router-link>
          <el-button
            style="margin-left: 5px"
            v-if="scope.row.status === 1"
            type="warning"
            @click="beforeApproval(scope.row)"
            size="mini"
          >
            审批
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

    <!-- 弹窗 -->
    <el-dialog title="" :visible.sync="dialogVisible" width="490px">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="是否通过">
          <el-radio-group v-model="borrowInfoApproval.status">
            <el-radio :label="2">通过</el-radio>
            <el-radio :label="-1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="borrowInfoApproval.status == 2" label="标的名称">
          <el-input v-model="borrowInfoApproval.title"></el-input>
        </el-form-item>
        <el-form-item v-if="borrowInfoApproval.status == 2" label="起息日">
          <el-date-picker
            v-model="borrowInfoApproval.lendStartDate"
            type="date"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-if="borrowInfoApproval.status == 2" label="年化收益率">
          <el-input v-model="borrowInfoApproval.lendYearRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="borrowInfoApproval.status == 2" label="服务费率">
          <el-input v-model="borrowInfoApproval.serviceRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="borrowInfoApproval.status == 2" label="标的描述">
          <el-input
            v-model="borrowInfoApproval.lendInfo"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitApproval()">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogVisible: false,
      borrowInfoApproval: {
        // 初始化数据
        status: 2,
        serviceRate: 5,
        lendYearRate: 0,
      },
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
    beforeApproval(row) {
      this.borrowInfoApproval.lendYearRate = row.borrowYearRate * 100
      this.borrowInfoApproval.id = row.id
      this.dialogVisible = true
    },
    submitApproval() {
      borrowInfoApi.approval(this.borrowInfoApproval).then((res) => {
        this.$message.success(res.message)
        this.dialogVisible = false
        this.fetchData()
      })
    },
  },
}
</script>
