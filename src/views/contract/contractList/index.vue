<template>
  <div class="staffManage">
    <nav-Bar v-if="$route.path !== '/OAcontractList'" :breadList="breadList" :title="title"></nav-Bar>

    <!-- 搜索框 -->
    <el-button
      class="showSearch"
      :class="$route.path=='/OAcontractList'?'OA_showSearch':''"
      @click="showSearch = !showSearch"
      type="text"
      :icon="showSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
      >{{ showSearch ? "隐藏搜索框" : "打开搜索框" }}</el-button
    >
    <el-collapse-transition>
      <div v-show="showSearch">
        <el-card class="searchCard" :class="$route.path=='/OAcontractList'?'OA_searchCard':''">
      <div class="serchBox">
        <el-input v-model="listParams.title" 
                          placeholder="请输入合同名称"
                          style="margin-right: 20px">
        </el-input>
        <el-input v-model="listParams.number" 
                          placeholder="请输入合同编号"
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
    <el-card class="listCard" :class="$route.path=='/OAcontractList'?'OA_listCard':''">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">{{title}}</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="goPage('add', null)">新增合同</el-button>
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
          <el-table-column align="center" label="合同ID" prop="id" fixed="left" min-width="100px"></el-table-column>
          <el-table-column align="center" label="合同名称" prop="title" min-width="100px"></el-table-column>
          <el-table-column align="center" label="合同编号" prop="number" min-width="100px"></el-table-column>
          <el-table-column align="center" label="归档日期" prop="archived_date" min-width="100px"></el-table-column>
          <el-table-column align="center" label="合同金额" prop="contract_value" min-width="100px"></el-table-column>
          <el-table-column align="center" label="经办人名称" prop="operator_name" min-width="100px"></el-table-column>
          <el-table-column align="center" label="部门" prop="department_name" min-width="100px"></el-table-column>
          <el-table-column align="center" label="副本数量" prop="copies_number" min-width="100px"></el-table-column>
          <el-table-column align="center" label="单位（对方）" prop="opposite_name" min-width="160px"></el-table-column>
          <el-table-column align="center" label="合同开始日期" prop="start_date" min-width="160px"></el-table-column>
          <el-table-column align="center" label="合同结束日期" prop="end_date" min-width="160px"></el-table-column>
          <el-table-column align="center" label="合同类型" prop="contract_type_name" min-width="100px"></el-table-column>
          <el-table-column align="center" label="备注" prop="comment" min-width="200px"></el-table-column>
          <el-table-column align="center" label="操作" width="160px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="goPage('check', scope.row.id)">查看</el-button>
              <el-button type="text" @click="goPage('edit', scope.row.id)">编辑</el-button>
              <el-button type="text" @click="delContractItem(scope.row.id)">删除</el-button>
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
        style="margin-top: 20px; margin-bottom: 20px; float: right"
      ></el-pagination>
    </el-card>

  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
//api
import { contractList, delContract, } from '@/api/contract'

// utils
import { OpenLoading } from "@/utils/utils.js";

export default {
  data() {
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
          title: "合同列表",
        },
      ],
      title: "合同列表",
      tableHeight: 500,
      overloading: '', //加载定时器
      showSearch: false,
      // 分页数据
      total: 0,
      listParams: { 
        title: '',
        number: '',
        page: 1
      },
      typeList: [],
      searchData: {
        searchLoading: true,
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
      this.listParams.title = ''
      this.listParams.number = ''
      this.getContractType()
    },
    getContractType() {
      this.searchData.searchLoading = true
      contractList(this.listParams)
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
    // ***************其他操作*************
    goPage(type, id) {
      if (type == 'add') {
        if (this.$route.path=='/OAcontractList') {
          this.$router.push({
            path: 'OAcontractInfo',
            query: {
              id: id,
              pageType: 'add',
              routeName: '新增合同'
            }
          })
        } else {
          this.$router.push({
            path: 'contractInfo',
            query: {
              id: id,
              pageType: 'add',
              routeName: '新增合同'
            }
          })
        }
      }
      else if (type == 'check') {
        if (this.$route.path=='/OAcontractList') {
          this.$router.push({
            path: 'OAcontractInfo',
            query: {
              id: id,
              pageType: 'check',
              routeName: '查看合同'
            }
          })
        } else {
          this.$router.push({
            path: 'contractInfo',
            query: {
              id: id,
              pageType: 'check',
              routeName: '查看合同'
            }
          })
        }
      }
      else if (type == 'edit') {
        if (this.$route.path=='/OAcontractList') {
          this.$router.push({
            path: 'OAcontractInfo',
            query: {
              id: id,
              pageType: 'edit',
              routeName: '编辑合同'
            }
          })
        } else {
          this.$router.push({
            path: 'contractInfo',
            query: {
              id: id,
              pageType: 'edit',
              routeName: '编辑合同'
            }
          })
        }
      }
    },
    delContractItem(id){
      this.$confirm('此操作将永久删除该合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = OpenLoading(this, 1)
        delContract(id)
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
