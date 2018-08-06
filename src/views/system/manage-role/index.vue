<template>
  <div class="post-container">
    <div class="post-main-container">
      <!-- 搜索栏 -->
      <el-form class="form-container" :model="searchForm" :inline="true" ref="searchForm" label-width="100px" size="mini">
        <el-card class="box-card" :body-style="{ padding: '5px 20px' }">
          <div>
            <div class="card-header">
              <span>检索条件</span>
              <div>
                <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
                <el-button size="mini" @click="resetSearch">重置</el-button>
              </div>
            </div>
            <el-form-item class="form-item" prop="name">
              <el-input placeholder="请输入角色名" v-model="searchForm.name" :clearable="true">
                <template slot="suffix" class="slotClass">角色名</template>
              </el-input>
            </el-form-item>
          </div>
        </el-card>
      </el-form>

      <!-- 操作按钮 -->
      <el-card class="box-card">
        <div class="card-header">
          <span>角色操作</span>
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
        </el-table-column> -->
        <el-table-column prop="date" label="标的ID">
        </el-table-column>
        <el-table-column prop="name" label="标的名称">
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

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.page"
          :page-sizes="[10,20,30,50]" :page-size="pageForm.size" layout="total, sizes, prev, pager, next, jumper" :total="pageForm.total">
        </el-pagination>
      </div>

      <!-- dialog -->
      <el-dialog :title="dialogRoleAdd?'新增角色':'修改角色'" :visible.sync="dialogRoleStatus" width="60%" v-loading="dialogRoleLoading"
        @close="dialogClose">

        <div style="display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;">
          <div style="height:300px;overflow:auto;width:50%;">
            <el-tree :data="menuList" show-checkbox accordion node-key="id" :default-checked-keys="checkedMenuList" ref="menuTree-role">
            </el-tree>
          </div>
          <div class="roleForm">
            <el-form :model="roleForm" ref="roleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="角色名" prop="name" required>
                <el-input v-model="roleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="roleForm.remark"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogRoleStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import {
    getRoleList,
    getMenuList,
    addRole,
    getRole,
    editRole,
    delRole
  } from '@/api/system'
  import toTree from './customEval.js'
  export default {
    name: 'sys-manage-role', // name 必须跟路由的name 不然不能缓存
    data() {
      return {
        searchForm: {
          name: null
        },
        table: {
          list: [],
          loading: false,
          tableChangeId: []
        },
        pageForm: {
          total: 0,
          page: 1,
          size: 10
        },
        dialogRoleStatus: false,
        dialogRoleAdd: true,
        dialogRoleLoading: false,
        menuList: [],
        checkedMenuList: [],
        roleForm: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // common
      getList() {
        this.table.loading = true
        getRoleList({
          page: this.pageForm.page,
          size: this.pageForm.size,
          name: this.searchForm.name
        }).then(data => {
          this.table.list = data
          this.table.loading = false
        }, () => {
          this.table.loading = false
        })
      },
      openDialogAndLoading() {
        this.dialogRoleStatus = true
        this.dialogRoleLoading = true
      },
      closeDialogAndLoading() {
        this.dialogRoleStatus = false
        this.dialogRoleLoading = false
      },
      // 搜索栏
      handleSearch() {
        // 重置分页
        this.resetPage()
        // 请求数据
        this.getList()
      },
      resetSearch() {
        this.$refs.searchForm.resetFields()
      },
      // 操作按钮
      add() {
        this.dialogRoleAdd = true
        this.openDialogAndLoading()
        // 获取所有菜单 树形转换
        getMenuList().then(data => {
          this.dialogRoleLoading = false
          this.menuList = toTree(data)
        })
      },
      edit() {
        if (this.table.tableChangeId.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.dialogRoleAdd = false
          this.openDialogAndLoading()
          // 获取所有菜单 树形转换
          getMenuList().then(data => {
            this.dialogRoleLoading = false
            this.menuList = toTree(data)
          }, () => {
            this.closeDialogAndLoading()
            return
          })
          // 获取角色已拥有的菜单信息和角色信息
          getRole(this.table.tableChangeId).then(data => {
            // 角色信息
            this.roleForm = data.sysRolePo
            // 已有菜单 默认选中
            this.checkedMenuList = data.menuIds
            this.dialogRoleLoading = false
          }).catch(() => {
            this.closeDialogAndLoading()
          })
        }
      },
      del() {
        if (this.table.tableChangeId.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.$confirm('确定删除该角色, 是否继续?', '删除角色', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delRole(this.table.tableChangeId[0].id).then(() => {
              this.getList()
            })
          }).catch(() => {
            this.$message.info('取消操作')
          })
        }
      },
      // table 选中行
      getTableChangeVal(val) {
        this.table.tableChangeId = val
      },
      // 分页
      handleSizeChange(val) {
        this.pageForm.size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.pageForm.page = val
        this.getList()
      },
      resetPage() {
        this.pageForm.page = 1
        this.pageForm.size = 10
      },
      // dialog
      dialogSubmit() {
        this.$refs['roleForm'].validate((valid) => {
          if (valid) {
            // 半选中的ID
            let halfChecked = this.$refs['menuTree-role'].getHalfCheckedKeys()
            // 全选中的ID
            let checked = this.$refs['menuTree-role'].getCheckedKeys()
            // 合并ID
            let allChecked = [...halfChecked, ...checked]
            if (allChecked.length === 0) {
              this.$confirm('确定不给角色分配菜单吗, 是否继续?', this.dialogRoleAdd ? '创建角色' : '删除角色', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.executeSubmit(allChecked)
              }).catch(() => {
                this.$message.info('取消操作')
              })
            } else {
              this.executeSubmit(allChecked)
            }
          }
        })
      },
      dialogClose() {
        this.$refs.roleForm.resetFields()
        this.roleForm = {}
      },
      executeSubmit(allChecked) {
        this.dialogRoleLoading = true
        console.log(allChecked)
        if (this.dialogRoleAdd) {
          addRole({
            menuIds: allChecked,
            sysRolePo: this.roleForm
          }).then(data => {
            this.closeDialogAndLoading()
            // 获取最新的列表
            this.getList()
          }, () => {
            // 失败处理
            this.dialogRoleLoading = false
          })
        } else {
          editRole({
            menuIds: allChecked,
            sysRolePo: this.roleForm
          }).then(data => {
            this.closeDialogAndLoading()
            this.getList()
          }, () => {
            this.dialogRoleLoading = false
          })
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .addRoleContain {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

</style>
