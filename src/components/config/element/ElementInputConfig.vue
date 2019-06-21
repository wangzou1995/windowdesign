<template>
  <el-form   label-position="top" >
    <el-form-item>
      <div style="font-size: 12px">
        <div>
          输入格式:
          <el-input v-model="currentSelect.inputmask" size="small" style="width: 200px; margin-bottom: 10px"
          ></el-input>
        </div>
        <div >
          显示格式:
          <el-input v-model="currentSelect.displayformat" size="small" style="width: 200px; margin-bottom: 10px"
          ></el-input>
        </div>
        <div >
          提示信息:
          <el-input :rows="3" v-model="currentSelect.emptytext" size="small" type="textarea" style="width: 255px; margin-bottom: 10px"
          ></el-input>
        </div>
        <div >
          输入验证类型:
          <el-select v-model="currentSelect.verifytype" size="small" style="width: 255px; margin-bottom: 10px" :value="currentSelect.verifytype"
                     >
            <el-option v-for="(type, index) in verifyTypes" :key="index"
                       :label="type.label"
                       :value="type.value">
            </el-option>
          </el-select>
        </div>
        <div >
          验证提示:
          <el-input v-model="currentSelect.verifyinfo" size="small" style="width: 255px; margin-bottom: 10px" :rows="3" type="textarea"
          ></el-input>
        </div>
        <div >
          验证表达式:
          <el-input type="textarea" :rows="5" v-model="currentSelect.verifyformula" size="small" style="width: 255px; margin-bottom: 10px"
          ></el-input>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ElementInputConfig',
  data () {
    return {
      verifyTypes: [
        {
          'label': '纯字母',
          'value': 'alpha'
        },
        {
          'label': '字母+数字',
          'value': 'alphanum'
        },
        {
          'label': '整数',
          'value': 'integer'
        },
        {
          'label': '小数',
          'value': 'decimal'
        },
        {
          'label': '汉子',
          'value': 'zh_cn'
        },
        {
          'label': '邮箱',
          'value': 'email'
        },
        {
          'label': '网页地址',
          'value': 'url'
        },
        {
          'label': '手机号',
          'value': 'mobile'
        },
        {
          'label': '身份证号',
          'value': 'idcard'
        },
        {
          'label': '正则表达式',
          'value': 'regex'
        },
        {
          'label': '自定义JS(val,field)',
          'value': 'vtype'
        }
      ]
    }
  },
  computed: {
    ...mapState(['currentSelect'])
  }
}
</script>

<style scoped>

</style>
