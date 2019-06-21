import Vue from 'vue'
import { getUploadFields } from '@/until/pushConfig'
export const baseElementMutations = {
  /**
   * 添加元素对象
   * @param state
   * @param paramObj
   */
  addElementMutation (state, paramObj) {
    let [element, type, container] = [[], paramObj.type, paramObj.container]
    switch (type) {
      case 'element':
        element = container.tb_window_element
        break
      case 'toolbar':
        if (paramObj.isGridTool) {
          element = container.tb_tool_element[0].tb_window_element
        } else {
          element = container.tb_window_element
        }
        break
      default:
        element = container.tb_window_element
        break
    }
    let id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
    let index = paramObj.index
    element[index].id = id
    if (type === 'row') {
      Vue.set(element, index, {
        ...element[index],
        row: element[index].row.map(item => ({ ...item }))
      })
      element[index].parentid = container.id
      // 默认添加一行
      element[index].row.push(
        {
          col: []
        }
      )
    } else {
      Vue.set(element, index, {
        ...element[index],
        tb_window_element_action: element[index].tb_window_element_action.map(item => ({ ...item })),
        tb_window_formatsearch: element[index].tb_window_formatsearch.map(item => ({ ...item })),
        tb_window_inputfields: element[index].tb_window_inputfields.map(item => ({ ...item })),
        tb_window_selectfields: element[index].tb_window_selectfields.map(item => ({ ...item }))
      })
      // 计算
      // 重置坐标
      // 创建唯一id
      let baseObj = {
        'elementid': -1,
        'allowerrorvalue': false,
        'displayfld': 'eduname',
        'createtime': null,
        'columns': 0,
        'editable': true,
        'createable': false,
        'datasource': null,
        'dsname': null,
        'id': 0,
        'valuefld': 'eduid',
        'dataType': 'static'
      }
      let datasource = {
        'type': 'json',
        'fields': 'eduid,eduname',
        'data': [{
          'eduid': null,
          'eduname': null
        }]
      }
      let elementType = element[index].type
      if (elementType === 'select' || elementType === 'multiple') {
        baseObj.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
        baseObj.elementid = id
        baseObj.datasource = datasource
        element[index].tb_window_selectfields.push(baseObj)
      }
      if (elementType === 'file') {
        element[index].tb_window_uploadfile.push(getUploadFields(id))
      }
      if (container.containertype === 'form' || container.containertype === 'searchform') {
        element.forEach((e, index) => {
          resetXY(e, index, element)
        })
      }
    }
    state.currentSelect = element[index]
  },
  /**
   * 移除元素对象
   * @param state
   * @param paramObj
   */
  removeElementMutation (state, paramObj) {
    Vue.delete(paramObj.container.tb_window_element, paramObj.index)
    state.currentSelect = null
  }
}
export const baseElementActions = {
  addElementAction (context, obj) {
    context.commit('addElementMutation', obj)
  },
  removeElementAction (context, obj) {
    context.commit('removeElementMutation', obj)
  }
}
/**
 * 重置坐标
 * @param e
 * @param index
 * @param elements
 */
export function resetXY (e, index, elements) {
  if (index === 0) {
    e.rowid = 1
    e.columnid = 1
  } else {
    e.rowid = elements[index - 1].columnid < 4 ? elements[index - 1].rowid : elements[index - 1].rowid + 1
    e.columnid = elements[index - 1].columnid < 4 ? elements[index - 1].columnid + 1 : 1
  }
}
