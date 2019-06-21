<template>
  <!--<dialog title="SQL脚本编辑" :visible.sync="sqlView" :width="width"-->
          <!--:close-on-click-modal="false"-->
          <!--center-->
          <!--&gt;-->
  <div>
    <div style="margin-bottom: 10px">
    <span style="font-size: 15px; text-align: left; font-weight: bold">JS脚本编辑</span>
    </div>
  <codemirror style="text-align: left" :options="options" v-model="js" @blur="analyticJs">
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
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/theme/duotone-light.css'
import 'codemirror/addon/edit/closebrackets.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import { getParamsToSql } from '@/until/AnalyticSQL'
import BaseFilter from '@/components/editor/BaseFilter'
export default {
  name: 'JsEditor',
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
        mode: 'text/javascript',
        theme: 'duotone-light',
        lineNumbers: true,
        autocorrect: true,
        extraKeys: {
          'Tab': 'autocomplete'
        },
        matchBrackets: true,
        autoCloseBrackets: true
      },
      js: '',
      script: Object,
      obj: {
        type: 'js',
        js: ''
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
    ...mapGetters(['getSqlView', 'getCurrentSelect', 'popWindowGetter', 'currentEventGetter']),
    ...mapState(['switchfilter', 'selectScript', 'listenerIndex', 'eventListenerObj']),
    tabName: function () {
      return '参数'
    }
  },
  created () {
    switch (this.type) {
      case 'elementFormat':
        if (this.getCurrentSelect.tb_window_formatsearch.length === 0) {
          this.js = ''
        } else {
          this.js = this.getCurrentSelect.tb_window_formatsearch[0].script.js
          this.script = this.getCurrentSelect.tb_window_formatsearch[0].script
        }
        this.default = JSON.parse(JSON.stringify(this.getCurrentSelect.tb_window_formatsearch[0].script))
        break
      case 'elementInputFilter':
        if (this.switchfilter !== '') {
          this.js = this.switchfilter.js
          this.script = this.switchfilter
          this.default = JSON.parse(JSON.stringify(this.switchfilter.filter))
        } else {
          this.js = ''
        }
        break
      case 'selectFields':
        // 如果已经存在 则直接替换
        if (this.selectScript !== '') {
          this.js = this.selectScript.js
          this.script = this.selectScript
          this.default = JSON.parse(JSON.stringify(this.selectScript))
          this.updateFieldsAction(this.selectScript.fields.split(','))
        } else {
          this.js = ''
          this.updateFieldsAction([])
        }
        break
      case 'eventListener':
        if (this.eventListenerObj === '') {
          this.js = ''
        } else {
          this.js = this.eventListenerObj[this.listenerIndex].jsscript.js
          this.script = this.eventListenerObj[this.listenerIndex].jsscript
          this.default = JSON.parse(JSON.stringify(this.eventListenerObj[this.listenerIndex].jsscript))
        }
        break
      case 'addPopWindowEvent':
        if (this.popWindowGetter.script === '') {
          this.js = ''
        } else {
          this.js = this.popWindowGetter.script.js
          this.script = this.popWindowGetter.script
          this.default = JSON.parse(JSON.stringify(this.popWindowGetter.script))
        }
        break
      case 'execJS':
        if (this.currentEventGetter.tb_window_element_action_js.length === 0) {
          this.js = ''
        } else {
          this.js = this.currentEventGetter.tb_window_element_action_js[0].customevent.js
          this.script = this.currentEventGetter.tb_window_element_action_js[0].customevent
          this.default = JSON.parse(JSON.stringify(this.currentEventGetter.tb_window_element_action_js[0].customevent))
        }
        break
      case 'invokeService':
        if (this.serviceObj.type) {
          this.js = JSON.parse(JSON.stringify(this.serviceObj.js))
        } else {
          this.js = ''
          this.$set(this.serviceObj, 'type', 'js')
        }
        break
      default:
        break
    }
  },
  methods: {
    ...mapActions(['updateScriptAction', 'updateJsViewAction', 'updateFieldsAction', 'updateShowInvokeServiceScriptAction']),
    analyticJs () {
      let obj = {
        type: 'js',
        js: this.js,
        params: [
        ]
      }
      if (this.js) {
        let result = getParamsToSql(this.js)
        if (result.length > 0) {
          this.addParam(obj.params, result)
        } else {
          this.$delete(this.script, 'params')
        }
        this.script = JSON.parse(JSON.stringify(obj))
      }
    },
    submit () {
      if (this.js === '') {
        this.$message.warning('请输入JavaScript脚本！')
      } else {
        if (this.type === 'invokeService') {
          this.$set(this.serviceObj, 'sql', this.sql)
          this.$set(this.serviceObj, 'params', this.script.params)
          this.updateShowInvokeServiceScriptAction(false)
        } else {
          this.updateScriptAction({ script: this.script, type: this.type })
        }
      }
    },
    close () {
      if (this.type === 'invokeService') {
        this.updateShowInvokeServiceScriptAction(false)
      } else {
        this.updateJsViewAction(false)
        this.updateScriptAction({ script: this.default, type: this.type })
      }
    }
  }
}
</script>

<style scoped>

</style>
