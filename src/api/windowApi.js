import { post } from './api'
const baseUrl = '/jsonreq.do'

/**
 * 获取应用
 */
export function getOwnerApps () {
  return post(baseUrl, { code: 'getOwnerApps' })
}

/**
 * 获取数据源
 * @param proid 应用id
 */
export function getProdDatasource (prodid) {
  return post(baseUrl, { code: 'getProdDatasource', prodid: prodid })
}

/**
 * 获取应用对象
 * @param proid 应用id
 */
export function getProdObjects (prodid) {
  return post(baseUrl, { code: 'getProdObjects', prodid: prodid })
}

/**
 * 创建窗口
 * @param windowObj
 */
export function createWindow (windowObj) {
  return post('jsonreq.action?code=commit&request_prodid=1&objname=owindow&request_windowid=1', windowObj)
}

/**
 * 通过窗口id获取窗口信息
 * @param windowid
 * @returns {Promise<any>}
 */
export function getWinById (windowid) {
  return post(baseUrl, { code: 'getWinById', windowid: windowid })
}
