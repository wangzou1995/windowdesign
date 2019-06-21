<template>
  <div style=" width: 100%;">
  <a-icon @click.stop="addCol" type="plus-square" style="float:right; margin-bottom: 5px" />
    <a-icon @click.stop="removeCol" type="minus-square" style="float: right; margin-bottom: 5px; margin-right: 10px" />
  <el-row style="height: 60px; width: 100%; border: 1px silver solid;" :gutter="2" type="flex">
         <el-col style="border: 1px black double;" v-for="(element, index) in container.row"
                 :key="index">
           <div :style="{background: (element.col.length >= 1 && getCurrentSelect !== null && element.col[0].id === getCurrentSelect.id) ? '#7dbcea': ''}"
                @click.stop="updateCurrentSelect(element.col[0])"
                style="padding: 5px; position: relative">
            <draggable v-model="element.col"
                       :group="{ name: 'element'}"
                       ghost-class="ghost"
                       :sort="false"
                       style=" width: 100%; height: 45px"
                       @add="addElement($event, element.col, rowid, index)"
            >
                  <ext-element :element="element.col[0]" ></ext-element>
            </draggable>
             <div style="position: absolute; z-index: 1001; float:right; right: 0; bottom: -15px;"
                  v-if="getCurrentSelect !== null && element.col.length > 0 && element.col[0].id === getCurrentSelect.id">
               <el-button type="danger" icon="el-icon-delete" circle style="" size="mini" @click.stop="removeCol"
               ></el-button>
             </div>
           </div>
          </el-col>
  </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Element from '@/components/Element'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Row',
  props: ['container', 'rowid'],
  components: {
    draggable,
    'ext-element': Element
  },
  methods: {
    ...mapActions(['removeElementAction', 'addColAction', 'removeSingleColAction', 'addRowElementAction', 'removeColAction', 'updateCurrentSelectAction']),
    addCol () {
      this.addColAction(this.container)
    },
    addElement (evt, element, rowid, colid) {
      if (element.length > 1) {
        this.removeSingleColAction({ obj: element, index: evt.newIndex })
        this.$message.warning('一个单元格只能拖拽一个元素！')
      } else {
        this.addRowElementAction({ container: element, index: 0, rowid: rowid, colid: colid })
      }
    },
    updateCurrentSelect (container) {
      if (container) {
        this.updateCurrentSelectAction(container)
      }
    },
    removeCol () {
      this.removeColAction({ container: this.container,
        columnid: this.getCurrentSelect.columnid,
        rowid: this.getCurrentSelect.rowid })
    }
  },
  computed: {
    ...mapGetters(['getContainer', 'getCurrentSelect'])
  }
}
</script>

<style scoped>

</style>
