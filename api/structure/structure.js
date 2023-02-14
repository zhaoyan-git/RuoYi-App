import upload from '@/utils/upload'
import request from '@/utils/request'


// 查询【请填写功能名称】列表
export function listStructure(query) {
  return request({
    url: '/business/structure/list',
    method: 'get',
    params: query
  })
}

export function getStructure(id) {
  return request({
    url: '/business/structure/' + id,
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
