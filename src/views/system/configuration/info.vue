<template>
  <div class="post-container">
    <div class="post-main-container">
      <!-- 操作按钮 -->
      <el-card class="box-card">
        <div class="card-header">
          <span>操作</span>
          <el-row>
            <el-button type="primary" size="mini" @click="add">新增</el-button>
            <el-button type="primary" size="mini" @click="edit">修改</el-button>
            <el-button type="danger" size="mini" @click="del">删除</el-button>
          </el-row>
        </div>
      </el-card>

      <!-- table list -->
      <el-table :data="table.list" border style="width: 100%;margin-top:5px;" v-loading="table.loading" @selection-change="getTableChangeVal">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="simplify" label="简化序列号">
        </el-table-column>
        <el-table-column prop="sort" label="排序">
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.num"
          :page-sizes="[10,20,30,50]" :page-size="pageForm.size" layout="total, sizes, prev, pager, next, jumper" :total="pageForm.total">
        </el-pagination>
      </div>

      <!-- dialog -->
      <el-dialog :title="dialogAdd?'新增配置':'修改配置'" :visible.sync="dialogStatus" @close="dialogClose">
        <el-form :model="dialogForm" ref="dialogForm" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="配置名称">
            <el-input v-model="dialogForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="配置描述">
            <el-input v-model="dialogForm.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import {
    getAllocationPage,
    addAllocation,
    getAllocation,
    editAllocation,
    delAllocation
  } from '@/api/system/configuration'
  import {
    getAllocationTypeAll
  } from '@/api/system/configuration'
  export default {
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChange: []
        },
        pageForm: {
          total: 1,
          num: 1,
          size: 10
        },
        dialogStatus: false,
        dialogLoading: false,
        dialogAdd: true,
        dialogForm: {},
        // 配置类型列表
        allocationTypeList: []
      }
    },
    created() {
      this.getList()
      // 获取配置类型列表
      getAllocationTypeAll().then(data => {
        this.allocationTypeList = data.result
      })
    },
    methods: {
      /** common */
      getList() {
        this.table.loading = true
        getAllocationPage({
          num: this.pageForm.num,
          size: this.pageForm.size
        }).then(data => {
          this.table.list = data.result
          this.pageForm.total = data.total
          this.table.loading = false
        }, () => {
          this.table.loading = false
        })
      },
      openDialogAndLoading() {
        this.dialogStatus = true
        this.dialogLoading = true
      },
      closeDialogAndLoading() {
        this.dialogStatus = false
        this.dialogLoading = false
      },
      /** 操作栏 */
      add() {
        this.dialogAdd = true
        this.openDialogAndLoading()
      },
      edit() {
        if (this.table.tableChange.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.dialogAdd = false
          this.openDialogAndLoading()
          // 获取配置信息
          getAllocation(this.table.tableChange[0].id).then(data => {
            this.dialogForm = data.result
          }).catch(() => {
            this.closeDialogAndLoading()
          })
        }
      },
      del() {
        if (this.table.tableChange.length === 0) {
          this.$message.info('请选择数据')
        } else {
          this.$confirm('确定删除选中的配置, 是否继续?', '删除配置', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const ids = []
            this.table.tableChange.map(item => {
              ids.push(item.id)
            })
            delAllocation(ids).then(() => {
              this.table.tableChange = []
              this.getList()
            })
          })
        }
      },
      // table 选中行
      getTableChangeVal(val) {
        this.table.tableChange = val
      },
      // 改变分页的每页条数
      handleSizeChange(val) {
        this.pageForm.size = val
        this.getList()
      },
      // 改变分页的页数
      handleCurrentChange(val) {
        this.pageForm.num = val
        this.getList()
      },
      resetPage() {
        this.pageForm.num = 1
        this.pageForm.size = 10
      },
      // dialog
      dialogSubmit() {
        this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            this.executeSubmit()
          }
        })
      },
      /** dialog 关闭初始化数据 */
      dialogClose() {
        // 重置表单
        this.$refs.dialogForm.resetFields()
        this.dialogForm = {}
      },
      executeSubmit() {
        this.dialogLoading = true
        if (this.dialogAdd) {
          addAllocation(this.dialogForm).then(data => {
            this.closeDialogAndLoading()
            // 获取最新的列表
            this.getList()
          }, () => {
            // 失败处理
            this.dialogLoading = false
          })
        } else {
          editAllocation(this.dialogForm).then(data => {
            this.closeDialogAndLoading()
            this.getList()
          }, () => {
            this.dialogLoading = false
          })
        }
      },
      // 分配权限按钮点击事件
      distrAuth(e) {
        this.dialogAuthStatus = true
        this.currentAllocationNode = e
      },
      // 分配权限dialog 关闭事件
      dialogAuthClose() {

      },
      // 分配权限树形菜单点击事件
      menuTreeCheckChange(data, check) {
        const actions = { list: [] }
        // 获取选中的菜单拥有的功能
        if (check) {
          // 构造菜单数据
          actions.title = data.title
          actions.menuId = data.id
          // getMenuActionList(data.id).then(data => {
          //   data.result.forEach(item => {
          //     // 构造功能数据
          //     actions.list.push({
          //       actionName: item.name,
          //       id: item.id
          //     })
          //   })
          // })
          this.actionList.push(actions)
        } else {
          // 取消选中 移除功能数据
          this.actionList.splice(this.actionList.findIndex(item => item.menuId === data.id), 1)
          // 移除多选框保留的数据
          this.checkedActionList = []
        }
      },
      // 分配权限dialog 确定提交事件
      dialogActionSubmit() {
        console.log(this.checkedActionList)
        console.log(this.currentAllocationNode.id)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .addAllocationContain {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

</style>
