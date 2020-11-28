<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 搜索框 -->
    <el-card class="searchCard">
      <div class="serchBox">
        <el-input v-model="listParams['fliter[customer]']" 
                          placeholder="请输入客户编号"
                          style="margin-right: 20px">
        </el-input>
      </div>
      <div class="btnBox">
        <el-button type="primary" size="medium" @click="getCollList">搜索</el-button>
        <el-button class="secondary" size="medium" @click="re_getCollList">重置</el-button>
      </div>
    </el-card>
    
    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">回款单列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="goEdit()">新增回款单</el-button>
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
        >
          <el-table-column align="center" label="回款单id" prop="id" fixed="left" min-width="50px"></el-table-column>
          <el-table-column align="center" label="流水号" prop="ssn" min-width="100px"></el-table-column>
          <el-table-column align="center" label="银行编号" prop="bank" min-width="100px"></el-table-column>
          <el-table-column align="center" label="银行名称" prop="bank_show" min-width="100px"></el-table-column>
          <el-table-column align="center" label="客户编号" prop="customer" min-width="100px"></el-table-column>
          <el-table-column align="center" label="客户名称" prop="customer_show" min-width="100px"></el-table-column>
          <el-table-column align="center" label="日期" prop="date" min-width="100px"></el-table-column>
          <el-table-column align="center" label="币种编号" prop="currency" min-width="100px"></el-table-column>
          <el-table-column align="center" label="币种名称" prop="currency_show" min-width="100px"></el-table-column>
          <el-table-column align="center" label="金额" prop="amount" min-width="100px"></el-table-column>
          <el-table-column align="center" label="摘要" prop="summary" min-width="100px"></el-table-column>
          <el-table-column align="center" label="用途" prop="purpose" min-width="100px"></el-table-column>
          <el-table-column align="center" label="集团凭证号" prop="jt_number" min-width="100px"></el-table-column>
          <el-table-column align="center" label="部门编号" prop="department" min-width="100px"></el-table-column>
          <el-table-column align="center" label="部门名称" prop="department_show" min-width="100px"></el-table-column>
          <el-table-column align="center" label="审核否" prop="confirmed" min-width="100px"></el-table-column>
          <el-table-column align="center" label="图片Id" prop="pic" min-width="100px"></el-table-column>
          <el-table-column align="center" label="图片URL" prop="pic_url" min-width="100px"></el-table-column>
          <el-table-column align="center" label="部门编号" prop="department" min-width="100px"></el-table-column>
          <!-- <el-table-column align="center" label="费用预警" min-width="100px">
            <template slot-scope="scope">
              <span style="color: #F56C6C">{{scope.row.warning}}</span>
            </template>
          </el-table-column> -->
        </el-table>
      </div>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listParams.page"
        :page-sizes="[10, 20, 50]"
        :page-size="listParams.pageSize"
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
import { collList } from '@/api/collection'

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
      // 分页数据
      total: 0,
      listParams: { 
        'fliter[customer]': '',
        page: 1, 
        pageSize: 10 
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
  created() {
    this.getCollList()
  },
  methods: {
    // **********翻页**********
    handleSizeChange(newPageSize) {
      this.listParams.pageSize = newPageSize;
      this.getCollList()
    },
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getCollList()
    },
    // *************************
    // ********获取列表********
    re_getCollList() {
      this.listParams["fliter[customer]"] = ''
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
    goEdit(id) {
      this.$router.push({
        path: 'payInfo',
        query: {
          id: id
        }
      })
    },
    // *************************************
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  height: 100%;
}
.searchCard {
  border-radius: 10px;
  height: 80px;
  margin: 20px 20px 0 20px;
  .serchBox {
    width: 300px;
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
      right: 30px;
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
