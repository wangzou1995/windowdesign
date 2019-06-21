import axios from 'axios' // 注意先安装哦
import config from './config.js' // 倒入默认配置

// 初始化配置
for (let param in config) {
  if (axios.defaults.hasOwnProperty(param)) {
    axios.defaults[param] = config[param]
  }
}

/**
 * GET请求
 * @param url 地址
 * @param params 参数
 * @returns {Promise<any>}
 */
export function fetch (url, params = {}) {
  return new Promise(
    (resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(
        response => {
          resolve(response.data)
        }
      ).catch(
        err => {
          reject(err)
        }
      )
    })
}

/**
 * POST参数
 * @param url 地址
 * @param data 数据
 * @returns {Promise<any>}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
