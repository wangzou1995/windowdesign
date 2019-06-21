<template>
  <!--<dialog title="SQL脚本编辑" :visible.sync="sqlView" :width="width"-->
  <!--:close-on-click-modal="false"-->
  <!--center-->
  <!--&gt;-->
  <div>
    <div style="margin-bottom: 10px">
      <span style="font-size: 15px; text-align: left; font-weight: bold">SQL脚本编辑</span>
    </div>
    <codemirror style="text-align: left" :options="options" v-model="sql" @blur="analyticSQL">
    </codemirror>
    <div style="margin-bottom: 10px">
      <span style="font-size: 15px; text-align: left; font-weight: bold">服务模版配置</span>
    </div>
    <div style="height: 40px;">
      <div style="float: left; margin-right: 20px">
        注册服务：
        <el-select v-model="serviceid" @change="changeService" :value="serviceid">
          <el-option label="sss" value="2"></el-option>
        </el-select>
      </div>
      <div style="float: left">
        服务模版：
        <el-select v-model="templateid" @change="changeTemplate" :value="templateid">
          <el-option label="ss" value="1"></el-option>
        </el-select>
      </div>
    </div>
    <base-filter v-if="script.params" :data-source="containerFilter"  :is-editor-name="false" :show-add="false" tab-name="参数"
                 :params="script.params" title="参数配置"></base-filter>
    <div style="margin-top: 10px; text-align: right ">
      <slot name="action">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" >确 定</el-button>
      </slot>
    </div>
  </div>
  <!--</dialog>-->
</template>

<script>
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/theme/duotone-light.css'
import 'codemirror/addon/edit/closebrackets.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import { getParamsToSql } from '@/until/AnalyticSQL'
import BaseFilter from '@/components/editor/BaseFilter'
export default {
  name: 'ApiSqlEditor',
  components: {
    BaseFilter
  },
  props: {
    type: String,
    serviceObj: Object
  },
  data () {
    return {
      options: {
        tabSize: 8,
        mode: 'text/x-mysql',
        theme: 'duotone-light',
        lineNumbers: true,
        autocorrect: true,
        extraKeys: {
          'Tab': 'autocomplete'
        },
        matchBrackets: true,
        autoCloseBrackets: true
      },
      sql: '',
      serviceid: '',
      templateid: '',
      script: Object,
      obj: {
        type: 'api',
        sql: '',
        serviceid: '',
        templateid: ''
      },
      datasourceFrom: [
        {
          'value': 'container'
        },
        {
          'value': 'global'
        },
        {
          'value': 'local'
        },
        {
          'value': 'constant'
        }
      ],
      default: '',
      addParam: this.addParams
    }
  },
  computed: {
    ...mapGetters(['getSqlView', 'getCurrentSelect', 'popWindowGetter']),
    ...mapState(['switchfilter', 'selectScript', 'listenerIndex', 'eventListenerObj']),
    tabName: function () {
      return '参数'
    }
  },
  created () {
    switch (this.type) {
      case 'elementFormat':
        if (this.getCurrentSelect.tb_window_formatsearch[0].script === null) {
          this.sql = ''
          this.templateid = ''
          this.serviceid = ''
        } else {
          this.sql = this.getCurrentSelect.tb_window_formatsearch[0].script.sql
          this.script = this.getCurrentSelect.tb_window_formatsearch[0].script
          this.templateid = this.getCurrentSelect.tb_window_formatsearch[0].script.templateid
          this.serviceid = this.getCurrentSelect.tb_window_formatsearch[0].script.serviceid
        }
        this.default = JSON.parse(JSON.stringify(this.getCurrentSelect.tb_window_formatsearch[0].script))
        break
      case 'elementInput':
        if (this.switchfilter !== '') {
          this.sql = this.switchfilter.js
          this.script = this.switchfilter
          this.templateid = this.switchfilter.templateid
          this.serviceid = this.switchfilter.serviceid
          this.default = JSON.parse(JSON.stringify(this.switchfilter))
        } else {
          this.sql = ''
          this.templateid = ''
          this.serviceid = ''
        }
        break
      case 'selectFields':
        // 如果已经存在 则直接替换
        if (this.selectScript !== '') {
          this.sql = this.selectScript.sql
          this.script = this.selectScript
          this.templateid = this.selectScript.templateid
          this.serviceid = this.selectScript.serviceid
          this.default = JSON.parse(JSON.stringify(this.selectScript))
          this.updateFieldsAction(this.selectScript.fields.split(','))
        } else {
          this.sql = ''
          this.templateid = ''
          this.serviceid = ''
          this.updateFieldsAction([])
        }
        break
      case 'eventListener':
        if (this.eventListenerObj === '') {
          this.sql = ''
          this.templateid = ''
          this.serviceid = ''
        } else {
          this.sql = this.eventListenerObj[this.listenerIndex].jsscript.sql
          this.script = this.eventListenerObj[this.listenerIndex].jsscript
          this.templateid = this.eventListenerObj[this.listenerIndex].jsscript.templateid
          this.serviceid = this.eventListenerObj[this.listenerIndex].jsscript.serviceid
          this.default = JSON.parse(JSON.stringify(this.eventListenerObj[this.listenerIndex].jsscript))
        }
        break
      case 'addPopWindowEvent':
        if (this.popWindowGetter.script === '') {
          this.sql = ''
          this.templateid = ''
          this.serviceid = ''
        } else {
          this.sql = this.popWindowGetter.script.sql
          this.script = this.popWindowGetter.script
          this.default = JSON.parse(JSON.stringify(this.popWindowGetter.script))
          this.templateid = this.popWindowGetter.script.templateid
          this.serviceid = this.popWindowGetter.script.serviceid
        }
        break
      case 'invokeService':
        if (this.serviceObj.type) {
          this.sql = JSON.parse(JSON.stringify(this.serviceObj.sql))
          this.templateid = JSON.parse(JSON.stringify(this.serviceObj.templateid))
          this.serviceid = JSON.parse(JSON.stringify(this.serviceObj.serviceid))
        } else {
          this.sql = ''
          this.$set(this.serviceObj, 'type', 'api')
          this.templateid = ''
          this.serviceid = ''
        }
        break
    }
  },
  methods: {
    ...mapActions(['updateApiSqlViewAction', 'updateScriptAction', 'updateFieldsAction', 'updateShowInvokeServiceScriptAction']),
    analyticSQL () {
      let obj = {
        type: 'api',
        sql: this.sql,
        params: [
        ]
      }
      let result = this.sql === undefined ? [] : getParamsToSql(this.sql)
      if (result.length > 0) {
        this.addParam(obj.params, result)
      } else {
        this.$delete(obj, 'params')
      }
      this.script = JSON.parse(JSON.stringify(obj))
    },
    submit () {
      if (this.serviceid === undefined && this.templateid === undefined) {
        this.$message.warning('请配置服务配置！')
      } else {
        if (this.type === 'invokeService') {
          this.$set(this.serviceObj, 'sql', this.sql)
          this.$set(this.serviceObj, 'params', this.script.params)
          this.updateShowInvokeServiceScriptAction(false)
        } else {
          this.updateScriptAction({ script: this.sql === '' ? '' : this.script, type: this.type })
        }
      }
    },
    close () {
      this.updateApiSqlViewAction(false)
      this.updateScriptAction({ script: this.default, type: this.type })
    },
    changeService () {
      this.$set(this.script, 'serviceid', this.serviceid)
    },
    changeTemplate () {
      this.$set(this.script, 'templateid', this.templateid)
    }
  }
}
</script>

<style scoped>

</style>
