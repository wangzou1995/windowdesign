
/**
 * 检查名称是否是数字或字母组成
 * @param name 字符串
 * @returns {boolean} true , false
 * @constructor wang
 */
export function checkName (rule, value, callback) {
  let reg = /^\w{3,20}$/
  if (value === undefined || value === '' || value === null) {
    return callback(new Error('名称不能为空'))
  } else {
    if (!reg.test(value)) {
      return callback(new Error('名称只能数字、字母或下划线组成，长度不超过20'))
    } else {
      callback()
    }
  }
}
export function isNumber (rule, value, callback) {
  let reg = /^[0-9]+$/
  if (value === undefined || value === '' || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      return callback(new Error('请填写数字'))
    } else {
      callback()
    }
  }
}
