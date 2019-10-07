
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = true;
      // const hasPermission = roles.some(role => {
        // return permissionRoles.includes(role)
        // return true;
      // })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need pris! Like v-permission="['home','userM']"`)
    }
  }
}
