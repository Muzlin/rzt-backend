/**
* @Author: muzlin
* @Date:   2018-08-20 15:41:40
*/
'use strict'
export default function customEvalArray(data) {
  Array.from(data).forEach(function(record) {
    // 如果菜单没有路由地址 则不允许选中
    if (!record.url) {
      record.disabled = true
    }
    if (record.children && record.children.length > 0) {
      customEvalArray(record.children)
    }
  })
  return data
}
