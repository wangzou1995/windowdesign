<template>
  <el-form>
    <el-form-item>
    <div class="config">
      是否显示工具栏:
      <el-switch
        v-model="currentSelect.isShowTool"
        @change="showGridTool"
      >
      </el-switch>
    </div>
    </el-form-item>
  <el-form-item>
    <div class="config" >
      工具栏位置:
      <el-select v-model="currentSelect.toolPosition"  size="small"  :value="currentSelect.toolPosition" style="width: 220px; margin-bottom: 10px">
        <el-option label="顶部" value="top"></el-option>
        <el-option label="底部" value="bottom"></el-option>
      </el-select>
    </div>
  </el-form-item>
  <el-form-item  >
    <div class="config">
      显示分页:
      <el-switch
        v-model="currentSelect.showpage"
      >
      </el-switch>
      默认新增记录:
      <el-switch
        v-model="currentSelect.showpage"
      >
      </el-switch>
    </div>
  </el-form-item>
  <el-form-item >
    <div class="config">
      复&ensp;选&ensp;框:
      <el-switch
        v-model="currentSelect.checkbox"
      >
      </el-switch>
     &emsp;列宽自适应:
      <el-switch
        v-model="currentSelect.showpage"
      >
      </el-switch>
    </div>
  </el-form-item>
  <el-form-item  >
    <div class="config">
      表格过滤:
      <el-switch
        v-model="currentSelect.gridfilter"
      >
      </el-switch>
      滚动保存数据:
      <el-switch
        v-model="currentSelect.autosave"
      >
      </el-switch>
    </div>
  </el-form-item>
  <el-form-item >
    <div class="config">
      每页条数:
      <el-input v-model="currentSelect.pagesize" size="small" style="width: 220px; margin-bottom: 10px"></el-input>
    </div>
  </el-form-item>
  <el-form-item >
    <div class="config">
      提交范围:
      <el-select v-model="currentSelect.datasubmitrange" :value="currentSelect.datasubmitrange" style="width: 220px; margin-bottom: 10px">
        <el-option label="全部" value="all"></el-option>
        <el-option label="改变的数据" value="change"></el-option>
        <el-option label="选择的数据" value="select"></el-option>
      </el-select>
    </div>
  </el-form-item>
  <el-form-item >
    <div class="config">
      滚动事件:
      <el-input v-model="currentSelect.scrollevent" type="textarea" :rows="5" style="width: 220px; margin-bottom: 10px"></el-input>
    </div>
  </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ContainerGridConfig',
  methods: {
    ...mapActions(['addGridToolAction']),
    showGridTool (value) {
      this.addGridToolAction(value)
    }
  },
  computed: {
    ...mapState(['currentSelect'])
  }
}
</script>

<style scoped>
  .config {
    font-size: 12px;
  }
</style>
