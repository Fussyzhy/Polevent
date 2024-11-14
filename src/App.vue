<script setup>
  import { useUserStore } from './stores';
  const UserStore = useUserStore()

</script>

<template>
  <div>
   {{ UserStore.token }}
   <button @click="UserStore.setToken('asdadasdads')">登录</button>
   <button @click="UserStore.removeToken()">退出登录</button>
  </div>
</template>

<style scoped>

</style>
