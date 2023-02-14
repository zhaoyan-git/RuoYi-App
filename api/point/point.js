import upload from '@/utils/upload'
import request from '@/utils/request'



export function listPoint(query) {
  return request({
    url: '/cmp/point/list',
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

// 查询测点详细
export function getPoint(id) {
  return request({
    url: '/cmp/point/' + id,
    method: 'get'
  })
}