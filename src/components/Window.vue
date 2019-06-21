<template>
  <el-container>
    <el-aside style="width: 240px">
      <div class="list">
        <div class="title">容器组件</div>
        <draggable :list="containerSide" tag="ul"
                   :group="{ name: 'container', pull: 'clone', put: false }"
                   ghost-class="ghost"
                   :sort="false"
        >
          <li class="elementList" v-for="(item, index) in containerSide" :key="index">
            <a>
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
        <div class="title">元素组件</div>
        <draggable :list="element" tag="ul"
                   :group="{ name: 'element', pull: 'clone', put: false }"
                   ghost-class="ghost"
                   :sort="false"
        >
          <li class="elementList" v-for="(item, index) in element" :key="index">
            <a>
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </div>
    </el-aside>
    <el-container direction="vertical" class="center-container">
      <el-header style="height: 45px; border-bottom: solid 2px #e4e7ed;">
        <div style="float: right; margin-top: 5px">
          <el-button type="primary" size="small">帮助文档</el-button>
          <el-button type="primary" size="small">上传JSON</el-button>
          <el-button type="primary" size="small" @click.stop="handleGenerateJson">保存</el-button>
        </div>
      </el-header>
      <el-main :class="{'widget-empty':  !myWindow.tb_window_layout.length > 0}" style="padding: 0; height: 100%">
        <draggable v-model="myWindow.tb_window_layout"
                   group="container"
                   ghostClass="ghost"
                   style="height: 100%;"
                   @add="add"
                   @change="change"
        >
          <div v-for="(container, index) in myWindow.tb_window_layout" :key="index" @click.stop="select(container)"
               style="position: relative"
          >
            <ext-from v-if="container.containertype === 'form'" :container="container" ></ext-from>
            <ext-table v-if="container.containertype === 'grid'" :container="container" :isShowTool="false"
                       toolPosition="bottom"></ext-table>
            <ext-toolbar v-if="container.containertype === 'toolbar'" :container="container"
                         :isGridTool="false"></ext-toolbar>
            <ext-tabs v-if="container.containertype === 'tabpanel'" :container="container" ></ext-tabs>
            <ext-card v-if="container.containertype === 'cardpanel'" :container="container" ></ext-card>
            <ext-search v-if="container.containertype === 'searchform'" :container="container" ></ext-search>
            <ext-container v-if="container.containertype === 'container'" :container="container" ></ext-container>
            <div style="position: absolute; z-index: 1000; float:right; right: 0; bottom: -15px;"
            v-if="currentSelect  && container.id === currentSelect.id">
              <el-button type="danger" icon="el-icon-delete" circle @click.stop="removeContainer(index)"
                       size="mini"  ></el-button>
            </div>
            <div style="clear:both;"></div>
          </div>
        </draggable>
      </el-main>
    </el-container>
    <el-aside width="300px" class="config-container">
      <el-container>
        <el-header class="config-container-header" style="height: 45px">
          <!--<div style="float: left; width: 100%; border-bottom: 1px silver solid;">-->
          <div class="config-tab" :class="{active: isWindow}"
               @click="handleConfigSelect('window')">窗口属性
          </div>
          <div class="config-tab" :class="{active: isActive}"
               @click="handleConfigSelect('container')">基础属性
          </div>
          <div class="config-tab" :class="{active: isEvent}"
               @click="handleConfigSelect('event')">组件事件
          </div>
          <!--</div>-->
        </el-header>
        <el-main class="config-content" style="padding: 5px; height: 100%; ">
          <ext-container-config
            v-show="isActive && this.currentSelect && isInContainer(this.currentSelect.type)"></ext-container-config>
          <ext-element-config
            v-show="isActive && this.currentSelect && isInElement(this.currentSelect.type)"></ext-element-config>
          <ext-window-config v-show=" configTab === 'window' && myWindow.id !== null"></ext-window-config>
          <ext-base-event v-if="isEvent &&  isInElement(this.currentSelect.type)"></ext-base-event>
        </el-main>
      </el-container>
    </el-aside>
    <ext-my-dialog
      :visible="jsonVisible"
      @on-close="jsonVisible = false"
      ref="jsonPreview"
      width="800px"
      type="window"
      form
      :showClose="true"
    >
      <div id="jsoneditor" style="height: 400px;width: 100%;">{{myWindow}}</div>

      <template slot="action">
        <el-button id="copybtn" data-clipboard-target=".ace_text-input">双击复制</el-button>
      </template>
    </ext-my-dialog>
    <!--sql编辑器显示-->
    <ext-my-dialog
    :visible="sqlView"
    ref="sqlView  "
    width="800px"
    form
    :showClose="false"
  >
    <sql-editor :type="scriptType"></sql-editor>
  </ext-my-dialog>
    <!--过滤条件编辑器显示-->
    <ext-my-dialog
      :visible="containerFilterView"
      ref="sqlView"
      width="800px"
      form
      :showClose="false"
    >
      <container-filter></container-filter>
    </ext-my-dialog>
    <!--js编辑器显示-->
    <ext-my-dialog
      :visible="jsView"
      ref="sqlView  "
      width="800px"
      form
      :showClose="false"
    >
      <ext-js-editor :type="scriptType"></ext-js-editor>
    </ext-my-dialog>
    <!--api+sql编辑显示器-->
    <ext-my-dialog
      :visible="apiSqlView"
      ref="sqlView  "
      width="800px"
      form
      :showClose="false"
    >
      <ext-api-sql-editor :type="scriptType"></ext-api-sql-editor>
    </ext-my-dialog>
    <!-- api + 参数编辑显示器 -->
    <ext-my-dialog
      :visible="apiParamView"
      ref="sqlView  "
      width="800px"
      form
      :showClose="false">
      <ext-json-editor :type="scriptType"></ext-json-editor>
    </ext-my-dialog>
  </el-container>
  <!--</div>-->
</template>

<script>
import From from '@/components/Form'
import Table from '@/components/Table'
import ToolBar from '@/components/ToolBar'
import Tab from '@/components/Tab'
import Card from '@/components/Card'
import ContainerConfig from '@/components/config/container/ContainerConfig'
import ElementConfig from '@/components/config/element/ElementConfig'
import Search from '@/components/Search'
import Container from '@/components/Container'
import MyDialog from './MyDialog'
import WindowConfig from '@/components/config/window/WindowConfig'
import { containerSide, container, element } from '@/until/global'
import { mapState, mapActions } from 'vuex'
import ace from 'ace-builds'
import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入
import 'ace-builds/src-noconflict/theme-monokai' // 默认设置的主题
import 'ace-builds/src-noconflict/mode-javascript'
import draggable from 'vuedraggable'
import SqlEditor from '@/components/editor/SqlEditor'
import ContainerFilter from '@/components/editor/ContainerFilter'
import JsEditor from '@/components/editor/JsEditor'
import ApiSqlEditor from '@/components/editor/ApiAndSqlEditor'
import JsonEditor from '@/components/editor/JsonEditor'
import BaseEvent from '@/components/config/event/BaseEvent'
export default {
  name: 'Window',
  components: {
    SqlEditor,
    draggable,
    'ext-from': From,
    'ext-table': Table,
    'ext-toolbar': ToolBar,
    'ext-tabs': Tab,
    'ext-card': Card,
    'ext-container-config': ContainerConfig,
    'ext-element-config': ElementConfig,
    'ext-search': Search,
    'ext-container': Container,
    'ext-my-dialog': MyDialog,
    'ext-window-config': WindowConfig,
    'ext-js-editor': JsEditor,
    'ext-api-sql-editor': ApiSqlEditor,
    'ext-json-editor': JsonEditor,
    'ext-base-event': BaseEvent,
    ContainerFilter

  },
  data () {
    return {
      containerSide,
      container,
      element,
      jsonVisible: false
    }
  },
  methods: {
    ...mapActions(['addContainerAction', 'removeContainerAction', 'updateConfigTabAction', 'updateCurrentSelectAction']),
    add: function (evt) {
      if (this.myWindow.tb_window_layout[evt.newIndex].type === 'row') {
        this.$message.warning('行元素只能拖拽到FORM表单或查询表单中!')
        this.removeContainerAction(evt.newIndex)
      } else {
        let paramObj = {
          type: this.containerSide[evt.oldIndex].type,
          index: evt.newIndex,
          container: this.container
        }
        this.addContainerAction(paramObj)
        this.updateConfigTabAction('container')
      }
    },
    change (evt) {
      console.log(evt)
    },
    select (container) {
      this.updateCurrentSelectAction(container)
      if (!(this.configTab === 'container')) {
        this.updateConfigTabAction('container')
      }
    },
    handleConfigSelect (config) {
      this.updateConfigTabAction(config)
    },
    handleGenerateJson () {
      this.jsonVisible = true
      this.$nextTick(() => {
        const editor = ace.edit('jsoneditor')
        editor.session.setMode('ace/mode/json')
      })
    },
    removeContainer (index) {
      this.removeContainerAction(index)
    }
  },
  computed: {
    ...mapState([
      'myWindow', 'currentSelect', 'configTab', 'sqlView', 'containerFilterView', 'scriptType', 'jsView', 'apiSqlView', 'apiParamView'
    ]),
    isActive () {
      return this.configTab === 'container'
    },
    isWindow () {
      return this.configTab === 'window'
    },
    isEvent () {
      return this.configTab === 'event'
    }
  },
  created () {
    let paramsObj = this.$route.query
    for (let param in paramsObj) {
      if (this.myWindow.hasOwnProperty(param)) {
        this.$set(this.myWindow, param, paramsObj[param])
      }
    }
  }
}
</script>

<style scoped>
  *, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .item {
    margin-top: 10px;
  }

  .fa-icon {
    width: auto;
    height: 1em; /* 或任意其它字体大小相对值 */

    /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .el-container {
    height: 100% !important;
  }

  .center-container {
    position: center;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
  }

  .widget-empty {
    background: url('../assets/form_empty.png') no-repeat;
    background-position: 50%;
  }

  .list {
    padding: 8px 0;
    margin-left: 15px;
    color: black;
  }

  .title {
    padding: 8px 12px;
    font-size: 13px;
    text-align: left;
  }

  ul {
    position: relative;
    overflow: hidden;
    padding: 0 5px 5px;
    margin: 0;
  }

  .elementList {
    font-size: 12px;
    display: block;
    width: 40%;
    line-height: 26px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1%;
    color: #333;
    border: 1px solid #F4F6FC;
    text-align: left;
  }

  .elementList:hover {
    color: #409EFF;
    border: 1px #409EFF dashed;
  }

  a {
    display: block;
    cursor: move;
    background: #F4F6FC;
    border: 1px solid #F4F6FC;
  }

  .config-container {
    position: relative;
    border-bottom: 1px silver solid;
  }

  .config-container-header {
    border-bottom: solid 2px #e4e7ed;
    padding: 0 5px;
  }

  .config-tab {
    height: 45px;
    line-height: 45px;
    display: inline-block;
    width: 60px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    margin-left: 20px;
    cursor: pointer;
  }

  .config-tab.active {
    border-bottom: solid 2px #409EFF;
  }
</style>
