<template>
<el-dialog width="800px" title="URL模版参数配置" :visible="showUrlParams" @close="close" append-to-body>
  <el-input type="textarea" rows="4" v-model="jsonObj.url" @blur="analyticJson"></el-input>
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
import { addParams } from '@/until/ParamsAnalytic'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'UrlParamsEditor',
  props: {
    json: Object
  },
  components: { BaseFilter },
  data () {
    return {
      jsonObj: '',
      getParams: this.titleAnalyticToParams,
      addParam: addParams
    }
  },
  methods: {
    ...mapActions(['updateShowUrlParamsAction']),
    analyticJson () {
      let params = this.getParams(this.jsonObj.url)
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
      this.updateShowUrlParamsAction(false)
    },
    submit () {
      if (this.jsonObj.url.length > 0) {
        for (let e in this.jsonObj) {
          if (this.jsonObj.hasOwnProperty(e)) {
            this.$set(this.json, e, this.jsonObj[e])
          }
        }
      }
      this.updateShowUrlParamsAction(false)
    }
  },
  computed: {
    ...mapState(['showUrlParams'])
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
