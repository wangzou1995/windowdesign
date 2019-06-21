<template>
  <el-dialog width="800px" title="报文头参数配置" :visible="showHeaderParams" @close="close" append-to-body>
    <codemirror style="text-align: left" :options="options" v-model="jsonObj.headers" @blur="analyticJson">
    </codemirror>
    <base-filter v-if="jsonObj.params" :data-source="containerFilter"  :is-editor-name="false" :show-add="false" tab-name="参数"
                 :params="jsonObj.params" title="参数配置"></base-filter>
    <div style="margin-top: 10px; text-align: right ">
      <slot name="action">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" >确 定</el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
import BaseFilter from '@/components/editor/BaseFilter'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/theme/duotone-light.css'
import 'codemirror/addon/edit/closebrackets.js'
import { mapState, mapActions } from 'vuex'
import { addParams } from '@/until/ParamsAnalytic'

export default {
  name: 'showHeaderParams',
  props: {
    json: Object
  },
  components: { BaseFilter },
  data () {
    return {
      jsonObj: '',
      addParam: addParams,
      options: {
        tabSize: 8,
        mode: 'text/x-mysql',
        theme: 'duotone-light',
        lineNumbers: true,
        autocorrect: true,
        extraKeys: {
          'Tab': 'autocomplete'
        }
      }
    }
  },
  methods: {
    ...mapActions(['updateShowHeaderParamsAction']),
    analyticJson () {
      let params = this.getJsonParams(this.jsonObj.headers)
      if (!this.jsonObj.params && params.length > 0) {
        this.$set(this.jsonObj, 'params', [])
      }
      if (params.length > 0) {
        this.addParam(this.jsonObj.params, params)
      } else {
        this.$delete(this.jsonObj, 'params')
      }
    },
    close () {
      this.updateShowHeaderParamsAction(false)
    },
    submit () {
      for (let e in this.jsonObj) {
        if (this.jsonObj.hasOwnProperty(e)) {
          this.$set(this.json, e, this.jsonObj[e])
        }
      }
      this.updateShowHeaderParamsAction(false)
    }
  },
  computed: {
    ...mapState(['showHeaderParams'])
  },
  created () {
    if (this.json !== null) {
      this.jsonObj = JSON.parse(JSON.stringify(this.json))
    } else {
      this.jsonObj = JSON.parse(JSON.stringify({
        url: ''
      }))
    }
  }
}
</script>

<style scoped>

</style>
