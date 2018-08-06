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
            <el-form-item class="form-item" prop="userName">
              <el-input placeholder="请输入用户名" v-model="searchForm.userName" :clearable="true">
                <template slot="suffix" class="slotClass">用户名</template>
              </el-input>
            </el-form-item>
          </div>
        </el-card>
      </el-form>

      <!-- 操作按钮 -->
      <el-card class="box-card">
        <div class="card-header">
          <span>用户操作</span>
          <el-row>
            <el-button type="primary" size="mini" @click="add">新增</el-button>
            <el-button type="primary" size="mini" @click="edit">修改</el-button>
            <el-button type="danger" size="mini" @click="del">删除</el-button>
          </el-row>
        </div>
      </el-card>

      <!-- table list -->
      <el-table :data="table.list" border style="width: 100%;margin-top:5px;" v-loading="table.loading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column> -->
        <el-table-column prop="userName" label="用户名">
        </el-table-column>
        <el-table-column prop="mobile" label="手机">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.page"
          :page-sizes="[10,20,30,50]" :page-size="pageForm.size" layout="total, sizes, prev, pager, next, jumper" :page-count="pageForm.total">
        </el-pagination>
      </div>

      <!-- dialog -->
      <el-dialog :title="dialogUserAdd?'新增用户':'修改用户'" :visible.sync="dialogUserStatus" width="60%" v-loading="dialogUserLoading"
        @close="dialogClose">

        <div style="display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;">
          <div style="height:300px;overflow:auto;width:50%;">
            <el-tag type="info" size="mini" style="margin-bottom:15px;width:100%;">选择角色</el-tag>
            <el-checkbox-group v-model="checkRoles" size="mini">
              <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id" border style="margin:0 5px 5px 0;">{{role.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="width:50%;">
            <el-form :model="userForm" ref="userForm" label-width="100px">
              <el-form-item v-if="dialogUserAdd" label="用户名" prop="userName" required>
                <el-input v-model="userForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email" required>
                <el-input v-model="userForm.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile" required>
                <el-input v-model="userForm.mobile"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" required="">
                <el-input type="password" v-model="userForm.password"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="userForm.remark"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUserStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import {
    getUserList,
    delUser,
    getRoleList,
    getUser,
    addUser,
    editUser
  } from '@/api/system'
  export default {
    name: 'sys-manage-user', // name 必须跟路由的name 不然不能缓存
    data() {
      return {
        searchForm: {
          userName: ''
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
        dialogUserStatus: false,
        dialogUserAdd: true,
        dialogUserLoading: false,
        checkRoles: [],
        allRoles: [],
        userForm: {
          userName: '',
          email: '',
          mobile: '',
          password: '',
          remark: ''
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // common
      getList() {
        this.table.loading = true
        getUserList({
          page: this.pageForm.page - 1, // 服务端页码从0开始
          size: this.pageForm.size,
          userName: this.searchForm.userName
        }).then(data => {
          this.pageForm.total = data.totalPages
          this.table.list = data.content
          this.table.loading = false
        }, () => {
          this.table.loading = false
        })
      },
      closeDialogAndLoading() {
        this.dialogUserStatus = false
        this.dialogUserLoading = false
      },
      openDialogAndLoading() {
        this.dialogUserStatus = true
        this.dialogUserLoading = true
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
        this.dialogUserAdd = true
        this.openDialogAndLoading()
        // 获取所有角色
        getRoleList().then(data => {
          this.allRoles = data.content
          this.dialogUserLoading = false
        }, () => {
          this.closeDialogAndLoading()
        })
      },
      edit() {
        if (this.table.tableChangeId.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.dialogUserAdd = false
          this.openDialogAndLoading()
          // 获取所有角色
          getRoleList().then(data => {
            this.allRoles = data.content
            this.dialogUserLoading = false
          }, () => {
            this.closeDialogAndLoading()
            return
          })
          // 获取已有的用户数据
          getUser(this.table.tableChangeId[0].id).then(data => {
            console.log(data)
            // 默认选中用户已有的角色 如果没有初始化为数组
            this.checkRoles = data.roleIds || []
            // 填充用户已有的数据
            this.userForm = data.sysUserPo || {}
            this.dialogUserLoading = false
          }, () => {
            this.closeDialogAndLoading()
          })
        }
      },
      del() {
        if (this.table.tableChangeId.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.$confirm('确定删除该用户, 是否继续?', '删除用户', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delUser(this.table.tableChangeId[0].id).then(() => {
              this.getList()
            })
          }).catch(() => {
            this.$message.info('取消操作')
          })
        }
      },
      // table 选中行
      handleSelectionChange(val) {
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
        this.$refs.userForm.validate(valid => {
          if (valid) {
            if (this.checkRoles.length === 0) {
              this.$confirm('确定不分配角色吗, 是否继续?', '添加人员', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                this.executeSubmit()
              }, () => {
                this.$message.info('取消操作')
              })
            } else {
              this.executeSubmit()
            }
          }
        })
      },
      dialogClose() {
        this.checkRoles = []
        this.userForm = {}
        this.$refs.userForm.resetFields()
      },
      executeSubmit() {
        this.dialogUserLoading = true
        console.log(this.checkRoles)
        if (this.dialogUserAdd) {
          addUser({
            roleIds: this.checkRoles,
            sysUserPo: this.userForm
          }).then(data => {
            this.closeDialogAndLoading()
            this.getList()
          }, () => {
            this.dialogUserLoading = false
          })
        } else {
          editUser({
            roleIds: this.checkRoles,
            sysUserPo: this.userForm
          }).then(data => {
            this.closeDialogAndLoading()
            this.getList()
          }, () => {
            this.dialogUserLoading = false
          })
        }
      }
    }
  }

</script>

<style lang="scss" scoped>


</style>
