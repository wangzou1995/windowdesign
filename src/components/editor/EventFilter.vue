<template>
  <el-dialog title="条件过滤编辑器" :visible="showEventFilter" width="800px" append-to-body @close="close">
  <div>
    <base-filter  :data-source="containerFilter"  :is-editor-name="true" :show-add="true" tab-name="过滤条件"
                  :params="newScript" title="过滤条件配置"></base-filter>
    <div style="margin-top: 10px; text-align: right ">
      <slot name="action">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" >确 定</el-button>
      </slot>
    </div>
  </div>
  </el-dialog>
</template>

<script>
import BaseFilter from '@/components/editor/BaseFilter'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'EventFilter',
  components: {
    BaseFilter
  },
  props: {
    script: Array
  },
  data () {
    return {
      newScript: ''
    }
  },
  methods: {
    ...mapActions(['updateEventFilterAction']),
    close () {
      this.updateEventFilterAction(false)
    },
    submit () {
      this.clear()
      if (!(this.newScript.length === 1 && this.newScript[0].name === '')) {
        for (let i = 0; i < this.newScript.length; i++) {
          this.$set(this.script, i, {})
          for (let e in this.newScript[i]) {
            if (this.newScript[i].hasOwnProperty(e)) {
              this.$set(this.script[i], e, this.newScript[i][e])
            }
          }
        }
      }
      this.updateEventFilterAction(false)
    },
    clear () {
      for (let i = 0; i < this.script.length; i++) {
        this.$delete(this.script, i)
      }
    }
  },
  created () {
    if (this.script === ' ' || this.script.length === 0) {
      this.newScript = [
        {
          name: '',
          type: '',
          subject: '',
          value: ''
        }
      ]
      this.default = []
    } else {
      this.newScript = JSON.parse(JSON.stringify(this.script))
    }
  },
  computed: {
    ...mapState(['showEventFilter'])
  }
}
</script>

<style scoped>

</style>
