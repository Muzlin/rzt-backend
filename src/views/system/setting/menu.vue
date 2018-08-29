<template>
  <div class="post-container">
    <div class="post-main-container">
      <!-- 操作按钮 -->
      <el-card class="box-card">
        <div class="card-header">
          <span>操作</span>
          <el-row>
            <el-button type="primary" size="mini" @click="addTopMenu">添加顶级菜单</el-button>
          </el-row>
        </div>
      </el-card>

      <!-- table list -->
      <tree-table :data="menuList" v-loading="loading" border>
        <el-table-column label="图标" width="80px;">
          <template slot-scope="scope">
            <svg-icon v-if="scope.row.ico" :icon-class="scope.row.ico"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" prop="isShow" width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.isShow?'显示':'隐藏'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="remark">
        </el-table-column>
        <el-table-column label="地址" prop="url">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="del(scope.row)">删除</el-button>
            <el-button type="text" @click="edit(scope.row)">修改</el-button>
            <el-button type="text" @click="add(scope.row)">添加</el-button>
            <el-button type="text" @click="distr(scope.row)">分配</el-button>
          </template>
        </el-table-column>
      </tree-table>

      <!-- 菜单编辑 dialog -->
      <el-dialog :title="dialogAdd?'新增菜单':'修改菜单'" :visible.sync="dialogStatus" @close="dialogClose">
        <el-form :model="dialogForm" ref="dialogForm" label-width="100px">
          <el-form-item v-if="dialogAdd" label="父级菜单">
            <el-input :value="currentMenuTitle" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="title">
            <el-input v-model="dialogForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="副名称" prop="subhead">
            <el-input v-model="dialogForm.subhead" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="ico">
            <el-input v-model="dialogForm.ico" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="dialogForm.remark" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="url">
            <el-input v-model="dialogForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否显示">
            <el-select v-model="dialogForm.isShow" placeholder="请选择状态">
              <el-option label="显示" value="true"></el-option>
              <el-option label="隐藏" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit('dialogForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分配功能 dialog -->
      <el-dialog title="分配功能" :visible.sync="dialogActionStatus">
        <el-row>
          <el-tag type="danger" style="margin-bottom:10px;">当前菜单:{{currentMenuTitle}}</el-tag>
          <el-button type="primary" size="mini" @click="addAction">添加</el-button>
        </el-row>
        <div style="height: 300px;overflow:scroll;margin-top:5px;">
          <el-table :data="actionOwnList" border style="width: 100%;margin-top:5px;"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="apiUrl" label="API地址">
            </el-table-column>
            <el-table-column prop="routeUrl" label="路由地址">
            </el-table-column>
            <el-table-column prop="remark" label="描述">
            </el-table-column>
            <!-- <el-table-column label="状态" prop="isShow" width="80px">
              <template slot-scope="scope">
                <span style="color:red">{{scope.row.isShow?'显示':'隐藏'}}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="delAction(scope.row)">删除</el-button>
                <el-button type="text" @click="editAction(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogActionStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogActionSubmit()">确 定</el-button>
        </div>
        <!-- 内层dialog 新增功能 -->
        <el-dialog :title="dialogActionAdd?'添加功能':'修改功能'" :visible.sync="dialogActionInnerStatus" append-to-body @close="dialogActionInnerClose">
          <el-form :model="dialogActionForm" ref="dialogActionForm" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="功能字典">
              <el-select v-model="dialogActionForm.funcId" placeholder="请选择">
                <el-option v-for="actionDic in actionDicList" :key="actionDic.id" :value="actionDic.id" :label="actionDic.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功能名称">
              <el-input v-model="dialogActionForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="右侧功能">
              <el-select v-model="dialogActionForm.isRight" placeholder="">
                <el-option label="是" value="true"></el-option>
                <el-option label="否" value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="dialogActionForm.remark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="API地址">
              <el-input v-model="dialogActionForm.apiUrl" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由地址">
              <el-input v-model="dialogActionForm.routeUrl" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="代授权">
              <el-input v-model="dialogActionForm.dependUrl" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogActionInnerStatus = false">取 消</el-button>
            <el-button type="primary" @click="dialogActionInnerSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<style>
  .el-table .warning-row {
      background: #FDF5E8;
  }
</style>

<script>
  import treeTable from '@/components/TreeTable'
  import {
    getMenuList,
    getMenu,
    delMenu,
    editMenu,
    addMenu,
    getFuncAll,
    getMenuActionList,
    distrMenuActions
  } from '@/api/system/setting'
  import createUniqueString from '@/utils/createUniqueString'
  export default {
    name: 'sys-setting-menu',
    components: {
      treeTable
    },
    data() {
      return {
        loading: false,
        menuList: [],
        dialogStatus: false,
        dialogAdd: true,
        dialogForm: {
          parentId: '',
          isisShow: 'true'
        },
        dialogActionStatus: false,
        dialogActionForm: {
          isRight: 'false'
        },
        dialogActionInnerStatus: false,
        dialogActionAdd: false,
        // 当前选择的菜单标题
        currentMenuTitle: '顶级菜单',
        // 当前选择的菜单ID
        currentMenuId: '',
        // 菜单拥有的功能
        actionOwnList: [],
        // 功能字典
        actionDicList: []
      }
    },
    created() {
      // 获取菜单列表
      this.getList()
      // 获取功能字典
      getFuncAll().then(data => {
        data.result.forEach(item => {
          const actionDic = {}
          actionDic.id = item.id
          actionDic.name = item.name
          this.actionDicList.push(actionDic)
        })
      })
    },
    methods: {
      getList() {
        this.loading = true
        getMenuList().then(data => {
          this.loading = false
          this.menuList = data.result
        }, () => {
          this.loading = false
        })
      },
      // 添加顶级菜单
      addTopMenu() {
        // 变更dialog 为新增
        this.dialogAdd = true
        // 打开dialog
        this.dialogStatus = true
        // 重置数据
        this.currentMenuId = ''
        this.dialogForm.parentId = createUniqueString()
        this.currentMenuTitle = '顶级菜单'
      },
      // 菜单树形列表 添加按钮事件
      add(node) {
        // 变更dialog 为新增
        this.dialogAdd = true
        // 打开dialog
        this.dialogStatus = true
        // 绑定当前的菜单标题
        this.currentMenuTitle = node.title
        // 添加父级菜单ID
        this.dialogForm.parentId = node.id
      },
      // 菜单树形列表 修改按钮事件
      edit(node) {
        getMenu(node.id).then(data => {
          // 变更dialog 为修改
          this.dialogAdd = false
          // 打开dialog
          this.dialogStatus = true
          // 添加父级菜单ID
          this.dialogForm.parentId = node.id
          // 绑定获取的菜单信息
          data.result.isShow = data.result.isShow ? 'true' : 'false'
          this.dialogForm = data.result
        })
      },
      // 菜单树形列表 删除按钮事件
      del(node) {
        this.$confirm('确定删除该菜单, 是否继续?', '删除菜单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMenu([node.id]).then(() => {
            this.$message.success('删除成功')
            this.getList()
          })
        })
      },
      // 菜单树形列表 分配按钮事件
      distr(node) {
        this.currentMenuTitle = node.title
        this.currentMenuId = node.id
        this.dialogActionStatus = true
        // 获取已经拥有的功能列表
        getMenuActionList(node.id).then(data => {
          this.actionOwnList = data.result
        })
      },
      dialogSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogAdd) {
              addMenu(this.dialogForm).then(data => {
                this.getList()
                this.dialogStatus = false
              })
            } else {
              editMenu(this.dialogForm).then(data => {
                this.getList()
                this.dialogStatus = false
              })
            }
          }
        })
      },
      dialogClose() {
        // 重置表单
        this.$refs.dialogForm.resetFields()
        // 清空data 里面的数据
        this.dialogForm = {
          isShow: 'true'
        }
      },
      // 分配菜单内层dialog 关闭事件
      dialogActionInnerClose() {
        // 重置表单
        this.$refs.dialogActionForm.resetFields()
        // 清空data 里面的数据
        this.dialogActionForm = {
          isRight: 'false'
        }
      },
      // 删除菜单功能
      delAction(e) {
        this.$confirm('确定删除该功能, 是否继续?', '删除功能', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 移除功能列表的某一项
          this.actionOwnList = this.actionOwnList.filter(item => item !== e)
        })
      },
      // 新增菜单功能
      addAction() {
        this.dialogActionInnerStatus = true
        this.dialogActionAdd = true
      },
      // 修改菜单已分配功能
      editAction(e) {
        // 变更dialog状态
        this.dialogActionAdd = false
        // 将选中的功能信息赋值到 dialogActionForm
        this.dialogActionForm = e
        this.dialogActionForm.isRight = this.dialogActionForm.isRight ? 'true' : 'false'
        // 开启内层dialog
        this.dialogActionInnerStatus = true
      },
      // 分配菜单功能内层确定事件
      dialogActionInnerSubmit() {
        if (this.dialogActionAdd) {
          // 新增菜单功能 添加到功能列表中
          this.actionOwnList.push(this.dialogActionForm)
        } else {
          // 修改菜单功能
          this.actionOwnList.forEach(item => {
            // 根据ID 将已拥有的功能列表对应修改赋值
            if (item.id === this.dialogActionForm.id) {
              item = this.dialogActionForm
            }
          })
        }
        // 关闭内层dialog
        this.dialogActionInnerStatus = false
      },
      // 分配菜单功能
      dialogActionSubmit() {
        if (this.actionOwnList.length === 0) {
          this.$message.error('请先添加功能')
          return
        }
        distrMenuActions({
          funcList: this.actionOwnList,
          menuId: this.currentMenuId
        }).then(() => {
          // 关闭分配功能外层dialog
          this.dialogActionStatus = false
          // 消息提示
          this.$message.success('操作成功')
        })
      },
      // 改变功能列表 隐藏功能行的颜色
      tableRowClassName({ row, rowIndex }) {
        if (!row.isShow) {
          return 'warning-row'
        }
        return ''
      }
    }
  }

</script>
