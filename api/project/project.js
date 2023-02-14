import upload from '@/utils/upload'
import request from '@/utils/request'


// 查询项目列表
export function listProject(query) {
  return request({
    url: '/business/project/list',
    method: 'get',
    params: query
  })
}

// 查询项目详细
export function getProject(id) {
  return request({
    url: '/business/project/' + id,
    method: 'get'
  })
}

// 查询【请填写功能名称】列表
export function getDictDataList(dictType) {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get'
  })
}