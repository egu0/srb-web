import request from '@/utils/request.js'

export default {
  listByParentId(parentId) {
    return request({
      url: `/admin/core/dict/listByParentId/${parentId}`,
      method: 'get',
    })
  },
}
