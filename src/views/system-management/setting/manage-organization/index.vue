<template>
  <div class="post-container">
    <div class="post-main-container">
      <!-- table list -->
      <tree-table :data="organizationList" v-loading="loading" border>
        <el-table-column label="名称" prop="name" width="80px">
        </el-table-column>
        <el-table-column label="描述" prop="remark">
        </el-table-column>
        <el-table-column label="是否启用" width="80px;">
          <template slot-scope="scope">
            <span>{{scope.row.use?'启用':'禁用'}}</span>
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
            <el-select v-model="dialogForm.use" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
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
              <el-select v-model="dialogJobForm.use" placeholder="请选择">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogJobInnerStatus = false">取 消</el-button>
            <el-button type="primary" @click="dialogJobInnerSubmit">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 内存dialog 分配角色 -->
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
    getJob,
    getRoleListByJobId,
    getRoleList,
    distrJobRoles
  } from '@/api/system-management'
  export default {
    name: 'sys-manage-organization',
    components: {
      treeTable
    },
    data() {
      return {
        loading: false,
        organizationList: [{
          id: '1111',
          name: '总公司',
          parentId: '',
          remark: '总公司',
          use: '启用',
          children: [{
            id: '2222',
            name: '一分公司',
            parentId: '',
            remark: '一分公司',
            use: '启用',
            children: [{
              id: '22221111',
              name: '研发部',
              parentId: '',
              remark: '研发部',
              use: '启用',
              children: [{
                id: '222211112321',
                name: '产品部',
                parentId: '',
                remark: '产品部',
                use: '启用'
              }, {
                id: '2222111123213e213',
                name: '网络部',
                parentId: '',
                remark: '网络部',
                use: '启用'
              }]
            }, {
              id: '22222222',
              name: '财务部',
              parentId: '',
              remark: '财务部',
              use: '启用'
            }]
          }, {
            id: '3333',
            name: '二分公司',
            parentId: '',
            remark: '二分公司',
            use: '启用'
          }]
        }],
        dialogStatus: false,
        dialogAdd: true,
        dialogForm: {
          parentId: '',
          use: '1'
        },
        dialogJobStatus: false,
        dialogJobForm: {},
        dialogJobInnerStatus: false,
        dialogJobAdd: false,
        // 当前选择的机构标题
        currentOrganizationName: null,
        // 当前选择的机构ID
        currentOrganizationId: '',
        // 机构拥有的岗位
        jobOwnList: [{
          name: '研发经理',
          remark: '研发经理岗位',
          jobId: '11w213213'
        },
        {
          name: '风控经理',
          remark: '风控经理岗位',
          jobId: '11w217879d0983213'
        }
        ],
        // 分配角色dialog
        dialogRoleInnerStatus: false,
        // 已选中的角色列表
        checkRoleList: ['2', '3'],
        // 所有角色列表
        roleList: [{
          name: '风控专员',
          id: '1'
        }, {
          name: '风控专员1',
          id: '2'
        }, {
          name: '风控专员2',
          id: '3'
        }, {
          name: '风控专员3',
          id: '4'
        }, {
          name: '风控专员4',
          id: '5'
        }, {
          name: '风控专员5',
          id: '6'
        }, {
          name: '风控专员6',
          id: '7'
        }, {
          name: '风控专员7',
          id: '8'
        }, {
          name: '风控专员8',
          id: '9'
        }]
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
          // this.organizationList = data.result
        }, () => {
          this.loading = false
        })
      },
      // 机构树形列表 添加按钮事件
      add(node) {
        this.dialogAdd = true
        this.dialogStatus = true
        this.currentOrganizationName = node.name
        this.currentOrganizationId = node.id
      },
      // 机构树形列表 修改按钮事件
      edit(node) {
        getOrganization({
          id: node.id
        }).then(data => {
          this.dialogStatus = true
          this.dialogAdd = false
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
          delOrganization(node.id).then(() => {
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
                console.log(data)
              })
            } else {
              editOrganization(this.dialogForm).then(data => {
                this.getList()
                console.log(data)
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
      },
      // 修改机构已分配岗位
      editJob(e) {
        // 变更dialog状态
        this.dialogJobAdd = false
        // 将选中的岗位信息赋值到 dialogJobForm
        this.dialogJobForm = e
        // 开启内层dialog
        this.dialogJobInnerStatus = true
        // 获取岗位信息
        getJob({ id: e.id }).then(data => {
          this.dialogJobForm = data.result
        })
      },
      // 分配机构岗位内层确定事件
      dialogJobInnerSubmit() {
        if (this.dialogActionAdd) {
          // 新增机构岗位
          addJob(this.dialogJobForm).then(() => {
            // 添加到岗位列表中
            this.jobOwnList.push(this.dialogJobForm)
          })
        } else {
          // 修改机构岗位
          editJob(this.dialogJobForm).then(() => {
            // 替换列表中的类容
            this.jobOwnList.forEach(item => {
              if (item.id === this.dialogJobForm.id) {
                item = this.dialogJobForm
              }
            })
          })
        }
        // 关闭内层dialog
        this.dialogActionInnerStatus = false
      },
      // 岗位分配角色
      distrRole(e) {
        console.log('distr role', e)
        // 获取所有的角色
        getRoleList().then(data => {
          this.roleList = data.result
        })
        // 获取岗位已拥有的角色
        getRoleListByJobId(e.id).then(data => {
          const roles = []
          data.result.forEach(item => {
            roles.push(item.id)
          })
          this.checkRoleList = roles
        })
        this.dialogRoleInnerStatus = true
      },
      // 分配角色提交事件
      dialogRoleInnerSubmit() {
        distrJobRoles(this.checkRoleList).then()
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
