
export const connectionLineStates = {
  showConnectionLine: false,
  currentLineStr: ''
}
export const connectionLineMutations = {
  updateShowConnectionLineMutation (state, isShow) {
    state.showConnectionLine = isShow
  },
  updateLineMutation (state, str) {
    state.currentLineStr = str
  }
}
export const connectionLineActions = {
  updateShowConnectionLineAction (context, isShow) {
    context.commit('updateShowConnectionLineMutation', isShow)
  },
  updateLineAction (context, obj) {
    context.commit('updateLineMutation', obj)
  }
}
