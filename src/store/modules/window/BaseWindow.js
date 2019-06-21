import { window } from '@/until/global'
export const baseWindowStates = {
  myWindow: window,
  currentSelect: Object,
  configTab: 'window',
  filterType: '',
  apps: [],
  datasources: [],
  objs: []
}
export const baseWindowGetters = {
  getCurrentSelect: state => {
    return state.currentSelect
  }
}
export const baseWindowMutations = {
  updateCurrentSelectMutation (state, paramObj) {
    state.currentSelect = paramObj
  },
  /**
   * 更新Tab容器
   * @param state
   * @param obj
   */
  updateConfigTabMutation (state, obj) {
    state.configTab = obj
  },
  updateFilterTypeMutation (state, type) {
    state.filterType = type
  },
  updateAppsMutation (state, array) {
    state.apps = array
  },
  updateObjsMutation (state, array) {
    state.objs = array
  },
  updateDatasourcesMutation (state, array) {
    state.datasources = array
  },
  updateMyWindowMutation (state, window) {
    state.myWindow = window
  }
}
export const baseWindowActions = {
  updateCurrentSelectAction (context, obj) {
    context.commit('updateCurrentSelectMutation', obj)
  },
  updateConfigTabAction (context, obj) {
    context.commit('updateConfigTabMutation', obj)
  },
  updateFilterTypeAction (context, type) {
    context.commit('updateFilterTypeMutation', type)
  },
  updateDatasourcesAction (context, array) {
    context.commit('updateDatasourcesMutation', array)
  },
  updateObjsAction (context, array) {
    context.commit('updateObjsMutation', array)
  },
  updateAppsAction (context, array) {
    context.commit('updateAppsMutation', array)
  },
  updateMyWindowAction (context, obj) {
    context.commit('updateMyWindowMutation', obj)
  }
}
