import { inputFilterMutations } from '@/store/modules/element/InputFilter'
import { baseContainerMutations } from '@/store/modules/container/BaseContainer'
import { rowContainerMutations } from '@/store/modules/container/RowContainer'
import { tabContainerMutations } from '@/store/modules/container/TabContainer'
import { baseElementMutations } from '@/store/modules/element/BaseElement'
import { gridContainerMutations } from '@/store/modules/container/GridContainer'
import { doubleContainerMutations } from '@/store/modules/container/DoubleContatiner'
import { containerConfigMutations } from '@/store/modules/container/ContainerConfig'
import { formatConfigMutations } from '@/store/modules/element/FormatConfig'
import { baseEditorMutations } from '@/store/modules/editor/BaseEditor'
import { baseWindowMutations } from '@/store/modules/window/BaseWindow'
import { pullDownMutations } from '@/store/modules/element/PullDownConfig'
import { baseEventMutations } from '@/store/modules/event/BaseEvent'
import { uploadConfigMutations } from '@/store/modules/element/UploadConfig'
import { addPopWindowEventMutations } from '@/store/modules/event/AddPopWIndowEvent'
import { exportExcelEventMutations } from '@/store/modules/event/ExportExcelEvent'
import { execSQLEventMutations } from '@/store/modules/event/ExecSQLEvent'
import { eventFilterMutations } from '@/store/modules/editor/EventFilter'
import { invokeServiceEventMutations } from '@/store/modules/event/InvokeServiceEvent'
import { connectionLineMutations } from '@/store/modules/draw/ConnectionLine'
import { basePopWindowEventMutations } from '@/store/modules/event/BasePopWindowEvent'

export const mutations = {
  ...inputFilterMutations,
  ...baseContainerMutations,
  ...tabContainerMutations,
  ...baseElementMutations,
  ...rowContainerMutations,
  ...gridContainerMutations,
  ...doubleContainerMutations,
  ...containerConfigMutations,
  ...formatConfigMutations,
  ...baseEditorMutations,
  ...baseWindowMutations,
  ...pullDownMutations,
  ...baseEventMutations,
  ...uploadConfigMutations,
  ...addPopWindowEventMutations,
  ...exportExcelEventMutations,
  ...execSQLEventMutations,
  ...eventFilterMutations,
  ...invokeServiceEventMutations,
  ...connectionLineMutations,
  ...basePopWindowEventMutations
}
