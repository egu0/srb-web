import request from '@/utils/request'

export default {
  getPageList(page, limit, keyword) {
    return request({
      url: `/admin/core/borrower/list/${page}/${limit}`,
      method: 'get',
      params: { keyword },
    })
  },

  detail(borrower_id) {
    return request({
      url: `/admin/core/borrower/detail/${borrower_id}`,
      method: 'get',
    })
  },
}
