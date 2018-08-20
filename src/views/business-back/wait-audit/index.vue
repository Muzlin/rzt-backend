<template>
  <div class="post-container">
    <div class="post-main-container">
      <Search></Search>
      <Action></Action>
      <MyTable></MyTable>
      <Pagination></Pagination>
    </div>
  </div>
</template>


<script>
  import Search from './components/Search.vue'
  import Action from './components/Action.vue'
  import MyTable from './components/Table.vue'
  import Pagination from './components/Pagination.vue'
  export default {
    name: 'list-wait-audit', // name 必须跟路由的name 不然不能缓存
    components: {
      Search,
      Action,
      MyTable,
      Pagination
    },
    created() {
      setTimeout(() => {
        const list = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
        this.$bus.emit('wait_audit_table_list', {
          list,
          loading: false
        })
      }, 1.5 * 1000)
    }
  }

</script>

<style lang="scss" scoped>
  .post-container {
    position: relative;
    .post-main-container {
      padding: 20px 20px;
    }
  }

</style>
