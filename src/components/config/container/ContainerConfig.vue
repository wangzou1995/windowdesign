<template>
  <a-collapse v-model="defaultContainerName"  :accordion="true" style="text-align: left">
    <a-collapse-panel header="基本配置" key="1">
      <ext-container-basic-config></ext-container-basic-config>
    </a-collapse-panel>
    <a-collapse-panel header="表格相关配置" key="2" v-if="currentSelect.type === 'grid'">
      <ext-container-grid-config></ext-container-grid-config>
    </a-collapse-panel>
    <a-collapse-panel header="分组配置" key="3">
    </a-collapse-panel>
    <a-collapse-panel header="图表配置" key="4">
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { mapState } from 'vuex'
import ContainerBasicConfig from '@/components/config/container/ContainerBasicConfig'
import ContainerGridConfig from '@/components/config/container/ContainerGridConfig'
export default {
  name: 'ExtContainerConfig',
  components: {
    'ext-container-basic-config': ContainerBasicConfig,
    'ext-container-grid-config': ContainerGridConfig
  },
  data () {
    return {
      defaultContainerName: '基本配置'
    }
  },
  methods: {
  },
  computed: {
    ...mapState([
      'currentSelect'
    ])
  }
}
</script>
<style scoped>
</style>
