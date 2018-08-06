/**
* @Author: jianglei
* @Date:   2017-10-12 12:06:49
*/
'use strict'
import Vue from 'vue'
export default function treeToArray(data, parent = null) {
  const tmp = []
  Array.from(data).forEach(function(record) {
    if (record.label === undefined) {
      Vue.set(record, 'label', record.name)
    }
    if (record.children === undefined) {
      Vue.set(record, 'children', record.subMenus)
    }
    // 如果有父元素
    // if (parent) {
    //   Vue.set(record, 'parent', parent)
    // }
    tmp.push(record)
    if (record.subMenus && record.subMenus.length > 0) {
      treeToArray(record.subMenus)
    }
  })
  return tmp
}
