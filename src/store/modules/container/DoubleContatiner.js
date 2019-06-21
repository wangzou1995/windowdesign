import Vue from 'vue'

export const doubleContainerMutations = {
  /**
   * 向容器中添加容器元素
   * @param state
   * @param obj
   */
  addContainer2cMutation (state, obj) {
    let layout = obj.container.tb_window_element
    let id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
    let index = obj.container.tb_window_element.length === 1 ? 0 : obj.index
    Vue.set(layout, index, {
      ...layout[index],
      tb_window_element: layout[index].tb_window_element.map(item => ({ ...item }))
    })
    if (layout[index].containertype === 'grid') {
      Vue.set(layout[index], 'tb_tool_element', layout[index].tb_tool_element.map(item => ({ ...item })))
    }
    layout[index].id = id
    layout[index].parentid = obj.container.id
    state.currentSelect = layout[index]
  }
}
export const doubleContainerActions = {
  addContainer2cAction (context, obj) {
    context.commit('addContainer2cMutation', obj)
  }
}
