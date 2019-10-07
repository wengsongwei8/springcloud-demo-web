import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/common/utils/auth'
import { isRequestSuccess, getResponseContent } from '@/common/utils/common'
import { Message } from 'element-ui'

const user = {
  state: {
    curUserId: '',
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    pris: {},
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_CUR_USERID: (state, id) => {
      state.curUserId = id
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PRIS: (state, pris) => {
      state.pris = pris
    }

  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          if(isRequestSuccess(response)){
            const reponseData = getResponseContent(response)
            commit('SET_TOKEN', reponseData.token)
            setToken(reponseData.token)
            resolve()
          }else{
            Message({
              message: '登陆失败，请检查用户名或密码是否正确!',
              type: 'error',
              duration: 5 * 1000
            })
            reject('');
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if(isRequestSuccess(response)){
            let data = getResponseContent(response)
            commit('SET_CUR_USERID', data.id);
            if (data.pris) {
              commit('SET_PRIS', data.pris);
              commit('SET_ROLES', data.pris);
            } else {
              commit('SET_PRIS', {});
              commit('SET_ROLES', {});
            }

            commit('SET_NAME', data.userName)
            resolve(data)
          }else{
            reject('error')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.pris)
          commit('SET_NAME', data.userName)
          resolve()
        })
      })
    }
  }
}

export default user
