<template>
  <div class="app-container">
    <h3>标的信息</h3>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">标的编号</th>
          <td width="35%">{{ lendDetail.lend.lendNo }}</td>
          <th width="15%">标题</th>
          <td width="35%">{{ lendDetail.lend.title }}</td>
        </tr>
        <tr>
          <th>标的金额</th>
          <td>{{ lendDetail.lend.amount }} 元</td>
          <th>投资期数</th>
          <td>{{ lendDetail.lend.period }} 个月</td>
        </tr>
        <tr>
          <th>年化利率</th>
          <td>
            标的：{{ lendDetail.lend.lendYearRate * 100 }}%
            <br />
            平台：{{ lendDetail.lend.serviceRate * 100 }}%
          </td>
          <th>还款方式</th>
          <td>
            {{ lendDetail.lend.param.returnMethod }}
          </td>
        </tr>
        <tr>
          <th>最低投资金额</th>
          <td>{{ lendDetail.lend.lowestAmount }} 元</td>
          <th>发布日期</th>
          <td>{{ lendDetail.lend.publishDate }}</td>
        </tr>
        <tr>
          <th>开始日期</th>
          <td>{{ lendDetail.lend.lendStartDate }}</td>
          <th>结束日期</th>
          <td>{{ lendDetail.lend.lendEndDate }}</td>
        </tr>
        <tr>
          <th>已投金额</th>
          <td>{{ lendDetail.lend.investAmount }} 元</td>
          <th>投资人数</th>
          <td>{{ lendDetail.lend.investNum }} 人</td>
        </tr>
        <tr>
          <th>状态</th>
          <td>{{ lendDetail.lend.param.status }}</td>
          <th>创建时间</th>
          <td>{{ lendDetail.lend.createTime }}</td>
        </tr>
        <tr>
          <th>说明</th>
          <td colspan="3">
            <b>{{ lendDetail.lend.lendInfo }}</b>
          </td>
        </tr>
      </tbody>
    </table>

    <h3>平台收益信息</h3>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">标的预期收益</th>
          <td width="35%">{{ lendDetail.lend.expectAmount }} 元</td>
          <th width="15%">标的已获取收益</th>
          <td width="35%">{{ lendDetail.lend.realAmount }} 元</td>
        </tr>
      </tbody>
    </table>

    <h3>借款人信息</h3>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">借款人</th>
          <td width="35%">{{ lendDetail.borrower.name }}</td>
          <th width="15%">手机</th>
          <td width="35%">{{ lendDetail.borrower.mobile }}</td>
        </tr>
        <tr>
          <th>身份证</th>
          <td>{{ lendDetail.borrower.idCard }}</td>
          <th>性别</th>
          <td>{{ lendDetail.borrower.sex }}</td>
        </tr>
        <tr>
          <th>年龄</th>
          <td>{{ lendDetail.borrower.age }} 岁</td>
          <th>是否结婚</th>
          <td>{{ lendDetail.borrower.marry }}</td>
        </tr>
        <tr>
          <th>学历</th>
          <td>{{ lendDetail.borrower.education }}</td>
          <th>行业</th>
          <td>{{ lendDetail.borrower.industry }}</td>
        </tr>
        <tr>
          <th>月收入</th>
          <td>{{ lendDetail.borrower.income }} 元</td>
          <th>还款来源</th>
          <td>{{ lendDetail.borrower.returnSource }}</td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td>{{ lendDetail.borrower.createTime }}</td>
          <th>状态</th>
          <td>{{ lendDetail.borrower.status }}</td>
        </tr>
      </tbody>
    </table>

    <h4>投资记录</h4>
    <el-table :data="lendItemList" stripe style="width: 100%" border>
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column prop="lendItemNo" label="投资编号" width="210" />
      <el-table-column prop="investName" label="投资用户" width="110" />
      <el-table-column prop="investAmount" label="投资金额" />
      <el-table-column label="年化利率">
        <template slot-scope="scope">
          {{ scope.row.lendYearRate * 100 }}%
        </template>
      </el-table-column>
      <el-table-column prop="investTime" label="投资时间" width="160" />
      <el-table-column prop="lendStartDate" label="开始日期" />
      <el-table-column prop="lendEndDate" label="结束日期" />
      <el-table-column prop="expectAmount" label="预期收益" />
      <el-table-column prop="investTime" label="投资时间" width="160" />
    </el-table>

    <h4>还款计划</h4>
    <el-table :data="lendReturnList" stripe style="width: 100%" border>
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column prop="currentPeriod" label="当前的期数" />
      <el-table-column prop="principal" label="本金" />
      <el-table-column prop="interest" label="利息" />
      <el-table-column prop="total" label="本息" />
      <el-table-column prop="returnDate" label="还款日期" width="150" />
      <el-table-column prop="realReturnTime" label="实际还款时间" />
      <el-table-column label="是否逾期">
        <template slot-scope="scope">
          <span v-if="scope.row.overdue">
            是（逾期金额：{{ scope.row.overdueTotal }}元）
          </span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? '未还款' : '已还款' }}
        </template>
      </el-table-column>
    </el-table>

    <el-row style="text-align: center; margin-top: 40px">
      <el-button @click="back()">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import lendApi from '@/api/core/lend'
import lendItemApi from '@/api/core/lend-item'
import lendReturnApi from '@/api/core/lend-return'

import '@/styles/show.css'

export default {
  data() {
    return {
      lendDetail: {
        lend: {
          param: {},
        },
        borrower: {},
      },
      lendItemList: [], // 标的投资列表
      lendReturnList: [], // 还款计划
    }
  },
  created() {
    let id = this.$route.params.id
    if (id) {
      this.fetchDataById(id)

      // 拉取投资列表
      this.fetchLendItemList(id)

      // 拉取还款计划
      this.fetchLendReturnList(id)
    }
  },
  methods: {
    fetchDataById(id) {
      lendApi.detail(id).then((res) => {
        this.lendDetail = res.data.detail
      })
    },

    back() {
      this.$router.push({ path: '/core/lend/list' })
    },

    fetchLendItemList(id) {
      lendItemApi.getList(id).then((res) => {
        this.lendItemList = res.data.list
      })
    },

    fetchLendReturnList(id) {
      lendReturnApi.getList(id).then((res) => {
        this.lendReturnList = res.data.list
      })
    },
  },
}
</script>
