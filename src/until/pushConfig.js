/**
 * 获取输入型信息
 * @param elementId  元素id
 * @returns {{elementid: null, allowerrorvalue: null, linkfilter: null, createtime: null, popwindowid: null, linkwindowid: null, verifyformula: null, verifytype: null, filter: null, verifyinfo: null, emptytext: null, displayformat: null, id: null, popkeyfield: null, inputmask: null}[]}
 */
export function getInputFields (elementId) {
  // 定义输入型元素配置对象
  let key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
  return {
    elementid: elementId,
    allowerrorvalue: null,
    linkfilter: null,
    createtime: null,
    popwindowid: null,
    linkwindowid: null,
    verifyformula: null,
    verifytype: null,
    filter: null,
    verifyinfo: null,
    emptytext: null,
    displayformat: null,
    id: key,
    popkeyfield: null,
    inputmask: null,
    writebackflds: null,
    keyinputsql: null
  }
}

/**
 * 获取上传文件信息
 * @param elmentId
 * @returns {{elementid: *, savebeforeup: boolean, filetype: null, createtime: null, bindkey: null, uploadable: boolean, objname: null, width: null, objid: null, singlefile: boolean, id: string, ismobile: boolean, height: null}}
 */
export function getUploadFields (elmentId) {
  // 定义输入型元素配置对象
  let key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
  return {
    elementid: elmentId,
    savebeforeup: false,
    filetype: null,
    createtime: null,
    bindkey: null,
    uploadable: false,
    objname: null,
    width: null,
    objid: null,
    singlefile: true,
    id: key,
    ismobile: false,
    height: null
  }
}
export function getFormatFields (elmentId) {
  let key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
  return {
    elementid: elmentId,
    createtime: null,
    dsname: null,
    availableat: null,
    id: key,
    script: null
  }
}
const inputTypeArray = ['hide', 'file', 'column', 'button', 'picture', 'tag', 'actionColumn']

/**
 * 判断是否是输入型元素
 * @param type 元素类型
 * @returns {boolean} false true
 */
export function isInputElement (type) {
  return inputTypeArray.findIndex((value) => {
    return value === type
  }) === -1
}
