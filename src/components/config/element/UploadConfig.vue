<template>
  <el-form label-position="top">
    <el-form-item >
      <div style="font-size: 12px">
        <div>
          KEY值绑定元素:
          <el-select v-model="uploadObject.bindkey" size="small" style="width: 165px; margin-bottom: 10px"
          :value="uploadObject.bindkey">
            <el-option v-for="(type, index) in elementTypes" :key="index"
                       :label="type.label"
                       :value="type.value">
            </el-option>
          </el-select>
        </div>
        <div>
          指定对象:
          <el-select v-model="uploadObject.objname" size="small" style="width: 200px; margin-bottom: 10px"
          :value="uploadObject.objname">
            <el-option v-for="(type, index) in elementTypes" :key="index"
                       :label="type.label"
                       :value="type.value">
            </el-option>
          </el-select>
        </div>
        <div>
          指定对象KEY值:
          <el-select v-model="uploadObject.objid" size="small" style="width: 165px; margin-bottom: 10px"
          :value="uploadObject.objid">
            <el-option v-for="(type, index) in elementTypes" :key="index"
                       :label="type.label"
                       :value="type.value">
            </el-option>
          </el-select>
        </div>
        <div>
          文件类型:
          <el-select v-model="uploadObject.filetype" size="small" style="width: 200px; margin-bottom: 10px"
          :value="uploadObject.filetype">
            <el-option v-for="(type, index) in elementTypes" :key="index"
                       :label="type.label"
                       :value="type.value">
            </el-option>
          </el-select>
        </div>
        <div>
          图片高度:
          <el-input v-model="uploadObject.height" size="small" style="width: 200px; margin-bottom: 10px"
          ></el-input>
        </div>
        <div>
          图片宽度:
          <el-input v-model="uploadObject.width" size="small" style="width: 200px; margin-bottom: 10px"
          ></el-input>
        </div>
        <div>
          &emsp;单一文件:
          <el-switch
            v-model="uploadObject.singlefile">
          </el-switch>
          &emsp;&emsp;移动UI:
          <el-switch
            v-model="uploadObject.ismobile">
          </el-switch>
        </div>
        <div>
          保存后上传:
          <el-switch
            v-model="uploadObject.savebeforeup">
          </el-switch>
          &emsp;&emsp;可上传:
          <el-switch
            v-model="uploadObject.uploadable">
          </el-switch>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small">保存配置</el-button>
      <el-button type="primary" size="small">清空配置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'UploadConfig',
  data () {
    return {
      uploadObject: {
        elementid: '',
        savebeforeup: false,
        filetype: null,
        createtime: null,
        bindkey: null,
        uploadable: false,
        objname: null,
        width: null,
        objid: null,
        singlefile: true,
        id: '',
        ismobile: false,
        height: null
      }
    }
  },
  methods: {
    ...mapActions(['updateUploadAction'])
  },
  computed: {
    ...mapState(['currentSelect']),
    _uploadObject () {
      if (this.currentSelect.tb_window_uploadfile.length > 0) {
        return this.currentSelect.tb_window_uploadfile[0]
      } else {
        return []
      }
    }
  },
  watch: {
    _uploadObject (val) {
      this.uploadObject = val
    }
  }
}
</script>

<style scoped>

</style>
