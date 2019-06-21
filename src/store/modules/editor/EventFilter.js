export const eventFilterStates = {
  showEventFilter: false
}
export const eventFilterMutations = {
  updateEventFilterMutation (state, isShow) {
    state.showEventFilter = isShow
  }
}
export const eventFilterActions = {
  updateEventFilterAction (context, isShow) {
    context.commit('updateEventFilterMutation', isShow)
  }
}
