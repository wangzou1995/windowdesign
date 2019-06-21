import Vue from 'vue'
import XRegExp from 'xregexp'
/**
 * 向数组中添加参数
 * @param array 数组
 * @param params 参数数组
 */
export function addParams (array, params) {
  params.forEach(e => {
    if (array.findIndex(s => {
      return s.name === e
    }) === -1) {
      array.push(
        {
          name: e,
          type: '',
          subject: '',
          value: ''
        }
      )
    }
  })
  // 删除
  array.forEach((e, index) => {
    if (params.findIndex(s => {
      return s === e.name
    }) === -1) {
      Vue.delete(array, index)
    }
  })
}

/**
 * 标题参数解析
 * @param title 标题
 * @returns {Array} 参数数组
 */
export function titleAnalyticToParams (title) {
  let paramSet = new Set()
  XRegExp.forEach(title, /@[0-9a-zA-Z]+/, (match) => {
    paramSet.add(match[0])
  })
  let result = []
  paramSet.forEach(e => {
    result.push(e)
  })
  return result
}
/**
 * 获取Json数据中带@的参数
 * @param json
 * @returns {Array}
 */
export function getJsonParams (json) {
  let result = []
  if (json.length > 0) {
    let params = new Set()
    let myJson = JSON.parse(json)
    for (let p in myJson) {
      if (myJson.hasOwnProperty(p)) {
        if (myJson[p].toString().indexOf('@') !== -1) {
          params.add(myJson[p])
        }
      }
    }
    params.forEach(e => {
      result.push(e)
    })
  }
  return result
}
