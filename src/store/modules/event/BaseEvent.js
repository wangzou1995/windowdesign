import Vue from 'vue'
export const baseEventStates = {
  eventListenerObj: '',
  eventIndex: '',
  listenerIndex: ''
}
export const baseEventMutations = {
  updateElementMutation (state, eventObj) {
    switch (eventObj.action) {
      case 'add':
        state.currentSelect.tb_window_element_action.push(eventObj.obj)
        break
      case 'remove':
        Vue.delete(state.currentSelect.tb_window_element_action, eventObj.index)
        break
    }
  },
  updateElementListenerMutation (state, obj) {
    state.currentSelect.tb_window_element_action[obj.index].tb_window_element_listener = obj.listeners
  },
  updateEventListenerObjMutation (state, obj) {
    state.eventListenerObj = obj
  },
  updateEventIndexMutation (state, index) {
    state.eventIndex = index
  },
  updateListenerIndexMutation (state, index) {
    state.listenerIndex = index
  }
}
export const baseEventActions = {
  updateElementAction (context, eventObj) {
    context.commit('updateElementMutation', eventObj)
  },
  updateElementListenerAction (context, obj) {
    context.commit('updateElementListenerMutation', obj)
  },
  updateEventListenerObjAction (context, obj) {
    context.commit('updateEventListenerObjMutation', obj)
  },
  updateEventIndexAction (context, index) {
    context.commit('updateEventIndexMutation', index)
  },
  updateListenerIndexAction (context, index) {
    context.commit('updateListenerIndexMutation', index)
  }
}
export const baseEventGetters = {
  currentEventGetter (state) {
    return state.currentSelect.tb_window_element_action[state.eventIndex]
  }
}
