<template>
  <div>
  <el-form label-position="top">
    <el-form-item >
      <div style="font-size: 12px">
        <div>
          数据源:
          <el-select  size="small" style="width: 200px; margin-bottom: 10px" :value="formatSearch.dsname" v-model="formatSearch.dsname" @change="submitName"
          >
            <el-option v-for="(type, index) in scriptTypes" :key="index"
                       :label="type.label"
                       :value="type.value">
            </el-option>
          </el-select>
        </div>
        <div>
          生效于:
          <el-select :value="formatSearch.availableat" size="small" style="width: 200px; margin-bottom: 10px" v-model="formatSearch.availableat"
          >
            <el-option v-for="(type, index) in available" :key="index"
                       :label="type.label"
                       :value="type.value">
            </el-option>
          </el-select>
        </div>
        <div>
          脚本类型:
          <el-select :value="type" size="small" style="width: 200px; margin-bottom: 10px" v-model="type"
          >
            <el-option v-for="(type, index) in scriptTypes" :key="index"
                       :label="type.label"
                       :value="type.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button  style="float: left;" type="primary" @click="editor" icon="el-icon-edit" size="small">编辑脚本
          </el-button>
          <el-button  style="float: left;"  type="primary" @click="resetConfig" icon="el-icon-remove" size="small"
                      :disabled="this.currentSelect.tb_window_formatsearch.length === 0">清空配置
          </el-button>
        </div>
      </div>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const available = [
  { label: '所有动作', value: 'A' },
  { label: '新增记录', value: 'C' },
  { label: '修改记录', value: 'U' },
  { label: '新增/修改', value: 'D' },
  { label: '读取数据', value: 'R' }
]
export default {
  name: 'ElementFormatConfig',
  data () {
    return {
      type: '',
      scriptTypes: this.elementTypes,
      formatSearch: {
        elementid: '',
        createtime: '',
        dsname: '',
        availableat: '',
        id: '',
        script: ''
      },
      available
    }
  },
  methods: {
    ...mapActions(['updateScriptTypeAction', 'updateJsViewAction', 'updateSqlViewAction', 'updateApiSqlViewAction', 'updateApiParamViewAction',
      'updateElementFormatAction', 'resetFormatConfigAction']),
    reset () {
      let length = arguments.length
      if (length === 0 || length > 2) {
        throw new Error('调用此方法需要参数一个或两个！')
      } else {
        for (let element in arguments[0]) {
          // 判断某个对象是否含有指定的属性的
          if (arguments[0].hasOwnProperty(element)) {
            this.$set(arguments[0], element, length === 2 ? arguments[1][element] : '')
          }
        }
      }
    },
    /**
     *格式脚本编辑点击事件
     */
    editor: function () {
      if (this.formatSearch.dsname === '' || this.formatSearch.availableat === '' || this.type === '') {
        this.$message.warning('请完成 数据源、生效于、脚本类型 属性配置！')
      } else {
        this.updateElementFormatAction({ format: JSON.parse(JSON.stringify(this.formatSearch)), type: 'all' })
        this.updateScriptTypeAction('elementFormat')
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
          default:
            this.$message.warning('请选择脚本类型再进行脚本编辑！')
            break
        }
      }
    },
    submitName () {
      this.updateElementFormatAction({ format: JSON.parse(JSON.stringify(this.formatSearch)), type: 'name' })
    },
    resetConfig () {
      this.resetFormatConfigAction()
      this.reset(this.formatSearch)
      this.type = ''
    }
  },
  computed: {
    currentObj () {
      return this.$store.state.currentSelect
    },
    ...mapState(['jsView', 'scriptType', 'currentSelect'])
  },
  watch: {
    currentObj (val) {
      // 初始化 formatScriptType
      let newVal = JSON.parse(JSON.stringify(val))
      if (newVal.tb_window_formatsearch.length > 0) {
        switch (newVal.tb_window_formatsearch[0].script.type) {
          case 'api':
            if (newVal.tb_window_formatsearch[0].script.sql) {
              this.type = 'apiSql'
              break
            } else {
              this.type = 'apiParams'
              break
            }
          default:
            this.type = newVal.tb_window_formatsearch[0].script.type
            break
        }
        // 初始化formatSearch
        this.formatSearch = newVal.tb_window_formatsearch[0]
        this.reset(this.formatSearch, newVal.tb_window_formatsearch[0])
      } else {
        this.reset(this.formatSearch)
        this.type = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
