import request from '@/common/utils/request'
import { setPageParams } from '@/common/utils/common'

export  function fetchList(param) {
  param = setPageParams(param)
  return request({
    url: '/user-center/org/list',
    method: 'get',
    params: param
  })
}

export function createOrg(data) {
  return request({
    url: '/user-center/org/add',
    method: 'post',
    data
  })
}

export function updateOrg(data) {
  return request({
    url: '/user-center/org/update',
    method: 'post',
    data
  })
}
export function delOrg(data) {
  return request({
    url: '/user-center/org/delete',
    method: 'post',
    data
  })
}

export function getOrg(id) {
  return request({
    url: '/user-center/org/get?id='+id,
    method: 'get'
  })
}

export  function fetchTreeGridData(param) {
  param = setPageParams(param)
  return request({
    url: '/user-center/org/getTreeGridData',
    method: 'get',
    params: param
  })
}
