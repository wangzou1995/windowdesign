<template>
  <div >
  <el-dialog style="text-align: left"  width="1100px" :visible="showSqlEvent" @close="close" title="配置界面" :close-on-click-modal="false"
  top="5vh">
    <el-tabs v-model="activeName" type="border-card" editable @edit="handleTabsEdit">
      <el-tab-pane v-for="(execSql, index) in execSqlArray" :key="index" :label="'SQL' + (index + 1)" :name="'SQL' + (index + 1)">
        <el-form style="text-align: left">
          <el-form-item>
            <el-divider content-position="left">脚本配置</el-divider>
            <div class="execSqlScriptClass">
              执行前提示:
              <el-select size="small" v-model="execSql.inputbox" :value="execSql.inputbox">
              </el-select>
            </div>
            <div class="execSqlScriptClass">
              文本变量名:
              <el-input size="small" v-model="execSql.inputvarname" style="width: 60%; margin-left: 5px" >
              </el-input>
            </div>
            <div class="execSqlScriptClass">
              数据源:
              <el-select size="small" v-model="execSql.dsname" :value="execSql.dsname">
              </el-select>
            </div>
            <div class="execSqlScriptClass">
              <el-button type="primary" size="small" @click="editScript(index)">脚本编辑
              </el-button>
            </div>
            <div class="execSqlScriptClass">
              <el-button type="primary" size="small" @click="editSwitch(index)">条件脚本
              </el-button>
            </div>
            <div class="execSqlScriptClass">
              提示信息:<el-input type="textarea" rows="3" size="small" v-model="execSql.inputtipinfo" style="width: 1000px;">
            </el-input>
            </div>
          </el-form-item>
          <el-form-item>
          <el-divider content-position="left">基础配置</el-divider>
          <div class="execSqlClass">
            成功后刷新容器:
            <el-select size="small" v-model="execSql.refreshdatacon" :value="execSql.refreshdatacon">
            </el-select>
          </div>
          <div class="execSqlClass">
            所有记录上执行:
            <el-switch size="small" v-model="execSql.executeonall">
            </el-switch>
          </div>
          <div class="execSqlClass">
            成功后关闭窗口:
            <el-switch size="small" v-model="execSql.closeaftersuccess">
            </el-switch>
          </div>
          <div  class="execSqlClass">
            保存后操作:
            <el-switch size="small" v-model="execSql.opaftersave">
            </el-switch>
          </div>
          <div class="execSqlClassText">
            成功后提示信息:
            <el-input size="small" v-model="execSql.successinfo" rows="3" type="textarea" style="width: 1000px">
            </el-input>
          </div>
          </el-form-item>
          <el-form-item>
            <el-divider content-position="left">数据导入配置</el-divider>
            <div class="execSqlDataClass">
              接受导入数据容器：
              <el-select size="small" :value="execSql.importdatacon" v-model="execSql.importdatacon">
              </el-select>
            </div>
            <div class="execSqlDataClass">
              重复值检测：
              <el-select size="small" :value="execSql.ukfields" v-model="execSql.ukfields">
              </el-select>
            </div>
            <div class="execSqlDataClass">
              回写字段：
              <el-select size="small" :value="execSql.writebackflds" v-model="execSql.writebackflds">
              </el-select>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div style="margin-top: 10px; text-align: right ">
    <slot name="action">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit" >确 定</el-button>
    </slot>
    </div>
    <ext-multi-sql-editor v-if="showSqlArrayEdit" :sql-array="execSqlArray[sqlIndex].customevent"></ext-multi-sql-editor>
    <ext-event-filter v-if="showEventFilter" :script="execSqlArray[sqlIndex].switchfilter"></ext-event-filter>
  </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import MultiSqlEditor from '@/components/editor/MultiSqlEditor'
import EventFilter from '@/components/editor/EventFilter'
export default {
  name: 'ExecSQLEvent',
  components: {
    'ext-multi-sql-editor': MultiSqlEditor,
    'ext-event-filter': EventFilter
  },
  computed: {
    ...mapState(['showSqlEvent', 'showSqlArrayEdit', 'showEventFilter']),
    ...mapGetters(['currentEventGetter'])
  },
  data () {
    return {
      execSqlObj: {
        id: '',
        actionid: '',
        itemid: '',
        switchfilter: [],
        dsname: '',
        customevent: [],
        inputbox: '',
        inputtipinfo: '',
        inputvarname: '',
        ukfields: '',
        writebackflds: '',
        multiselect: false,
        importdatacon: '',
        opaftersave: false,
        refreshdatacon: '',
        successinfo: '',
        closeaftersuccess: false,
        executeonall: false
      },
      execSqlArray: [],
      activeName: 'SQL1',
      sqlIndex: -1,
      defaultArray: ''
    }
  },
  methods: {
    ...mapActions(['updateShowSqlEventAction', 'updateExecSqlArrayEventAction', 'updateShowSqlArrayEditAction',
      'updateEventFilterAction']),
    close () {
      this.resetArray()
      this.updateShowSqlEventAction(false)
    },
    resetArray () {
      for (let i = 0; i < this.defaultArray.length; i++) {
        this.$set(this.currentEventGetter.tb_window_element_action_exesql, i, {})
        for (let e in this.defaultArray[i]) {
          if (this.defaultArray[i].hasOwnProperty(e)) {
            this.$set(this.currentEventGetter.tb_window_element_action_exesql[i], e, this.defaultArray[i][e])
          }
        }
      }
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        this.addSqlObj(false)
        this.activeName = 'SQL' + this.execSqlArray.length
      }
      if (action === 'remove') {
        let tabs = this.execSqlArray
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
        } else {
          activeName = 'SQL' + (this.execSqlArray.length - 1)
        }
        this.activeName = activeName
        this.execSqlArray = tabs.filter((tab, index) => ('SQL' + (index + 1)) !== targetName)
        // 初始化
        this.execSqlArray.forEach((tab, index) => {
          tab.itemid = index + 1
        })
      }
    },
    addSqlObj (isInit) {
      if (isInit) {
        this.execSqlArray = []
      }
      this.execSqlObj.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
      this.execSqlObj.actionid = this.currentEventGetter.id
      this.execSqlArray.push(JSON.parse(JSON.stringify(this.execSqlObj)))
      this.execSqlArray[this.execSqlArray.length - 1].itemid = this.execSqlArray.length
    },
    submit () {
      this.updateExecSqlArrayEventAction(this.execSqlArray)
      this.updateShowSqlEventAction(false)
    },
    editScript (index) {
      this.sqlIndex = index
      this.updateShowSqlArrayEditAction(true)
    },
    editSwitch (index) {
      this.sqlIndex = index
      this.updateEventFilterAction(true)
    }
  },
  created () {
    if (this.currentEventGetter.tb_window_element_action_exesql.length === 0) {
      this.addSqlObj(true)
      this.defaultArray = []
    } else {
      this.execSqlArray = this.currentEventGetter.tb_window_element_action_exesql
      this.defaultArray = JSON.parse(JSON.stringify(this.execSqlArray))
    }
  }
}
</script>

<style scoped>
.execSqlClass {
  float: left;
  margin: 10px 80px 0 0 ;
  height: 40px;
  line-height: 40px;
  font-size: 12px
}
  .execSqlClassText {
    float: left;
    margin: 10px 20px 0 0 ;
    font-size: 12px
  }
  .execSqlDataClass {
    float: left;
    margin: 10px 30px 0 0 ;
    height: 40px;
    line-height: 40px;
    font-size: 12px
  }
.execSqlScriptClass {
  float: left;
  margin: 10px 30px 0 0 ;
  font-size: 12px
}
</style>
