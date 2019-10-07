const Validator = {
  /*手机号字符串校验，返回true/false*/
  isPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
  },
  /*获取elem手机规则校验器*/
  getPhoneValidator(){
    var validPhone=(rule, value,callback)=>{
      if (!value){
        callback(new Error('请输入手机号码'))
      }else  if (!Validator.isPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
        callback()
      }
    }
    return validPhone
  }
}

// 对Validator的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$valid", { value: Validator });
  }
};
