const BASE_SELECT = 'select'
const BASE_FROM = 'from'
const BASE_COMMA = ','
const BASE_ENTER = ' '
const BASE_POINT = '.'
const BASE_AS = 'as'

/**
 * 去掉字符串左边空格
 * @param txt
 * @returns {*} 处理后的字符串
 */
export function lTrim (txt) {
  return txt.replace(/(^\s*)/g, '')
}
// const BASE_WHERE = 'where'
// const BASE_AND = 'AND'
/**
 * 获取SQL 查询字段
 * @param sql SQL语句
 * @returns {Array} 字段数组
 */
export function getSqlQueryFields (sql) {
  let results = []
  let mySQL = sql.toLowerCase()
  if (mySQL.length > 0) {
    let insertIndex = mySQL.indexOf('insert')
    let dropIndex = mySQL.indexOf('drop')
    let updateIndex = mySQL.indexOf('update')
    let selectIndex = mySQL.indexOf('select')
    if (selectIndex !== -1 && (insertIndex === -1 ? true : selectIndex < insertIndex) &&
      (dropIndex === -1 ? true : selectIndex < dropIndex) &&
      (insertIndex === -1 ? true : selectIndex < insertIndex) &&
      (updateIndex === -1 ? true : selectIndex < updateIndex)
    ) {
      let startIndex, endIndex, pointIndex, asIndex
      endIndex = mySQL.indexOf(BASE_FROM)
      startIndex = mySQL.indexOf(BASE_SELECT) + BASE_SELECT.length
      let temp, j
      temp = mySQL.substring(startIndex, endIndex).split(BASE_COMMA)
      temp.forEach(e => {
        e = e.replace(/^\s+|\s+$/g, '')
        asIndex = e.indexOf(BASE_AS)
        // 判断有没有字段别名
        if (asIndex !== -1) {
          results.push(e.substring(asIndex + BASE_AS.length, e.length).trim())
        } else {
          // 判断有没有表别名
          pointIndex = e.indexOf(BASE_POINT)
          if (pointIndex !== -1) {
            e = e.substring(pointIndex + 1, e.length)
          }
          j = e.lastIndexOf(BASE_ENTER)
          if (j === -1) {
            // 防止逗号后面没有字段添加空字段进入数组
            if (e.length > 0) {
              results.push(e)
            }
          } else {
            if (j === e.length - 1) {
              results.push(e.trim())
            } else {
              results.push(e.substring(j, e.length))
            }
          }
        }
      })
    }
  }
  return results
}
/**
 * 取出字符串中带有@符号的参数
 * @param sql
 * @returns {Array}
 */
export function getParamsToSql (sql) {
  let params = new Set()
  for (let startIndex = sql.indexOf('@'); startIndex !== -1; startIndex = sql.indexOf('@')) {
    let emptyIndex = sql.substring(startIndex).indexOf(' ')
    if (emptyIndex === -1) {
      params.add(sql.substring(startIndex))
      sql = ''
    } else {
      params.add(sql.substring(startIndex, startIndex + emptyIndex))
      sql = lTrim(sql.substring(startIndex + emptyIndex))
    }
  }
  let result = []
  params.forEach(e => {
    result.push(e)
  })
  return result
}

/**
 * 获取Json数据中带@的参数
 * @param json
 * @returns {Array}
 */
export function getParamsToJson (json) {
  let params = new Set()
  let myJson = JSON.parse(json)
  for (let p in myJson) {
    if (myJson.hasOwnProperty(p)) {
      if (myJson[p].toString().indexOf('@') !== -1) {
        params.add(myJson[p])
      }
    }
  }
  let result = []
  params.forEach(e => {
    result.push(e)
  })
  return result
}
