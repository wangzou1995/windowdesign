import { element, containerSide } from '@/until/global'

export { isInElement, isInContainer }

/**
 * 判断是否在数组中
 * @param type 元素类型
 * @returns {boolean} true,false
 */
function isInElement (type) {
  // 这里不能使用forEach
  // elementComponents.forEach(e => {
  //   if (e.type === type) {
  //     console.log(true)
  //     return true
  //   }
  // })
  for (let i = 0, max = element.length; i < max; i++) {
    if (element[i].type === type) {
      return true
    }
  }
  return false
}

function isInContainer (type) {
  for (let i = 0, max = containerSide.length; i < max; i++) {
    if (containerSide[i].type === type) {
      return true
    }
  }
  return false
}

export function isInErrorArray (errorArray, id) {
  if (errorArray.length > 0) {
    for (let i = 0, max = errorArray.length; i < max; i++) {
      if (errorArray[i].id === id) {
        return i
      }
    }
  }
  return -1
}
export function selectById (window, id) {
  for (let e in window) {
    if (Array.isArray(window[e]) || window[e] instanceof Object) {
      selectById(window[e], id)
    } else {
      if (e === 'id') {
        if (window[e] === id) {
          return window
        }
      }
    }
  }
}

/**
 * @return {string}
 */
export function ArrayToStr (array) {
  if (array && array.length === 0) {
    return ''
  } else {
    let fieldsStr = ''
    array.forEach(e => {
      fieldsStr = fieldsStr + e + ','
    })
    if (fieldsStr.length > 0) {
      fieldsStr = fieldsStr.substr(0, fieldsStr.length - 1)
    }
    return fieldsStr
  }
}
