<template>
  <div class="app-container">
    <el-table :data="list" border="border" stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="borrowAmount" label="借款额度" />
      <el-table-column prop="integralStart" label="积分区间开始" />
      <el-table-column prop="integralEnd" label="积分区间结束" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import integralGradeApi from '@/api/core/integral-grade'

export default {
  data() {
    return {
      list: [],
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    removeById(id) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '点错了',
        type: 'warning',
      })
        .then(() => {
          return integralGradeApi.removeById(id)
        })
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success',
          })
          this.fetchData()
        })
        .catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          }
        })
    },
    fetchData() {
      integralGradeApi.list().then((res) => {
        this.list = res.data.list
      })
    },
  },
}
</script>

<style scoped></style>
