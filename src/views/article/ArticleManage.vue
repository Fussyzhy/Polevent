<script setup>
  import { artGetlistService,artGetChannelService,artPublishService} from '@/api/article'
  import { Delete,Edit,Plus } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import { dayjs } from 'element-plus'

  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')
  const loading = ref(false)
  const articleList = ref([])
  const params = ref({
    pagenum:1,
    total:0,
    search:{
      cate_id:null,
      state:null
    }
  })

  const getArtList = async ({page,cate_id,state}) => {
    loading.value = true
    const res = await artGetlistService(page,cate_id,state)
    console.log(res);
    articleList.value = res.data.data
    params.value.total = res.data.total
    loading.value = false
  }
  getArtList({page:1})

  const channelList = ref([])
  const getchnnel = async () => {
    const res = await artGetChannelService()
    channelList.value = res.data.data
    console.log(channelList.value);
  }
  getchnnel()

  const onCurrentChange = (page) => {
    params.value.pagenum = page
    getArtList({page:page})
  }

  const onSearch = () => {
    getArtList({page:params.value.pagenum,cate_id:params.value.search.cate_id,state:params.value.search.state})
  }

  const onReset = () => {
    getArtList({page:1})
    params.value.search.cate_id = null
    params.value.search.state = null
  }

  const pushart = ref(false)
  const addInfo = ref({
    title:'',
    channel:'',
    pic:'',
    content:''
  })
  const uploadFile = (uploadFile) => {
    addInfo.value.pic = URL.createObjectURL(uploadFile.raw)
  }

  const onSubmit = async () => {
    await artPublishService(addInfo.value.title,
    addInfo.value.channel,
    addInfo.value.content,
    addInfo.value.pic,
    '已发布')
    pushart.value = false
    addInfo.value = {
      title:'',
      channel:'',
      pic:'',
      content:''
    }
  }

</script>

<template>
  <pageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="pushart = true">发布文章</el-button>
    </template>

    <!-- 搜索表单 -->
    <el-form label-width="auto" class="top-form">
      <el-form-item label="文章分类：">
        <el-select placeholder="请选择"  v-model="params.search.cate_id">
          <el-option :label="item.cate_alias" :value="item.id" v-for="(item,index) in channelList" :key="index" @click="params.search.cate_id = item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select placeholder="请选择" v-model="params.search.state">
          <el-option label="已发布" value="已发布"/>
          <el-option label="草稿" value="草稿"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 中间表格 -->
    <el-table v-loading="loading" :data="articleList" stripe style="width: 100%;" max-height="660px" :cell-style="{ padding: '0px', height: '77px' }">
      <el-table-column prop="title" label="文章标题"/>
      <el-table-column prop="cate_name" label="分类" show-overflow-tooltip/>
      <el-table-column prop="pub_date" label="发表时间" show-overflow-tooltip>
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" show-overflow-tooltip/>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle plain/>
          <el-button type="danger" :icon="Delete" circle plain/>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 底部页码 -->

    <el-pagination
      v-model:current-page="params.pagenum"
      :page-size="10"
      :background="true"
      layout="prev, pager, next"
      :total="params.total"
      @current-change="onCurrentChange"
    />
  </pageContainer>

  <!-- 发布文章 -->
  <el-drawer
    v-model="pushart"
    title="添加文章"
  >
    <el-form :model="addInfo" label-width="auto" style="max-width: 600px">
      <el-form-item label="文章标题">
        <el-input placeholder="请输入标题" v-model="addInfo.title"/>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select placeholder="请输入分类" v-model="addInfo.channel">
          <el-option :label="item.cate_alias" :value="item.id" v-for="(item,index) in channelList" :key="index" @click="addInfo.channel = item.id"/>
        </el-select>
      </el-form-item>

      <!-- 需要关闭自动上传-->
      <el-form-item label="文章封面">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="uploadFile"
        >
          <img v-if="addInfo.pic" :src="addInfo.pic" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章内容">
        <div class="editor">
          <quill-editor
            theme="snow"
            v-model:content="addInfo.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>

      <el-form-item  label=" ">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
          <el-button type="info" size="10">草稿</el-button>
        </el-form-item>
      </el-form-item>


    </el-form>
  </el-drawer>

</template>

<style lang="scss" scoped>

  .top-form {
    display: flex;
  }

  .foot-form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .top-form .el-select {
    width: 200px;
    margin: 0px 20px 0px 0px;
  }

  .el-pagination {
    margin: 30px 0px 0px;
    width: auto;
    justify-content:center;
  }

  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .editor {
    width: 100%;
    :deep(.ql-editor) {
      min-height: 500px;
    }
  }

</style>
