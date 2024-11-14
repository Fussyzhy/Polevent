import { defineStore } from "pinia";
import { ref } from 'vue'

export const useUserStore = defineStore('biger - user',() => {
  const token = ref('')
  const setToken = (newtoken) => {
    token.value = newtoken
  }
  const removeToken = () => {
    token.value = ''
  }
  return {
    token,
    setToken,
    removeToken
  }
},
{
  persist: true // 持久化
}
)
