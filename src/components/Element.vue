<template>
  <fieldset disabled>
  <div v-if="element != null" style="float: left; text-align: left; width: 100%">
    <el-input v-if="element.type ==='input'"
    >
        <template v-if="!element.parenttype" slot="prepend" :value="element.name">{{element.title}}</template>
    </el-input>
    <el-button v-if="element.type ==='button'" type="primary" v-text="element.title"
    >
    </el-button>
    <!--<span style="float: left;">{{element.title}}</span>-->
    <el-select v-if="element.type ==='select'" value="" style="width: 100%;">
    </el-select>
  </div>
  </fieldset>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Element',
  props: ['element'],
  methods: {
  },
  computed: mapState([
    'currentSelect'
  ])
}
</script>

<style scoped>
  fieldset[disabled] {
    pointer-events: none;
  }
</style>
