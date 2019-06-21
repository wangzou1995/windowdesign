<template>
  <div style="height: 100%; border: 1px #969896 solid; text-align: left; padding: 10px"
       :style="{background: activeColor}"
  >
    <a-tabs
      v-model="activeKey"
      type="editable-card"
      @edit="addContainer"
      @click.stop="updateCurrentSelect"
      style="border: 1px silver dashed"
    >
      <a-tab-pane  v-for="(pane, index) in container.tb_window_element" :tab="pane.name"
                   :key=index :closable="(container.tb_window_element.length === (index+1))">
        <ext-from v-if="pane.containertype === 'form'" :container="pane"></ext-from>
        <ext-table v-if="pane.containertype === 'grid'" :container="pane" :isShowTool="true" toolPosition="bottom"></ext-table>
        <ext-toolbar v-if="pane.containertype === 'toolbar'" :container="pane"></ext-toolbar>
        <ext-tabs v-if="pane.containertype === 'tabpanel'" :container="pane"></ext-tabs>
        <card v-if="pane.containertype === 'cardpanel'" :container="pane"></card>
        <ext-search  v-if="pane.containertype === 'searchform'" :container="pane"></ext-search>
        <ext-container v-if="pane.containertype === 'container'" :container="pane"></ext-container>
        <div style="clear:both;"></div>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      title="请选择容器类型"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      width="600px"
    >
      <div style="text-align: center">
        <el-radio-group v-model="value" buttonStyle="solid"  >
          <el-radio-button v-for="(e, index) in tabInContainers" :key="index" :label="e.value">{{e.label}}</el-radio-button>
        </el-radio-group>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import From from '@/components/Form'
import Table from '@/components/Table'
import ToolBar from '@/components/ToolBar'
import Search from '@/components/Search'
import Container from '@/components/Container'
export default {
  name: 'Card',
  props: ['container'],
  components: { 'ext-from': From, 'ext-table': Table, 'ext-toolbar': ToolBar, 'ext-tabs': () => import('@/components/Tab.vue'), 'ext-search': Search, 'ext-container': Container },
  data () {
    return {
      activeKey: 0,
      visible: false,
      value: 'form',
      targetKye: null,
      action: ''
    }
  },
  methods: {
    ...mapActions(['addTabContainerAction', 'removeTabContainerAction', 'updateCurrentSelectAction']),
    addContainer (targetKey, action) {
      this.visible = action === 'add'
      this.targetKye = targetKey
      this.action = action
      if (!(action === 'add')) {
        this[action](targetKey)
      }
    },
    add () {
      this.addTabContainerAction({ container: this.container, type: this.value, action: 'card' })
      this.activeKey = this.container.tb_window_element.length - 1
    },
    remove (targetKey) {
      this.removeTabContainerAction({ container: this.container, type: this.value, index: targetKey })
      if (this.container.tb_window_element.length > 0) {
        this.activeKey = this.container.tb_window_element.length - 1
      } else {
        this.activeKey = 0
      }
    },
    handleOk () {
      this[this.action]()
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    },
    handleChange (value) {
      this.value = value
    },
    updateCurrentSelect () {
      if (this.container.tb_window_element.length > 0) {
        this.updateCurrentSelectAction(this.container.tb_window_element[this.activeKey])
      }
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

<style scoped>

</style>
