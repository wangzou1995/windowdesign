<template>
  <el-dialog title="SQL编辑" :visible="showSqlArrayEdit" width="800px" append-to-body @close="close">
    <el-tabs type="border-card" editable @edit="handleTabsEdit" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(sqlObj, index) in sqlArrayCopy" :key="index" :label="'SQL' + (index + 1)" :name="'SQL' + (index + 1)">
        <codemirror style="text-align: left" :options="options" v-model="sqlObj.sql" @blur="analyticSQL(sqlObj.sql, index)">
        </codemirror>
        <div style="font-size: 12px; margin: 10px 0 10px 0; width: 750px; height: 40px" v-if="fields.length > 0">
          <div style="float: left; margin-left: 20px;">
            执行结果Key字段:
            <el-select v-model="sqlObj.resultcode" :value="keyField" size="small">
              <el-option v-for="field in fields" :key="field" :label="field" :value="field"></el-option>
            </el-select>
          </div>
          <div style="float: left; margin-left: 40px;">
            执行结果Value字段:
            <el-select v-model="sqlObj.resultname" :value="keyField" size="small">
              <el-option v-for="field in fields" :key="field" :label="field" :value="field"></el-option>
            </el-select>
          </div>
        </div>
        <div>
        <ext-base-filter  v-if="sqlObj.params" :data-source="containerFilter"  :is-editor-name="false" :show-add="false" tab-name="参数"
                          :params="sqlObj.params" title="参数配置"></ext-base-filter></div>
      </el-tab-pane>
    </el-tabs>
    <div style="margin-top: 10px; text-align: right ">
      <slot name="action">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" >确 定</el-button>
      </slot>
    </div>
  </el-dialog>
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
import BaseFilter from '@/components/editor/BaseFilter'
export default {
  name: 'MultiSqlEditor',
  components: {
    'ext-base-filter': BaseFilter
  },
  props: {
    sqlArray: Array
  },
  data () {
    return {
      fields: [],
      activeName: 'SQL1',
      sqlArrayCopy: [],
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
      keyField: '',
      valueField: ''
    }
  },
  methods: {
    ...mapActions(['updateShowSqlArrayEditAction']),
    close () {
      this.updateShowSqlArrayEditAction(false)
    },
    analyticSQL (sql, index) {
      // 获取字段
      this.fields = getSqlQueryFields(sql)
      if (this.fields.length > 0) {
        this.$set(this.sqlArrayCopy[index], 'resultcode', '')
        this.$set(this.sqlArrayCopy[index], 'resultname', '')
      }
      // 获取变量
      let params = getParamsToSql(sql)
      if (params.length > 0) {
        let paramArray = []
        for (let i = 0, max = params.length; i < max; i++) {
          paramArray.push(
            {
              name: params[i],
              type: '',
              subject: '',
              value: ''
            }
          )
        }
        this.$set(this.sqlArrayCopy[index], 'params', paramArray)
      }
    },
    addSqlArrayCopy () {
      this.sqlArrayCopy.push({
        sql: ''
      })
      this.fields = []
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        this.addSqlArrayCopy()
        this.activeName = 'SQL' + this.sqlArrayCopy.length
      }
      if (action === 'remove') {
        let tabs = this.sqlArrayCopy
        let activeName = this.activeName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (('SQL' + (index + 1)) === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = 'SQL' + (tabs[index + 1] ? index + 2 : index)
              }
            }
          })
        }

        this.activeName = activeName
        this.sqlArrayCopy = tabs.filter((tab, index) => ('SQL' + (index + 1)) !== targetName)
        if (activeName.substring(3) < this.sqlArrayCopy.length) {
          this.fields = getSqlQueryFields(this.sqlArrayCopy[Number(activeName.substring(3)) - 1].sql)
        } else {
          this.fields = []
        }
      }
    },
    handleClick (tab) {
      this.fields = getSqlQueryFields(this.sqlArrayCopy[tab.index].sql)
    },
    submit () {
      this.clear()
      this.sqlArrayCopy.forEach((element, index) => {
        this.$set(this.sqlArray, index, element)
      })
      this.updateShowSqlArrayEditAction(false)
    },
    clear () {
      for (let i = 0; i < this.sqlArray.length; i++) {
        this.$delete(this.sqlArray, i)
      }
    }
  },
  computed: {
    ...mapState(['showSqlArrayEdit']),
    ...mapGetters([])
  },
  created () {
    if (this.sqlArray.length === 0) {
      this.addSqlArrayCopy()
    } else {
      this.fields = getSqlQueryFields(this.sqlArray[0].sql)
      this.sqlArrayCopy = JSON.parse(JSON.stringify(this.sqlArray))
    }
  }
}
</script>

<style scoped>

</style>
