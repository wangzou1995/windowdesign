<template>
  <div>
  <el-dialog title="注册服务配置" width="1100px" @close="close" :visible="showInvokeServiceEvent" append-to-body
             :close-on-click-modal="false" top="5vh">
    <el-tabs type="border-card" editable @edit="handleTabsEdit" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(obj, index) in invokeArray" :key="index" :label="'服务' + (index + 1)" :name="'服务' + (index + 1)">
        <a-card >
        <el-form>
        <el-divider content-position="left" >基本配置</el-divider>
          <el-form-item>
            <div class="invokeServiceClass">
             <span class="titleClass"> 应&emsp;&emsp;用:</span>
              <el-select v-model="obj.prodid" :value="obj.prodid" size="small"></el-select>
            </div>
            <div class="invokeServiceClass">
              <span class="titleClass"> 调用服务:</span>
              <el-select v-model="obj.serviceid" :value="obj.serviceid" size="small"></el-select>
            </div>
            <div class="invokeServiceClass">
              <span class="titleClass">  执行前提示:</span>
              <el-select v-model="obj.inputbox" :value="obj.inputbox" size="small"></el-select>
            </div>
            <div class="invokeServiceClass">
              <span class="titleClass">  输入提示:</span>
              <el-input style="width: 192px"  v-model="obj.inputtipinfo" size="small" ></el-input>
            </div>
            <div class="invokeServiceClass">
              <span class="titleClass"> 文本变量名:</span>
              <el-input v-model="obj.inputvarname" :value="obj.inputvarname" size="small" style="width: 192px"></el-input>
            </div>
            <div class="invokeServiceClass">
              <span class="titleClass"> 回写字段:</span>
              <el-input v-model="obj.writebackflds"  size="small" style="width: 192px">
                <el-button slot="append" icon="el-icon-edit" @click="getWriteBackflds(obj.writebackflds, index)"></el-button>
              </el-input>
            </div>
            <div class="invokeServiceClass">
              <span class="titleClass"> 重复值检测:</span>
            <el-select v-model="obj.ukfields" :value="obj.ukfields" size="small"></el-select>
            </div>
            <div class="invokeServiceSingleClass">
              <el-checkbox   v-model="obj.transparams" size="small">转换报文</el-checkbox>
            </div>
            <div class="invokeServiceSingleClass">
              <el-checkbox   v-model="obj.multiselect" size="small">记录多选</el-checkbox>
            </div>
            <div class="invokeServiceSingleClass">
              <el-checkbox   v-model="obj.checkvalue" size="small">有效值检查</el-checkbox>
            </div>
            <div class="invokeServiceSingleClass">
              <el-checkbox   v-model="obj.opaftersave" size="small">保存后操作</el-checkbox>
            </div>
          </el-form-item>
            <el-form-item>
            <div class="invokeServiceButtonClass">
              <el-button size="small" type="primary" @click="showUrl(obj)">URL模版参数</el-button>
            </div>
            <div class="invokeServiceButtonClass">
              <el-button size="small" type="primary" @click="showHeader(obj)">报文头配置</el-button>
            </div>
            <div class="invokeServiceButtonClass">
              <el-button size="small" type="primary" @click="showTitle(obj)">页面标题</el-button>
            </div>
          </el-form-item>
          <el-divider content-position="left">事件执行成功后配置</el-divider>
          <el-form-item>
            <div class="invokeServiceSingleClass">
              <el-checkbox   v-model="obj.successnotify" size="small">添加提示</el-checkbox>
            </div>
            <div class="invokeServiceSingleClass">
              <el-checkbox   v-model="obj.closeaftersuccess" size="small">关闭窗口</el-checkbox>
            </div>
            <div class="invokeServiceSingleClass">
              <el-checkbox   v-model="obj.resetaftersuccess" size="small">重置页面</el-checkbox>
            </div>
            <div class="invokeServiceSingleClass">
              <el-checkbox   v-model="obj.refreshdatasuccess" size="small">刷新数据</el-checkbox>
            </div>
          </el-form-item>
        <el-divider content-position="left" >脚本配置</el-divider>
          <el-form-item>
            <div class="invokeServiceClass">
              <span class="titleClass"> 脚本类型:</span>
              <el-select v-model="type" :value="type" size="small" >
                <el-option v-for="(type, index) in elementTypes" :label="type.label" :value="type.value" :key="index"></el-option>
              </el-select>
            </div>
            <div class="invokeServiceButtonClass" >
              <el-button  type="primary" size="small" @click="editScript(obj)">
                条件脚本
              </el-button>
            </div>
            <div class="invokeServiceClass">
              <span class="titleClass"> 基本动作:</span>
              <el-select v-model="obj.actiontype" :value="actionType" size="small" filterable @change="updateActionType" >
                <el-option v-for="(action, index) in actions" :key="index" :label="action.label" :value="action.value"></el-option>
              </el-select>
            </div>
            <div class="invokeServiceButtonClass">
              <el-button v-show="obj.actiontype === 'ExecuteSql'" type="primary" size="small"  @click="editScriptAction(obj)">
                脚本
              </el-button>
            </div>
          </el-form-item>
        </el-form>
          <template class="ant-card-actions" slot="actions">
            <el-tooltip content="报文转换配置" placement="top" >
              <i  class="el-icon-edit"   ></i>
            </el-tooltip>
            <el-tooltip content="报文提交配置" placement="top">
              <i class="iconfont iconjiantingqi" ></i>
            </el-tooltip>
          </template>
        </a-card>
      </el-tab-pane>
    </el-tabs>
    <div style="margin-top: 10px; text-align: right ">
      <slot name="action">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" >确 定</el-button>
      </slot>
    </div>
    <!-- URL参数配置 -->
    <url-params-editor :json="urlObj.urlparams" v-if="showUrlParams"></url-params-editor>
    <!-- 标题参数配置 -->
    <title-params-editor :json="urlObj.urltitle" v-if="showTitleParams"></title-params-editor>
    <!--报文头参数配置-->
    <header-params-editor :json="urlObj.headers" v-if="showHeaderParams"></header-params-editor>
    <!--条件脚本-->
    <el-dialog :visible="showInvokeServiceScript" width="800px" append-to-body>
      <sql-editor v-if="type === 'sql'"  :service-obj="urlObj.switchfilter" :type="scriptType"></sql-editor>
      <api-and-sql-editor v-if="type === 'apiSql'"  :service-obj="urlObj.switchfilter" :type="scriptType"></api-and-sql-editor>
      <json-editor v-if="type === 'json'"  :service-obj="urlObj.switchfilter" :type="scriptType"></json-editor>
      <js-editor v-if="type === 'apiParams'"  :service-obj="urlObj.switchfilter" :type="scriptType"></js-editor>
      <sql-editor v-if="actionType === 'ExecuteSql'" :service-obj="urlObj.script" :type="scriptType"></sql-editor>
    </el-dialog>
    <div v-if="showConnectionLine">
    <el-dialog  :visible="showConnectionLine" width="1000px" title="关系配置" style="text-align: left; position: absolute" append-to-body>
      <connection-line   :source="source" :target="target" :type="1" :fields.sync="invokeArray[writeBackIndex].writebackflds"></connection-line>
    </el-dialog>
    </div>
  </el-dialog>
  <!--回写字段-->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import UrlParamsEditor from './UrlParamsEditor'
import TitleParamsEditor from './TitleParamsEditor'
import HeaderParamsEditor from './HeaderParamsEditor'
import SqlEditor from '@/components/editor/SqlEditor'
import JsEditor from '@/components/editor/JsEditor'
import JsonEditor from '@/components/editor/JsonEditor'
import ApiAndSqlEditor from '@/components/editor/ApiAndSqlEditor'
import ConnectionLine from '@/components/draw/ConnectionLine'
export default {
  name: 'InvokeServiceEvent',
  components: {
    UrlParamsEditor,
    TitleParamsEditor,
    HeaderParamsEditor,
    SqlEditor,
    JsEditor,
    JsonEditor,
    ApiAndSqlEditor,
    ConnectionLine
  },
  data () {
    return {
      activeName: '服务1',
      actionType: '',
      invokeObj: {
        id: '',
        actionid: '',
        itemid: '',
        switchfilter: {},
        prodid: '',
        serviceid: '',
        urlparams: {},
        headers: {},
        urltitle: {},
        inputbox: '',
        inputtipinfo: '',
        inputvarname: '',
        checkvalue: '',
        transparams: '',
        messagetransid: '',
        batchtrans: '',
        actiontype: '',
        script: {},
        custvariables: '',
        importdatacon: '',
        ukfields: '',
        writebackflds: '',
        multiselect: '',
        successnotify: '',
        closeaftersuccess: '',
        resetaftersuccess: '',
        opaftersave: '',
        refreshdatasuccess: ''
      },
      invokeArray: [],
      type: '',
      urlObj: {},
      fields: this.currentLineStr,
      source: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      target: ['a', 'b', 'c', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'],
      writeBackIndex: 0
    }
  },
  methods: {
    ...mapActions(['updateShowInvokeServiceEventAction', 'updateShowUrlParamsAction', 'updateServiceAction',
      'updateShowTitleParamsAction', 'updateShowHeaderParamsAction', 'updateScriptTypeAction', 'updateShowInvokeServiceScriptAction',
      'updateShowConnectionLineAction', 'updateLineAction']),
    close () {
      this.updateShowInvokeServiceEventAction(false)
    },
    handleClick () {
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        this.addObj()
        this.activeName = '服务' + this.invokeArray.length
      }
      if (action === 'remove') {
        let tabs = this.invokeArray
        let activeName = this.activeName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (('服务' + (index + 1)) === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = '服务' + (tabs[index + 1] ? index + 2 : index)
              }
            }
          })
        } else {
          activeName = '服务' + (this.invokeArray.length - 1)
        }
        this.activeName = activeName
        this.invokeArray = tabs.filter((tab, index) => ('服务' + (index + 1)) !== targetName)
        // 初始化
        this.invokeArray.forEach((tab, index) => {
          tab.itemid = index + 1
        })
      }
    },
    submit () {
      this.updateServiceAction(this.invokeArray)
      this.updateShowInvokeServiceEventAction(false)
    },
    addObj () {
      this.invokeObj.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
      this.invokeObj.actionid = this.currentEventGetter.id
      this.invokeArray.push(JSON.parse(JSON.stringify(this.invokeObj)))
      this.invokeArray[this.invokeArray.length - 1].itemid = this.invokeArray.length
    },
    showUrl (obj) {
      this.urlObj = obj
      this.updateShowUrlParamsAction(true)
    },
    showTitle (obj) {
      this.urlObj = obj
      this.updateShowTitleParamsAction(true)
    },
    showHeader (obj) {
      this.$set(this, 'urlObj', obj)
      this.updateShowHeaderParamsAction(true)
    },
    editScript (obj) {
      if (this.type === '') {
        this.$message.warning('请选择脚本类型！')
      } else {
        this.$set(this, 'urlObj', obj)
        console.log(this.urlObj)
        this.updateScriptTypeAction('invokeService')
        this.updateShowInvokeServiceScriptAction(true)
      }
    },
    updateActionType (value) {
      this.actionType = value
    },
    editScriptAction (obj) {
      if (obj.actiontype === '') {
        this.$message.warning('请选择基本动作！')
      } else {
        if (obj.actiontype === 'ExecuteSql') {
          this.urlObj = obj
          this.updateScriptTypeAction('invokeService')
          this.updateShowInvokeServiceScriptAction(true)
        }
      }
    },
    getWriteBackflds (str, index) {
      this.writeBackIndex = index
      this.updateShowConnectionLineAction(true)
      this.updateLineAction(str)
    }
  },
  computed: {
    ...mapState(['showInvokeServiceEvent', 'showConnectionLine', 'showUrlParams', 'showTitleParams', 'showHeaderParams',
      'showInvokeServiceScript', 'scriptType', 'currentLineStr']),
    ...mapGetters(['currentEventGetter'])
  },
  created () {
    if (this.currentEventGetter.tb_window_element_action_service.length > 0) {
      this.invokeArray = JSON.parse(JSON.stringify(this.currentEventGetter.tb_window_element_action_service))
      let type = !this.currentEventGetter.tb_window_element_action_service[0].script.type ? ''
        : this.currentEventGetter.tb_window_element_action_service[0].script.type
      if (type === '') {
        this.type = ''
      } else {
        this.type = this.elementTypes.find(e => {
          return e.type === type
        }).value
      }
    } else {
      this.addObj()
    }
  },
  watch: {
    currentLineStr (newVal) {
      this.fields = newVal
    },
    fields: {
      handler (val) {
        this.$set(this.invokeArray[this.writeBackIndex], 'writebackflds', val)
      }
    }
  }
}
</script>

<style scoped>
.invokeServiceClass {
  font-size: 12px;
  margin: 10px 10px 0 10px;
  width: 300px;
  float: left;
}
  .invokeServiceSingleClass{
    font-size: 12px;
    margin: 10px 10px 0 10px;
    width: 100px;
    float: left;
  }
  .invokeServiceButtonClass{
    font-size: 12px;
    margin: 10px 10px 0 10px;
    float: left;
  }
  .titleClass {
    display: block;
    width: 80px;
    float: left;
    border: 1px white solid;
    text-align: right;
    margin-right: 10px;
  }
</style>
