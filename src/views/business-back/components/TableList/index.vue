<template>
  <el-table :data="myList" border style="width: 100%;margin-top:5px;" v-loading="myLoading" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="date" label="标的ID">
    </el-table-column>
    <el-table-column prop="name" label="标的名称">
    </el-table-column>
    <el-table-column prop="name" label="基础利率(%)" width="100px;">
    </el-table-column>
    <el-table-column prop="name" label="标的金额">
    </el-table-column>
    <el-table-column prop="name" label="还款方式">
    </el-table-column>
    <el-table-column prop="name" label="提供商">
    </el-table-column>
    <el-table-column prop="name" label="业务类型">
    </el-table-column>
    <el-table-column prop="name" label="借款人类型">
    </el-table-column>
    <el-table-column prop="name" label="借款人">
    </el-table-column>
    <el-table-column prop="name" label="标的类型">
    </el-table-column>
    <el-table-column prop="name" label="审核状态">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      tableType: {
        type: String,
        default: 'wait-audit'
      }
    },
    name: this.tableType,
    data() {
      return {
        myList: [],
        myLoading: true
      }
    },
    created() {
      this.$bus.on('wait_audit_list', data => {
        this.myList = data.list
        this.myLoading = data.loading
      })
    },
    methods: {
      handleSelectionChange(val) {
        this.$bus.emit('tableChange', val)
      }
    }
  }

</script>

<style lang="" scoped>


</style>
