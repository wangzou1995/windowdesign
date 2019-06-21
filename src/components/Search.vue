<template>
  <div style="width: 100%">
    <el-form
      style="float: left; text-align: left; padding: 5px; width: 100%; border: 1px silver solid"
      :style="{background: activeColor}"
    >
      <draggable :list="container.tb_window_element"
                 :group="{ name: 'container'}"
                 ghost-class="ghost"
                 :sort="false"
                 style="padding: 10px; width: 100%;"
                 :style="{height: formCalcHeight}"
                 @add="addElement"
      >
        <div v-for="(row, index) in container.tb_window_element"
             :key="index"
             @click.stop="updateCurrentSelect(row)"
        >
          <div
            :style="{background: getCurrentSelect !== null && row.id === getCurrentSelect.id ? '#7dbcea': ''}"
            style=" border: 1px silver dashed; position: relative"
          >
            <ext-row :container="row" :rowid="index"></ext-row>
            <div style="position: absolute; z-index: 1000; float:right; right: 0; bottom: -15px;"
                 v-if="getCurrentSelect !== null && row.id === getCurrentSelect.id">
              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click.stop="removeRow(container.tb_window_element, index)"
              ></el-button>
            </div>
          </div>
        </div>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Row from '@/components/Row'
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'Search',
  props: {
    container: Object
  },
  components: { draggable, 'ext-row': Row },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['addElementAction', 'removeElementAction', 'removeRowAction', 'updateCurrentSelectAction']),
    addElement (evt) {
      if (this.container.tb_window_element[evt.newIndex].type !== 'row') {
        this.$message.warning('查询表单只能拖拽行元素')
        this.removeElementAction({ container: this.container, index: evt.newIndex })
      } else {
        let paramObj = {
          index: evt.newIndex,
          container: this.container,
          type: 'row'
        }
        this.addElementAction(paramObj)
      }
    },
    updateCurrentSelect (element) {
      this.updateCurrentSelectAction(element)
    },
    removeRow (obj, index) {
      this.removeRowAction({ obj: obj, index: index })
    }
  },
  computed: {
    ...mapGetters(['getContainer', 'getCurrentSelect']),
    formCalcHeight: function () {
      let elements = this.container.tb_window_element.length
      if (elements > 0) {
        return '100%'
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

<style scoped>

</style>
