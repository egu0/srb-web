<template>
  <div class="app-container">
    <el-form label-width="100px" class="form-table">
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态">
            {{ borrower.status }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建时间">
            {{ borrower.createTime }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名">
            {{ borrower.name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            {{ borrower.sex }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄">
            {{ borrower.age }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机">
            {{ borrower.mobile }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="学历">
            {{ borrower.education }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否结婚">
            {{ borrower.marry }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="行业">
            {{ borrower.industry }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="还款来源">
            {{ borrower.returnSource }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="身份证号">
            {{ borrower.idCard }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人名字">
            {{ borrower.contactsName }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人手机">
            {{ borrower.contactsMobile }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人关系">
            {{ borrower.contactsRelation }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证正面">
            <span v-for="item in borrower.borrowerAttachVOList" :key="item.id">
              <el-image
                v-if="item.imageType === 'idCard1'"
                style="width: 150px"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              ></el-image>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证背面">
            <span v-for="item in borrower.borrowerAttachVOList" :key="item.id">
              <el-image
                v-if="item.imageType === 'idCard2'"
                style="width: 150px"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              ></el-image>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="房产信息">
            <span v-for="item in borrower.borrowerAttachVOList" :key="item.id">
              <el-image
                v-if="item.imageType === 'house'"
                style="width: 150px"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              ></el-image>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="车辆信息">
            <span v-for="item in borrower.borrowerAttachVOList" :key="item.id">
              <el-image
                v-if="item.imageType === 'car'"
                style="width: 150px"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              ></el-image>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-button type="primary" @click="back">返回</el-button>
      </el-row>
    </el-form>

    <!-- 审核模版 -->
    <el-divider v-if="borrower.status === '认证中'"></el-divider>
    <el-form v-if="borrower.status === '认证中'" label-width="170px">
      <el-form-item label="是否通过">
        <el-radio-group v-model="approvalForm.status">
          <el-radio :label="2">通过</el-radio>
          <el-radio :label="-1">不通过</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="approvalForm.status === 2" label="基本信息积分">
        <el-input
          v-model="approvalForm.infoIntegral"
          style="width: 140px"
        ></el-input>
        <span style="color: indianred">（可获取 30 至 100 积分）</span>
      </el-form-item>

      <el-form-item v-if="approvalForm.status === 2" label="身份证信息是否正确">
        <el-radio-group v-model="approvalForm.isIdCardOk">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <span style="color: indianred">（可获得 30 积分）</span>
      </el-form-item>

      <el-form-item v-if="approvalForm.status === 2" label="车辆信息是否正确">
        <el-radio-group v-model="approvalForm.isCarOk">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <span style="color: indianred">（可获得 60 积分）</span>
      </el-form-item>

      <el-form-item v-if="approvalForm.status === 2" label="房产信息是否正确">
        <el-radio-group v-model="approvalForm.isHouseOk">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <span style="color: indianred">（可获得 100 积分）</span>
      </el-form-item>

      <el-row style="text-align: center">
        <el-button type="primary" @click="approvalSubmit()">确定</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import borrower from '@/api/core/borrower'
import borrowerApi from '@/api/core/borrower'

export default {
  data() {
    return {
      borrower: {},
      // 防止重复提交
      saveBtnDisabled: false,
      // 审批表单
      approvalForm: {
        borrowerId: 0,
        status: 2,
        content: '',
        infoIntegral: 30,
        isIdCardOk: false,
        isHouseOk: false,
        isCarOk: false,
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
      borrowerApi.detail(id).then((res) => {
        this.borrower = res.data.detail
      })
    },

    back() {
      this.$router.push({ path: '/core/borrower/list' })
    },

    approvalSubmit() {
      this.saveBtnDisabled = true
      this.approvalForm.borrowerId = this.$route.params.id
      borrowerApi.approval(this.approvalForm).then((res) => {
        this.$message.success(res.message)
        this.$router.push({ path: '/core/borrower/list' })
      })
    },
  },
}
</script>
