import request from '@/utils/request.js'

export default {
  list() {
    return request({
      url: '/admin/core/integralGrade/list',
      method: 'get',
    })
  },

  removeById(id) {
    return request({
      url: '/admin/core/integralGrade/remove/' + id,
      method: 'delete',
    })
  },

  save(integralGrade) {
    return request({
      url: '/admin/core/integralGrade/save',
      method: 'post',
      data: integralGrade,
    })
  },
}
