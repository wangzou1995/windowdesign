import Vue from 'vue'

export const formatConfigMutations = {
  resetFormatMutation (state) {
    state.currentSelect.tb_window_formatsearch[0].script = ''
  },
  updateElementFormatMutation (state, formatObj) {
    if (state.currentSelect.tb_window_formatsearch.length > 0) {
      state.currentSelect.tb_window_formatsearch[0].dsname = formatObj.format.dsname
      state.currentSelect.tb_window_formatsearch[0].availableat = formatObj.format.availableat
    } else {
      if (formatObj.type === 'all') {
        formatObj.format.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
        formatObj.format.elementid = state.currentSelect.id
        state.currentSelect.tb_window_formatsearch.push(formatObj.format)
      }
    }
  },
  resetFormatConfigMutation (state) {
    Vue.set(state.currentSelect, 'tb_window_formatsearch', [])
    // 强制更新
  }
}
export const formatConfigActions = {
  resetFormatAction (context) {
    context.commit('resetFormatMutation')
  },
  updateElementFormatAction (context, formatObj) {
    context.commit('updateElementFormatMutation', formatObj)
  },
  resetFormatConfigAction (context) {
    context.commit('resetFormatConfigMutation')
  }
}
