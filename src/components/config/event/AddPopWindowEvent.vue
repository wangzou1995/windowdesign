<template>
  <div>
    <el-dialog width="850px" title="弹窗参数配置" :visible="showPopWindow" style="text-align: left" @close="close">
    <el-tabs v-model="popWindowName" type="card" editable @edit="handlePopWindowEdit" @tab-click="handleClick">
      <el-tab-pane v-for="(popWindow, index) in popWindowObjs" :key="index" :label="'弹窗'+(index + 1)" :name="'弹窗'+(index + 1)">
        <el-form>
          <el-divider content-position="left">基础配置</el-divider>
          <el-form-item>
          <div class="config">
            弹窗名称:
            <el-select size="small" v-model="popWindow.popwindowid" :value="popWindow.popwindowid">
              <el-option label="1" value="1"></el-option>
            </el-select>
          </div>
          <div class="config">
            填入容器:
            <el-select size="small" v-model="popWindow.fillcontainerid" :value="popWindow.fillcontainerid">
              <el-option label="1" value="1"></el-option>
            </el-select>
          </div>
          <div class="config">
            接收导入数据容器:
            <el-select size="small" v-model="popWindow.popwindowid" :value="popWindow.popwindowid">
              <el-option label="1" value="1"></el-option>
            </el-select>
          </div>
          <div class="config">
            填入字段:
            <el-select size="small" v-model="popWindow.fillinflds" :value="popWindow.fillinflds">
              <el-option label="1" value="1"></el-option>
            </el-select>
          </div>
          <div class="config">
          回写字段:
            <el-select size="small" v-model="popWindow.writebackflds" :value="popWindow.writebackflds">
              <el-option label="1" value="1"></el-option>
            </el-select>
          </div>
          <div class="config">
           &emsp;&emsp;&emsp;重复值检测:
            <el-select size="small" v-model="popWindow.ukfields" :value="popWindow.ukfields">
              <el-option label="1" value="1"></el-option>
            </el-select>
          </div>
          <div class="config">
            记录多选:
            <el-switch v-model="popWindow.multiselect" :value="popWindow.multiselect">
            </el-switch>
          </div>
          <div class="config">
            关闭时刷新主容器:
            <el-switch v-model="popWindow.refreshmainonclose" :value="popWindow.refreshmainonclose">
            </el-switch>
          </div>
          </el-form-item >
          <el-divider content-position="left">弹窗脚本配置</el-divider>
          <el-form-item>
            <div class="config">
            脚本类型:
            <el-select v-model="type" :value="type" size="small">
              <el-option v-for="(type, index) in scriptType" :label="type.label" :value="type.value" :key="index"></el-option>
            </el-select>
            </div>
            <div class="config">
              <el-button type="primary" size="small" @click="editScript(index)">条件脚本</el-button>
            </div>
            <div class="config">
              <el-button type="primary" size="small" @click="editFilter(index)" >过滤脚本</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="footer">
      <slot name="action">
      <el-button type="primary" size="small" @click="close">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
      </slot>
    </div>
    </el-dialog>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddPopWindowEvent',
  data () {
    return {
      popWindowObj: {
        actionid: '',
        popwindowid: '',
        fillinflds: '',
        fillcontainerid: '',
        script: '',
        filter: '',
        ukfields: '',
        writebackflds: '',
        multiselect: false,
        objtransid: '',
        importdatacon: '',
        refreshmainonclose: '',
        createtime: '',
        id: ''
      },
      popWindowObjs: [],
      popWindowName: '弹窗1',
      scriptType: this.elementTypes,
      type: ''
    }
  },
  methods: {
    ...mapActions(['updateAddWindowEventAction', 'updateScriptTypeAction',
      'updateApiParamViewAction', 'updateJsViewAction', 'updateSqlViewAction', 'updateApiSqlViewAction',
      'updatePopWindowIndexAction', 'submitPopWindowAction', 'updatePopWindowsAction',
      'updateContainerFilterViewAction', 'updateFilterTypeAction']),
    handlePopWindowEdit (targetName, action) {
      if (action === 'add') {
        this.popWindowObjs.push({
          actionid: this.currentSelect.tb_window_element_action[this.eventIndex].id,
          id: Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999),
          popwindowid: '',
          fillinflds: '',
          fillcontainerid: '',
          script: '',
          filter: [],
          ukfields: '',
          writebackflds: '',
          multiselect: false,
          objtransid: '',
          importdatacon: '',
          refreshmainonclose: '',
          createtime: ''
        })
        this.popWindowName = ('弹窗' + this.popWindowObjs.length)
        this.type = ''
      }
      if (action === 'remove') {
        let tabs = this.popWindowObjs
        let activeName = this.popWindowName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (('弹窗' + (index + 1)) === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = tabs[index + 1] ? '弹窗' + (index + 2) : '弹窗' + (index)
              }
            }
          })
        }

        this.popWindowName = activeName
        this.popWindowObjs = tabs.filter((tab, index) => ('弹窗' + (index + 1)) !== targetName)
      }
    },
    close () {
      this.updateAddWindowEventAction(false)
    },
    editScript (index) {
      if (this.type !== '') {
        this.updateScriptTypeAction('addPopWindowEvent')
        this.updatePopWindowIndexAction({ pop: this.popWindowObjs, index: index })
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
      } else {
        this.$message.warning('请选择脚本类型！')
      }
    },
    editFilter (index) {
      this.updatePopWindowIndexAction({ pop: this.popWindowObjs, index: index })
      this.updateFilterTypeAction('addPopWindowEvent')
      this.updateContainerFilterViewAction(true)
    },
    submit () {
      this.updatePopWindowsAction(this.popWindowObjs)
      this.submitPopWindowAction()
    },
    handleClick (tab) {
      this.initType(tab.index)
    },
    initType (index) {
      if (this.popWindowObjs[index].script !== '') {
        this.type = this.popWindowObjs[index].script.type
      } else {
        this.type = ''
      }
    }
  },
  created () {
    let pop = this.currentSelect.tb_window_element_action[this.eventIndex].tb_window_element_action_popwin
    if (pop.length > 0) {
      this.popWindowObjs = JSON.parse(JSON.stringify(pop))
    } else {
      this.popWindowObjs = []
      this.popWindowObj.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
      this.popWindowObj.actionid = this.currentSelect.tb_window_element_action[this.eventIndex].id
      this.popWindowObjs.push(JSON.parse(JSON.stringify(this.popWindowObj)))
    }
    this.initType(0)
  },
  computed: {
    ...mapState(['currentSelect', 'eventIndex', 'showPopWindow'])
  }
}
</script>

<style scoped>
.config {
  float: left;
  font-size: 12px;
  margin-left: 20px;
  margin-top: 10px;
}
  .footer{
    margin-top: -10px;
    float: right;
  }
</style>
