export const exportExcelEventStates = {
  showExportExcel: false
}
export const exportExcelEventMutations = {
  updateShowExportExcelMutation (state, isShow) {
    state.showExportExcel = isShow
  }
}
export const exportExcelEventActions = {
  updateShowExportExcelAction (context, isShow) {
    context.commit('updateShowExportExcelMutation', isShow)
  }
}
