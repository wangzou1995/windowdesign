export const basePopWindowEventStates = {
  showBasePopWindow: false
}
export const basePopWindowEventMutations = {
  updateShowBaseWindowMutation (state, isShow) {
    state.showBasePopWindow = isShow
  },
  updateBasePopWindowObjMutation (state, obj) {
    state.currentSelect.tb_window_element_action[state.eventIndex].tb_window_element_action_popwin[0] =
      JSON.parse(JSON.stringify(obj))
  }
}
export const basePopWindowEventActions = {
  updateShowBaseWindowAction (context, isShow) {
    context.commit('updateShowBaseWindowMutation', isShow)
  },
  updateBasePopWindowObjAction (context, obj) {
    context.commit('updateBasePopWindowObjMutation', obj)
  }
}
