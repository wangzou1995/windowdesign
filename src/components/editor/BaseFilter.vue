<template>
  <div >
  <div style="margin-bottom: 10px;"   v-show="params">
    <span style="font-size: 15px; text-align: left; font-weight: bold">{{title}}</span>
  </div>
  <el-tabs  v-model="paramName"
            type="border-card"
            v-show="params"
            :editable="showAdd" @edit="handleTabsEdit"
            :addable="showAdd"
  >
    <el-tab-pane v-for="(param, index) in params" :key="index"
                 :label="tabName + (index+1)" style="font-size: 12px" :name="tabName + (index+1)">
      <div>
        参数名称:
        <el-input :disabled="!isEditorName" size="small" v-model="param.name" style="width: 75%"></el-input>
      </div>
      <div>
        数据来源:
        <el-select v-model="param.type" size="small" placeholder="数据来源" style="width: 75%"
        :value="param.type">
          <el-option v-for="(e, eIndex) in dataSource" :label="e.label" :value="e.value"
                     :key="eIndex"></el-option>
        </el-select>
      </div>
      <div v-if="param.type === 'container'">
        容器名称:
        <el-select v-model="param.subject" size="small" placeholder="容器名称" style="width: 75%"
                   :disabled="param.type !== 'container'" :value="param.subject"
        >
          <el-option label="container" value="container"></el-option>
          <el-option label="global" value="global"></el-option>
          <el-option label="local" value="local"></el-option>
          <el-option label="constant" value="constant"></el-option>
        </el-select>
      </div>
      <div>
        参数数值:
        <el-select v-model="param.value" size="small" placeholder="参数数值" style="width: 75%"
        :value="param.value">
          <el-option label="数据库" value="db"></el-option>
          <el-option label="接口" value="api"></el-option>
        </el-select>
      </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'BaseFilter',
  props: {
    params: Array,
    isEditorName: Boolean,
    dataSource: Array,
    showAdd: Boolean,
    tabName: String,
    title: String
  },
  data () {
    return {
      paramName: this.tabName + '1'
    }
  },
  methods: {
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        let newTabName = this.tabName + (this.params.length + 1 + '')
        this.params.push({
          name: '',
          type: '',
          subject: '',
          value: ''
        })
        this.paramName = newTabName
      } else if (action === 'remove') {
        let tabs = this.params
        let activeName = this.paramName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if ((this.tabName + (index + 1 + '')) === targetName) {
              if (tabs[index + 1]) {
                activeName = (this.tabName + (index + 2 + ''))
              } else {
                activeName = (this.tabName + (index + ''))
              }
            }
          })
        }
        this.paramName = activeName
        this.$delete(this.params, (Number(targetName.substring(this.tabName.length)) - 1))
      }
    }
  }
}
</script>

<style scoped>

</style>
