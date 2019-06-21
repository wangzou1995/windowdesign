<template>
    <el-form  v-if="currentSelect"  ref="form" :model="currentSelect" label-width="80px" label-position="top"
              class="demo-ruleForm" style="text-align: left">
      <el-form-item  prop="id">
        <div class="config">
          容器编号:
          <el-input v-model="currentSelect.id" size="small" :disabled="true"></el-input>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="config">
          容器类型:
          <el-input v-model="currentSelect.containertype"  size="small" :disabled="true"></el-input>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="config">
          容器名称:
          <el-input v-model="currentSelect.containername" size="small" ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="config">
          容器描述:
          <el-input v-model="currentSelect.containerdesc" size="small" ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="config">
          排列方式:
          <el-select v-model="currentSelect.layouttype"  size="small" placeholder="请选择排列方式" :value="currentSelect.layouttype">
            <el-option label="自适应" value="auto"></el-option>
            <el-option label="水平" value="vbox"></el-option>
            <el-option label="纵向" value="hbox"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="config">
          对齐方式:
          <el-select v-model="currentSelect.layoutalign"  size="small" placeholder="请选择对齐方式" :value="currentSelect.layoutalign">
            <el-option label="顶部对齐" value="top"></el-option>
            <el-option label="左对齐" value="left"></el-option>
            <el-option label="右对齐" value="right"></el-option>
            <el-option label="底部对齐" value="buttom"></el-option>
            <el-option label="居中对齐" value="center"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="config">
          宽&emsp;&emsp;度:
          <el-input v-model="currentSelect.width" size="small"  ></el-input>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="config">
          高&emsp;&emsp;度:
          <el-input v-model="currentSelect.height" size="small" ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="config">
          收缩比例:
          <el-input v-model.number="currentSelect.flex" size="small" ></el-input>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="config">
          图&emsp;&emsp;标:
          <el-input v-model="currentSelect.iconcls" size="small" ></el-input>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="config">
          子&ensp;对&ensp;象:
          <el-select v-model="currentSelect.subobjid" size="small" :clearable="true" :value="currentSelect.subobjid">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="config">
          自动加载数据:
          <el-switch
            v-model="currentSelect.loaddata"
          >
          </el-switch>
          &emsp;只读:
          <el-switch
            v-model="currentSelect.readonly"
          >
          </el-switch>
        </div>
      </el-form-item>
      <el-form-item >
        <div class="config">
          <el-button type="primary" @click="showFilterView" icon="el-icon-remove" size="small" >过滤条件</el-button>
          <el-button type="primary" @click="showSqlView" icon="el-icon-remove" size="small" >自定义SQL</el-button>
        </div>
      </el-form-item>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ContainerBasicConfig',
  methods: {
    ...mapActions(['updateScriptTypeAction', 'updateSqlViewAction', 'updateContainerFilterViewAction', 'updateFilterTypeAction']),
    showSqlView () {
      this.updateScriptTypeAction('containerCustomSQL')
      this.updateSqlViewAction(true)
    },
    showFilterView () {
      this.updateFilterTypeAction('containerFilter')
      this.updateContainerFilterViewAction(true)
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
