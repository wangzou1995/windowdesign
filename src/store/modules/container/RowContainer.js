import Vue from 'vue'
import { getUploadFields } from '@/until/pushConfig'
export const rowContainerMutations = {
  /**
   * 移除行元素
   * @param state
   * @param obj
   */
  removeRowMutation (state, obj) {
    Vue.delete(obj.obj, obj.index)
    state.currentSelect = null
  },
  /**
   * 增加行元素单元格
   * @param state
   * @param obj
   */
  addColMutation (state, obj) {
    obj.row.push(
      {
        col: []
      }
    )
  },
  /**
   * 移除行元素中的元素
   * @param state
   * @param obj
   */
  removeColMutation (state, obj) {
    Vue.delete(obj.container.row, obj.columnid)
    resetROWX(obj.container, obj.columnid)
    state.currentSelect = obj.container
  },
  /**
   * 向行元素添加元素
   * @param state
   * @param obj
   */
  addRowElementMutation (state, obj) {
    let id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
    let element = obj.container
    element[0].id = id
    element[0].rowid = obj.rowid
    element[0].columnid = obj.colid
    Vue.set(element, 0, {
      ...element[0],
      tb_window_element_action: element[0].tb_window_element_action.map(item => ({ ...item })),
      tb_window_formatsearch: element[0].tb_window_formatsearch.map(item => ({ ...item })),
      tb_window_inputfields: element[0].tb_window_inputfields.map(item => ({ ...item })),
      tb_window_selectfields: element[0].tb_window_selectfields.map(item => ({ ...item }))
    })
    let elementType = element[0].type
    if (elementType === 'file') {
      element[0].tb_window_uploadfile.push(getUploadFields(id))
    }
    state.currentSelect = element[0]
  },
  /**
   * 移除单个单元格
   * @param state
   * @param obj
   */
  removeSingleColMutation (state, obj) {
    Vue.delete(obj.obj, obj.index)
    state.currentSelect = obj.obj[0]
  }
}
export const rowContainerActions = {
  /**
   * 移除行元素（异步）
   * @param context
   * @param obj
   */
  removeRowAction (context, obj) {
    context.commit('removeRowMutation', obj)
  },
  addColAction (context, obj) {
    context.commit('addColMutation', obj)
  },
  removeColAction (context, obj) {
    context.commit('removeColMutation', obj)
  },
  addRowElementAction (context, obj) {
    context.commit('addRowElementMutation', obj)
  },
  removeSingleColAction (context, obj) {
    context.commit('removeSingleColMutation', obj)
  }
}
/**
 * 重置坐标
 * @param container
 * @param colIndex
 */
export function resetROWX (container, colIndex) {
  container.row.forEach((col, index) => {
    if (index >= colIndex) {
      if (col.col.length > 0) {
        col.col[0].columnid -= 1
      }
    }
  })
}
