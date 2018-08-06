<template>
  <div class="post-container">
    <div class="post-main-container">
      <el-form class="form-container" :model="postForm" :rules="rules" :inline="true" ref="postForm" label-width="100px" size="mini">
        <el-card class="box-card" :body-style="{ padding: '5px 20px' }">
          <div>
            <div class="card-header">
              <span>检索条件</span>
              <div>
                <el-button type="primary" size="mini">查询</el-button>
                <el-button size="mini">重置</el-button>
              </div>
            </div>
            <el-form-item class="form-item">
              <el-input placeholder="请输入内容" v-model="postForm.provider">
                <template slot="prepend">借款人</template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-input placeholder="请输入内容" v-model="postForm.provider">
                <template slot="prepend">提供商</template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-input placeholder="请输入内容" v-model="postForm.provider">
                <template slot="prepend">标的名称</template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-input placeholder="请输入内容" v-model="postForm.provider">
                <template slot="prepend">合同编号</template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-input placeholder="请输入内容" v-model="postForm.provider">
                <template slot="prepend">业务类型</template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-input placeholder="请输入内容" v-model="postForm.provider">
                <template slot="prepend">标的类型</template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-input placeholder="请输入内容" v-model="postForm.provider">
                <template slot="prepend">审核状态</template>
              </el-input>
            </el-form-item>
          </div>
        </el-card>
      </el-form>

      <el-card class="box-card">
        <div class="card-header">
          <span>标的操作</span>
          <el-row>
            <el-popover placement="bottom" width="800" trigger="click">
              <el-table :data="logData">
                <el-table-column width="150" property="date" label="操作员"></el-table-column>
                <el-table-column width="100" property="name" label="时间"></el-table-column>
                <el-table-column width="300" property="address" label="初审结果"></el-table-column>
                <el-table-column width="300" property="address" label="意见"></el-table-column>
              </el-table>
              <el-button slot="reference" size="mini">查看操作记录</el-button>
            </el-popover>
            <el-button type="primary" size="mini" @click="handleAudit">审核</el-button>
            <el-button type="primary" size="mini" :loading="true">查看标的详情</el-button>
          </el-row>
        </div>
      </el-card>

      <el-table :data="list" border style="width: 100%;margin-top:5px;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="date" label="标的ID">
        </el-table-column>
        <el-table-column prop="name" label="标的名称">
        </el-table-column>
        <el-table-column prop="name" label="基础利率(%)" width="100px;">
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

      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
          :page-sizes="[1,2,3, 5]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <el-dialog title="标的审核" :visible.sync="dialogFormVisible">
        <el-form :rules="auditRules" ref="auditForm" :model="auditFormData" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="审核结果" prop="auditResult">
            <el-select class="filter-item" v-model="auditFormData.auditResult" placeholder="请选择">
              <el-option label="同意" value="1">
              </el-option>
              <el-option label="拒绝" value="0">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="意见" prop="auditOpinion">
            <el-input class="input-text" type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="auditFormData.auditOpinion" placeholder="请输入审核意见"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submit_audit">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  export default {
    name: '',
    data() {
      return {
        userTip: '借款人姓名：XX    借款人身份证：XX    借款人手机号：XX',
        userTipShow: true,
        postForm: {

        },
        rules: {

        },
        list: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        multipleSelection: [],
        logData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        listLoading: false,
        total: null,
        listQuery: {
          page: 1,
          limit: 3,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        dialogFormVisible: false,
        auditFormData: {
          auditResult: null, // 审核状态
          auditOpinion: '' // 审核意见
        },
        auditRules: {
          auditResult: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          auditOpinion: [{
            required: true,
            message: '请输入审核意见',
            trigger: 'blur'
          }, {
            min: 6,
            max: 10,
            message: '密码不能小于6位'
          }]
        }
      }
    },
    methods: {
      handleAudit() {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.auditForm.clearValidate()
        })
      },
      submit_audit() {
        this.$refs.auditForm.validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      submit_del() {
        this.$confirm('确定删除该产品, 是否继续?', '删除产品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功')
        }).catch(() => {
          this.$message.info('取消操作')
        })
      },
      handleSelectionChange(val) {
        console.log(val)
      },
      getList() {
        this.listLoading = true
        // fetchList(this.listQuery).then(response => {
        //   this.list = response.data.items
        //   this.total = response.data.total

        //   // Just to simulate the time of the request
        //   setTimeout(() => {
        //     this.listLoading = false
        //   }, 1.5 * 1000)
        // })
        this.total = this.list.length
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
    }
  }

</script>

<style lang="scss" scoped>
  .post-container {
    position: relative;
    .post-main-container {
      padding: 20px 20px;
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
      .form-item {
        padding: 0;
        margin: 0;
      }
      .el-card__body {
        padding: 0;
      }
      .tableData {
        margin-top: 10px;
      } // .pagination-container{
      //   margin-top: 10px;
      // }
    }
  }

</style>
