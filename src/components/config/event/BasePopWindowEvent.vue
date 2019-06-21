<template>
  <el-dialog style="text-align: left" :visible="showBasePopWindow" width="400px" @close="close" title="弹窗配置">
  <div>
    <div class="basePopWindow">
      <span class="titleClass">弹出窗口:</span>
    <el-select v-model="popWindowObj.popwindowid" :value="popWindowObj.popwindowid" size="small"></el-select>
    </div>
    <div class="basePopWindow">
      <span class="titleClass">关闭时刷新主数据:</span>
      <el-switch v-model="popWindowObj.refreshmainonclose"></el-switch>
    </div>
    <div style="margin-top: 50px; text-align: right ">
      <slot name="action">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </slot>
    </div>
  </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'BasePopWindowEvent',
  data () {
    return {
      popWindowObj: {
        actionid: '',
        popwindowid: '',
        fillinflds: '',
        fillcontainerid: '',
        script: '',
        filter: '',
        ukfields: '',
        writebackflds: '',
        multiselect: false,
        objtransid: '',
        importdatacon: '',
        refreshmainonclose: false,
        createtime: '',
        id: ''
      }
    }
  },
  methods: {
    ...mapActions(['updateShowBaseWindowAction', 'updateBasePopWindowObjAction']),
    close () {
      this.updateShowBaseWindowAction(false)
    },
    submit () {
      this.updateBasePopWindowObjAction(this.popWindowObj)
      this.updateShowBaseWindowAction(false)
    }
  },
  created () {
    let pop = this.currentSelect.tb_window_element_action[this.eventIndex].tb_window_element_action_popwin
    if (pop.length === 1) {
      this.popWindowObj = JSON.parse(JSON.stringify(pop[0]))
    } else {
      this.popWindowObj.id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
      this.popWindowObj.actionid = this.currentSelect.tb_window_element_action[this.eventIndex].id
    }
  },
  computed: {
    ...mapState(['showBasePopWindow', 'currentSelect', 'eventIndex'])
  }
}
</script>

<style scoped>
  .titleClass {
    display: block;
    width: 120px;
    float: left;
    text-align: right;
    margin-right: 5px;
  }
  .basePopWindow {
    font-size: 12px;
    margin-bottom: 10px;
  }
</style>
