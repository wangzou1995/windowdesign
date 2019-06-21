<template>
  <div v-if="container.layouttype === 'vbox'" style="width: 100%">
  <div id="container" :style="{height: container.tb_window_element.length > 0 ? '100%' : '340px', background: activeColor}"
     >
    <div id="subcontainer" :style="{ width: subContainerCalc }">
      <draggable v-model="container.tb_window_element"
                 :group="{ name: 'container'}"
                 ghost-class="ghost"
                 @add="add"
                 :sort="false"
                 style="width: 100%; height: 100%; border: 1px silver dashed;"
                 :style="{height: container.tb_window_element.length > 0 ? '100%' : '300px'}"
      >
        <div class="banner" v-for="(pane, index) in container.tb_window_element" :key="index" @click.stop="select(pane)"
             style="position:relative;"
             :style="{width: calcBanner}"
        >
          <ext-from v-if="pane.containertype === 'form'" :container="pane"  ></ext-from>
          <ext-table v-if="pane.containertype === 'grid'" :container="pane" :isShowTool="false" toolPosition="bottom" ></ext-table>
          <ext-toolbar v-if="pane.containertype === 'toolbar'" :container="pane" :isGridTool="false" ></ext-toolbar>
          <ext-tab v-if="pane.containertype === 'tabpanel'" :container="pane" ></ext-tab>
          <ext-card  v-if="pane.containertype === 'cardpanel'" :container="pane" ></ext-card>
          <ext-search  v-if="pane.containertype === 'searchform'" :container="pane" ></ext-search>
          <container v-if="pane.containertype === 'container'" :container="pane"></container>
          <div style="position: absolute; z-index: 1000; float:right; right: 0; bottom: -15px;"
               v-if="getCurrentSelect !== null && pane.id === getCurrentSelect.id">
            <el-button type="danger" icon="el-icon-delete" circle size="mini"  @click.stop="removeContainerEl(container, index)"
            ></el-button>
          </div>
          <div style="clear:both;"></div>
        </div>
        <div style="clear:both;"></div>
      </draggable>
    </div>
  </div>
  </div>
  <div v-else>
    <div :style="{height: container.tb_window_element.length > 0 ? '100%' : '340px', background: activeColor}"
         style="width: 100%; padding: 10px;border: 1px silver solid">
    <draggable v-model="container.tb_window_element"
               :group="{ name: 'container'}"
               ghost-class="ghost"
               @add="add"
               :sort="false"
               style="width: 100%; height: 100%; border: 1px silver dashed;"
               :style="{height: container.tb_window_element.length > 0 ? '100%' : '300px'}"
    >
      <div style="width: 100%; height: 100%; position: relative" v-for="(pane, index) in container.tb_window_element" :key="index" @click.stop="select(pane)"
      >
        <ext-from v-if="pane.containertype === 'form'" :container="pane"  ></ext-from>
        <ext-table v-if="pane.containertype === 'grid'" :container="pane" :isShowTool="false" toolPosition="bottom" ></ext-table>
        <ext-toolbar v-if="pane.containertype === 'toolbar'" :container="pane" :isGridTool="false" ></ext-toolbar>
        <ext-tab v-if="pane.containertype === 'tabpanel'" :container="pane" ></ext-tab>
        <ext-card  v-if="pane.containertype === 'cardpanel'" :container="pane" ></ext-card>
        <ext-search  v-if="pane.containertype === 'searchform'" :container="pane" ></ext-search>
        <container v-if="pane.containertype === 'container'" :container="pane"></container>
        <div style="position: absolute; z-index: 1000; float:right; right: 0; bottom: -15px;"
        v-if="getCurrentSelect !== null && pane.id === getCurrentSelect.id">
        <el-button type="danger" icon="el-icon-delete" circle size="mini" @click.stop="removeContainerEl (container, index)"
        ></el-button>
      </div>
        <div style="clear:both;"></div>
      </div>
      <div style="clear:both;"></div>
    </draggable>
    </div>
  </div>
  </template>

<script>
import From from '@/components/Form'
import Table from '@/components/Table'
import ToolBar from '@/components/ToolBar'
import Search from '@/components/Search'
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Container',
  props: {
    container: Object
  },
  components: {
    draggable,
    'ext-from': From,
    'ext-table': Table,
    'ext-toolbar': ToolBar,
    // 循环引用组件需在创建改组件前前导入组件
    'ext-tab': () => import('@/components/Tab.vue'),
    'ext-card': () => import('@/components/Card.vue'),
    'ext-search': Search
  },
  methods: {
    ...mapActions(['removeElementAction', 'addContainer2cAction', 'updateCurrentSelectAction', 'updateConfigTabAction']),
    select (container) {
      this.updateCurrentSelectAction(container)
      if (!(this.configTab === 'container')) {
        this.updateConfigTabAction('container')
      }
    },
    add (evt) {
      let toIndex = evt.newIndex
      let paramObj = {
        index: toIndex,
        container: this.container
      }
      if (this.container.tb_window_element.length === 1 && toIndex === 1) {
        if (this.container.tb_window_element[0].type === 'row') {
          this.$message.warning('容器内不能拖拽行元素')
          this.removeElementAction({ container: this.container, index: 0 })
        } else {
          paramObj.i = 0
          this.addContainer2cAction(paramObj)
        }
      } else {
        if (this.container.tb_window_element[toIndex].type === 'row') {
          this.$message.warning('容器内不能拖拽行元素')
          this.removeElementAction({ container: this.container, index: toIndex })
        } else {
          this.addContainer2cAction(paramObj)
        }
      }
    },
    removeContainerEl (container, index) {
      this.removeElementAction({ container: container, index: index })
    }
  },
  computed: {
    ...mapGetters(['getContainer', 'getCurrentSelect']),
    activeColor: function () {
      return this.$activeColor(this.container, this.getCurrentSelect)
    },
    formCalcHeight: function () {
      let elements = this.container.tb_window_element.length
      if (elements > 0) {
        return '100%'
      } else {
        return '300px'
      }
    },
    calcWidth: function () {
      if (this.container.layouttype === 'hbox') {
        return '80%'
      } else {
        return '100%'
      }
    },
    subContainerCalc: function () {
      let size = this.container.tb_window_element.length
      return size === 0 ? '80%' : '100%'
    },
    calcBanner: function () {
      let size = this.container.tb_window_element.length
      return size === 0 ? '80%' : ((100 / size) - 2) + '%'
    }
  }
}
</script>

<style scoped>
  #container
  {
    width: 100%;
    margin: 0 auto;
    overflow-x: scroll;
    border: 1px silver solid;
    padding: 10px;
  }
  #subcontainer
  {
    margin: 10px;
  }
  .banner
  {
    margin-left: 5px;
    height: 100%;
    float: left;
    border: 1px silver solid;
  }
</style>
