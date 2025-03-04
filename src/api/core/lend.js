import request from '@/utils/request'

export default {
  getPageList(page, limit) {
    return request({
      url: `/admin/core/lend/list/${page}/${limit}`,
      method: 'get',
    })
  },

  detail(lendId) {
    return request({
      url: `/admin/core/lend/detail/${lendId}`,
      method: 'get',
    })
  },

  makeLoan(lendId) {
    return request({
      url: `/admin/core/lend/makeLoan/${lendId}`,
      method: 'get',
    })
  },
}
