import request from '@/common/utils/request'

export function loginByUsername(username, password) {
  const data = {
    userName: username,
    password
  }
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/auth/cur-user-info',
    method: 'post'
  })
}

