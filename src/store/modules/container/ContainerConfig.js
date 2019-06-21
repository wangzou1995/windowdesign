export const containerConfigStates = {
  containerFilterView: false
}
export const containerConfigMutations = {
  /**
   * 更新容器过滤条件
   * @param state
   * @param array
   */
  updateContainerFilterMutation (state, array) {
    switch (state.filterType) {
      case 'containerFilter':
        if (array.length === 1 && array[0].name === '') {
          state.currentSelect.filter = []
        } else {
          state.currentSelect.filter = array
        }
        break
      case 'popWindowFilter':
        if (array.length === 1 && array[0].name === '') {
          state.filterArray = []
        } else {
          state.filterArray = array
        }
        break
      case 'addPopWindowEvent':
        if (array.length === 1 && array[0].name === '') {
          state.popWindows[state.popWindowIndex].filter = []
        } else {
          state.popWindows[state.popWindowIndex].filter = array
        }
        break
      case 'windowFilter':
        if (array.length === 1 && array[0].name === '') {
          state.myWindow.filter = []
        } else {
          state.myWindow.filter = array
        }
        break
      default:
        break
    }
    state.containerFilterView = false
  },
  /**
   * 更新容器过滤显示
   * @param state
   * @param isView
   */
  updateContainerFilterViewMutation (state, isView) {
    switch (state.filterType) {
      case 'containerFilter':
        if (state.currentSelect.filter.length === 0) {
          state.currentSelect.filter.push(
            {
              name: '',
              type: '',
              subject: '',
              value: ''
            }
          )
        }
        break
      case 'popWindowFilter':
        if (!(state.filterArray.length > 0)) {
          state.filterArray = [{
            name: '',
            type: '',
            subject: '',
            value: ''
          }]
        }
        break
      case 'addPopWindowEvent':
        if (state.popWindows[state.popWindowIndex].filter.length === 0) {
          state.popWindows[state.popWindowIndex].filter = [{
            name: '',
            type: '',
            subject: '',
            value: ''
          }]
        }
        break
      case 'windowFilter':
        if (state.myWindow.filter.length === 0) {
          state.myWindow.filter = [{
            name: '',
            type: '',
            subject: '',
            value: ''
          }]
        }
        break
    }
    state.containerFilterView = isView
  }
}
export const containerConfigActions = {
  updateContainerFilterAction (context, array) {
    context.commit('updateContainerFilterMutation', array)
  },
  updateContainerFilterViewAction (context, isView) {
    context.commit('updateContainerFilterViewMutation', isView)
  }
}
