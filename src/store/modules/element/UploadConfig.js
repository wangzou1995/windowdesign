export const uploadConfigMutations = {
  updateUploadMutation (state, obj) {
    if (state.currentSelect.tb_window_uploadfile.length > 0) {
      state.currentSelect.tb_window_uploadfile[0] = obj
    } else {
      state.currentSelect.tb_window_uploadfile.push(obj)
    }
  }
}
export const uploadConfigActions = {
  updateUploadAction (context, obj) {
    context.commit('updateUploadMutation', obj)
  }
}
