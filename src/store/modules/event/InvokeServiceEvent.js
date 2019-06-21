export const invokeServiceEventStates = {
  showInvokeServiceEvent: false,
  showUrlParams: false,
  showTitleParams: false,
  showHeaderParams: false,
  showInvokeServiceScript: false
}
export const invokeServiceEventMutations = {
  updateShowInvokeServiceMutation (state, isShow) {
    state.showInvokeServiceEvent = isShow
  },
  updateShowUrlParamsMutation (state, isShow) {
    state.showUrlParams = isShow
  },
  updateShowTitleParamsMutation (state, isShow) {
    state.showTitleParams = isShow
  },
  updateShowHeaderParamsMutation (state, isShow) {
    state.showHeaderParams = isShow
  },
  updateShowInvokeServiceScriptMutation (state, isShow) {
    state.showInvokeServiceScript = isShow
  },

  updateServiceMutation (state, array) {
    state.currentSelect.tb_window_element_action[state.eventIndex].tb_window_element_action_service = array
  }
}
export const invokeServiceActions = {
  updateShowInvokeServiceEventAction (context, isShow) {
    context.commit('updateShowInvokeServiceMutation', isShow)
  },
  updateShowUrlParamsAction (context, isShow) {
    context.commit('updateShowUrlParamsMutation', isShow)
  },
  updateServiceAction (context, array) {
    context.commit('updateServiceMutation', array)
  },
  updateShowTitleParamsAction (context, isShow) {
    context.commit('updateShowTitleParamsMutation', isShow)
  },
  updateShowHeaderParamsAction (context, isShow) {
    context.commit('updateShowHeaderParamsMutation', isShow)
  },
  updateShowInvokeServiceScriptAction (context, isShow) {
    context.commit('updateShowInvokeServiceScriptMutation', isShow)
  }
}
