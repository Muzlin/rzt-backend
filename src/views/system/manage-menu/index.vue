<template>
  <div class="post-container">
    <div class="post-main-container">
      <!-- table list -->
      <tree-table :data="menuList" :evalFunc="func" v-loading="loading" border>
        <el-table-column label="菜单">
          <template slot-scope="scope">
            <span style="color:sandybrown">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限">
          <template slot-scope="scope">
            <el-tag>{{scope.row.permission}}</el-tag>
            <!-- <el-tag v-for="item in "></el-tag> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500">
          <template slot-scope="scope">
            <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
            <el-button type="text" @click="showEditMenu(scope.row)">修改</el-button>
            <el-button type="text" @click="showAddDialog(scope.row)">在此节点下添加</el-button>
          </template>
        </el-table-column>
      </tree-table>

      <!-- menu dialog -->
      <el-dialog :title="dialogMenuAdd?'新增菜单':'修改菜单'" :visible.sync="dialogMenuStatus" @close="dialogClose">
        <el-form :model="menuForm" ref="menuForm" label-width="100px">
          <el-form-item v-if="dialogMenuAdd" label="父级菜单" required>
            <el-input :value="currentNodeName" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name" required>
            <el-input v-model="menuForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type" required>
            <el-select v-model="menuForm.type" placeholder="请选择类型">
              <el-option label="分组" value="menu"></el-option>
              <el-option label="页面" value="page"></el-option>
              <el-option label="功能" value="action"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="链接" prop="href" required>
            <el-input v-model="menuForm.href" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" prop="permission">
            <el-input v-model="menuForm.permission" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status" required>
            <el-select v-model="menuForm.status" placeholder="请选择状态">
              <el-option label="启用" value="enable"></el-option>
              <el-option label="禁用" value="disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="menuForm.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogMenuStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit('menuForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import treeTable from '@/components/TreeTable'
  import customEval from './customEval.js'
  import {
    getMenuList,
    addMenu,
    delMenu,
    getMenuInfo
  } from '@/api/system'
  export default {
    name: 'sys-manage-menu',
    components: {
      treeTable
    },
    data() {
      return {
        loading: false,
        func: customEval,
        menuList: [],
        dialogMenuStatus: false,
        dialogMenuAdd: true,
        menuForm: {
          parentId: '',
          type: 'menu',
          status: 'enable'
        },
        currentNodeName: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        getMenuList().then(data => {
          this.loading = false
          this.menuList = data
        },()=>{
          this.loading = false
        })
      },
      showAddDialog(node) {
        this.dialogMenuAdd = true
        this.dialogMenuStatus = true
        this.currentNodeName = node.name
        this.menuForm.parentId = node.id
      },
      showEditMenu(node) {
        getMenuInfo(node.id).then(data => {
          this.dialogMenuStatus = true
          this.dialogMenuAdd = false
          this.menuForm = data
        })
      },
      dialogSubmit(formName) {
        console.log(this.menuForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogMenuAdd) {
              addMenu(this.menuForm).then(data => {
                console.log(data)
              })
            } else {
              editMenu(this.menuForm).then(data => {
                console.log(data)
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      delMenu(node) {
        this.$confirm('确定删除该菜单, 是否继续?', '删除菜单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMenu(node.id).then(() => {
            this.$message.success('删除成功')
            this.getList()
          })
        }).catch(() => {
          this.$message.info('取消操作')
        })
      },
      dialogClose() {
        // 重置表单
        this.$refs.menuForm.resetFields()
        // 清空data 里面的数据
        this.menuForm = {}
      }
    }
  }

</script>

<style lang="" scoped>


</style>
