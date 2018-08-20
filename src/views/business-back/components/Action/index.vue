<template>
  <div>
    <el-card class="box-card">
      <div class="card-header">
        <span>标的操作</span>
        <el-row>
          <el-button type="primary" size="mini" @click="showLog">查看操作记录</el-button>
          <el-button type="primary" size="mini" @click="showInfo">查看标的详情</el-button>
          <router-link to="/project/init-project">
            <el-button type="primary" size="mini" to="/project/init-project">新增</el-button>
          </router-link>
          <el-button type="primary" size="mini" @click="audit">提交初审</el-button>
          <el-button type="danger" size="mini" @click="del">删除</el-button>
          <el-button type="primary" size="mini" @click="edit">重新编辑</el-button>
        </el-row>
      </div>
    </el-card>
    <ActionDialog :list="actionLogList" v-model="showActionDialog"></ActionDialog>
  </div>
</template>

<script>
  import ActionDialog from '../Dialog/actionLog.vue'
  export default {
    props: [
      'searchType'
    ],
    components: {
      ActionDialog
    },
    data() {
      return {
        tableChange: [],
        actionLogList: [],
        showActionDialog: false
      }
    },
    created() {
      this.$bus.on('tableChange', (data) => {
        this.tableChange = data
      })
    },
    methods: {
      showLog() {
        if (this.tableChange.length !== 1) {
          this.$message.info('请选择一条数据')
          this.showActionDialog = false
        } else {
          this.showActionDialog = true
          this.$message.success('success')
        }
      },
      showInfo() {
        if (this.tableChange.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.$message.success('success')
        }
      },
      audit() {
        if (this.tableChange.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.$confirm('确定提交产品初审, 是否继续?', '提交初审', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.$message.success('提交成功')
          }).catch(() => {
            this.$message.info('取消操作')
          })
        }
      },
      del() {
        if (this.tableChange.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.$confirm('确定删除该产品, 是否继续?', '删除产品', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message.success('删除成功')
          }).catch(() => {
            this.$message.info('取消操作')
          })
        }
      },
      edit() {
        if (this.tableChange.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.$message.success('success')
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .box-card {
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #EBEEF5;
      padding-bottom: 5px;
      color: #606266
    }
  }

</style>
