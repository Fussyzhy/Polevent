import request from '@/untils/request'

// 注册接口调用
export const userRegisterService = ({username,password,repassword}) => {
  return request.post('/api/reg',{username,password,repassword})
}

// 登录接口调用
export const userLoginService = ({username,password}) => {
  return request.post('/api/login',{username,password})
}

// 获取用户基本信息
export const getUserInfoService = () => {
  return request.get('/my/userinfo')
}
