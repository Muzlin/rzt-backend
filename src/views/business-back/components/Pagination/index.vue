<template>
  <div class="pagination-container">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
      :page-sizes="[1,2,3, 5]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total: 0,
        listQuery: {
          page: 1,
          limit: 5,
          query: {}
        }
      }
    },
    created() {
      this.$bus.on('wait_audit_list', (data) => {
        this.total = data.list.length
      })
    },
    methods: {
      getList() {
        this.listLoading = true
        this.total = this.list.length
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(this.listQuery.query)
        this.listQuery.page = val
        this.getList()
      }
    }
  }

</script>

<style lang="" scoped>


</style>
