<template>
  <div class="post-container">
    <div class="post-main-container">
      <el-form class="form-container" :model="postForm" :rules="rules" :inline="true"
        ref="postForm" label-width="100px" size="mini">
        <h4>产品类型选择</h4>
        <el-form-item label="提供商">
          <el-input v-model="postForm.provider"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-input v-model="postForm.busType"></el-input>
        </el-form-item>
        <el-form-item label="标的类型">
          <el-input v-model="postForm.projectType"></el-input>
        </el-form-item>
        <el-tooltip effect="light" placement="bottom" manual="true" :content="userTip" :value="userTipShow">
          <el-form-item label="借款人">
            <el-input v-model="postForm.username"></el-input>
          </el-form-item>
        </el-tooltip>
        <h4>产品基本信息</h4>
        <el-form-item label="标的名称">
          <el-input v-model="postForm.provider"></el-input>
        </el-form-item>
        <el-form-item label="标的金额">
          <el-input v-model="postForm.busType"></el-input>
        </el-form-item>
        <el-form-item label="标的期限">
          <el-input v-model="postForm.projectType"></el-input>
        </el-form-item>
        <el-form-item label="基础利率">
          <el-input v-model="postForm.provider"></el-input>
        </el-form-item>
        <el-form-item label="期数">
          <el-input v-model="postForm.busType"></el-input>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="postForm.projectType"></el-input>
        </el-form-item>
        <h4></h4>
        <el-form-item label="起投金额">
          <el-input v-model="postForm.provider" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="递增金额">
          <el-input v-model="postForm.busType" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单笔限额">
          <el-input v-model="postForm.projectType" :disabled="true"></el-input>
        </el-form-item>
        <h4>产品描述信息</h4>
        <el-input class="input-text" type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="postForm.desc" placeholder="请输入信息披露信息"></el-input>
        <el-input class="input-text" type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="postForm.desc" placeholder="请输入产品介绍信息"></el-input>
        <el-input class="input-text" type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="postForm.desc" placeholder="请输入还款来源信息"></el-input>
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
        userTip: '借款人姓名：XX    借款人身份证：XX    借款人手机号：XX',
        userTipShow: true,
        postForm: {

        },
        rules: {

        }
      }
    },
  }

</script>

<style lang="scss" scoped>
  .post-container {
    position: relative;
    .post-main-container {
      padding: 20px 20px;
      h4 {
        border-bottom: 1px solid #BFCBD7;
        padding-bottom: 10px;
        color: #606266
      }
      .input-text {
        margin-bottom: 15px;
      }
      .button-box{
        margin-top: 15px;
        justify-content: center;
        align-items: center;
      }
    }
  }

</style>
