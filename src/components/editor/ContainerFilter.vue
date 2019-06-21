<template>
  <div>
  <base-filter  :data-source="datasource"  :is-editor-name="true" :show-add="true" tab-name="过滤条件"
               :params="script" title="过滤条件配置"></base-filter>
  <div style="margin-top: 10px; text-align: right ">
    <slot name="action">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit" >确 定</el-button>
    </slot>
  </div>
  </div>
</template>

<script>
import BaseFilter from '@/components/editor/BaseFilter'
import { mapGetters, mapActions, mapState } from 'vuex'
import { containerFilter, containerFilterWindow } from '@/until/global'
export default {
  name: 'ContainerFilter',
  components: {
    BaseFilter
  },
  data () {
    return {
      default: '',
      script: []
    }
  },
  methods: {
    ...mapActions(['updateContainerFilterViewAction', 'updateContainerFilterAction']),
    submit () {
      this.updateContainerFilterAction(this.script)
    },
    close () {
      this.updateContainerFilterViewAction(false)
      this.updateContainerFilterAction(this.default)
    }
  },
  computed: {
    ...mapGetters(['getCurrentSelect', 'popWindowGetter']),
    ...mapState(['filterType', 'filterArray', 'myWindow']),
    datasource: function () {
      switch (this.filterType) {
        case 'windowFilter':
          return containerFilterWindow
        case 'containerFilter':
          return containerFilter
        default:
          return containerFilter
      }
    }
  },
  created () {
    switch (this.filterType) {
      case 'containerFilter':
        this.script = this.getCurrentSelect.filter
        this.default = JSON.parse(JSON.stringify(this.getCurrentSelect.filter))
        break
      case 'popWindowFilter':
        this.script = JSON.parse(JSON.stringify(this.filterArray))
        this.default = JSON.parse(JSON.stringify(this.filterArray))
        break
      case 'addPopWindowEvent':
        this.script = JSON.parse(JSON.stringify(this.popWindowGetter.filter))
        this.default = JSON.parse(JSON.stringify(this.popWindowGetter.filter))
        break
      case 'windowFilter':
        this.script = JSON.parse(JSON.stringify(this.myWindow.filter))
        this.default = JSON.parse(JSON.stringify(this.myWindow.filter))
        break
      default:
        this.default = ''
        this.script = ''
        break
    }
  }
}
</script>

<style scoped>

</style>
