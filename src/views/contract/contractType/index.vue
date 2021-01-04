<template>
  <div class="staffManage">
    <nav-Bar v-if="$route.path !== '/OAcontractType'" :breadList="breadList" :title="title"></nav-Bar>

    <!-- 搜索框 -->
    <el-button
      class="showSearch"
      :class="$route.path=='/OAcontractType'?'OA_showSearch':''"
      @click="showSearch = !showSearch"
      type="text"
      :icon="showSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
      >{{ showSearch ? "隐藏搜索框" : "打开搜索框" }}</el-button
    >
    <el-collapse-transition>
      <div v-show="showSearch">
        <el-card class="searchCard" :class="$route.path=='/OAcontractType'?'OA_searchCard':''">
      <div class="serchBox">
        <el-input v-model="listParams.name" 
                          placeholder="请输入合同类型名称"
                          style="margin-right: 20px">
        </el-input>
        <el-input v-model="listParams.number" 
                          placeholder="请输入合同类型编号"
                          style="margin-right: 20px">
        </el-input>
      </div>
      <div class="btnBox">
        <el-button type="primary" size="medium" @click="getContractType">搜索</el-button>
        <el-button class="secondary" size="medium" @click="re_getContractType">重置</el-button>
      </div>
    </el-card>
      </div>
    </el-collapse-transition>
    
    
    <!-- 表格 -->
    <el-card class="listCard" :class="$route.path=='/OAcontractType'?'OA_listCard':''">
      <!-- 卡片提头 -->
      <!-- <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">{{title}}</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="openAdd()">新增合同类型</el-button>
        </div>
      </div> -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">{{title}}</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="openAdd()">新增合同类型</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          ref="table"
          class="tableRef"
          :data="typeList"
          v-loading = "searchData.searchLoading"
          element-loading-background = "rgba(0, 0, 0, 0.5)"
          element-loading-text = "数据正在加载中"
          element-loading-spinner = "el-icon-loading"
          style="width: 100%"
          :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
          :cell-style="{background:'#FCFDFF',color:'#666666' }"
          :height="tableHeight"
        >
          <el-table-column align="center" label="合同类型ID" prop="id" fixed="left" min-width="50px"></el-table-column>
          <el-table-column align="center" label="合同类型名称" prop="name" min-width="100px"></el-table-column>
          <el-table-column align="center" label="合同类型编号" prop="number" min-width="100px"></el-table-column>
          <el-table-column align="center" label="备注" prop="comment" min-width="200px"></el-table-column>
          <el-table-column align="center" label="操作" width="160px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="getTypeInfo(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="delTypeItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="listParams.page"
        :page-sizes="[10, 20, 50]"
        :page-size="listParams.perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin:10px 0; float: right"
      ></el-pagination>
    </el-card>

    <!-- 新增弹窗 -->
    <el-dialog 
      title="上传应收账款"
      :visible.sync="showDialog"
      width="668px">
      <el-form :model="addForm" 
                      :rules="addRules" 
                      ref="uploadRef" 
                      label-width="110px">
        <el-form-item label="合同类型名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="合同类型编号" prop="number">
          <el-input v-model="addForm.number"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="addForm.comment"></el-input>
        </el-form-item>
      </el-form>
      <div class="extraBtns">
          <el-button style="width:95px;" @click="cancelAdd()">取 消</el-button>
          <el-button v-if="dialogType == 'add'" style="width:95px;" @click="sureAdd()" type="primary">确 定</el-button>
          <el-button v-if="dialogType == 'edit'" style="width:95px;" @click="sureEdit(addForm.id)" type="primary">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
//api
import { contractTypeList, addType, delType, typeInfo, editType } from '@/api/contract'
// validate
import { validNameNoCN_only, } from '@/utils/validate'
// utils
import { OpenLoading } from "@/utils/utils.js";

export default {
  data() {

    const validateNoCN = (rule, value, callback) => {
      if (!validNameNoCN_only(value)) {
        callback(new Error('仅限非中文'))
      } else {
        callback()
      }
    }

    return {
      // 面包屑
      breadList: [
        {
          path: "/",
          title: "首页",
        },
        {
          title: "合同管理",
        },
        {
          title: "合同类型",
        },
      ],
      title: "合同类型",
      tableHeight: 500,
      overloading: '', //加载定时器
      showSearch: false,
      // 分页数据
      total: 0,
      listParams: { 
        name: '',
        number: '',
        page: 1
      },
      typeList: [],
      searchData: {
        searchLoading: true,
      },
      // 新增
      showDialog: false,
      dialogType: 'add',
      addForm: {
        id: '',
        name: '',
        number: '',
        comment: ''
      },
      addRules: {
        name:[
          { required: true, message: '请输入合同类型名称', trigger: 'blur' },
        ],
        number:[
          { required: true, message: '请输入合同类型编号', trigger: 'blur' },
          { validator: validateNoCN, trigger: 'blur' }
        ],
        comment:[
          { required: true, message: '请输入备注', trigger: 'blur' },
        ]
      },
    };
  },
  components: {
    navBar,
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      // console.log( this.tableHeight)
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 100
      }
    })  
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
  },
  created() {
    this.getContractType()
  },
  methods: {
    // **********翻页**********
    handlePageChange(newPage) {
      this.listParams.page = newPage;
      this.getContractType()
    },
    handleSizeChange(newperPage) {
      this.listParams.perPage = newperPage;
      this.getContractType()
    },
    // *************************
    // ********获取列表********
    re_getContractType() {
      this.listParams.name = ''
      this.listParams.number = ''
      this.getContractType()
    },
    getContractType() {
      this.searchData.searchLoading = true
      contractTypeList(this.listParams)
      .then( res => {
        if (res.status == 200) {
          this.typeList = res.data
          this.total = res.pagination.total
          this.searchData.searchLoading = false
        } else {
          this.searchData.searchLoading = false
          this.$message.error('获取列表失败：' + res.error.message)
        }
      })
    },
    getTypeInfo(id) {
      typeInfo(id)
      .then( res => {
        if (res.status == 200) {
          this.addForm = {
            id: res.data.id,
            name: res.data.name,
            number: res.data.number,
            comment: res.data.comment
          }
          this.openAdd(id)
        } else {
          this.$message.error('获取类型详情失败：' + res.error.message)
        }
      })
    },
    // ***************其他操作*************
    openAdd(id){
      if (id) {
        this.dialogType = 'edit'
      } else {
        this.dialogType = 'add'
      }
      this.showDialog = true
    },
    cancelAdd(){
      this.showDialog = false
      this.addForm = {
        id: '',
        name:'',
        number: '',
        comment: ''
      }
    },
    sureAdd() {
      this.showDialog = false
      this.searchData.searchLoading = true
      addType(this.addForm)
      .then( res => {
        if (res.status == 200) {
          this.$message.success('新增成功！')
          this.getContractType()
        } else {
          this.$message.error('新增失败：' + res.error.message)
          this.searchData.searchLoading = false
        }
      })
      this.cancelAdd()
    },
    sureEdit(id) {
      this.showDialog = false
      this.searchData.searchLoading = true
      editType(this.addForm)
      .then( res => {
        if (res.status == 200) {
          this.$message.success('编辑成功！')
          this.getContractType()
        } else {
          this.$message.error('编辑失败：' + res.error.message)
          this.searchData.searchLoading = false
        }
      })
      this.cancelAdd()
    },
    delTypeItem(id){
      this.$confirm('此操作将永久删除该合同类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = OpenLoading(this, 1)
        delType(id)
        .then( res => {
          if (res.status == 200) {
            this.$message.success('删除成功！' )
            this.getContractType()
          } else {
            this.$message.error('删除失败：' + res.error.message)
          }
          loading.close()
          clearTimeout(this.overloading)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
    // *************************************
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  height: 100%;
}
.showSearch {
    margin-left: 20px;
  }
.searchCard {
  border-radius: 10px;
  height: 80px;
  margin: 0px 20px 20px 20px;
  .serchBox {
    width: 600px;
    display: flex;
  }
  .btnBox {
    width: 180px;
    float: right;
    margin-top: -38px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .el-button {
      width: 80px;
      height: 40px;
    }
    .secondary {
      border: 1px solid #409efd;
      color: #409efd;
    }
  }
}
.listCard {
    margin: 0 20px !important;
    .clearfix {
      display: flex;
      align-items: center;
      position: relative;
    }
    .tableTitleBox {
      padding: 10px 0;
      .tableTitle {
        font-weight: bold;
      }
      .btns {
        position: absolute;
        right: 0px;
        .btn {
          color: #409efd;
          border-color: #409efd;
        }
        .p40 {
          padding: 12px 40px;
        }
      }
    }
  }
.extraBtns {
  width: 100%;
  margin-top: 30px;
  width: 200px;
  margin: 0 auto;
}
.el-dialog {
  .selectbox {
    width: 360px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    padding: 0 15px;
  }
}


.OA_listCard {
  margin: 0 !important;
}
.OA_showSearch {
  margin-left: 0 !important;
}
.OA_searchCard {
  margin: 0 0 20px 0 !important;
}
</style>
