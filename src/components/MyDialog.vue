<template>
  <el-dialog
    class="cus-dialog-container"
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :show-close="showClose"
    center
    :width="width"
    ref="elDialog"
    :id="id"
  >
    <span v-if="show">
      <slot></slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    visible: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600px'
    },
    form: {
      type: Boolean,
      default: true
    },
    action: {
      type: Boolean,
      default: true
    },
    type: String,
    showClose: Boolean
  },
  computed: {
    show () {
      if (this.form) {
        return this.showForm
      } else {
        return true
      }
    }
  },
  data () {
    return {
      // loading: false,
      dialogVisible: this.visible,
      id: 'dialog_' + new Date().getTime(),
      showForm: false
    }
  },
  methods: {
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        // this.loading = false
        this.$emit('on-close')
        setTimeout(() => {
          this.showForm = false
        }, 300)
      } else {
        this.showForm = true
      }
    },
    visible (val) {
      this.dialogVisible = val
    }
  }
}
</script>

<style lang="scss">
  .cus-dialog-container{
    .el-dialog__footer{
      margin: 0 20px;
      // border-top: 1px dashed #ccc;
      padding: 15px 0 16px;
      text-align: center;
      position: relative;
      .dialog-footer{
        display: block;
        float: right;
        margin-top: -30px;
        .circular{
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
          width: 24px;
          height: 24px;
        }
        .el-loading-text{
          display: inline-block;
          vertical-align: middle;
        }
        .el-loading-spinner{
          margin-top: -12px;
        }
      }
    }
  }
</style>
