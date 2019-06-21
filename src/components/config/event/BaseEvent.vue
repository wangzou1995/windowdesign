<template>
  <div>
    <div style="text-align: center; margin-top: 20px">
      <div  style="">
        <el-tooltip v-for="(eventType, eventTypeIndex) in eventTypeDataSource" :key="eventTypeIndex" :content="eventType.label" placement="top" >
           <el-button :icon="eventType.icon" circle size="small" style="margin-left: 10px" @click="addEvent(eventType.value)"></el-button>
        </el-tooltip>
      </div>
      <a-card v-for="(baseEvent, baseEventIndex) in baseEventArray" :key="baseEventIndex" style="text-align: left; margin-top: 20px"
              :title="setTitle(baseEvent)">
        <div style="font-size: 12px; margin-top: 5px">
          事件类型:
          <el-select v-model="baseEvent.eventtype" :value="eventTypeArray" size="small" style="width: 70%">
            <el-option v-for="(eventType, index) in eventTypeDataSource" :label="eventType.label" :value="eventType.value" :key="index"></el-option>
          </el-select>
        </div>
        <div style="font-size: 12px; margin-top: 5px">
          绑定动作:
          <el-select v-model="baseEvent.bindevent" :value="eventTypeArray" size="small" style="width: 70%">
            <el-option v-for="(element , index) in eventDataSource" :value="element.value" :label="element.label" :key="index"></el-option>
          </el-select>
        </div>
        <div style="font-size: 12px; margin-top: 5px">
          数据容器:
          <el-select v-model="eventTypeArray" :value="eventTypeArray" size="small" style="width: 70%"></el-select>
        </div>
        <template class="ant-card-actions" slot="actions">
          <el-tooltip content="详细配置" placement="top" >
            <i  class="el-icon-edit"  @click="editDetail(baseEvent.bindevent,baseEventIndex)" ></i>
          </el-tooltip>
          <el-tooltip content="监听配置" placement="top">
            <i class="iconfont iconjiantingqi" @click="updateShowListener(true, baseEvent.id, baseEventIndex)"></i>
          </el-tooltip>
          <el-tooltip content="删除事件" placement="top">
            <i class="el-icon-delete" @click="deleteEvent(baseEventIndex)"></i>
          </el-tooltip>
        </template>
      </a-card>
    </div>
    <!--监听事件-->
    <el-dialog style="text-align: left" :visible.sync="showListener" @close="updateShowListener(false)" width="1000px" title="监听配置">
      <div  v-for="(listener, index) in listeners" :key="index">
        <a-card :title="'监听' + (index + 1)" >
          <el-form>
            <div style="float: left">
              监听事件点:&emsp;<el-select :value="listener.listentime" v-model="listener.listentime">
              <el-option v-for="(point, index) in listenerPoint" :label="point.label" :value="point.value" :key="index"></el-option>
            </el-select>
            </div>
            <div style="float: left;  margin-left: 20px">
              数据源:&emsp;<el-select :value="listener.dsname" v-model="listener.dsname"></el-select>
            </div>
            <div style="float: left; margin-left: 10px">
              脚本类型:&emsp;<el-select :value="listener.scriptkind" v-model="listener.scriptkind">
              <el-option v-for="(type, index) in listenerScriptTypes" :label="type.label" :value="type.value" :key="index"></el-option>
            </el-select>
            </div>
          </el-form>
          <template class="ant-card-actions" slot="actions">
            <el-tooltip content="脚本配置" placement="top" >
              <i  class="el-icon-edit" @click="editListenerScript(listener.scriptkind,index)"  ></i>
            </el-tooltip>
            <el-tooltip content="删除监听" placement="top">
              <i class="el-icon-delete" @click="deleteListener(index)"></i>
            </el-tooltip>
          </template>
        </a-card>
      </div>
      <div style="margin-top: 10px; text-align: right ">
        <slot name="action">
        <el-button type="primary" size="small" @click="addListener">新增监听</el-button>
        <el-button type="primary" size="small" @click="saveListener">保存</el-button>
        <el-button type="primary" size="small" @click="updateShowListener(false)">取消</el-button>
        </slot>
      </div>
    </el-dialog>
    <!--弹窗事件-->
      <ext-add-pop-window-event v-if="showPopWindow"></ext-add-pop-window-event>
    <!--执行SQL事件-->
      <ext-exec-sql-event v-if="showSqlEvent"></ext-exec-sql-event>
    <!--调用注册服务事件-->
    <ext-invoke-service-event v-if="showInvokeServiceEvent"></ext-invoke-service-event>
    <!--新增更新弹窗-->
    <ext-base-pop-window v-if="showBasePopWindow"></ext-base-pop-window>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddPopWindowEvent from './AddPopWindowEvent'
import ExecSqlEvent from './ExecSQLEvent'
import InvokeServiceEvent from './InvokeServiceEvent'
import BasePopWindowEvent from './BasePopWindowEvent'
export default {
  name: 'BaseEvent',
  components: {
    'ext-add-pop-window-event': AddPopWindowEvent,
    'ext-exec-sql-event': ExecSqlEvent,
    'ext-invoke-service-event': InvokeServiceEvent,
    'ext-base-pop-window': BasePopWindowEvent
  },
  data () {
    return {
      baseEventArray: [],
      baseEventObject: {
        elementid: '',
        opaftersave: false,
        tb_window_element_action_save: [],
        inputbox: false,
        uploadable: true,
        checkchange: true,
        tb_window_element_action_import: [],
        saverefresh: false,
        id: '',
        bindevent: '',
        tb_window_element_action_updownload: [],
        ismobile: false,
        tb_window_element_action_service: [],
        createtime: '',
        multiselect: false,
        tb_window_element_action_popwin: [],
        closeaftersave: false,
        singlefile: false,
        eventtype: '',
        tb_window_element_action_js: [],
        tb_window_element_action_cuobj: [],
        checkvalue: true,
        tb_window_element_listener: [],
        tb_window_element_action_exesql: []
      },
      eventTypeArray: [],
      eventDataSource: [
        { value: 'AddObject', label: '新增:弹窗' },
        { value: 'UpdateObject', label: '更新弹窗' },
        { value: 'RemoveObject', label: '删除并保存' },
        { value: 'CancelObject', label: '取消:单据' },
        { value: 'CloseObject', label: '关闭:单据' },
        { value: 'SearchObject', label: '查询' },
        { value: 'Reset', label: '重置' },
        { value: 'AddLine', label: '增加行' },
        { value: 'RemoveLine', label: '删除行' },
        { value: 'AddTreeNode', label: '增加同级节点' },
        { value: 'AddSubTreeNode', label: '增加下级节点' },
        { value: 'ChangeParentNode', label: '变更上级节点' },
        { value: 'BatchUpdateData', label: '批量修改' },
        { value: 'Save', label: '保存' },
        { value: 'SaveAndNew', label: '保存并新增' },
        { value: 'SaveSub', label: '保存:子表' },
        { value: 'PopWin', label: '弹窗' },
        { value: 'CloseWin', label: '关闭窗口' },
        { value: 'SelectRecord', label: '导入选择记录' },
        { value: 'ImportFromXls', label: '从EXCEL导入' },
        { value: 'ExportToXls', label: '导出至EXCEL' },
        { value: 'UploadFile', label: '上传文件' },
        { value: 'DownloadFile', label: '下载文件' },
        { value: 'RegisterService', label: '调用注册服务' },
        { value: 'ExecuteSql', label: '执行SQL' },
        { value: 'ExecuteJS', label: '执行JS' },
        { value: 'PreviewReport', label: '预览报表' },
        { value: 'DesignReport', label: '设计报表' },
        { value: 'SubmitApproval', label: '提交审批' }
      ],
      eventTypeDataSource: [
        { value: 'click', label: '点击', icon: 'iconfont icondianji1' },
        { value: 'change', label: '改变', icon: 'iconfont iconbizhenxuanran-' },
        { value: 'blur', label: '离开', icon: 'iconfont iconblur-radial' },
        { value: 'keypress', label: '回车输入', icon: 'iconfont iconhuiche' },
        { value: 'mouseover', label: '渲染', icon: 'iconfont iconbizhenxuanran-' }
      ],
      listenerPoint: [
        { value: 'before', label: '在...之前' },
        { value: 'after', label: '在...之后' },
        { value: 'returnok', label: '返回成功' },
        { value: 'returnfail', label: '返回失败' }
      ],
      listenerScriptTypes: this.elementTypes,
      showListener: false,
      listeners: [],
      eventid: '',
      listenerIndex: -1
    }
  },
  methods: {
    ...mapActions(['updateElementAction', 'updateElementListenerAction', 'updateScriptTypeAction', 'updateJsViewAction',
      'updateSqlViewAction', 'updateApiSqlViewAction', 'updateApiParamViewAction', 'updateEventListenerObjAction', 'updateEventIndexAction',
      'updateListenerIndexAction', 'updateAddWindowEventAction', 'updatePopWindowsAction', 'updateExecJSEventAction', 'updateShowSqlEventAction',
      'updateShowInvokeServiceEventAction', 'updateShowBaseWindowAction']),
    addEvent (value) {
      let index = this.baseEventArray.findIndex(e => {
        return e.eventtype === value
      })
      if (index === -1) {
        this.baseEventObject.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
        this.baseEventObject.elementid = this.currentSelect.id
        this.baseEventObject.eventtype = value
        this.updateElementAction({ obj: JSON.parse(JSON.stringify(this.baseEventObject)), action: 'add' })
        this.actionid = this.baseEventObject.id
      } else {
        this.$message.warning('已经存在该类型事件！')
      }
    },
    deleteEvent (index) {
      this.updateElementAction({ index: index, action: 'remove' })
    },
    setTitle (baseEvent) {
      for (let i = 0, max = this.eventTypeDataSource.length; i < max; i++) {
        if (this.eventTypeDataSource[i].value === baseEvent.eventtype) {
          return this.eventTypeDataSource[i].label + '事件'
        }
      }
    },
    updateShowListener () {
      // 初始化数据
      let paramSize = arguments.length
      if (paramSize > 0) {
        if (paramSize > 2) {
          this.eventid = arguments[1]
          let listeners = JSON.parse(JSON.stringify(this.currentSelect.tb_window_element_action[arguments[2]].tb_window_element_listener))
          this.updateEventIndexAction(arguments[2])
          if (listeners.length > 0) {
            this.listeners = listeners
          } else {
            this.listeners = [{
              actionid: this.currentSelect.tb_window_element_action[arguments[2]].id,
              id: Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999),
              scriptkind: '',
              jsscript: '',
              dsname: '',
              createtime: '',
              listentime: ''
            }]
          }
        }
        this.showListener = arguments[0]
        this.listenerIndex = arguments[2]
        this.updateEventListenerObjAction(this.listeners)
      }
    },
    deleteListener (index) {
      this.$delete(this.listeners, index)
    },
    addListener () {
      this.listeners.push({
        actionid: this.eventid,
        id: Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999),
        scriptkind: '',
        jsscript: '',
        dsname: '',
        createtime: '',
        listentime: ''
      })
      this.updateEventListenerObjAction(this.listeners)
    },
    saveListener () {
      this.updateElementListenerAction({ index: this.listenerIndex, listeners: this.listeners })
      this.showListener = false
    },
    editListenerScript (type, listenerIndex) {
      if (type === '') {
        this.$message.warning('请选择脚本类型')
      } else {
        this.updateScriptTypeAction('eventListener')
        this.updateListenerIndexAction(listenerIndex)
        if (this.eventListenerObj === '' || this.eventListenerObj[0].actionid !==
          this.listeners[listenerIndex].actionid) {
          this.updateEventListenerObjAction(this.listeners)
        }
        switch (type) {
          case 'js':
            this.updateJsViewAction(true)
            break
          case 'sql':
            this.updateSqlViewAction(true)
            break
          case 'apiSql':
            this.updateApiSqlViewAction(true)
            break
          case 'apiParams':
            this.updateApiParamViewAction(true)
            break
        }
      }
    },
    editDetail (action, index) {
      this.updateEventIndexAction(index)
      switch (action) {
        case 'PopWin':
          let pops = this.baseEventArray[index].tb_window_element_action_popwin
          if (pops.length > 0) {
            this.updatePopWindowsAction(pops)
          } else {
            this.updatePopWindowsAction([])
          }
          this.updateAddWindowEventAction(true)
          break
        case 'ExecuteJS':
          this.updateScriptTypeAction('execJS')
          this.updateJsViewAction(true)
          break
        case 'ExecuteSql':
          this.updateScriptTypeAction('execSQL')
          this.updateShowSqlEventAction(true)
          break
        case 'RegisterService':
          this.updateScriptTypeAction('registerService')
          this.updateShowInvokeServiceEventAction(true)
          break
        case 'AddObject':
        case 'UpdateObject':
          this.updateShowBaseWindowAction(true)
          break
        default:
          this.$message.warning('请绑定事件动作！')
          break
      }
    }
  },
  computed: {
    ...mapState(['currentSelect', 'configTab', 'eventListenerObj', 'showPopWindow', 'execJSEvent',
      'showSqlEvent', 'showInvokeServiceEvent', 'showBasePopWindow']),
    _baseEventArray () {
      if (this.currentSelect.type) {
        if (this.isInElement(this.currentSelect.type)) {
          if (this.currentSelect.tb_window_element_action.length > 0) {
            return this.currentSelect.tb_window_element_action
          } else {
            return []
          }
        }
      }
      return []
    }
  },
  watch: {
    _baseEventArray (val) {
      this.baseEventArray = val
    },
    deep: true
  },
  created () {
    if (this.currentSelect.type) {
      if (this.isInElement(this.currentSelect.type)) {
        if (this.currentSelect.tb_window_element_action.length > 0) {
          return this.currentSelect.tb_window_element_action
        } else {
          return []
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
