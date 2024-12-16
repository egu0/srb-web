import request from '@/utils/request'

export function getList(params) {
  return request({
    baseURL: 'http://localhost:9528/dev-api',
    url: '/vue-admin-template/table/list',
    method: 'get',
    params,
  })
}
