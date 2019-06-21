import { baseEditorGetters } from '@/store/modules/editor/BaseEditor'
import { baseWindowGetters } from '@/store/modules/window/BaseWindow'
import { addPopWindowEventGetters } from '@/store/modules/event/AddPopWIndowEvent'
import { baseEventGetters } from '@/store/modules/event/BaseEvent'
export const getters = {
  ...baseEditorGetters,
  ...baseWindowGetters,
  ...addPopWindowEventGetters,
  ...baseEventGetters
}
