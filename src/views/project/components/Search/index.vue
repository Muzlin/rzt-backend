<template>
  <el-form class="form-container" :model="searchForm" :rules="rules" :inline="true" ref="searchForm" label-width="100px" size="mini">
    <el-card class="box-card" :body-style="{ padding: '5px 20px' }">
      <div>
        <div class="card-header">
          <span>检索条件</span>
          <div>
            <el-button type="primary" size="mini" @click="search">查询</el-button>
            <el-button size="mini" @click="resetForm">重置</el-button>
          </div>
        </div>
        <el-form-item class="form-item" prop="provider">
          <el-input placeholder="输入借款人姓名" v-model="searchForm.provider" :clearable="true">
            <template slot="suffix" class="slotClass">借款人</template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="provider">
          <el-input placeholder="输入提供商名称" v-model="searchForm.provider" :clearable="true">
            <span slot="suffix">提供商</span>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="provider">
          <el-input placeholder="输入标的名称" v-model="searchForm.provider" :clearable="true">
            <template slot="suffix">标的名称</template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="provider">
          <el-input placeholder="输入合同编码" v-model="searchForm.provider" :clearable="true">
            <template slot="suffix">合同编号</template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="provider">
          <el-input placeholder="请输入内容" v-model="searchForm.provider" :clearable="true">
            <template slot="suffix">业务类型</template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="provider">
          <el-input placeholder="请输入内容" v-model="searchForm.provider" :clearable="true">
            <template slot="suffix">标的类型</template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="provider">
          <el-input placeholder="请输入内容" v-model="searchForm.provider" :clearable="true">
            <template slot="suffix">审核状态</template>
          </el-input>
        </el-form-item>
      </div>
    </el-card>
  </el-form>
</template>

<script>
  export default {
    props: ['searchType'],
    mounted () {
      console.log(this.searchType)
    },
    data() {
      return {
        searchForm: {
          test: 'search bus'
        },
        rules: {

        },
      }
    },
    methods: {
      search() {
        this.$bus.emit('search',this.searchForm)
      },
      resetForm(){
        this.$refs.searchForm.resetFields()
      }
    }
  }

</script>

<style lang="scss" scoped>
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

</style>
