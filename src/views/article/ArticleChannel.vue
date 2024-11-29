<script setup>
  import { artGetChannelService,artAddChannelService,artPutChannelService,artDelChannelService } from '@/api/article';
  import { Edit,Delete } from '@element-plus/icons-vue'
  import { ref } from 'vue'

  const channelList = ref([])
  const loading = ref(false)

  const getchnnel = async () => {
    loading.value = true
    const res = await artGetChannelService()
    channelList.value = res.data.data
    console.log(channelList.value);
    loading.value = false
  }
  getchnnel()

  const adddialog = ref(false)
  const form = ref({
    id:1,
    addname:'',
    addalias:''
  })

  const formRef = ref(null)
  const addart = async (cate_name,cate_alias) => {
    await formRef.value.validate()
    form.value.addname = ''
    form.value.addalias = ''
    adddialog.value = false
    const res = await artAddChannelService(cate_name,cate_alias)
    console.log(res);
    getchnnel()
    form.value.addname = ''
    form.value.addalias = ''
  }

  const rules = ref({
    addalias:[
      { required: true, message: '请输入分类名称', trigger: 'blur' },
      {
        pattern: /^\S{1,10}$/,
        message: '分类名必须是1-10位的非空字符',
        trigger: 'blur'
      }
    ],
    addname:[
      { required: true, message: '请输入分类别名', trigger: 'blur' },
      {
        pattern: /^[a-zA-Z0-9]{1,15}$/,
        message: '分类别名必须是1-15位的字母数字',
        trigger: 'blur'
      }
    ]
  })

  const editdialog = ref(false)
  const editart = async (id,cate_name,cate_alias) => {
    await formRef.value.validate()
    editdialog.value = false
    const res = await artPutChannelService(id,cate_name,cate_alias)
    console.log(res);
    getchnnel()
  }
  const handleedit = (row) => {
    editdialog.value = true
    form.value.id = row.id
    form.value.addname = row.cate_name
    form.value.addalias = row.cate_alias
  }
  const handleDel = async (row) => {
    await artDelChannelService(row.id)
    getchnnel()
  }
</script>

<template>

  <pageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="adddialog = true">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" stripe style="width: 100%;" max-height="690px" :cell-style="{ padding: '0px', height: '62px' }">
      <el-table-column type="index" label="序号" width="100"  size="2150"/>
      <el-table-column prop="cate_alias" label="分类名称" show-overflow-tooltip/>
      <el-table-column prop="cate_name" label="分类别名" show-overflow-tooltip/>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle plain @click="handleedit(row)"/>
          <el-button type="danger" :icon="Delete" circle plain @click="handleDel(row)"/>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>


  </pageContainer>

  <el-dialog v-model="adddialog" title="添加分类" width="500">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="addalias">
        <el-input v-model="form.addalias"/>
      </el-form-item>
      <el-form-item label="分类别名" prop="addname">
        <el-input  v-model="form.addname"/>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="adddialog = false">取消</el-button>
        <el-button type="primary" @click="addart(form.addname,form.addalias)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="editdialog" title="编辑分类" width="500">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="addalias">
        <el-input v-model="form.addalias"/>
      </el-form-item>
      <el-form-item label="分类别名" prop="addname">
        <el-input  v-model="form.addname"/>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editdialog = false">取消</el-button>
        <el-button type="primary" @click="editart(form.id,form.addname,form.addalias)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>

<style lang="scss" scoped>
  .el-table {
    padding: 20px 0px;
  }
</style>
