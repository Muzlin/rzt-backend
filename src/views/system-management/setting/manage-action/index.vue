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
        <el-table-column prop="name" label="功能名称">
        </el-table-column>
        <el-table-column prop="cssClass" label="样式">
          <template slot-scope="scope">
            <el-tag :type="scope.row.cssClass">{{scope.row.cssClass}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="function" label="函数名称">
        </el-table-column>
        <el-table-column prop="remark" label="描述">
        </el-table-column>
        <el-table-column prop="show" label="是否显示">
        </el-table-column>
        <el-table-column prop="use" label="是否启用">
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.pageNum"
          :page-sizes="[10,20,30,50]" :page-size="pageForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="pageForm.total">
        </el-pagination>
      </div>

      <!-- dialog -->
      <el-dialog :title="dialogAdd?'新增功能':'修改功能'" :visible.sync="dialogStatus" @close="dialogClose">
        <el-form :model="dialogForm" ref="dialogForm" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="功能样式" style="width:1000px" size="mini">
            <el-radio-group v-model="dialogForm.cssClass" :fill="radioFill" @change="radioChange">
              <el-radio-button label="default">默认</el-radio-button>
              <el-radio-button label="primary">主要</el-radio-button>
              <el-radio-button label="success">成功</el-radio-button>
              <el-radio-button label="info">信息</el-radio-button>
              <el-radio-button label="warning">警告</el-radio-button>
              <el-radio-button label="danger">危险</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="函数名称">
            <el-input v-model="dialogForm.function" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="功能名称">
            <el-input v-model="dialogForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="功能描述">
            <el-input v-model="dialogForm.remark" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否显示">
            <el-select v-model="dialogForm.show" placeholder="请选择">
              <el-option label="显示" value="1">
              </el-option>
              <el-option label="隐藏" value="0">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-select v-model="dialogForm.use" placeholder="请选择">
              <el-option label="启用" value="1">
              </el-option>
              <el-option label="禁用" value="0">
              </el-option>
            </el-select>
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
  import { getFuncList, addFunc, getFunc, editFunc, delFunc } from '@/api/system-management'
  export default {
    name: 'sys-manage-action', // name 必须跟路由的name 不然不能缓存
    data() {
      return {
        table: {
          list: [{
            'cssClass': 'primary',
            'function': 'add',
            'id': '12314321',
            'name': '新增',
            'remark': '可以新增数据',
            'show': '显示',
            'sort': 0,
            'use': '启用'
          }, {
            'cssClass': 'danger',
            'function': 'del',
            'id': '1231432132121',
            'name': '删除',
            'remark': '可以删除数据',
            'show': '显示',
            'sort': 0,
            'use': '启用'
          }, {
            'cssClass': 'warning',
            'function': 'edit',
            'id': '1e23212314321',
            'name': '修改',
            'remark': '可以修改数据',
            'show': '显示',
            'sort': 0,
            'use': '启用'
          }, {
            'cssClass': 'success',
            'function': 'getList',
            'id': '1e232123d14321',
            'name': '查询',
            'remark': '可以查询数据',
            'show': '显示',
            'sort': 0,
            'use': '启用'
          }],
          loading: false,
          tableChange: []
        },
        pageForm: {
          total: 1,
          pageNum: 1,
          pageSize: 10
        },
        dialogStatus: false,
        dialogLoading: false,
        dialogAdd: true,
        menuList: [],
        checkedMenuList: [],
        dialogForm: {
          show: '1',
          use: '1',
          cssClass: 'primary'
        },
        /** 单选按钮激活填充颜色 */
        radioFill: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      /** common */
      getList() {
        this.table.loading = true
        getFuncList({
          pageNum: this.pageForm.pageNum,
          pageSize: this.pageForm.pageSize
        }).then(data => {
          // this.table.list = data.result || []
          // this.pageForm.total = data.total || 0
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
      resetSearch() {
        this.$refs.searchForm.resetFields()
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
          // 获取功能信息
          getFunc(this.table.tableChange[0].id).then(data => {
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
            delFunc(ids).then(() => {
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
        this.pageForm.pageSize = val
        this.getList()
      },
      // 改变分页的页数
      handleCurrentChange(val) {
        this.pageForm.pageNum = val
        this.getList()
      },
      resetPage() {
        this.pageForm.pageNum = 1
        this.pageForm.pageSize = 10
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
        this.dialogForm = {
          show: '1',
          use: '1',
          cssClass: 'primary'
        }
        // 重置单选按钮颜色
        this.radioFill = '#4BA2F9'
      },
      executeSubmit() {
        this.dialogLoading = true
        if (this.dialogAdd) {
          addFunc(this.dialogForm).then(data => {
            this.closeDialogAndLoading()
            // 获取最新的列表
            this.getList()
          }, () => {
            // 失败处理
            this.dialogLoading = false
          })
        } else {
          editFunc(this.dialogForm).then(data => {
            this.closeDialogAndLoading()
            this.getList()
          }, () => {
            this.dialogLoading = false
          })
        }
      },
      /** dialog样式单选按钮改变事件 */
      radioChange(e) {
        switch (e) {
          case 'primary':
            this.radioFill = '#4BA2F9'
            break
          case 'success':
            this.radioFill = '#6DBE4C'
            break
          case 'info':
            this.radioFill = '#909399'
            break
          case 'warning':
            this.radioFill = '#E2A04F'
            break
          case 'danger':
            this.radioFill = '#F16E72'
            break
          default:
            this.radioFill = '#D8CCB3'
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
