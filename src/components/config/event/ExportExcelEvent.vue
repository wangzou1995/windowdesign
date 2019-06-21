<template>
  <el-dialog width="850px" title="导入EXCEL配置" :visible="showExportExcel" style="text-align: left" @close="close">
   <el-form>
     <div>
       ETL导入:
       <el-switch></el-switch>
     </div>>
   </el-form>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ExportExcelEvent',
  computed: {
    ...mapState(['showExportExcel'])
  }
}
</script>

<style scoped>

</style>
