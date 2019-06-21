export const addPopWindowEventStates = {
  showPopWindow: false,
  popWindows: [],
  popWindowIndex: -1
}
export const addPopWindowEventMutations = {
  updateShowPopWindowMutation (state, isShow) {
    state.showPopWindow = isShow
  },
  updatePopWindowsMutation (state, array) {
    state.popWindows = array
  },
  updatePopWindowIndexMutation (state, obj) {
    if (state.popWindows.length < (obj.index + 1)) {
      obj.pop[obj.index].actionid = state.currentSelect.tb_window_element_action[state.eventIndex].id
      state.popWindows = obj.pop
    }
    state.popWindowIndex = obj.index
  },
  submitPopWindowMutation (state) {
    state.currentSelect.tb_window_element_action[state.eventIndex].tb_window_element_action_popwin =
      JSON.parse(JSON.stringify(state.popWindows))
    state.popWindows = []
    state.showPopWindow = false
  }
}
export const addPopWindowEventActions = {
  updateAddWindowEventAction (context, isShow) {
    context.commit('updateShowPopWindowMutation', isShow)
  },
  updatePopWindowsAction (context, array) {
    context.commit('updatePopWindowsMutation', array)
  },
  updatePopWindowIndexAction (context, obj) {
    context.commit('updatePopWindowIndexMutation', obj)
  },
  submitPopWindowAction (context) {
    context.commit('submitPopWindowMutation')
  }
}
export const addPopWindowEventGetters = {
  popWindowGetter (state) {
    if (state.popWindows.length > 0) {
      return state.popWindows[state.popWindowIndex]
    } else {
      return ''
    }
  }
}
