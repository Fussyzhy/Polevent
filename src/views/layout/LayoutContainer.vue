<script setup>
  import { Reading,Management,UserFilled,Crop,EditPen,Message,CaretBottom,SwitchButton } from '@element-plus/icons-vue'
  import avatar from '@/assets/default.png'
  import { getUserInfoService } from '@/api/user'
  import { onMounted,ref,nextTick } from 'vue'
  import { useUserStore } from '@/stores/modules/user'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const userdata = ref({})

  onMounted(async () => {
    const res = await getUserInfoService()
    userdata.value = res.data.data
  })

  const userstore = useUserStore()
  const handleCommand = (command) => {
    if(command === 'logout') {
      ElMessageBox.confirm('确定退出登录吗?','温馨提示',{
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
      .then(() => {
        userstore.removeToken()
        router.push('/login')
        ElMessage({
          message: '退出成功',
          type: 'success',
        })
        done()

      })
      .catch(() => {
        // catch error
      })
    } else {
      router.push(`/user/${command}`)
    }
  }

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">

        <div class="mb-2">
          <img src="@/assets/logo.png" alt="">
        </div>

        <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color="#232323"
        :open-keys="['1']"
        router
        >

          <el-menu-item index="/article/channel" to="">
            <el-icon><Reading /></el-icon>
            <span>文章分类</span>
          </el-menu-item>

          <el-menu-item index="/article/manage">
            <el-icon><Management /></el-icon>
            <span>文章管理</span>
          </el-menu-item>

          <el-sub-menu index="1">

            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>

            <el-menu-item index="/user/profile">
              <el-icon><Message /></el-icon>
              基本资料
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon><Crop /></el-icon>
              更换头像
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon><EditPen /></el-icon>
              重置密码
            </el-menu-item>

          </el-sub-menu>


        </el-menu>

      </el-aside>
      <el-container>
        <el-header>
          欢迎Polevent用户，<span style="font-weight: bolder; color: #d35230;">{{ userdata.nickname || userdata.username }}</span>
          <el-dropdown  @command="handleCommand">
            <span class="el-dropdown-link">

              <div class="drop-box">
                <el-image style="width: 40px; height: 40px" :src="userdata.user_pci || avatar"/>
                <el-icon><CaretBottom /></el-icon>
              </div>

            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile"><el-icon><Message /></el-icon>基本资料</el-dropdown-item>
                <el-dropdown-item command="avatar"><el-icon><Crop /></el-icon>更换头像</el-dropdown-item>
                <el-dropdown-item command="password"><el-icon><EditPen /></el-icon>重置密码</el-dropdown-item>
                <el-dropdown-item command="logout"><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item>

              </el-dropdown-menu>
            </template>
          </el-dropdown>


        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Polevent ©2024 Created by zhanghaoyang</el-footer>
      </el-container>
    </el-container>
  </div>

</template>

<style lang="scss" scoped>

  .el-aside {
    background-color: #232323;
    height: 100vh;
  }

  .el-container {
    background-color: #f5f5f5;
  }

  .mb-2 {
    text-align: center;
  }

  .mb-2 img{
    margin: 40px 0px;
    height:50px;
  }

  .el-header {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
  }

  .el-menu {
    // width: 10vh;
    border:0!important;
  }

  .el-dropdown {
    // align-items: center;
    height:40px;
    margin-left: auto;
  }

  .el-dropdown .el-image {
    border-radius: 100px;
  }

  .drop-box {
    display: flex;
    align-items: center;

  }
  .drop-box .el-image {
    margin: 0px 10px 0px 0px;
  }

  .el-tooltip__trigger:focus {
    outline: none;
  }
  //去除黑框

  .el-footer {
    color: #666666;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
