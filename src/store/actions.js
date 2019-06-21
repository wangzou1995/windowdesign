import { inputFilterActions } from '@/store/modules/element/InputFilter'
import { baseContainerActions } from '@/store/modules/container/BaseContainer'
import { rowContainerActions } from '@/store/modules/container/RowContainer'
import { tabContainerActions } from '@/store/modules/container/TabContainer'
import { baseElementActions } from '@/store/modules/element/BaseElement'
import { gridContainerActions } from '@/store/modules/container/GridContainer'
import { doubleContainerActions } from '@/store/modules/container/DoubleContatiner'
import { containerConfigActions } from '@/store/modules/container/ContainerConfig'
import { formatConfigActions } from '@/store/modules/element/FormatConfig'
import { baseEditorActions } from '@/store/modules/editor/BaseEditor'
import { baseWindowActions } from '@/store/modules/window/BaseWindow'
import { pullDownActions } from '@/store/modules/element/PullDownConfig'
import { baseEventActions } from '@/store/modules/event/BaseEvent'
import { uploadConfigActions } from '@/store/modules/element/UploadConfig'
import { addPopWindowEventActions } from '@/store/modules/event/AddPopWIndowEvent'
import { exportExcelEventActions } from '@/store/modules/event/ExportExcelEvent'
import { execSQLEventActions } from '@/store/modules/event/ExecSQLEvent'
import { eventFilterActions } from '@/store/modules/editor/EventFilter'
import { invokeServiceActions } from '@/store/modules/event/InvokeServiceEvent'
import { connectionLineActions } from '@/store/modules/draw/ConnectionLine'
import { basePopWindowEventActions } from '@/store/modules/event/BasePopWindowEvent'

export const actions = {
  ...inputFilterActions,
  ...baseContainerActions,
  ...tabContainerActions,
  ...baseElementActions,
  ...rowContainerActions,
  ...gridContainerActions,
  ...doubleContainerActions,
  ...containerConfigActions,
  ...formatConfigActions,
  ...baseEditorActions,
  ...baseWindowActions,
  ...pullDownActions,
  ...baseEventActions,
  ...uploadConfigActions,
  ...addPopWindowEventActions,
  ...exportExcelEventActions,
  ...execSQLEventActions,
  ...eventFilterActions,
  ...invokeServiceActions,
  ...connectionLineActions,
  ...basePopWindowEventActions
}
