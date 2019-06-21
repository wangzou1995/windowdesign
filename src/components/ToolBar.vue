<template>
  <div
          style="float: left; text-align: left; border: 1px silver dashed; width: 100%;"
          :style="{height: formCalcHeight,background: activeColor}"
          @click.stop="updateCurrentSelect(isGridTool ? container.tb_tool_element[0] : container )"
  >
    <draggable :list=" isGridTool ? container.tb_tool_element[0].tb_window_element : container.tb_window_element "
               :group="{ name: 'element'}"
               ghost-class="ghost"
               :sort="false"
               style="padding: 10px;"
               :style="{height: formCalcHeight}"
               @add="addElement"
    >
      <div v-for="(element, index) in isGridTool ? container.tb_tool_element[0].tb_window_element  : container.tb_window_element "
           :key="index"
           @click.stop="updateCurrentSelect(element)"
      >
        <div
          :style="{background: element.id === getCurrentSelect.id ? '#7dbcea': '', width: (element.width < 200 ? (element.type === 'button' ? 100 : 200) : element.width) + 'px'}"
          style="padding: 10px; height: 100%; float:left; text-align: center;border: 1px silver dashed; margin-left: 10px; width: 100%;
            position: relative"
        >
          <ext-element :element="element"></ext-element>
          <div style="position: absolute; z-index: 1000; float:right; right: 0; bottom: -15px;"
               v-if="getCurrentSelect !== null && element.id === getCurrentSelect.id">
            <el-button type="danger" icon="el-icon-delete" circle size="mini"
            ></el-button>
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Element from '@/components/Element'
import draggable from 'vuedraggable'

export default {
  name: 'ToolBar',
  props: ['container', 'isGridTool'],
  components: { 'ext-element': Element, draggable },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['addElementAction', 'updateCurrentSelectAction']),
    addElement (evt) {
      let paramObj = {
        index: evt.newIndex,
        container: this.container,
        type: 'toolbar',
        isGridTool: this.isGridTool
      }
      this.addElementAction(paramObj)
    },
    updateCurrentSelect (element) {
      this.updateCurrentSelectAction(element)
    }
  },
  computed: {
    ...mapGetters(['getContainer', 'getCurrentSelect']),
    formCalcHeight: function () {
      let elements = this.isGridTool ? this.container.tb_tool_element[0].tb_window_element.length : this.container.tb_window_element.length
      if (elements > 0) {
        let size = Math.ceil(elements / 4)
        switch (size) {
          case 1:
            return '80px'
          default:
            return size * 80 + 'px'
        }
      } else {
        return '80px'
      }
    },
    activeColor: function () {
      let obj = this.isGridTool ? this.container.tb_tool_element[0] : this.container
      if (obj != null && this.getCurrentSelect != null) {
        return this.$activeColor(obj, this.getCurrentSelect)
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
