import request from '@/utils/request'

export default {
  getPageList(page, limit) {
    return request({
      url: `/admin/core/borrowInfo/list/${page}/${limit}`,
      method: 'get',
    })
  },
}
