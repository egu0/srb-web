import request from '@/utils/request'

export default {
  getPageList(page, limit) {
    return request({
      url: `/admin/core/lend/list/${page}/${limit}`,
      method: 'get',
    })
  },
}
