<template>
  <a-collapse v-model="defaultName" :accordion="true" style="text-align: left">
    <a-collapse-panel header="基本属性配置" key="1">
      <el-form label-position="top" style="font-size: 12px;">
        <el-form-item>
          <div style="font-size: 12px;">
            <div> 元素编号:
              <el-input v-model="currentSelect.id" size="small" style="width: 200px; margin-bottom: 10px"
                        :disabled="true"></el-input>
            </div>
            <div v-if="currentSelect.parenttype && currentSelect.parenttype === 'grid'"> 元素类型:
              <el-select v-model="currentSelect.type" size="small" style="width: 200px; margin-bottom: 10px" :value="currentSelect.type"
                         >
                <el-option v-for="(type, index) in elementTypes" :key="index"
                           :label="type.label"
                           :value="type.value">
                </el-option>
              </el-select>
            </div>
            <div>元素标题:
              <el-input v-model="currentSelect.title" size="small" style="width: 200px; margin-bottom: 10px"
                        ></el-input>
            </div>
            <div>
              标题宽度:
              <el-input v-model.number="currentSelect.labelwidth" size="small"
                        style="width: 200px; margin-bottom: 10px"></el-input>
            </div>
            <div>元素名称:
              <el-input v-model="currentSelect.elementname" size="small" style="width: 200px; margin-bottom: 10px"></el-input>
            </div>
            <div> 元素描述:
              <el-input v-model="currentSelect.elementdesc" size="small" style="width: 200px; margin-bottom: 10px"></el-input>
            </div>
            <div>缺省值:
              <el-input v-model="currentSelect.defvalue" size="small" style="width: 200px; margin-bottom: 10px"></el-input>
            </div>
            <div>
              可&emsp;空:
              <el-switch
                v-model="currentSelect.isnullable">
              </el-switch>
              &emsp;&emsp;只&emsp;读:
              <el-switch
                v-model="currentSelect.readonly">
              </el-switch>
            </div>
            <div>
              可编辑:
              <el-switch
                v-model="currentSelect.editable">
              </el-switch>
              &emsp;&emsp;权限控制:
              <el-switch
                v-model="currentSelect.authcontrol">
              </el-switch>
            </div>
            <div>
              绑定对象元素:
              <el-select size="small" v-model="currentSelect.objelement" placeholder="请选择" style="width: 150px" :value="currentSelect.objelement">
                <el-option
                  v-for="item in obj"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="currentSelect.parenttype !== 'grid'">
          <div style="font-size: 12px;">
            <div>
              行&#12288;号:
              <el-input v-model.number="currentSelect.rowid" size="small" :readonly="true" :disabled="true"
                        style="width: 60px; margin-bottom: 10px"></el-input>
              列&#12288;号:
              <el-input v-model.number="currentSelect.columnid" size="small" :readonly="true" :disabled="true"
                        style="width: 60px; margin-bottom: 10px"></el-input>
            </div>
            <div>
              左边距:
              <el-input v-model.number="currentSelect.leftmargin" size="small"
                        style="width: 60px; margin-bottom: 10px"></el-input>
              上边距:
              <el-input v-model.number="currentSelect.topmargin" size="small"
                        style="width: 60px; margin-bottom: 10px"></el-input>
            </div>
            <div>
              右边距:
              <el-input v-model.number="currentSelect.rightmargin" size="small"
                        style="width: 60px; margin-bottom: 10px"></el-input>
              下边距:
              <el-input v-model.number="currentSelect.bottommargin" size="small"
                        style="width: 60px; margin-bottom: 10px"></el-input>
            </div>
            <div>
              宽&emsp;度:
              <el-input v-model.number="currentSelect.height" size="small" style="width: 60px; margin-bottom: 10px"></el-input>
              高&emsp;度:
              <el-input v-model.number="currentSelect.width" size="small" style="width: 60px; margin-bottom: 10px"></el-input>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </a-collapse-panel>
    <a-collapse-panel header="动态数据源配置">
      <el-form>
        <el-form-item>
          <div>
            数&ensp;据&ensp;源:
            <el-switch
              v-model="currentSelect.asdatasource">
            </el-switch>
          </div>
        </el-form-item>
          <el-form-item>
            <div>
            表&ensp;变&ensp;量:
            <el-switch
              v-model="currentSelect.astablevar">
            </el-switch>
          </div>
        </el-form-item>
      </el-form>
    </a-collapse-panel>
    <a-collapse-panel header="下拉数据源配置" v-if="currentSelect.type === 'select'">
      <ext-element-pull-down-config></ext-element-pull-down-config>
    </a-collapse-panel>
    <a-collapse-panel header="可见/状态配置" key='3'>
      <el-form>
        <el-form-item label="可见控制">
          <el-input type="textarea" size="small" :rows="5" v-model="currentSelect.visible"></el-input>
        </el-form-item>
        <el-form-item label="状态控制">
          <el-input type="textarea" size="small" :rows="5" v-model="currentSelect.elementstatus"></el-input>
        </el-form-item>
      </el-form>
    </a-collapse-panel>
    <a-collapse-panel header="查询配置">
      <el-form :inline="true">
        <el-form-item>
          <div style="font-size: 12px">
            查询操作符:
            <el-select v-model="currentSelect.searchop" size="small" placeholder="请选择" style="width: 170px" :value="currentSelect.searchop">
              0<template slot="prepend">1,ew</template>
              <el-option
                v-for="item in searchops"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="font-size: 12px">
            查询是否空:
            <el-switch
              v-model="currentSelect.mustsetfiltercon">
            </el-switch>
          </div>
        </el-form-item>
      </el-form>
    </a-collapse-panel>
    <a-collapse-panel header="输入型元素配置" v-if="this.isInputElement(this.currentSelect.type)">
      <ext-element-input-config></ext-element-input-config>
    </a-collapse-panel>
    <a-collapse-panel header="弹窗输入配置" v-if="this.isInputElement(this.currentSelect.type)">
      <ext-element-pop-window-input-config></ext-element-pop-window-input-config>
    </a-collapse-panel>
    <a-collapse-panel header="文件上传配置" v-if="currentSelect.type === 'file'">
      <ext-element-upload-config></ext-element-upload-config>
    </a-collapse-panel>
    <a-collapse-panel header="格式化搜索" v-if="this.isInputElement(this.currentSelect.type)">
     <ext-element-format-config></ext-element-format-config>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import ElementFormatConfig from '@/components/config/element/ElementFormatConfig'
import ElementInputConfig from '@/components/config/element/ElementInputConfig'
import ElementPopWindowInputConfig from '@/components/config/element/ElementPopWindowInputConfig'
import ElementPullDownConfig from '@/components/config/element/ElementPullDownConfig'
import UploadConfig from '@/components/config/element/UploadConfig'
import { mapState } from 'vuex'
// import {isInErrorArray} from '@/until/ArrayUntil'
// 数据来源数组
// 下拉数据源类型

export default {
  name: 'ElementConfig',
  components: {
    'ext-element-format-config': ElementFormatConfig,
    'ext-element-input-config': ElementInputConfig,
    'ext-element-pop-window-input-config': ElementPopWindowInputConfig,
    'ext-element-pull-down-config': ElementPullDownConfig,
    'ext-element-upload-config': UploadConfig
  },
  data () {
    return {
      elementTypes: [
        {
          'label': '文本输入框',
          'value': 'input'
        }, {
          'label': '文本域',
          'value': 'textarea'
        }, {
          'label': '密码输入框',
          'value': 'password'
        }, {
          'label': '数字输入框',
          'value': 'number'
        }, {
          'label': '日期输入框',
          'value': 'date'
        }, {
          'label': '时间输入框',
          'value': 'time'
        }, {
          'label': '选择输入框',
          'value': 'select'
        }, {
          'label': '复选框',
          'value': 'check'
        }, {
          'label': '多选框',
          'value': 'multiple'
        }, {
          'label': '隐藏',
          'value': 'hide'
        }, {
          'label': '图片',
          'value': 'picture'
        }, {
          'label': '文件上传',
          'value': 'file'
        }, {
          'label': '表格行号',
          'value': 'column'
        }, {
          'label': '按钮',
          'value': 'button'
        }, {
          'label': '标签',
          'value': 'tag'
        }, {
          'label': '显示框',
          'value': 'show'
        }, {
          'label': '表格操作列',
          'value': 'actionColumn'
        }
      ],
      searchops: [{
        value: 'eq',
        label: '等于'
      }],
      obj: [
        {
          value: '1',
          label: '静态数据源'
        }, {
          value: '2',
          label: '远端数据源'
        }],
      defaultName: ['1']
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['currentSelect'])
  }
}
</script>

<style scoped>
  li {
    list-style: none;
    display: block;
    position: relative;
    font-size: 12px;
  }
</style>
