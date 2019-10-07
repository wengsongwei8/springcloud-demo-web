<template>
  <div class="head-menu">
      <div class="head-menu-body" style="margin-left:auto; margin-right:auto;">
        <span class="system-title" style="width: 20%;">
          框架示例
        </span>

        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <div class="right-menu">


          <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper" style="color:#fff">
              <img class="user-avatar" :src="userHeadImg">
              <span>{{userName}}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/">
                <el-dropdown-item>
                  {{$t('navbar.dashboard')}}
                </el-dropdown-item>
              </router-link>

              <el-dropdown-item divided>
                <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import userHeadImg from '@/assets/user/head.jpg'

export default {
  data() {
    return {
      userHeadImg
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LangSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ]),
    userName() {
      return this.$store.getters.name
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $headMenuHeight:50px; // 顶部菜单栏的高度

.head-menu {
  height: $headMenuHeight;
  background-color: #459df5;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 30px;
      vertical-align: middle;
      margin-top: 10px;

    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: $headMenuHeight;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 25px;
          height: 25px;
          border-radius: 10px;
          vertical-align: middle;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

  .head-menu-body>div>span{
    width:8%;
    text-align:center;
    display:inline-block;
    font-weight:bold;
    color:#FFF;
    font-size:16px;
    vertical-align:top;
  }
  .head-menu-body>div>span:hover{
    background:rgba(100,100,100,0.2);
  }
  .head-menu-title{
    font-size:16px;
    line-height:$headMenuHeight;
    margin-top:0;
    cursor:pointer;
  }
  .head-menu-img{
    height: 16px;
    top: 3px;
    position: relative;
  }
  .head-menu {
    height: $headMenuHeight;
    background-color: rgb(65, 144, 226);
  }
  .head-menu .system-title {
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    line-height: $headMenuHeight;
    text-align: left;
    padding-left: 5px;
  }
</style>
