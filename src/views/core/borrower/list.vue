<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form :inline="true">
      <el-form-item label="关键字">
        <el-input
          v-model="keyword"
          placeholder="姓名 / 手机 / 身份证"
        ></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">
        查询
      </el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 列表 -->
    <el-table :data="list">
      <el-table-column
        header-align="center"
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        width="180"
      ></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex === 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="是否结婚">
        <template slot-scope="scope">
          {{ scope.row.marry === 1 ? '已婚' : '未婚' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag type="warning" size="mini" v-if="scope.row.status === 0">
            未认证
          </el-tag>
          <el-tag type="info" size="mini" v-if="scope.row.status === 1">
            认证中
          </el-tag>
          <el-tag type="success" size="mini" v-if="scope.row.status === 2">
            认证通过
          </el-tag>
          <el-tag type="danger" size="mini" v-if="scope.row.status === -1">
            认证失败
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="申请时间"
        width="160"
      ></el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <router-link :to="'/core/borrower/detail/' + scope.row.id">
            <el-button v-if="scope.row.status === 1" type="warning" size="mini">
              审批
            </el-button>
            <el-button v-else type="primary" size="mini">查看</el-button>
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
import borrowerApi from '@/api/core/borrower'
export default {
  data() {
    return {
      keyword: '',
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
      borrowerApi
        .getPageList(this.page, this.limit, this.keyword)
        .then((res) => {
          this.list = res.data.list.records
          this.total = res.data.list.total
        })
    },
    resetData() {
      this.keyword = ''
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
  },
}
</script>
