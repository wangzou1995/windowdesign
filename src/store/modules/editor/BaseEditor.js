export const baseEditorStates = {
  sqlView: false,
  jsView: false,
  apiSqlView: false,
  apiParamView: false,
  elementInputConfigView: false,
  scriptType: ''
}
export const baseEditorMutations = {
  /**
   * 更新SQL配置界面显示
   * @param state
   * @param isView
   */
  updateSqlViewMutation (state, isView) {
    state.sqlView = isView
  },
  updateApiSqlViewMutation (state, isView) {
    state.apiSqlView = isView
  },
  updateApiParamViewMutation (state, isView) {
    state.apiParamView = isView
  },
  /**
   * 更新JS显示
   * @param state
   * @param isView
   */
  updateJsViewMutation (state, isView) {
    state.jsView = isView
  },
  /**
   * 更新容器SQL配置界面显示
   * @param state
   * @param obj
   */
  updateScriptMutation (state, obj) {
    if (obj.script !== '') {
      switch (obj.type) {
        case 'containerCustomSQL':
          state.currentSelect.filtersql = obj.script
          break
        case 'elementFormat':
          state.currentSelect.tb_window_formatsearch[0].script = obj.script
          break
        case 'elementInputFilter':
          state.switchfilter = JSON.parse(JSON.stringify(obj.script))
          break
        case 'selectFields':
          state.selectScript = JSON.parse(JSON.stringify(obj.script))
          break
        case 'eventListener':
          state.eventListenerObj[state.listenerIndex].jsscript = obj.script
          break
        case 'addPopWindowEvent':
          state.popWindows[state.popWindowIndex].script = obj.script
          break
        case 'execJS':
          let jsArray = state.currentSelect.tb_window_element_action[state.eventIndex].tb_window_element_action_js
          if (jsArray.length > 0) {
            jsArray[0].customevent = obj.script
          } else {
            let jsObj = {
              id: Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999),
              actionid: state.currentSelect.tb_window_element_action[state.eventIndex].id,
              customevent: obj.script
            }
            jsArray.push(jsObj)
          }
          break
        case 'execSQL':
          let sqlArray = state.currentSelect.tb_window_element_action[state.eventIndex].tb_window_element_action_exesql
          if (sqlArray.length > 0) {
            sqlArray[0].customevent = obj.script
          } else {
            let jsObj = {
              id: Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999),
              actionid: state.currentSelect.tb_window_element_action[state.eventIndex].id,
              customevent: obj.script
            }
            jsArray.push(jsObj)
          }
          state.currentSelect.tb_window_element_action[state.eventIndex].tb_window_element_action_exesql = obj.script
          break
        default:
          break
      }
    } else {
      switch (obj.type) {
        case 'containerCustomSQL':
          state.currentSelect.filtersql = ''
          break
        case 'elementFormat':
          state.currentSelect.tb_window_formatsearch = []
          break
        default:
          break
      }
    }
    state.sqlView = false
    state.jsView = false
    state.apiSqlView = false
    state.apiParamView = false
    state.elementInputConfigView = false
  },
  updateScriptTypeMutation (state, type) {
    state.scriptType = type
  }
}
export const baseEditorActions = {
  updateSqlViewAction (context, isView) {
    context.commit('updateSqlViewMutation', isView)
  },
  updateApiSqlViewAction (context, isView) {
    context.commit('updateApiSqlViewMutation', isView)
  },
  updateApiParamViewAction (context, isView) {
    context.commit('updateApiParamViewMutation', isView)
  },
  updateJsViewAction (context, isView) {
    context.commit('updateJsViewMutation', isView)
  },
  updateScriptAction (context, obj) {
    context.commit('updateScriptMutation', obj)
  },
  updateScriptTypeAction (context, type) {
    context.commit('updateScriptTypeMutation', type)
  }
}
export const baseEditorGetters = {
  getSqlView: state => {
    return state.sqlView
  }
}
