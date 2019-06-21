<template>
  <div class="createWindow">
    <el-form :model="data" ref="form" label-width="90px" label-position="right" :rules="rules">
      <el-row>
        <el-col :span="12"><el-form-item label="窗口名称" prop="windowname">
          <el-input v-model="data.windowname" ></el-input>
        </el-form-item></el-col>
        <el-col :span="12">
          <el-form-item label="窗口标题" prop="windowtitle">
            <el-input v-model="data.windowtitle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应用" prop="prodid">
            <el-select clearable filterable v-model="data.prodid" :value="appName" @change="getDataAndObj(data.prodid)">
              <el-option v-for="(appElement, index) in apps" :value="appElement.prodid" :key="index"
                         :label="appElement.prodname"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="对象" prop="objid">
            <el-select clearable filterable v-model="data.objid" :value="objName">
              <el-option v-for="(objElement, index) in objs" :value="objElement.objid" :key="index"
                         :label="objElement.objname + ' (' + objElement.objdesc + ')' " ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="窗口类型" prop="uitype">
            <el-select clearable filterable v-model="data.uitype" :value="typeName" @change="gb">
              <el-option v-for="(windowElement, index) in windowTypes" :value="windowElement.value" :key="index"
                         :label="windowElement.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据源" prop="dsname">
            <el-select clearable filterable v-model="data.dsname" :value="datasourceName">
              <el-option v-for="(datasourceElement, index) in datasources" :value="datasourceElement.dsname" :key="index"
                         :label="datasourceElement.dsname + ' (' + datasourceElement.dsdesc + ')'"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="宽度">
            <el-input v-model="data.windowwidth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高度">
            <el-input v-model="data.windowheight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="排列方式">
            <el-select clearable filterable v-model="data.layouttype" :value="seqName">
              <el-option v-for="(seqElement, index) in seqs" :value="seqElement.value" :key="index"
                         :label="seqElement.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备" prop="devicetype">
            <el-select clearable filterable v-model="data.devicetype" :value="diviceName">
              <el-option v-for="(diviceElement, index) in divices" :value="diviceElement.value" :key="index"
                         :label="diviceElement.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="关闭时保存">
            <el-switch v-model="data.autosave"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" size="small" v-model="data.filter" @click="editWindowFilter">过滤条件</el-button>
        </el-col>
        <el-col :span="3" style="float: right">
          <el-button type="primary" @click="createWindow('form')">立即创建</el-button>
        </el-col>
      </el-row>
    </el-form>
    <my-dialog
      :visible="containerFilterView"
      ref="sqlView"
      width="800px"
      form
      :showClose="false"
    >
      <container-filter></container-filter>
    </my-dialog>
  </div>
</template>

<script>
import { checkName } from '@/until/validate'
import ContainerFilter from '@/components/editor/ContainerFilter'
import MyDialog from '@/components/MyDialog'
import { getOwnerApps, getProdDatasource, getProdObjects, createWindow } from '@/api/windowApi'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CreateWindow',
  components: { ContainerFilter, MyDialog },
  data () {
    return {
      checkName,
      appName: '',
      windowTypes: [
        {
          value: 'S',
          label: '单对象窗口'
        },
        {
          value: 'M',
          label: '多对象窗口'
        },
        {
          value: 'N',
          label: '无对象窗口'
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
      form: {
        windowname: '',
        windowtitle: '',
        prodid: '',
        uitype: '',
        objid: '',
        dsname: '',
        devicetype: ''
      },
      rules: {
        windowname: [
          { required: true, validator: checkName, trigger: ['blur', 'change'] }
        ],
        windowtitle: [
          { required: true, message: '请输入窗口标题', trigger: 'blur' }
        ],
        prodid: [
          { required: true, message: '请选择应用', trigger: ['blur', 'change'] }
        ],
        uitype: [
          { required: true, message: '请输入窗口类型', trigger: ['blur', 'change'] }
        ],
        objid: [
          { required: true, message: '请选择子对象', trigger: ['blur', 'change'] }
        ],
        dsname: [
          { required: true, message: '请选择数据源', trigger: ['blur', 'change'] }
        ],
        devicetype: [
          { required: true, message: '请选择窗口显示设备', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['updateFilterTypeAction', 'updateContainerFilterViewAction', 'updateAppsAction', 'updateObjsAction',
      'updateDatasourcesAction']),
    createWindow (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let body = {
            window: {
              deletes: [],
              creates: [],
              updates: []
            },
            tag: 0
          }
          let window = JSON.parse(JSON.stringify(this.data))
          window.isnew = true
          window.originalid = 99999999
          body.window.creates.push(window)
          createWindow(body).then(
            response => {
              this.$set(this.data, 'id', response.window[0].id)
              this.$router.push(
                {
                  path: '/Window'
                }
              )
            }
          ).catch(
            err => {
              this.$message.warning('创建失败，请稍后再试！' + err)
            }
          )
        } else {
        }
      })
    },
    gb (name) {
      if (name === 'N') {
        this.$set(this.rules.objid[0], 'required', false)
      } else {
        this.rules.objid[0].required = true
      }
    },
    getDataAndObj (prodid) {
      getProdDatasource(prodid).then(
        response => {
          this.updateDatasourcesAction(response.data)
        }
      ).catch(err => {
        this.$message('数据源接口不通！' + err)
      })
      getProdObjects(prodid).then(
        response => {
          this.updateObjsAction(response.data)
        }
      ).catch(
        err => {
          this.$message('数据源接口不通！' + err)
        })
    },
    editWindowFilter () {
      this.updateFilterTypeAction('windowFilter')
      this.updateContainerFilterViewAction(true)
    }
  },
  computed: {
    ...mapState({
      data: 'myWindow',
      containerFilterView: 'containerFilterView',
      apps: 'apps',
      objs: 'objs',
      datasources: 'datasources'
    })
  },
  created () {
    let paramsObj = this.$route.query
    if (paramsObj.hasOwnProperty('id') && paramsObj.id !== null) {
      this.$router.push(
        {
          path: '/Window',
          query: paramsObj
        }
      )
    }
  },
  mounted () {
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
}
</script>

<style scoped>
  .createWindow {
    width: 800px;
    height: 650px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }

  .el-select {
    width: 100%;
  }
</style>
