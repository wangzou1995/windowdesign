import Vue from 'vue'
import Vuex from 'vuex'
import { actions } from '@/store/actions'
import { getters } from '@/store/getters'
import { mutations } from '@/store/mutations'
import { inputFilterStates } from '@/store/modules/element/InputFilter'
import { baseEditorStates } from '@/store/modules/editor/BaseEditor'
import { baseWindowStates } from '@/store/modules/window/BaseWindow'
import { containerConfigStates } from '@/store/modules/container/ContainerConfig'
import { pullDownStates } from '@/store/modules/element/PullDownConfig'
import { baseEventStates } from '@/store/modules/event/BaseEvent'
import { addPopWindowEventStates } from '@/store/modules/event/AddPopWIndowEvent'
import { exportExcelEventStates } from '@/store/modules/event/ExportExcelEvent'
import { execSQLEventStates } from '@/store/modules/event/ExecSQLEvent'
import { eventFilterStates } from '@/store/modules/editor/EventFilter'
import { invokeServiceEventStates } from '@/store/modules/event/InvokeServiceEvent'
import { connectionLineStates } from '@/store/modules/draw/ConnectionLine'
import { basePopWindowEventStates } from '@/store/modules/event/BasePopWindowEvent'

Vue.use(Vuex)

const state = {
  ...baseWindowStates,
  ...inputFilterStates,
  ...baseEditorStates,
  ...containerConfigStates,
  ...pullDownStates,
  ...baseEventStates,
  ...addPopWindowEventStates,
  ...exportExcelEventStates,
  ...execSQLEventStates,
  ...eventFilterStates,
  ...invokeServiceEventStates,
  ...connectionLineStates,
  ...basePopWindowEventStates
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store
