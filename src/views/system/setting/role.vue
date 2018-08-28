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
        <el-table-column prop="name" label="角色名称">
        </el-table-column>
        <el-table-column prop="remark" label="描述">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="distrAuth(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.num"
          :page-sizes="[10,20,30,50]" :page-size="pageForm.size" layout="total, sizes, prev, pager, next, jumper" :total="pageForm.total">
        </el-pagination>
      </div>

      <!-- dialog -->
      <el-dialog :title="dialogAdd?'新增角色':'修改角色'" :visible.sync="dialogStatus" @close="dialogClose">
        <el-form :model="dialogForm" ref="dialogForm" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="角色名称">
            <el-input v-model="dialogForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="dialogForm.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 权限分配 dialog -->
      <el-dialog title="分配权限" width="800px;" :visible.sync="dialogAuthStatus" @close="dialogAuthClose">
        <el-row>
          <el-tag type="danger" style="margin-bottom:10px;">当前角色:{{currentRoleNode.name}}</el-tag>
        </el-row>
        <el-row>
          <el-col :span="8" style="border-right:1px solid #75B8F9;max-height:300px;overflow:scroll;">
            <div class="grid-content bg-purple">
              <el-tree :data="menuList" ref="menuTree" check-strictly show-checkbox default-expand-all node-key="id" :props="{label: 'title'}"
                @check-change="menuTreeCheckChange">
              </el-tree>
            </div>
          </el-col>
          <el-col :span="16" style="max-height:300px;overflow:scroll;">
            <div class="grid-content bg-purple">
              <el-checkbox-group v-model="checkedActionList">
                <div v-for="action in actionList" style="margin-bottom:3px;" :key="action.title">
                  <el-tag size="mini" style="margin:0 5px;">{{action.title}}</el-tag>
                  <el-checkbox v-for="item in action.list" :key="item.id" :label="item.id">{{item.actionName}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAuthStatus = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="dialogActionSubmit" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import {
    getRoleList,
    addRole,
    getRole,
    editRole,
    delRole
  } from '@/api/system/setting'
  import {
    getMenuList,
    getMenuActionList
  } from '@/api/system/setting'
  import {
    distrRoleActions,
    getRoleFuncList
  } from '@/api/system/setting'
  import customEvalArray from './eval.js'
  export default {
    name: 'sys-setting-role', // name 必须跟路由的name 不然不能缓存
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
        // 分配权限的菜单树
        menuList: [],
        // 选中的菜单
        checkedMenuList: [],
        // 根据选中的菜单获取菜单拥有的功能
        actionList: [],
        // 选中的所有功能集合
        checkedActionList: [],
        // 权限分配dialog 状态
        dialogAuthStatus: false,
        // 当前选择的角色节点
        currentRoleNode: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      /** common */
      getList() {
        this.table.loading = true
        getRoleList({
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
      /** 搜索栏 */
      handleSearch() {
        // 重置分页
        this.resetPage()
        // 请求数据
        this.getList()
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
          // 获取角色信息
          getRole(this.table.tableChange[0].id).then(data => {
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
          this.$confirm('确定删除选中的角色, 是否继续?', '删除角色', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const ids = []
            this.table.tableChange.map(item => {
              ids.push(item.id)
            })
            delRole(ids).then(() => {
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
      executeSubmit() {
        this.dialogLoading = true
        if (this.dialogAdd) {
          addRole(this.dialogForm).then(data => {
            this.closeDialogAndLoading()
            // 获取最新的列表
            this.getList()
          }, () => {
            // 失败处理
            this.dialogLoading = false
          })
        } else {
          editRole(this.dialogForm).then(data => {
            this.closeDialogAndLoading()
            this.getList()
          }, () => {
            this.dialogLoading = false
          })
        }
      },
      /** dialog 关闭初始化数据 */
      dialogClose() {
        // 重置表单
        this.$refs.dialogForm.resetFields()
        this.dialogForm = {}
      },
      // 分配权限按钮点击事件
      distrAuth(e) {
        this.dialogAuthStatus = true
        this.currentRoleNode = e
        // 获取树形菜单
        getMenuList().then(data => {
          // 处理菜单数据 如果没有路由地址则不允许选中
          this.menuList = customEvalArray(data.result)
        })
        // 获取角色已拥有的菜单功能权限
        this.getRoleOwnAction()
      },
      // 分配权限dialog 关闭事件
      dialogAuthClose() {

      },
      // 分配权限树形菜单点击事件
      menuTreeCheckChange(data, check) {
        const actions = {
          list: []
        }
        // 获取选中的菜单拥有的功能
        if (check) {
          // 点击选中 构造菜单功能数据
          actions.title = data.title
          actions.menuId = data.id
          getMenuActionList(data.id).then(data => {
            data.result.forEach(item => {
              // 不显示隐藏功能
              if (item.isShow) {
                // 构造功能数据
                actions.list.push({
                  actionName: item.name,
                  id: item.id
                })
              }
            })
          })
          this.actionList.push(actions)
          // 获取角色已拥有的菜单功能权限
          this.getRoleOwnAction()
        } else {
          // 取消选中 移除功能数据
          this.actionList.splice(this.actionList.findIndex(item => item.menuId === data.id), 1)
          // 移除多选框保留的数据
          this.checkedActionList = []
          // 获取角色已拥有的菜单功能权限
          this.getRoleOwnAction()
        }
      },
      // 获取角色已拥有的菜单功能权限
      getRoleOwnAction() {
        // 获取角色已拥有的菜单功能权限
        getRoleFuncList(this.currentRoleNode.id).then(data => {
          // 构建角色已拥有的权限数据
          data.result.forEach(item => {
            this.checkedActionList.push(item.rfuncId)
          })
        })
      },
      // 分配权限dialog
      dialogActionSubmit() {
        if (this.checkedActionList.length === 0) {
          this.$confirm('确定不给此角色分配权限吗, 是否继续?', '分配角色权限', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.executeActionSubmit()
          })
        } else {
          this.executeActionSubmit()
        }
      },
      // 分配权限确定提交事件
      executeActionSubmit() {
        // 构造请求数据
        const funcList = []
        this.checkedActionList.forEach(item => {
          funcList.push({
            rfuncId: item
          })
        })
        distrRoleActions({
          roleId: this.currentRoleNode.id,
          roleFuncList: funcList
        }).then(() => {
          this.dialogAuthStatus = false
        })
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
