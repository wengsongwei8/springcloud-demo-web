/*
 * 自定义全局权限控制指令
 */
import Vue from 'vue'
import checkPermission from '../CheckPermission'

const permission = Vue.directive('permission',{
  inserted(el, binding, vnode) {
    const { value } = binding
    if (value && value.length > 0) {
      if (!checkPermission(value)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      // throw new Error(`need pris! Like v-permission="[admin]"`)
    }
  }
})

export default permission;
