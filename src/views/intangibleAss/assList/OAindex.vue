<template>
  <div class="staffManage">
    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">{{title}}</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="goPage('add', null)">新增资产</el-button>
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
          <el-table-column align="center" label="资产ID" prop="id" fixed="left" min-width="100px"></el-table-column>
          <el-table-column align="center" label="资产类别" prop="ias02" min-width="100px"></el-table-column>
          <el-table-column align="center" label="保管人" prop="staff_name" min-width="100px"></el-table-column>
          <el-table-column align="center" label="采购地" prop="ias04" min-width="100px"></el-table-column>
          <el-table-column align="center" label="供应商" prop="provider_name" min-width="100px"></el-table-column>
          <el-table-column align="center" label="中文名称" prop="ias06" min-width="100px"></el-table-column>
          <el-table-column align="center" label="英文名称" prop="ias07" min-width="100px"></el-table-column>
          <el-table-column align="center" label="采购日期" prop="ias08" min-width="100px"></el-table-column>
          <el-table-column align="center" label="授权开始日期" prop="ias09" min-width="120px"></el-table-column>
          <el-table-column align="center" label="授权结束日期" prop="ias10" min-width="120px"></el-table-column>
          <el-table-column align="center" label="采购成本" prop="ias11" min-width="100px"></el-table-column>
          <el-table-column align="center" label="存放位置" prop="location" min-width="100px"></el-table-column>
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
        :page-size="listParams.page_size"
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
import { assetsList, delAsset, } from '@/api/assets'
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
          title: "资产管理",
        },
        {
          title: "资产列表",
        },
      ],
      title: "资产列表",
      tableHeight: 500,
      overloading: '', //加载定时器
      showSearch: false,
      // 分页数据
      total: 0,
      listParams: { 
        page: 1,
        page_size: 10
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
    this.getAssetsList()
  },
  methods: {
    // **********翻页**********
    handlePageChange(newPage) {
      this.listParams.page = newPage;
      this.getAssetsList()
    },
    handleSizeChange(newpage_size) {
      this.listParams.page_size = newpage_size;
      this.getAssetsList()
    },
    // *************************
    // ********获取列表********
    getAssetsList() {
      this.searchData.searchLoading = true
      assetsList(this.listParams)
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
        this.$router.push({
          path: 'OAassInfo',
          query: {
            id: id,
            pageType: 'add',
            routeName: '新增无形资产'
          }
        })
      }
      else if (type == 'check') {
        this.$router.push({
          path: 'OAassInfo',
          query: {
            id: id,
            pageType: 'check',
            routeName: '查看无形资产'
          }
        })
      }
      else if (type == 'edit') {
        this.$router.push({
          path: 'OAassInfo',
          query: {
            id: id,
            pageType: 'edit',
            routeName: '编辑无形资产'
          }
        })
      }
    },
    delContractItem(id){
      this.$confirm('此操作将永久删除该资产, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = OpenLoading(this, 1)
        delAsset(id)
        .then( res => {
          if (res.status == 200) {
            this.$message.success('删除成功！' )
            this.getAssetsList()
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
  // margin: 20px;
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
