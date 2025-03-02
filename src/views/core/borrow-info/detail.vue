<template>
  <div class="app-container">
    <h4>借款信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">借款金额</th>
          <td width="35%">{{ borrowInfoDetail.borrowInfoDetail.amount }} 元</td>
          <th width="15%">借款期限</th>
          <td width="35%">
            {{ borrowInfoDetail.borrowInfoDetail.period }} 个月
          </td>
        </tr>
        <tr>
          <th>年化利率</th>
          <td>{{ borrowInfoDetail.borrowInfoDetail.borrowYearRate * 100 }}%</td>
          <th>还款方式</th>
          <td>
            {{ borrowInfoDetail.borrowInfoDetail.param.returnMethod }}
          </td>
        </tr>
        <tr>
          <th>资金用途</th>
          <td>
            {{ borrowInfoDetail.borrowInfoDetail.param.moneyUse }}
          </td>
          <th>状态</th>
          <td>
            {{ borrowInfoDetail.borrowInfoDetail.param.status }}
          </td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td>
            {{ borrowInfoDetail.borrowInfoDetail.createTime }}
          </td>
          <th></th>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4>借款人信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">借款人</th>
          <td width="35%">{{ borrowInfoDetail.borrowerDetail.name }}</td>
          <th width="15%">手机</th>
          <td width="35%">
            {{ borrowInfoDetail.borrowerDetail.mobile }}
          </td>
        </tr>
        <tr>
          <th>身份证</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.idCard }}
          </td>
          <th>性别</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.sex }}
          </td>
        </tr>
        <tr>
          <th>年龄</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.age }}
          </td>
          <th>是否结婚</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.marry }}
          </td>
        </tr>
        <tr>
          <th>学历</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.education }}
          </td>
          <th>行业</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.industry }}
          </td>
        </tr>
        <tr>
          <th>月收入</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.income }}
          </td>
          <th>还款来源</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.returnSource }}
          </td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.createTime }}
          </td>
          <th>状态</th>
          <td>
            {{ borrowInfoDetail.borrowerDetail.status }}
          </td>
        </tr>
      </tbody>
    </table>

    <el-row style="text-align: center; margin-top: 40px">
      <el-button @click="back()">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import borrowerInfoApi from '@/api/core/borrow-info'
import '@/styles/show.css'

export default {
  data() {
    return {
      // 初始化存在的结构：比如模版中用到了borrowInfoDetail.borrowInfoDetail.amount，那么需要定义如下结构
      // borrowInfoDetail: { borrowInfoDetail: { } },
      borrowInfoDetail: {
        borrowInfoDetail: {
          param: {},
        },
        borrowerDetail: {},
      },
    }
  },
  created() {
    let id = this.$route.params.id
    if (id) {
      this.fetchDataById(id)
    }
  },
  methods: {
    fetchDataById(id) {
      borrowerInfoApi.detail(id).then((res) => {
        this.borrowInfoDetail = res.data.detail
      })
    },

    back() {
      this.$router.push({ path: '/core/borrower/info-list' })
    },
  },
}
</script>
