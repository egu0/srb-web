import request from '@/utils/request.js'

export default {
  list() {
    return request({
      url: '/admin/core/integralGrade/list',
      method: 'get',
    })
  },
}
