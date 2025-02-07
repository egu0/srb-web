import request from '@/utils/request'

export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/core/userInfo/list/${page}/${limit}`,
      method: 'get',
      // get 請求查詢參數通過 params 屬性傳遞；post 請求體通過 data 屬性傳遞
      params: searchObj,
    })
  },
}
