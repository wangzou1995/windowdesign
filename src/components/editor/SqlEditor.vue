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
import { mapGetters, mapState, mapActions } from 'vuex'
import { getParamsToSql, getSqlQueryFields } from '@/until/AnalyticSQL'
import { ArrayToStr } from '@/until/ArrayUntil'
import BaseFilter from '@/components/editor/BaseFilter'
import { addParams } from '@/until/ParamsAnalytic'
export default {
  name: 'SqlEditor',
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
      script: Object,
      obj: {
        type: 'db',
        sql: ''
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
      default: ''
    }
  },
  computed: {
    ...mapGetters(['getSqlView', 'getCurrentSelect', 'popWindowGetter']),
    ...mapState(['inputIndex', 'switchfilter', 'selectScript', 'eventListenerObj', 'listenerIndex']),
    tabName: function () {
      return '参数'
    }
  },
  created () {
    switch (this.type) {
      case 'containerCustomSQL':
        if (this.getCurrentSelect.filtersql === null) {
          this.sql = ''
        } else {
          this.sql = this.getCurrentSelect.filtersql.sql
          this.script = this.getCurrentSelect.filtersql
        }
        this.default = JSON.parse(JSON.stringify(this.getCurrentSelect.filtersql))
        break
      case 'elementFormat':
        if (this.getCurrentSelect.tb_window_formatsearch[0].script === null) {
          this.sql = ''
        } else {
          this.sql = this.getCurrentSelect.tb_window_formatsearch[0].script.sql
          this.script = this.getCurrentSelect.tb_window_formatsearch[0].script
        }
        this.default = JSON.parse(JSON.stringify(this.getCurrentSelect.tb_window_formatsearch[0].script))
        break
      case 'elementInputFilter':
        if (this.switchfilter === '') {
          this.sql = ''
        } else {
          this.sql = this.switchfilter.sql
          this.script = this.switchfilter
        }
        this.default = JSON.parse(JSON.stringify(this.switchfilter))
        break
      case 'selectFields':
        // 如果已经存在 则直接替换
        if (this.selectScript !== '') {
          this.sql = this.selectScript.sql
          this.script = this.selectScript
          this.default = JSON.parse(JSON.stringify(this.selectScript))
          this.updateFieldsAction(this.selectScript.fields.split(','))
        } else {
          this.sql = ''
          this.updateFieldsAction([])
        }
        break
      case 'eventListener':
        if (this.eventListenerObj === '') {
          this.sql = ''
        } else {
          this.sql = this.eventListenerObj[this.listenerIndex].jsscript.sql
          this.script = this.eventListenerObj[this.listenerIndex].jsscript
          this.default = JSON.parse(JSON.stringify(this.eventListenerObj[this.listenerIndex].jsscript))
        }
        break
      case 'addPopWindowEvent':
        if (this.popWindowGetter.script === '') {
          this.sql = ''
        } else {
          this.sql = this.popWindowGetter.script.sql
          this.script = this.popWindowGetter.script
          this.default = JSON.parse(JSON.stringify(this.popWindowGetter.script))
        }
        break
      case 'execSQL':
        let eventObj = this.currentEventGetter
        if (eventObj.tb_window_element_action_exesql === '') {
          this.sql = ''
        } else {
          this.sql = eventObj.tb_window_element_action_exesql.sql
          this.script = eventObj.tb_window_element_action_exesql
          this.default = JSON.parse(JSON.stringify(eventObj.tb_window_element_action_exesql))
        }
        break
      case 'invokeService':
        console.log('1' + this.serviceObj)
        if (this.serviceObj.type) {
          this.sql = JSON.parse(JSON.stringify(this.serviceObj.sql))
        } else {
          this.sql = ''
          this.$set(this.serviceObj, 'type', 'db')
        }
        break
    }
  },
  methods: {
    ...mapActions(['updateScriptAction', 'updateSqlViewAction', 'updateFieldsAction', 'updateShowInvokeServiceScriptAction']),
    analyticSQL () {
      let obj = {
        type: 'sql',
        sql: this.sql,
        params: [
        ]
      }
      let result = getParamsToSql(this.sql)
      if (result.length > 0) {
        console.log(this)
        addParams(obj.params, result)
      } else {
        this.$delete(obj, 'params')
      }
      this.script = JSON.parse(JSON.stringify(obj))
    },
    submit () {
      if (this.type === 'invokeService') {
        this.$set(this.serviceObj, 'sql', this.sql)
        this.$set(this.serviceObj, 'params', this.script.params)
        this.updateShowInvokeServiceScriptAction(false)
      } else {
        let isError
        if (this.type === 'selectFields' && this.sql !== '') {
          let fieldsArray = getSqlQueryFields(this.sql)
          isError = fieldsArray.findIndex((e) => {
            return e === '*'
          })
          if (isError !== -1) {
            this.$message.warning('SQL语句不建议使用SELECT * FROM TABLE 语法')
          } else {
            this.$set(this.script, 'fields', ArrayToStr(fieldsArray))
            this.updateFieldsAction(fieldsArray)
          }
        }
        if (isError === -1 || isError === undefined) {
          this.updateScriptAction({ script: this.sql === '' ? '' : this.script, type: this.type })
        }
      }
    },
    close () {
      if (this.type === 'invokeService') {
        this.updateShowInvokeServiceScriptAction(false)
      } else {
        this.updateSqlViewAction(false)
        this.updateScriptAction({ script: this.default, type: this.type })
      }
    }
  }
}
</script>

<style scoped>

</style>
