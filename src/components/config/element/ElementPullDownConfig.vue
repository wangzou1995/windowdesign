<template>
  <div>
    <div style="text-align: center">
  <el-button  type="primary" size="small" @click="editShowPull">下拉数据源配置</el-button>
    </div>
  <el-dialog :lock-scroll="false" title="下拉数据源配置" width="830px"  :visible="showPullDown" @close="close">
  <el-form>
    <el-form-item>
      <div style="font-size: 12px; margin-top: 10px; float: left;">
        列&emsp;&emsp;&emsp;数:
        <el-input style="width: 70%;"  v-model="pullDownObj.columns" size="small"></el-input>
      </div>
      <div style="font-size: 12px; margin-top: 10px; float: left;">
        系统选择项:
        <el-select :value="pullDownObj.specialitems" v-model="pullDownObj.specialitems"  size="small">
          <el-option label="角色" value="role"></el-option>
          <el-option label="用户" value="user"></el-option>
        </el-select>
      </div>
      <div style="font-size: 12px; margin-top: 10px; float: left; margin-left: 10px">
        可输入不存在值:
        <el-switch v-model="pullDownObj.allowerrorvalue" size="small"></el-switch>
        &emsp;可新建:
        <el-switch v-model="pullDownObj.createable" size="small"></el-switch>
      </div>
    </el-form-item>
    <el-form-item  style="font-size: 12px;">
      <a-card  hoverable
               style="width: 100%;" >
      <div style=" margin-left: -10px">
        <el-radio-group v-model="dataType" style="margin-bottom: 30px; text-align: center; width: 100%"
                        size="small" >
          <el-radio-button label="static">静态数据源</el-radio-button>
          <el-radio-button label="cloud">远端数据源</el-radio-button>
        </el-radio-group>
        <template v-if="dataType === 'static'">
          <li v-for="(item, index) in staticObj.data " :key="index" style="margin-top: 5px">
            <i class="drag-item" style="cursor: move;"><i
              class="iconfont icon-icon_bars"></i></i>
            <el-input placeholder="键" size="small" style="float: left; width: 320px;"
                      v-model="item.label"></el-input>
            <el-input placeholder="值" size="small" style="float: left;  width: 320px;"
                      v-model="item.value"></el-input>
            <el-button @click="handleKeyValueRemove(index)" circle plain type="danger" size="small"
                       icon="el-icon-minus"
                       style="margin-left: 5px;"></el-button>
            <el-button @click="handleAddKeyValue" circle plain type="danger" size="small"
                       icon="el-icon-plus"
                       style="margin-left: 5px;"></el-button>
          </li>
        </template>
        <template v-if="dataType === 'cloud'">
          <div style="font-size: 12px;">
            脚本类型:
            <el-select v-model="type" :value="type" size="small" style="width: 70%">
              <el-option v-for="(option, index) in scriptType" :key="index"  :label="option.label"
                         :value="option.value" ></el-option>
            </el-select>
          </div>
          <div  style="font-size: 12px; margin-top: 5px">
            &ensp;  数据源:
            <el-select v-model="pullDownObj.dsname" size="small" placeholder="数据源"  :value="pullDownObj.dsname" style="width: 70%">
              <el-option label="YW_BI" value="YW_BI"></el-option>
            </el-select>
          </div>
        </template>
      </div>
        <template class="ant-card-actions" slot="actions">
          <el-tooltip :content="content" placement="top" v-if="dataType !== 'static'">
          <i  class="el-icon-edit"  @click="saveStatic" ></i>
          </el-tooltip>
          <el-tooltip content="清空配置" v-if="dataType !== 'static'" placement="top">
          <i class="el-icon-delete" @click="resetStatic"></i>
          </el-tooltip>
        </template>
      </a-card>
    </el-form-item>
    <el-form-item>
      <div  style="font-size: 12px; margin-top: 10px; float: left">
        键&emsp;字&emsp;段:
        <el-select v-model="pullDownObj.displayfld" size="small" placeholder="键" :value="pullDownObj.displayfld"
                   style="width: 70%"
                   allow-create
                   default-first-option>
          <el-option
            v-for="item in field"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div  style="font-size: 12px; margin-top: 10px; float: left">
        值&emsp;字&emsp;段:
        <el-select v-model="pullDownObj.valuefld" size="small" placeholder="值" :value="pullDownObj.valuefld"
                   style="width: 70%"
                   allow-create
                   default-first-option>
          <el-option
            v-for="item in field"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div  style="font-size: 12px; margin-top: 10px;  float: left">
        &emsp;回写字段:
        <el-select v-model="pullDownObj.writebackflds" size="small" placeholder="值" :value="pullDownObj.writebackflds"
                   style="width: 70%"
                   allow-create
                   default-first-option>
          <el-option
            v-for="item in field"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div  style="font-size: 12px; margin-top: 10px;  float: left">
        &emsp;新建窗口:
        <el-select v-model="pullDownObj.createwinid" size="small" placeholder="值" :value="pullDownObj.createwinid"
                   style="width: 70%">
          <el-option
            v-for="item in field"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div  style="font-size: 12px; margin-top: 10px;  float: left">
        &emsp;窗口字段:
        <el-select v-model="pullDownObj.popwinvaluefld" size="small" placeholder="值" :value="pullDownObj.popwinvaluefld"
                   style="width: 70%"
                   allow-create
                   default-first-option>
          <el-option
            v-for="item in field"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
    </el-form-item>
  </el-form>
    <div style="margin-top: 10px; text-align: right ">
      <slot name="action">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" >确 定</el-button>
      </slot>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ElementPullDownConfig',
  data () {
    return {
      pullDownObj: {
        elementid: '',
        allowerrorvalue: true,
        displayfld: '',
        popwinvaluefld: '',
        fillinflds: '',
        createtime: '',
        columns: '',
        editable: true,
        specialitems: '',
        writebackflds: '',
        createable: true,
        datasource: '',
        dsname: '',
        createwinid: '',
        id: '',
        valuefld: ''
      },
      // 静态:static  远端:cloud
      dataType: 'static',
      staticObj: {
        type: 'json',
        fields: 'label,value',
        data: [
          {
            'label': '',
            'value': ''
          }
        ]
      },
      scriptType: this.elementTypes,
      type: '',
      field: ['label', 'value']
    }
  },
  methods: {
    ...mapActions(['updateSelectStaticAction', 'updateScriptTypeAction', 'updateJsViewAction', 'updateSqlViewAction', 'deleteSelectAction', 'updateShowPullDownAction']),
    /**
     * 添加key值
     */
    handleAddKeyValue () {
      this.staticObj.data.push({
        'label': null,
        'value': null
      })
    },
    /**
     * 删除key值
     * @param index 键值数组下标
     */
    handleKeyValueRemove (index) {
      if (this.staticObj.data.length <= 1) {
        this.$message.warning('至少需要一对键值对')
      } else {
        this.staticObj.data.splice(index, 1)
      }
    },
    saveStatic () {
      switch (this.dataType) {
        case 'cloud':
          // 更新脚本类型
          this.updateScriptTypeAction('selectFields')
          // 解析sql
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
          break
      }
    },
    resetStatic (isText) {
      this.staticObj = {
        type: 'json',
        fields: 'label,value',
        data: [
          {
            'label': '',
            'value': ''
          }
        ]
      }
      this.pullDownObj = {
        elementid: '',
        allowerrorvalue: true,
        displayfld: '',
        popwinvaluefld: '',
        fillinflds: '',
        createtime: '',
        columns: '',
        editable: true,
        specialitems: '',
        writebackflds: '',
        createable: true,
        datasource: '',
        dsname: '',
        createwinid: '',
        id: '',
        valuefld: ''
      }
      if (isText) {
        this.$set(this.pullDownObj, 'datasource', '')
        this.updateSelectStaticAction(JSON.parse(JSON.stringify(this.pullDownObj)))
        this.$message.success('重置成功!')
      }
    },
    initProperty (val) {
      if (val.tb_window_selectfields.length > 0) {
        if (val.tb_window_selectfields[0].datasource !== '') {
          switch (val.tb_window_selectfields[0].datasource.type) {
            case 'json':
              this.dataType = 'static'
              this.staticObj = val.tb_window_selectfields[0].datasource
              break
            default:
              this.dataType = 'cloud'
              break
          }
          this.pullDownObj = val.tb_window_selectfields[0]
        }
      } else {
        this.dataType = 'static'
        this.resetStatic(false)
      }
    },
    submit () {
      let isError = false
      if (this.dataType === 'static') {
        for (let i = 0, max = this.staticObj.data.length; i < max; i++) {
          if (this.staticObj.data[i].label === '' || this.staticObj.data[i].value === '') {
            this.$message.warning('键值对输入有误!')
            isError = true
            break
          }
        }
        if (!isError) {
          this.$set(this.pullDownObj, 'datasource', this.staticObj)
        }
      }
      if (!isError) {
        this.updateSelectStaticAction({ obj: this.pullDownObj, type: this.dataType })
        this.$message.success('保存成功!')
      }
    },
    close () {
      this.updateShowPullDownAction(false)
    },
    editShowPull () {
      this.updateShowPullDownAction(true)
    }
  },
  created () {
    // 更新dataType
    this.initProperty(this.currentSelect)
  },
  computed: {
    ...mapState(['currentSelect', 'fields', 'selectScript', 'showPullDown']),
    _staticObj () {
      return this.currentSelect
    },
    content () {
      return '脚本编辑'
    },
    _field () {
      return this.fields
    }
  },
  watch: {
    _staticObj (val) {
      this.initProperty(val)
    },
    _field (val) {
      if (this.dataType === 'cloud') {
        this.field = val
      }
    }
  }
}
</script>

<style scoped>

</style>
