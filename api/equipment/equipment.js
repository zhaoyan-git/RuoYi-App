import upload from '@/utils/upload'
import request from '@/utils/request'



export function listEquipment(query) {
  return request({
    url: '/business/equipment/list',
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

// 查询设备详细
export function getEquipment(id) {
  return request({
    url: '/business/equipment/' + id,
    method: 'get'
  })
}