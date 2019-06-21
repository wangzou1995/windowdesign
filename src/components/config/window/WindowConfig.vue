<template>
  <el-form v-model="myWindow">
    <div class="baseWindowConfig">
      <span class="baseWindow" >
        窗口ID:
      </span>
      <el-input v-model="myWindow.id" style="width: 210px;" size="small"></el-input>
    </div>
    <div class="baseWindowConfig">
       <span class="baseWindow" >
         窗口名称:
      </span>
      <el-input v-model="myWindow.windowname" style="width: 210px;" size="small"></el-input>
    </div>
    <div class="baseWindowConfig">
      <span class="baseWindow" >
        窗口标题:
      </span>
      <el-input v-model="myWindow.windowtitle"  style="width: 210px;" size="small"></el-input>
    </div>
    <div class="baseWindowConfig">
       <span class="baseWindow" >
        应用:
      </span>
      <el-select clearable  filterable v-model="myWindow.prodid" :value="appName" style="width: 210px" size="small">
        <el-option v-for="(appElement, index) in apps" :value="appElement.value" :key="index"
                   :label="appElement.label"></el-option>
      </el-select>
    </div>
    <div class="baseWindowConfig">
      <span class="baseWindow" >
        窗口类型:
      </span>
      <el-select clearable filterable v-model="myWindow.uitype" :value="typeName"  style="width: 210px" size="small">
        <el-option v-for="(windowElement, index) in windowTypes" :value="windowElement.value" :key="index"
                   :label="windowElement.label"></el-option>
      </el-select>
    </div>
    <div class="baseWindowConfig">
      <span class="baseWindow">
        宽度:
      </span>
      <el-input v-model="myWindow.windowwidth" style="width: 210px" size="small"></el-input>
    </div>
    <div class="baseWindowConfig">
      <span class="baseWindow">
        高度:
      </span>
      <el-input v-model="myWindow.windowheight" style="width: 210px" size="small"></el-input>
    </div>
    <div class="baseWindowConfig">
      <span class="baseWindow">
        排列方式
      </span>
      <el-select clearable filterable v-model="myWindow.layouttype" :value="seqName" style="width: 210px" size="small">
        <el-option v-for="(seqElement, index) in seqs" :value="seqElement.value" :key="index"
                   :label="seqElement.label"></el-option>
      </el-select>
    </div>
    <div class="baseWindowConfig">
      <span class="baseWindow">
        数据源
      </span>
      <el-select clearable filterable v-model="myWindow.dsname" :value="datasourceName" style="width: 210px" size="small">
        <el-option v-for="(datasourceElement, index) in datasources" :value="datasourceElement.value" :key="index"
                   :label="datasourceElement.label"></el-option>
      </el-select>
    </div>
    <div class="baseWindowConfig">
      <span class="baseWindow">
        设备:
      </span>
      <el-select clearable filterable v-model="myWindow.devicetype" :value="diviceName" style="width: 210px" size="small">
        <el-option v-for="(diviceElement, index) in divices" :value="diviceElement.value" :key="index"
                   :label="diviceElement.label"></el-option>
      </el-select>
    </div>
    <div class="baseWindowConfig">
      <span class="baseWindow">
        对象:
      </span>
      <el-select  clearable filterable v-model="myWindow.objid" :value="objName" style="width: 210px" size="small">
        <el-option v-for="(objElement, index) in objs" :value="objElement.value" :key="index"
                   :label="objElement.label"></el-option>
      </el-select>
    </div>
    <div class="baseWindowConfig">
      <el-checkbox style="margin-left: -50px" v-model="myWindow.autosave">关闭时保存</el-checkbox>
      <el-button style="margin-top: 10px" type="primary" size="small" @click="editWindowFilter">过滤条件</el-button>
    </div>
  </el-form>
</template>

<script>
import { isInErrorArray } from '@/until/ArrayUntil'
import { getProdDatasource, getOwnerApps, getProdObjects, getWinById } from '@/api/windowApi'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CreateWindow',
  data () {
    return {
      isInErrorArray,
      appName: '',
      windowTypes: [
        {
          'value': 'S',
          'label': '单对象窗口'
        },
        {
          'value': 'M',
          'label': '多对象窗口'
        },
        {
          'value': 'N',
          'label': '无对象窗口'
        }
      ],
      typeName: null,
      seqs: [
        { 'value': 'vbox', 'label': '纵向' },
        { 'value': 'hbox', 'label': '水平' }
      ],
      seqName: null,
      datasourceName: null,
      diviceName: null,
      divices: [
        { 'value': 0, 'label': 'PC端' },
        { 'value': 1, 'label': '移动端' }
      ],
      objName: null,
      formConfig: {
        windowname: '',
        windowtitle: '',
        prodid: '',
        uitype: '',
        objid: '',
        dsname: '',
        devicetype: ''
      }
    }
  },
  methods: {
    ...mapActions(['updateFilterTypeAction', 'updateContainerFilterViewAction', 'updateAppsAction', 'updateObjsAction',
      'updateDatasourcesAction', 'updateMyWindowAction']),
    editWindowFilter () {
      this.updateFilterTypeAction('windowFilter')
      this.updateContainerFilterViewAction(true)
    },
    init () {
      getWinById(this.myWindow.id).then(
        response => {
          this.updateMyWindowAction(response.data)
        }
      ).catch(
        err => {
          this.$message.warning('数据接口有问题！' + err)
        }
      )
      if (this.apps.length === 0) {
        getOwnerApps().then(
          response => {
            this.updateAppsAction(response.data)
          }
        ).catch(
          err => {
            this.$message.warning('数据接口有问题！' + err)
          }
        )
      }
      if (this.objs.length === 0) {
        getProdObjects(this.myWindow.prodid).then(
          response => {
            this.updateObjsAction(response.data)
          }
        ).catch(
          err => {
            this.$message.warning('数据接口有问题！' + err)
          }
        )
      }
      if (this.datasources.length === 0) {
        getProdDatasource(this.myWindow.prodid).then(
          response => {
            this.updateDatasourcesAction(response.data)
          }
        ).catch(
          err => {
            this.$message.warning('数据接口有问题！' + err)
          }
        )
      }
    }
  },
  computed: {
    ...mapState(['myWindow', 'apps', 'objs', 'datasources'])
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
  .createWindow {
    width: 800px;
    margin: 0 auto;
  }

  .el-select {
    width: 100%;
  }
  .baseWindow {
    display: block;
    width: 60px;
    height: 40px;
    text-align: right;
    line-height: 40px;
    float: left;
    margin-right: 10px;
  }
  .baseWindowConfig {
    font-size: 12px;
    width: 280px;
    height: 40px;
    line-height: 40px;
  }
</style>
