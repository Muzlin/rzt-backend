<template>
  <el-dialog title="操作记录" :visible.sync="myShow">
    <el-table :data="list">
      <el-table-column property="date" label="操作人"></el-table-column>
      <el-table-column property="name" label="时间"></el-table-column>
      <el-table-column property="address" label="结果"></el-table-column>
      <el-table-column property="address" label="意见"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: []
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        myShow: false
      }
    },
    // 父组件调用时给一个 v-model 语法糖 实现父子组件数据双向绑定
    watch: {
      value(v) {
        this.myShow = v
      },
      myShow(v){
        this.$emit('input',v)
      }
    }
  }

</script>

<style lang="" scoped>


</style>
