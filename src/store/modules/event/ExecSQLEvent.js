export const execSQLEventStates = {
  showSqlEvent: false,
  showSqlArrayEdit: false
}
export const execSQLEventMutations = {
  updateShowSqlEventMutation (state, isShow) {
    state.showSqlEvent = isShow
  },
  updateExecSqlArrayEventMutation (state, array) {
    state.currentSelect.tb_window_element_action[state.eventIndex].tb_window_element_action_exesql = array
  },
  updateShowSqlArrayEditMutation (state, isShow) {
    state.showSqlArrayEdit = isShow
  }
}
export const execSQLEventActions = {
  updateShowSqlEventAction (context, isShow) {
    context.commit('updateShowSqlEventMutation', isShow)
  },
  updateExecSqlArrayEventAction (context, array) {
    context.commit('updateExecSqlArrayEventMutation', array)
  },
  updateShowSqlArrayEditAction (context, isShow) {
    context.commit('updateShowSqlArrayEditMutation', isShow)
  }
}
