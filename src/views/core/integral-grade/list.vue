<template>
  <div class="app-container">
    <el-table :data="list" border="border" stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="borrowAmount" label="借款额度" />
      <el-table-column prop="integralStart" label="积分区间开始" />
      <el-table-column prop="integralEnd" label="积分区间结束" />
    </el-table>
  </div>
</template>

<script>
import integralGradeApi from '@/api/core/integral-grade.js'

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
    fetchData() {
      integralGradeApi.list().then((res) => {
        this.list = res.data.list
      })
    },
  },
}
</script>

<style scoped></style>
