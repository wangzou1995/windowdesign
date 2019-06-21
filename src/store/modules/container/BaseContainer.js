import Vue from 'vue'
// export const baseContainerState = {
// }
/**
 * 通用容器修改state对象实体
 * @type {{removeContainerMutation(*, *=): void, addContainerMutation(*, *): void}}
 */
export const baseContainerMutations = {
  /**
   * 增加容器元素
   * @param state vuex数据对象
   * @param paramObj 参数对象
   */
  addContainerMutation (state, paramObj) {
    let layout = state.myWindow.tb_window_layout
    let id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
    let index = paramObj.index
    Vue.set(layout, index, {
      ...layout[index],
      tb_window_element: layout[index].tb_window_element.map(item => ({ ...item }))
    })
    if (layout[index].containertype === 'grid') {
      Vue.set(layout[index], 'tb_tool_element', layout[index].tb_tool_element.map(item => ({ ...item })))
    }
    if (layout[index].containertype !== 'row') {
      Vue.set(layout[index], 'filter', layout[index].filter.map(item => ({ ...item })))
    }
    layout[index].id = id
    state.currentSelect = layout[index]
  },
  /**
   * 删除容器
   * @param state state对象
   * @param index 下标
   */
  removeContainerMutation (state, index) {
    Vue.delete(state.myWindow.tb_window_layout, index)
    state.currentSelect = null
  }
}
/**
 * 通用容器异步调用实体
 * @type {{addContainerAction: baseContainerActions.addContainerAction, removeContainerAction: baseContainerActions.removeContainerAction}}
 */
export const baseContainerActions = {
  addContainerAction: (context, obj) => {
    context.commit('addContainerMutation', obj)
  },
  removeContainerAction: (context, index) => {
    context.commit('removeContainerMutation', index)
  }
}
