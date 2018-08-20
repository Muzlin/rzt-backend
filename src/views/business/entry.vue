<template>
  <div class="post-container">
    <div class="post-main-container">
      <el-form class="form-container" :model="form" :rules="rules" :inline="true" ref="form" label-width="100px" size="mini">
        <h4>产品类型选择</h4>
        <el-form-item label="提供商">
          <el-select v-model="form.tgs" placeholder="请选择" clearable>
            <el-option label="XX公司" value="111"></el-option>
            <el-option label="YY公司" value="222"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="form.ywnx" placeholder="请选择" clearable>
            <el-option label="车贷" value="111"></el-option>
            <el-option label="房贷" value="222"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标的类型">
          <el-select v-model="form.bbnx" placeholder="请选择" clearable>
            <el-option label="新手" value="111"></el-option>
            <el-option label="产品" value="222"></el-option>
            <el-option label="和宝" value="333"></el-option>
          </el-select>
        </el-form-item>
        <el-tooltip effect="dark" placement="right" :manual="false" :content="`借款人姓名：${currentBorrower.value}    借款人身份证：${currentBorrower.idCard}    借款人手机号：${currentBorrower.phone}`" :value="true">
          <el-form-item label="借款人">
            <el-autocomplete v-model="form.jkr" :fetch-suggestions="queryBorrower" :trigger-on-focus="false" @select="borrowerSelect"></el-autocomplete>
          </el-form-item>
        </el-tooltip>
        <h4>产品基本信息</h4>
        <el-form-item label="标的名称">
          <el-input v-model="form.provider"></el-input>
        </el-form-item>
        <el-form-item label="标的金额">
          <el-input v-model="form.busType"></el-input>
        </el-form-item>
        <el-form-item label="标的期限">
          <el-select v-model="form.bbqx" placeholder="请选择">
            <el-option label="天" value="0"></el-option>
            <el-option label="月" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基础利率">
          <el-input v-model="form.provider"></el-input>
        </el-form-item>
        <el-form-item label="还款方式">
          <el-select v-model="form.hkfs" placeholder="请选择">
            <el-option label="一次性还本付息" value="0"></el-option>
            <el-option label="先息后本" value="1"></el-option>
            <el-option label="等额本息" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数">
          <el-input v-model="form.busType"></el-input>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="form.projectType"></el-input>
        </el-form-item>
        <h4></h4>
        <el-form-item label="起投金额">
          <el-input v-model="form.provider" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="递增金额">
          <el-input v-model="form.busType" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单笔限额">
          <el-input v-model="form.projectType" :disabled="true"></el-input>
        </el-form-item>
        <h4>产品描述信息</h4>
        <el-input class="input-text" type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="form.desc" placeholder="请输入信息披露信息"></el-input>
        <el-input class="input-text" type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="form.desc" placeholder="请输入产品介绍信息"></el-input>
        <el-input class="input-text" type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="form.desc" placeholder="请输入还款来源信息"></el-input>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        borrowerList: [{
          id: '121',
          value: '龚毅',
          idCard: '64736984127372190389120',
          phone: '13300000000'
        }],
        currentBorrower: { value: 'XX', idCard: 'XX', phone: 'XX' },
        form: {},
        rules: {}
      }
    },
    methods: {
      queryBorrower(queryString, cb) {
        cb(this.borrowerList)
      },
      borrowerSelect(item) {
        this.form.jkrId = item.id
        this.currentBorrower = item
      }
    }
  }

</script>

<style lang="scss" scoped>
  h4 {
    border-bottom: 1px solid #BFCBD7;
    padding-bottom: 10px;
    color: #606266
  }

</style>
