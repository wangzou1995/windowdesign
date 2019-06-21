<template>
    <div id="tableClass"  :style="{height: container.tb_window_element.length + container.tb_tool_element.length > 0 ? '100%' : '200px'}">
      <div v-if="container.toolPosition === 'top' && container.isShowTool">
        <ext-toolbar :container="container" :isGridTool="true"></ext-toolbar>
      </div>
      <a-icon @click.stop="addGridElement" type="plus-square" style="float:right; margin-bottom: 5px" />
      <a-icon @click.stop="removeGridElement" type="minus-square" style="float: right; margin-bottom: 5px; margin-right: 10px" />
      <table :style="{background: activeColor}">
      <tr style="height: 30px; text-align: center">
        <template v-for="(element, index ) in container.tb_window_element">
          <th :key="index" v-text="element.title"></th>
        </template>
      </tr>
      <tr style="height: 30px">
        <template v-for="(element, index) in container.tb_window_element">
          <td :key="index" :style="{background: activeElementColor(element)}"
          style="padding: 10px; position: relative" @click.stop="updateCurrentSelect(element)">
            <ext-element :element="element"></ext-element>
            <div style="position: absolute; z-index: 1001; float:right; right: 0; bottom: -15px;"
                 v-if="getCurrentSelect !== null && element.id === getCurrentSelect.id">
              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click.stop="removeGridElement"
              ></el-button>
            </div>
          </td>
        </template>
      </tr>
    </table>
      <div v-if="container.toolPosition === 'bottom' && container.isShowTool">
        <ext-toolbar :container="container" :isGridTool="true"></ext-toolbar>
      </div>
    </div>
</template>
<script>
import Element from '@/components/Element'
import { mapGetters, mapActions } from 'vuex'
import ToolBar from '@/components/ToolBar'
export default {
  props: ['container', 'isShowTool', 'toolPosition'],
  components: { 'ext-toolbar': ToolBar, 'ext-element': Element },
  data () {
    return {
      current: 1
    }
  },
  methods: {
    ...mapActions(['addElementAction', 'addGridElementAction', 'removeGridElementAction', 'updateCurrentSelectAction']),
    addElement (evt) {
      let paramObj = {
        index: evt.newIndex,
        containerIndex: this.containerIndex,
        type: 'element'
      }
      this.addElementAction(paramObj)
    },
    updateCurrentSelect (element) {
      this.updateCurrentSelectAction(element)
    },
    addGridElement () {
      this.addGridElementAction(this.container)
    },
    removeGridElement () {
      if (this.getCurrentSelect.parenttype === undefined) {
        this.$message.error('请选中需要删除的单元格！')
      } else if (this.container.id !== this.getCurrentSelect.parentid) {
        this.$message.error('请选中此表格中的单元格！')
      } else {
        this.removeGridElementAction({ container: this.container, index: this.getCurrentSelect.columnid })
      }
    },
    activeElementColor (element) {
      return this.$activeColor(element, this.getCurrentSelect)
    }
  },
  computed: {
    ...mapGetters(['getContainer', 'getCurrentSelect']),
    formCalcHeight: function () {
      let elements = this.container.tb_window_element.length
      if (elements > 0) {
        let size = Math.ceil(elements / 4)
        switch (size) {
          case 1:
            return '100px'
          default:
            return size * 75 + 'px'
        }
      } else {
        return '150px'
      }
    },
    activeColor: function () {
      return this.$activeColor(this.container, this.getCurrentSelect)
    }
  }
}
</script>
<style>
  #tableClass {
    width: 100%;
    border: 1px silver dashed;
  }
  table {
    border: 1px silver solid;
    width: 100%;
  }
  table tr {
    border: 1px silver solid;
  }
  table tr th,
  table tr td{
    border: 1px silver solid;
  }
</style>
