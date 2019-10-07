import request from '@/common/utils/request'
import { setPageParams } from '@/common/utils/common'

export  function fetchList(param) {
  param = setPageParams(param)
  return request({
    url: '/user-center/user/list',
    method: 'get',
    params: param
  })
}

export function createUser(data) {
  return request({
    url: '/user-center/user/add',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user-center/user/update',
    method: 'post',
    data
  })
}
export function delUser(data) {
  return request({
    url: '/user-center/user/delete',
    method: 'post',
    data
  })
}

export function getUserById(id) {
  return request({
    url: '/user-center/user/get?id='+id,
    method: 'get'
  })
}
