<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 搜索框 -->
    <el-button
      class="showSearch"
      @click="showSearch = !showSearch"
      type="text"
      :icon="showSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
      >{{ showSearch ? "隐藏搜索框" : "打开搜索框" }}</el-button
    >
    <el-collapse-transition>
      <div v-show="showSearch">
        <el-card class="searchCard">
      <div class="serchBox">
        <el-input v-model="listParams['filter[customer]']" 
                          placeholder="请输入客户编号"
                          style="margin-right: 20px">
        </el-input>
        <el-input v-model="listParams['filter[department]']" 
                          placeholder="请输入部门编号"
                          style="margin-right: 20px">
        </el-input>
      </div>
      <div class="btnBox">
        <el-button type="primary" size="medium" @click="getCollList">搜索</el-button>
        <el-button class="secondary" size="medium" @click="re_getCollList">重置</el-button>
      </div>
    </el-card>
      </div>
    </el-collapse-transition>
    
    
    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">回款单列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="goPage('add', null)">新增回款单</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          ref="table"
          class="tableRef"
          :data="collectionList"
          v-loading = "searchData.searchLoading"
          element-loading-background = "rgba(0, 0, 0, 0.5)"
          element-loading-text = "数据正在加载中"
          element-loading-spinner = "el-icon-loading"
          style="width: 100%"
          :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
          :cell-style="{background:'#FCFDFF',color:'#666666' }"
          :height="tableHeight"
        >
          <el-table-column align="center" label="回款单id" prop="id" fixed="left" min-width="100px"></el-table-column>
          <el-table-column align="center" label="流水号" prop="ssn" min-width="160px"></el-table-column>
          <el-table-column align="center" label="银行编号" prop="bank" min-width="120px"></el-table-column>
          <el-table-column align="center" label="银行名称" prop="bank_show" min-width="220px"></el-table-column>
          <el-table-column align="center" label="客户编号" prop="customer" min-width="100px"></el-table-column>
          <el-table-column align="center" label="客户名称" prop="customer_show" min-width="160px"></el-table-column>
          <el-table-column align="center" label="日期" prop="date" min-width="100px"></el-table-column>
          <el-table-column align="center" label="币种编号" prop="currency" min-width="100px"></el-table-column>
          <el-table-column align="center" label="币种名称" prop="currency_show" min-width="100px"></el-table-column>
          <el-table-column align="center" label="金额" prop="amount" min-width="100px"></el-table-column>
          <el-table-column align="center" label="集团作业号" prop="jt_number" min-width="160px"></el-table-column>
          <el-table-column align="center" label="部门编号" prop="department" min-width="100px"></el-table-column>
          <el-table-column align="center" label="部门名称" prop="department_show" min-width="100px"></el-table-column>
          <el-table-column align="center" label="摘要" prop="summary" min-width="160px"></el-table-column>
          <el-table-column align="center" label="用途" prop="purpose" min-width="160px"></el-table-column>
          <el-table-column align="center" label="审核否" prop="confirmed" min-width="100px">
            <template slot-scope="scope">
              <span style="color: #67C23A" v-if="scope.row.confirmed==1">已审核</span>
              <span style="color: #F56C6C" v-if="scope.row.confirmed!==1">未审核</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="160px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="goPage('check', scope.row.id)">查看</el-button>
              <el-button type="text" @click="goPage('edit', scope.row.id)">编辑</el-button>
              <el-button type="text" @click="delCollItem(scope.row.id)">删除</el-button>
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
import { collList, delColl } from '@/api/collection'
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
          title: "收款管理",
        },
        {
          title: "回款单管理",
        },
      ],
      title: "回款单管理",
      tableHeight: 500,
      overloading: '', //加载定时器
      showSearch: false,
      // 分页数据
      total: 0,
      listParams: { 
        'filter[customer]': '',
        'filter[department]': '',
        page: 1, 
        perPage: 10 
      },
      collectionList: [],
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
    this.getCollList()
  },
  methods: {
    // **********翻页**********
    handlePageChange(newPage) {
      this.listParams.page = newPage;
      this.getCollList()
    },
    handleSizeChange(newperPage) {
      this.listParams.perPage = newperPage;
      this.getCollList()
    },
    // *************************
    // ********获取列表********
    re_getCollList() {
      this.listParams["filter[customer]"] = ''
      this.listParams['filter[department]'] = ''
      this.getCollList()
    },
    // 收入列表
    getCollList(type) {
      this.searchData.searchLoading = true
      let params = this.listParams
      collList(params).then(res => {
        if (res.status == 200) {
          this.collectionList = res.data
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
        this.$router.push({
          path: 'payInfo',
          query: {
            id: id,
            pageType: 'add'
          }
        })
      }
      else if (type == 'check') {
        this.$router.push({
          path: 'payInfo',
          query: {
            id: id,
            pageType: 'check'
          }
        })
      }
      else if (type == 'edit') {
        this.$router.push({
          path: 'payInfo',
          query: {
            id: id,
            pageType: 'edit'
          }
        })
      }
    },
    delCollItem(id){
      this.$confirm('此操作将永久删除该回款单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = OpenLoading(this, 1)
        delColl(id)
        .then( res => {
          if (res.status == 200) {
            this.$message.success('删除成功！' )
            this.getCollList()
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
  margin: 20px 20px 0 20px;
  .serchBox {
    width: 600px;
    display: flex;
  }
  .btnBox {
    width: 180px;
    float: right;
    margin-top: -38px;
    .el-button {
      height: 40px;
      margin-bottom: 20px;
    }
    .secondary {
      border: 1px solid #409efd;
      color: #409efd;
    }
  }
}
.listCard {
  margin: 20px;
  .clearfix {
    display: flex;
    align-items: center;
    position: relative;
  }
  .tableTitleBox {
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

</style>
