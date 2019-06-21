<template>
  <div>
    <el-dialog width="850px" title="导入EXCEL配置" :visible="showImportExcel" style="text-align: left" @close="close">
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ImportExcelEvent',
  computed: {
    ...mapState(['showImportExcel'])
  }
}
</script>

<style scoped>

</style>
