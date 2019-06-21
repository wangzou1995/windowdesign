<template>
  <div>
  <el-button type="primary" size="small" icon="el-icon-plus" @click="addPopWindowConfig">添加弹窗配置</el-button>
    <el-divider></el-divider>
    <el-table :data="currentSelect.tb_window_inputfields" style="width: 100%;"
              v-if="currentSelect.tb_window_inputfields.length > 0"
              border
              stripe>
      <el-table-column
        fixed
        prop="id"
        label="窗口名称"
        width="190px">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="90px">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index)"
            type="text"
            size="small">
            移除
          </el-button>
          <el-button
            @click.native.prevent="editPopWindowConfig(scope.$index)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible="isShowPopWindowConfig"
               title="输入弹窗配置"
               width="700px"
               :show-close="false"
    >
      <el-form :inline="true" label-position="left">
        <el-form-item label="弹出窗口">
          <el-select v-model="inputObject.popwindowid" :value="inputObject.popwindowid">
            <el-option label="窗口1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="弹出主键字段">
          <el-select v-model="inputObject.popkeyfield" :value="inputObject.popkeyfield">
            <el-option label="窗口1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回写字段">
          <el-select v-model="inputObject.writebackflds" :value="inputObject.writebackflds">
            <el-option label="窗口1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可输入值不存在">
          <el-switch v-model="inputObject.allowerrorvalue"></el-switch>
        </el-form-item>
        <el-form-item label="脚本类型">
          <el-select v-model="type" :value="type">
            <el-option v-for="(option, index) in scriptType" :key="index"  :label="option.label"
                       :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="showScript">条件脚本</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="showWindowFilter">弹窗过滤条件</el-button>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="输入值过滤SQL">
          <el-input type="textarea" rows="4" v-model="inputObject.keyinputsql" placeholder="请输入布尔等式，程序会自动添加到SQL语句的WHERE子句后面！"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="close">取 消</el-button>
        <el-button type="primary" @click.stop="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ElementPopWindowInputConfig',
  data () {
    return {
      inputObject: {
        id: String,
        elementid: String,
        switchfilter: Object,
        popwindowid: String,
        filter: Array,
        popkeyfield: String,
        writebackflds: String,
        keyinputsql: String,
        allowerrorvalue: Boolean
      },
      scriptType: this.elementTypes,
      defaultScript: '',
      currentIndex: -1,
      isShowPopWindowConfig: false,
      isScript: false,
      type: '',
      isEditor: false
    }
  },
  methods: {
    ...mapActions(['updateScriptTypeAction', 'updateElementInputConfigViewAction', 'removeInputFieldsAction', 'updateInputIndexAction',
      'updateApiParamViewAction', 'updateJsViewAction', 'updateSqlViewAction', 'updateApiSqlViewAction', 'updateSqlTypeAction', 'updateInputObjAction',
      'updateInputFilterAction', 'updateContainerFilterViewAction', 'updateFilterTypeAction', 'updateFilterArrayAction', 'updateSwitchFilterAction',
      'updateInputObj2Action']),
    addPopWindowConfig () {
      // 初始化inputObj
      this.resetInputObj()
      this.updateInputIndexAction(this.currentSelect.tb_window_inputfields.length)
      this.isEditor = false
      this.updateType()
    },
    editPopWindowConfig (index) {
      this.updateInputIndexAction(index)
      // 更新state中的filterArray属性
      if (this.currentSelect.tb_window_inputfields[index].filter.length > 0) {
        this.updateFilterArrayAction(this.currentSelect.tb_window_inputfields[index].filter)
      }
      // 更新state中的switchFilter属性
      if (this.currentSelect.tb_window_inputfields[index].switchfilter !== '') {
        this.updateSwitchFilterAction(this.currentSelect.tb_window_inputfields[index].switchfilter)
      }
      // 更新state中的inputObj
      this.updateInputObj2Action(this.currentSelect.tb_window_inputfields[index])
      this.resetInputObj(JSON.parse(JSON.stringify(this.currentSelect.tb_window_inputfields[index])))
      this.currentIndex = index
      this.isEditor = true
      this.updateType()
    },
    resetInputObj () {
      let length = arguments.length
      for (let field in this.inputObject) {
        if (this.inputObject.hasOwnProperty(field)) {
          this.$set(this.inputObject, field, length === 1 ? arguments[0][field] : '')
        }
      }
      this.isShowPopWindowConfig = true
    },
    close () {
      this.isShowPopWindowConfig = false
      this.type = ''
    },
    submit () {
      this.isShowPopWindowConfig = false
      this.updateScriptTypeAction('elementInput')
      this.updateInputObjAction({ script: this.inputObject, type: this.isEditor })
    },
    deleteRow (index) {
      this.removeInputFieldsAction(index)
    },
    showScript () {
      // 先更新inputObj
      if (this.type === '') {
        this.$message.warning('请选择脚本类型')
      } else {
        this.updateScriptTypeAction('elementInputFilter')
        switch (this.type) {
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
    showWindowFilter () {
      // 第一
      this.updateFilterTypeAction('popWindowFilter')
      this.updateContainerFilterViewAction(true)
    },
    updateType () {
      if (this.inputObject.switchfilter !== '') {
        this.type = this.inputObject.switchfilter.type
      } else {
        this.type = ''
      }
    }
  },
  created () {
  },
  computed: {
    ...mapState(['currentSelect', 'elementInputConfigView', 'apiParamView', 'inputObj', 'inputIndex'])
  }
}
</script>

<style scoped>

</style>
