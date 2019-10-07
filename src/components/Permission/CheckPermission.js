import store from '@/store'

/**
 * 检查是否拥有权限
 * @param value 传递过来的权限编码
 * @returns true表示拥有权限，false表示没有拥有权限
 */
export default function checkPermission(value) {
  if (value && value.length > 0) {
    const pris = store.getters && store.getters.pris
    if (pris[value] === undefined) {
      return false;
    }
    return true;
  } else {
    return true;
  }
}

