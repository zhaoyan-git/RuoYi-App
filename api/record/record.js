import upload from '@/utils/upload'
import request from '@/utils/request'


export function listRecord(query) {
  return request({
    url: '/cmp/record/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】列表
export function getDictDataList(dictType) {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get'
  })
}

export function getRecord(id) {
  return request({
    url: '/cmp/record/' + id,
    method: 'get'
  })
}
