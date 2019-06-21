import Vue from 'vue'
export const tabContainerMutations = {
  /**
   *添加Tab容器
   * @param state
   * @param obj
   */
  addTabContainerMutation (state, obj) {
    let container = obj.container
    let id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
    let length = container.tb_window_element.length
    container.tb_window_element.push(
      {
        name: (obj.action === 'tab' ? 'Tab' : '步骤') + (length ? length + 1 : 1).toString(),
        type: obj.type,
        icon: 'iconfont iconbiaodan',
        containername: (obj.action === 'tab' ? 'Tab' : 'step') + (length ? length + 1 : 1).toString(),
        tb_window_element: [],
        parentid: container.id,
        windowid: null,
        readonly: false,
        containerdesc: (obj.action === 'tab' ? 'Tab' : '步骤') + (length ? length + 1 : 1).toString(),
        showpage: false,
        loaddata: false,
        checkbox: false,
        pagesize: null,
        datasubmitrange: null,
        id: id,
        createtime: null,
        autosave: false,
        orderid: null,
        gridfilter: false,
        leaf: null,
        containertype: obj.type,
        forcefit: false,
        levelid: null,
        filtersql: null,
        filter: []
      }
    )
    if (obj.type === 'grid') {
      Vue.set(container.tb_window_element[container.tb_window_element.length - 1], 'tb_tool_element', [])
      Vue.set(container.tb_window_element[container.tb_window_element.length - 1], 'isShowTool', false)
      Vue.set(container.tb_window_element[container.tb_window_element.length - 1], 'toolPosition', '')
    }
    state.currentSelect = container.tb_window_element[length]
  },
  /**
   *移除Tab容器
   * @param state
   * @param obj
   */
  removeTabContainerMutation (state, obj) {
    Vue.delete(obj.container.tb_window_element, obj.index)
    state.currentSelect = obj.container.tb_window_element.length === 0 ? obj.container : obj.container.tb_window_element[obj.container.tb_window_element.length - 1]
  }
}

export const tabContainerActions = {
  addTabContainerAction (context, obj) {
    context.commit('addTabContainerMutation', obj)
  },
  removeTabContainerAction (context, obj) {
    context.commit('removeTabContainerMutation', obj)
  }
}
