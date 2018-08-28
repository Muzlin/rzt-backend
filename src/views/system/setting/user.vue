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
              <el-input placeholder="请输入用户名" v-model="searchForm.name" :clearable="true">
                <template slot="suffix" class="slotClass">用户名</template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="phone">
              <el-input placeholder="请输入手机号" v-model="searchForm.phone" :clearable="true">
                <template slot="suffix" class="slotClass">手机号</template>
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
            <el-button type="primary" size="mini" @click="distr">分配</el-button>
          </el-row>
        </div>
      </el-card>

      <!-- table list -->
      <el-table :data="table.list" border style="width: 100%;margin-top:5px;" v-loading="table.loading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="userName" label="用户名">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="phone" label="手机">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.num"
          :page-sizes="[5,10,15,20]" :page-size="pageForm.size" layout="total, sizes, prev, pager, next, jumper" :total="pageForm.total">
        </el-pagination>
      </div>

      <!-- dialog -->
      <el-dialog :title="dialogAdd?'新增用户':'修改用户'" :visible.sync="dialogStatus" v-loading="dialogLoading" @close="dialogClose">
        <el-form :model="dialogForm" ref="dialogForm" label-position="left" label-width="70px">
          <el-form-item label="登录名" prop="userName">
            <el-input v-model="dialogForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="dialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="dialogForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="dialogForm.phone"></el-input>
          </el-form-item>
          <el-form-item v-if="dialogAdd" label="密码" prop="userPwd">
            <el-input type="password" v-model="dialogForm.userPwd"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- distr job dialog -->
      <el-dialog title="分配岗位" :visible.sync="dialogJobStatus">

        <div style="margin-bottom:2px;border-bottom:1px solid #ccc;padding-bottom:5px;">
          <el-tag type="danger" style="margin-right:10px;">当前用户:{{currentUser.name}}</el-tag>
          <el-treeselect v-model="changeOrganization" placeholder="请输入搜索内容" :data="organizationList"
            :props="orgTreeSelectProps"
            :isEdit="true"
            @nodeClick="organizationClick"
            >
          </el-treeselect>
        </div>
        <div>
          <el-radio v-for="job in jobList"
          :key="job.id"
          v-model="changeJobId"
          :label="job.id" border size="mini">{{job.name}}</el-radio>
          <span v-if="jobList.length === 0">暂无岗位数据</span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogJobStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogJobSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import {
    getUserPage,
    delUser,
    getUser,
    addUser,
    editUser
  } from '@/api/system/setting'
  import { getOrganizationList, getJobListByOrgId, distrUserJobs } from '@/api/system/setting'
  import elTreeselect from 'el-tree-select'
export default {
    data() {
      return {
        searchForm: {
          name: '',
          phone: ''
        },
        table: {
          list: [],
          loading: false,
          tableChangeList: []
        },
        pageForm: {
          total: 0,
          num: 1,
          size: 5
        },
        dialogStatus: false,
        dialogLoading: false,
        dialogAdd: true,
        dialogForm: {},
        dialogJobStatus: false,
        // 当前用户
        currentUser: {},
        // 选中的岗位
        changeJobId: [],
        // 选中的组织机构
        changeOrganization: '',
        // 组织机构列表
        organizationList: [],
        // 树形下拉配置
        orgTreeSelectProps: {
          label: 'name',
          value: 'id'
        },
        // 岗位列表
        jobList: []
      }
    },
    components: { elTreeselect },
    created() {
      this.getList()
      // 获取组织机构
      getOrganizationList().then(data => {
        this.organizationList = data.result
      })
    },
    methods: {
      // common
      getList() {
        this.table.loading = true
        getUserPage({
          num: this.pageForm.num,
          size: this.pageForm.size,
          name: this.searchForm.name,
          phone: this.searchForm.phone
        }).then(data => {
          this.pageForm.total = data.total
          this.table.list = data.result
          this.table.loading = false
        }, () => {
          this.table.loading = false
        })
      },
      // 搜索栏
      handleSearch() {
        // 重置分页
        this.resetPage()
        // 请求数据
        this.getList()
      },
      // 重置搜索栏
      resetSearch() {
        this.$refs.searchForm.resetFields()
      },
      // 新增用户
      add() {
        this.dialogAdd = true
        this.dialogStatus = true
      },
      // 修改用户
      edit() {
        if (this.table.tableChangeList.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.dialogAdd = false
          this.dialogStatus = true
          // 获取已有的用户数据
          getUser(this.table.tableChangeList[0].id).then(data => {
            // 填充用户已有的数据
            this.dialogForm = data.result || {}
            this.dialogLoading = false
          }, () => {
            this.dialogStatus = false
          })
        }
      },
      del() {
        if (this.table.tableChangeList.length === 0) {
          this.$message.info('请选择数据')
        } else {
          this.$confirm('确定删除该用户, 是否继续?', '删除用户', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const ids = []
            this.table.tableChangeList.map(item => {
              ids.push(item.id)
            })
            delUser(ids).then(() => {
              this.getList()
            })
          })
        }
      },
      // 分配岗位
      distr() {
        if (this.table.tableChangeList.length !== 1) {
          this.$message.info('请选择一条数据')
        } else {
          this.dialogJobStatus = true
          this.currentUser = this.table.tableChangeList[0]
          // 获用户已拥有的岗位
          getUser(this.currentUser.id).then(data => {
            if (data.result.job) {
              this.changeJobId = data.result.job.id
            }
          })
        }
      },
      // table 选中行
      handleSelectionChange(val) {
        this.table.tableChangeList = val
      },
      // 改变每页数量
      handleSizeChange(val) {
        this.pageForm.size = val
        this.getList()
      },
      // 改变页数
      handleCurrentChange(val) {
        this.pageForm.num = val
        this.getList()
      },
      // 重置分页
      resetPage() {
        this.pageForm.page = 1
        this.pageForm.size = 5
      },
      // dialog
      dialogSubmit() {
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            this.dialogLoading = true
            if (this.dialogAdd) {
              addUser(this.dialogForm).then(data => {
                this.dialogStatus = false
                this.getList()
              }, () => {
                this.dialogLoading = false
              })
            } else {
              editUser(this.dialogForm).then(data => {
                this.dialogStatus = false
                this.getList()
              }, () => {
                this.dialogLoading = false
              })
            }
          }
        })
      },
      dialogClose() {
        this.dialogForm = {}
        this.$refs.dialogForm.resetFields()
      },
      // 分配岗位确定事件
      dialogJobSubmit() {
        distrUserJobs({ userId: this.currentUser.id, jobId: this.changeJobId }).then(() => {
          this.dialogJobStatus = false
        })
      },
      // 分配岗位dialog 组织机构下拉点击事件
      organizationClick(e) {
        // 获取岗位
        getJobListByOrgId(e.id).then(data => {
          this.jobList = data.result
        })
      }
    }
  }

</script>

<style lang="scss" scoped>


</style>
