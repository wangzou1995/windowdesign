// 定义输入元素配置state对象
import Vue from 'vue'

export const inputFilterStates = {
  inputFilter: '',
  inputIndex: -1,
  // 元素输入对象
  inputObj: '',
  filterArray: [],
  switchfilter: '',
  elementInputConfigView: false
}
// 定义输入元素mutations事件
export const inputFilterMutations = {
  updateInputFilterMutation (state, obj) {
    state.currentSelect.tb_window_inputfields[state.inputIndex].filter = obj
  },
  removeInputFieldsMutation (state, index) {
    Vue.delete(state.currentSelect.tb_window_inputfields, index)
  },
  updateElementInputConfigViewMutation (state, isView) {
    state.elementInputConfigView = isView
  },
  updateInputIndexMutation (state, index) {
    state.inputIndex = index
  },
  updateInputObjMutation (state, obj) {
    state.inputObj = obj.script
    state.inputObj.filter = state.filterArray
    state.inputObj.switchfilter = state.switchfilter
    if (obj.type) {
      Vue.set(state.currentSelect.tb_window_inputfields, state.inputIndex, JSON.parse(JSON.stringify(state.inputObj)))
    } else {
      state.inputObj.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
      state.inputObj.elementid = state.currentSelect.id
      state.currentSelect.tb_window_inputfields.push(JSON.parse(JSON.stringify(state.inputObj)))
    }
    state.inputObj = ''
    state.switchfilter = ''
    state.filterArray = []
  },
  updateInputObj2Mutation (state, obj) {
    state.inputObj = obj
  },
  updateFilterArrayMutation (state, array) {
    state.filterArray = array
  },
  updateSwitchFilterMutation (state, obj) {
    state.switchfilter = obj
  }
}
// // 定义获取state方法
// export const inputFilterGetter = {
//   getInputFilter: state => {
//     return inputFilterState.inputFilter
//   }
// }
// 异步提交
export const inputFilterActions = {
  updateInputFilterAction (context, obj) {
    context.commit('updateInputFilterMutation', obj)
  },
  removeInputFieldsAction (context, obj) {
    context.commit('removeInputFieldsMutation', obj)
  },
  updateElementInputConfigViewAction (context, obj) {
    context.commit('updateElementInputConfigViewMutation', obj)
  },
  updateInputIndexAction (context, obj) {
    context.commit('updateInputIndexMutation', obj)
  },
  updateInputObjAction (context, obj) {
    context.commit('updateInputObjMutation', obj)
  },
  updateFilterArrayAction (context, array) {
    context.commit('updateFilterArrayMutation', array)
  },
  updateSwitchFilterAction (context, obj) {
    context.commit('updateSwitchFilterMutation', obj)
  },
  updateInputObj2Action (context, obj) {
    context.commit('updateInputObj2Mutation', obj)
  }
}
