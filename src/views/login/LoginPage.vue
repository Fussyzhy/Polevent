<script setup>
  import { userRegisterService,userLoginService } from '@/api/user';
  import { useUserStore } from '@/stores';
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { User,Lock } from '@element-plus/icons-vue'
  const isRegister = ref(false)
  const form = ref()
  const rules = ref({
    username:[
      {required: true,pattern:/^[a-zA-Z0-9_]{5,10}$/,message:'请输入5到10位且只能由字母、数字和下划线组成',trigger:'blur'}
    ],
    password:[
      {required: true,pattern:/^\S{6,15}$/,message:'密码必须是6-15位的非空字符',trigger:'blur'}
    ],
    repassword: [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      {
        pattern: /^\S{6,15}$/,
        message: '密码必须是6-15的非空字符',
        trigger: 'blur'
      },
      {
        validator: (rule, value, callback) => {
          if (value !== formModel.value.password) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
  })
  const formModel = ref({
    username: '',
    password: '',
    repassword: ''
  })
  const changereg = () => {
    isRegister.value = !isRegister.value
    formModel.value = {
      username: '',
      password: '',
      repassword: ''
    }
  }

  const register = async () => {
    await form.value.validate()
    const res = await userRegisterService(formModel.value)
    console.log(res);
    ElMessage({
      message: '注册成功',
      type: 'success',
    })
    changereg()

  }

  const router = useRouter()
  const userstore = useUserStore()
  const login = async () => {
    await form.value.validate()
    const res = await userLoginService(formModel.value)
    console.log(res);
    userstore.setToken(res.data.token)
    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    router.push('/')
  }
</script>

<!-- <template>
  <el-row class="login">
    <el-col :span="12" class="bg">
      <div><img src="@/assets/logo2.png" alt=""></div>
    </el-col>
    <el-col :span="6" :offset="3"  class="login-form" v-if="isreg === 'login'">
      <el-form
      :rules="rules"
      :model="formModel"
      >
        <div style="width: 100%;">
          <h2>登录</h2>

          <el-form-item prop="username">
            <el-input style="width: 100%; height: 40px" class="login-input" placeholder="请输入用户名" :prefix-icon="Avatar"/>
          </el-form-item>

          <el-form-item prop="password">
            <el-input style="width: 100%; height: 40px" class="login-input" placeholder="请输入密码" :prefix-icon="Lock"/>
          </el-form-item>

          <div style="display: flex;  align-items: center; margin: 10px 0px 30px">

            <el-form-item>
              <el-checkbox v-model="checked1" label="记住我" size="large" />
            </el-form-item>

            <router-link to="" class="forget-pass">忘记密码?</router-link>
          </div>

          <el-form-item>
            <el-button type="primary" style="width: 100%;">登录</el-button>
          </el-form-item>

          <p class="reg-btn" @click="isreg = 'register'">注册 →</p>
        </div>
      </el-form>

    </el-col>

    <el-col :span="6" :offset="3"  class="login-form" v-if="isreg === 'register'">
      <el-form
      :rules="rules"
      :model="formModel"
      >
        <div style="width: 100%;">
          <h2>注册</h2>
          <el-input v-model="formModel.username" style="width: 100%; height: 40px;" class="login-input" placeholder="请输入用户名" :prefix-icon="Avatar"/>
          <el-input v-model="formModel.password" style="width: 100%; height: 40px" class="login-input" placeholder="请输入密码" :prefix-icon="Lock"/>
          <el-input v-model="formModel.repassword" style="width: 100%; height: 40px" class="login-input" placeholder="请再次输入密码" :prefix-icon="Lock"/>
          <el-button type="primary" style="width: 100%; margin: 20px 0px;">注册</el-button>
          <p class="reg-btn" @click="isreg = 'login'">← 返回</p>
        </div>
      </el-form>

    </el-col>

  </el-row>
</template>

<style lang="scss" scoped>
  .login {
    height: 100vh;
    background-color: #fff;
  }
  .bg {
    background:url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0px 20px 20px 0px;
  }

  .bg div {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
  }

  .login-form {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    background-color: yellow;
  }

  .login-form .login-input {
    margin: 10px 0px;
  }

  .forget-pass {
    font-size: 14px;
    text-decoration: none;
    margin-left: auto;
    color: #409eff;
  }

  .forget-pass:hover {
    color: #79bbff;
  }

  .reg-btn {
    font-size: 14px;
    color: #909399;
    cursor: pointer;
  }

  .reg-btn:hover {
    color: #b1b3b8;
  }

</style> -->

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="formModel" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space  @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="changereg">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form ref="form" size="large" autocomplete="off" v-else :rules="rules" :model="formModel">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="changereg">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
