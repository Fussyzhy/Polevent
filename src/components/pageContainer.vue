<script setup>

  defineProps({
    title:{
      require:true,
      type:String
    }
  })

</script>

<template>

  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <div>
          <slot name="extra"></slot>
        </div>
      </div>
    </template>

    <slot>
      <!-- 这里是内容插槽 -->
    </slot>
  </el-card>

</template>

<style scoped>
  .card-header {
    display: flex;
    align-items: center;

    div {
      margin-left: auto;
    }
  }

  .el-card {
     width: auto;
     min-height: 99%;
  }


</style>
