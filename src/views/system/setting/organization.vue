<template>
  <div class="post-container">
    <div class="post-main-container">
      <!-- 操作按钮 -->
      <el-card class="box-card">
        <div class="card-header">
          <span>操作</span>
          <el-row>
            <el-button type="primary" size="mini" @click="addTopOrgan">添加顶级机构</el-button>
          </el-row>
        </div>
      </el-card>

      <!-- table list -->
      <tree-table :data="organizationList" v-loading="loading" border>
        <el-table-column label="描述" prop="remark">
        </el-table-column>
        <el-table-column label="是否启用" width="80px;">
          <template slot-scope="scope">
            <span>{{scope.row.isUse?'启用':'禁用'}}</span>
          </template>
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

      <!-- 机构编辑 dialog -->
      <el-dialog :title="dialogAdd?'新增机构':'修改机构'" :visible.sync="dialogStatus" @close="dialogClose">
        <el-form :model="dialogForm" ref="dialogForm" label-width="100px">
          <el-form-item v-if="dialogAdd" label="父级机构">
            <el-input :value="currentOrganizationName" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="dialogForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备用名" prop="subhead">
            <el-input v-model="dialogForm.subhead" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="dialogForm.remark" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-select v-model="dialogForm.isUse" placeholder="请选择状态">
              <el-option label="启用" value="true"></el-option>
              <el-option label="禁用" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit('dialogForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分配岗位 dialog -->
      <el-dialog title="分配岗位" :visible.sync="dialogJobStatus" @close="dialogJobClose">
        <el-row>
          <el-tag type="danger" style="margin-bottom:10px;">当前机构:{{currentOrganizationName}}</el-tag>
          <el-button type="primary" size="mini" @click="addJob">添加</el-button>
        </el-row>
        <el-table :data="jobOwnList" border style="width: 100%;margin-top:5px;">
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="remark" label="描述">
          </el-table-column>
          <el-table-column label="状态" width="70px;">
            <span slot-scope="scope">{{scope.row.isUse?'启用':'禁用'}}</span>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="delJob(scope.row)">删除</el-button>
              <el-button type="text" @click="editJob(scope.row)">修改</el-button>
              <el-button type="text" @click="distrRole(scope.row)">分配角色</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 内层dialog 新增岗位 -->
        <el-dialog :title="dialogJobAdd?'添加岗位':'修改岗位'" :visible.sync="dialogJobInnerStatus" append-to-body @close="dialogJobInnerClose">
          <el-form :model="dialogJobForm" ref="dialogJobForm" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="岗位名称">
              <el-input v-model="dialogJobForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="dialogJobForm.remark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-select v-model="dialogJobForm.isUse" placeholder="请选择">
                <el-option label="启用" value="true"></el-option>
                <el-option label="禁用" value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogJobInnerStatus = false">取 消</el-button>
            <el-button type="primary" @click="dialogJobInnerSubmit">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 内层dialog 分配角色 -->
        <el-dialog title="分配角色" :visible.sync="dialogRoleInnerStatus" append-to-body @close="dialogRoleInnerClose">
          <el-checkbox-group v-model="checkRoleList" size="mini">
            <el-checkbox border v-for="role in roleList" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
          </el-checkbox-group>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogRoleInnerStatus = false">取 消</el-button>
            <el-button type="primary" @click="dialogRoleInnerSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import treeTable from '@/components/TreeTable'
  import {
    getOrganizationList,
    getOrganization,
    getJobListByOrgId,
    delOrganization,
    addOrganization,
    editOrganization,
    addJob,
    delJob,
    editJob,
    getRoleListByJobId,
    getRoleList,
    distrJobRoles
  } from '@/api/system/setting'
  import createUniqueString from '@/utils/createUniqueString'
  export default {
    name: 'sys-setting-organization',
    components: {
      treeTable
    },
    data() {
      return {
        loading: false,
        organizationList: [],
        dialogStatus: false,
        dialogAdd: true,
        dialogForm: {
          parentId: '',
          isUse: 'true'
        },
        dialogJobStatus: false,
        dialogJobForm: {
          isUse: 'true'
        },
        dialogJobInnerStatus: false,
        dialogJobAdd: false,
        // 当前选择的机构标题
        currentOrganizationName: null,
        // 当前选择的机构ID
        currentOrganizationId: '',
        // 机构拥有的岗位
        jobOwnList: [],
        // 当前选择的岗位
        currentJobId: '',
        // 分配角色dialog
        dialogRoleInnerStatus: false,
        // 已选中的角色列表
        checkRoleList: [],
        // 所有角色列表
        roleList: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        getOrganizationList().then(data => {
          this.loading = false
          this.organizationList = data.result
        }, () => {
          this.loading = false
        })
      },
      // 添加顶级机构
      addTopOrgan() {
        this.dialogAdd = true
        this.dialogStatus = true
        this.currentOrganizationName = '顶级机构'
        this.currentOrganizationId = ''
        this.dialogForm.parentId = createUniqueString()
      },
      // 机构树形列表 添加按钮事件
      add(node) {
        this.dialogAdd = true
        this.dialogStatus = true
        this.currentOrganizationName = node.name
        this.currentOrganizationId = node.id
        this.dialogForm.parentId = node.id
      },
      // 机构树形列表 修改按钮事件
      edit(node) {
        getOrganization(node.id).then(data => {
          this.dialogStatus = true
          this.dialogAdd = false
          data.result.isUse = data.result.isUse ? 'true' : 'false'
          this.dialogForm = data.result
        })
      },
      // 机构树形列表 删除按钮事件
      del(node) {
        this.$confirm('确定删除该机构, 是否继续?', '删除机构', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delOrganization([node.id]).then(() => {
            this.$message.success('删除成功')
            this.getList()
          })
        })
      },
      // 机构树形列表 分配按钮事件
      distr(node) {
        this.currentOrganizationName = node.name
        this.currentOrganizationId = node.id
        this.dialogJobStatus = true
        // 获取已经拥有的岗位列表
        getJobListByOrgId(node.id).then(data => {
          this.jobOwnList = data.result
        })
      },
      // 树形菜单dialog提交
      dialogSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogAdd) {
              addOrganization(this.dialogForm).then(data => {
                this.getList()
                this.dialogStatus = false
              })
            } else {
              editOrganization(this.dialogForm).then(data => {
                this.getList()
                this.dialogStatus = false
              })
            }
          }
        })
      },
      // 树形菜单dialog关闭事件
      dialogClose() {
        // 重置表单
        this.$refs.dialogForm.resetFields()
        // 清空data 里面的数据
        this.dialogForm = {
          show: '1'
        }
      },
      // 分配机构外层dialog 关闭事件
      dialogJobClose() {
        // 重新获取已拥有岗位列表

      },
      // 分配机构内层dialog 关闭事件
      dialogJobInnerClose() {
        // 重置表单
        this.$refs.dialogJobForm.resetFields()
        // 清空data 里面的数据
        this.dialogJobForm = {}
      },
      // 删除机构岗位
      delJob(e) {
        this.$confirm('确定删除该岗位, 是否继续?', '删除机构', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delJob([e.id]).then(() => {
            // 移除岗位列表的某一项
            this.jobOwnList = this.jobOwnList.filter(item => item !== e)
          })
        })
      },
      // 新增机构岗位
      addJob() {
        this.dialogJobInnerStatus = true
        this.dialogJobAdd = true
        // 绑定当前选择的机构ID
        this.dialogJobForm.organizationId = this.currentOrganizationId
      },
      // 修改机构已分配岗位
      editJob(e) {
        // 变更dialog状态
        this.dialogJobAdd = false
        // 将选中的岗位信息赋值到 dialogJobForm
        this.dialogJobForm = JSON.parse(JSON.stringify(e))
        this.dialogJobForm.isUse = this.dialogJobForm.isUse ? 'true' : 'false'
        // 开启内层dialog
        this.dialogJobInnerStatus = true
      },
      // 分配机构岗位内层确定事件
      dialogJobInnerSubmit() {
        if (this.dialogJobAdd) {
          // 新增机构岗位
          addJob(this.dialogJobForm).then(() => {
            // 添加到岗位列表中
            this.jobOwnList.push(this.dialogJobForm)
            // 关闭添加岗位内层dialog
            this.dialogJobInnerStatus = false
          })
        } else {
          // 修改机构岗位
          editJob(this.dialogJobForm).then(() => {
            // 替换列表中的类容
            getJobListByOrgId(this.currentOrganizationId).then(data => {
              this.jobOwnList = data.result
            })
            // 关闭添加岗位内层dialog
            this.dialogJobInnerStatus = false
          })
        }
        // 关闭内层dialog
        this.dialogActionInnerStatus = false
      },
      // 岗位分配角色
      distrRole(e) {
        this.currentJobId = e.id
        // 获取所有的角色
        getRoleList().then(data => {
          this.roleList = data.result
        })
        // 获取岗位已拥有的角色
        getRoleListByJobId(e.id).then(data => {
          const roles = []
          data.result.forEach(item => {
            if (item.roleId) {
              roles.push(item.roleId)
            }
          })
          this.checkRoleList = roles
        })
        this.dialogRoleInnerStatus = true
      },
      // 分配角色提交事件
      dialogRoleInnerSubmit() {
        console.log(this.checkRoleList)
        const roleList = []
        // 构建请求数据
        this.checkRoleList.forEach(item => {
          roleList.push({
            roleId: item
          })
        })
        distrJobRoles({ jobId: this.currentJobId, jobRoleList: roleList }).then(() => {
          this.dialogRoleInnerStatus = false
        })
      },
      // 分配角色弹窗关闭事件
      dialogRoleInnerClose() {
        // 清空已选择的角色数据
        this.checkRoleList = []
      }
    }
  }

</script>

<style lang="" scoped>


</style>
