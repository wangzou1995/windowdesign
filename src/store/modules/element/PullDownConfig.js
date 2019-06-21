import Vue from 'vue'
export const pullDownStates = {
  fields: [],
  selectScript: '',
  showPullDown: false
}
export const pullDownMutations = {
  updateSelectFieldMutation (state, obj) {
    if (state.currentSelect.tb_window_formatsearch.length === 0) {
      obj.obj.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
      obj.obj.elementid = state.currentSelect.id
    }
    // 清空
    if (obj.type === 'cloud') {
      obj.obj.datasource = state.selectScript
    }
    Vue.set(state.currentSelect.tb_window_selectfields, 0, obj.obj)
  },
  updateFieldsMutation (state, array) {
    state.fields = array
  },
  updateSelectScriptMutation (state, obj) {
    state.selectScript = obj
  },
  deleteSelectMutation (state) {
    Vue.delete(state.currentSelect.tb_window_selectfields, 0)
  },
  updateShowPullDownMutation (state, isShowPullDown) {
    state.showPullDown = isShowPullDown
  }
}
export const pullDownActions = {
  updateSelectStaticAction (context, obj) {
    context.commit('updateSelectFieldMutation', obj)
  },
  updateFieldsAction (context, array) {
    context.commit('updateFieldsMutation', array)
  },
  updateSelectScriptAction (context, obj) {
    context.commit('updateSelectScriptMutation', obj)
  },
  deleteSelectAction (context) {
    context.commit('deleteSelectMutation')
  },
  updateShowPullDownAction (context, isShowPullDown) {
    context.commit('updateShowPullDownMutation', isShowPullDown)
  }
}
