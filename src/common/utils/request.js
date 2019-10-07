import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/common/utils/auth'
import { trimData,jsonToFormData } from '@/common/utils/common'
import {jsonType, defaultDataType} from './ajax.config'
import { MessageBox } from 'element-ui';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['x-access-token'] = getToken()
  }
  let method = config.method.toLowerCase();
  if(method==='post'){
    let data = config.data;
    if(data){
 //     data = trimData(data);
//      let formData = jsonToFormData(data);
      const contentType = config.contentType ? config.contentType : defaultDataType

      config.data = data;
      config.headers.post = {
        Accept: 'application/json',
        'Content-Type': contentType,
        ...config.headers.post,
      }
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response =>  {

    const res = response.data;
    if (res.code !== '0000') {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      // 8002:非法的token; Token 过期了;
      if (res.code === '8002') {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '登陆超时', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        })

      }
      return Promise.reject('error');
    } else {
      return response;
    }
  },

  error => {
    if (error && error.response && error.response.status === 403){
      // 没有操作权限的情况
      Message({
        message: '很抱歉，您没有该数据操作权限！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error);
    }
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
