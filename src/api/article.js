import request from '@/untils/request'

// 获取频道列表
export const artGetChannelService = () => {
  return request.get('/my/cate/list')
}

// 添加频道列表
export const artAddChannelService = (cate_name,cate_alias) => {
  return request.post('/my/cate/add',{cate_name,cate_alias})
}

// 更新频道列表
export const artPutChannelService = (id,cate_name,cate_alias) => {
  return request.put('/my/cate/info',{id,cate_name,cate_alias})
}

// 删除频道列表
export const artDelChannelService = (id) => {
  return request.delete('/my/cate/del',{
    params: { id }
  })
}

// 获取文章列表
export const artGetlistService = (pagenum,cate_id,state) => {
  return request.get('/my/article/list',{
    params:{
      pagenum,
      pagesize:10,
      cate_id,
      state
    }
  })
}

// 发表文章
export const artPublishService = (title,cate_id,content,cover_img,state) => {
  return request.post('/my/article/add', {
    title,
    cate_id,
    content,
    cover_img,
    state
  })
}
