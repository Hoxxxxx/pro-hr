<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">发票申请单列表</span>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          ref="table"
          v-loading = "searchData.viewsList_searchLoading"
          element-loading-background = "rgba(0, 0, 0, 0.5)"
          element-loading-text = "数据正在加载中"
          element-loading-spinner = "el-icon-loading"
          :data="viewsList"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          :height="tableHeight"
        >
          <el-table-column
            align="center"
            label="OA单号"
            prop="fhd00"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="集团凭证号"
            prop="fhd01"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="集团作业号"
            prop="fhd12"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="日期"
            prop="fhd02"
            min-width="100px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="申请人编号"
            prop="fhd03"
            min-width="100px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="申请人名称"
            prop="fhd03_show"
            min-width="100px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="客户编号"
            prop="fhd05"
            min-width="100px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="客户名称"
            prop="fhd05_show"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="所属部门编号"
            prop="fhd06"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="所属部门名称"
            prop="fhd06_show"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="总金额"
            prop="fhd07"
            min-width="100px"
          ></el-table-column>
          <el-table-column 
            label="发票金额" 
            prop="fhd08" 
            align="center"
            min-width="100px">
          </el-table-column>
          <el-table-column
            align="center"
            label="回款金额"
            prop="fhd09"
            min-width="100px"
          ></el-table-column>
          <el-table-column 
            align="center" 
            label="摘要" 
            prop="fhd04"
            min-width="160px">
          </el-table-column>
          <el-table-column align="center" label="操作" width="260px" fixed="right">
            <template slot-scope="scope">
              <el-link type="primary" style="margin-right:20px" @click="jump(scope.row.id)"
                >查看申请单</el-link
              >
              <el-link type="primary" @click="open(scope.row.id)"
                >查看发票</el-link
              >
            </template></el-table-column
          >
          <!-- <el-table-column align="center" label="发票列表" width="160px" fixed="right"
            ><template slot-scope="scope">
              
            </template></el-table-column
          > -->
        </el-table>
      </div>
      <el-dialog
        title="发票列表"
        :visible.sync="dialogVisible"
        center
        width="1200px"
      >
        <div>
          <el-table
            :data="viewsList1"
            v-loading = "searchData.viewsList1_searchLoading"
            element-loading-background = "rgba(0, 0, 0, 0.5)"
            element-loading-text = "数据正在加载中"
            element-loading-spinner = "el-icon-loading"
            style="width: 100%"
            :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
            :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          >
            <el-table-column
              align="center"
              label="OA单号"
              prop="fp00"
            ></el-table-column>
            <el-table-column
              align="center"
              label="日期"
              prop="fp02"
            ></el-table-column>
            <el-table-column
              align="center"
              label="申请人编号"
              prop="fp03"
            ></el-table-column>
            <el-table-column
              align="center"
              label="申请人名称"
              prop="fp03_show"
            ></el-table-column>
            <el-table-column
              align="center"
              label="客户编号"
              prop="fp05"
            ></el-table-column>
            <el-table-column
              align="center"
              label="所属部门编号"
              prop="fp06"
            ></el-table-column>
            <el-table-column
              align="center"
              label="所属部门名称"
              prop="fp06_show"
            ></el-table-column>
            <el-table-column
              align="center"
              label="发票金额"
              prop="fp08"
            ></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="dialogVisible = false"
            style="width: 100px"
            >关 闭</el-button
          >
        </span>
      </el-dialog>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listParams.page"
        :page-sizes="[10, 20, 30]"
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
import { deliverList, deliverLink } from "@/api/reconciliation";
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
          title: "发货单",
        },
        {
          title: "发票申请单列表",
        },
      ],
      title: "发票申请单列表",
      tableHeight: 500,
      searchData: {
        viewsList_searchLoading: true,
        viewsList1_searchLoading: true,
      },
      viewsList: [],
      dialogVisible: false,
      links: [],
      viewsList1: [],
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 30 },
    };
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
    this.getDeliverList();
  },
  methods: {
    // 获取发货单列表
    async getDeliverList() {
      let params = {
        page: this.listParams.page,
        perPage: this.listParams.pageSize,
        "fliter[f10]": 4436,
      };
      deliverList(params).then((res) => {
        if (res.status == 200) {
          this.viewsList = res.data;
          this.searchData.viewsList_searchLoading = false;
          this.total = res.pagination.total;
        } else {
          this.$message.error("列表获取失败！");
        }
      });
    },
    jump(val) {
      let params = {
        id: val,
      };
      deliverLink(params).then((res) => {
        if (res.status == 200) {
          if(res.data.followOaLink){
            window.open(res.data.followOaLink, "_blank");
          }else{
            this.$message.warning('当前项无申请单！')
          }
        }
      });
    },
    open(val) {
      this.dialogVisible = true;
      this.viewsList1 = []
      let params = {
        id: val,
      };
      deliverLink(params).then((res) => {
        if (res.status == 200) {
          this.links = res.data.followInvoiceLink;
          this.viewsList1 = res.data.invoices;
          this.searchData.viewsList1_searchLoading = false;
        }
      });
    },
    // 分页数据变化处理
    handleSizeChange(newSize) {
      
    },
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getDeliverList();
    },
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  height: 100%;
  .navBox {
    margin-bottom: 0 !important;
  }
  .menuList {
    width: 100%;
    background: #fff;
    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 20px;
      li {
        position: relative;
        cursor: pointer;
        width: 80px;
        height: 40px;
        font-size: 14px;
        margin: 0 20px;
        color: #999999;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &:first-child {
          margin-left: 0;
        }
        &::after {
          display: block;
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 4px;
          width: 100%;
        }
        .index {
          width: 14px;
          height: 14px;
          border-radius: 100%;
          background: #999;
        }
        .count {
          letter-spacing: 1px;
        }
        .menuName {
          line-height: 40px;
        }
        &.active {
          .index {
            background: #409efd;
          }
          .menuName,
          .count {
            color: #409efd;
          }
          &::after {
            background: #409efd;
          }
        }
      }
    }
  }
  .searchCard {
    height: 80px;
    margin: 20px;
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
}

.listCard {
  margin: 20px;
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
  .deleteMsg {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  .stopUse {
    span {
      display: block;
      text-align: center;
      &:first-child {
        font-size: 16px;
        color: #000;
        font-weight: 600;
      }
      &:last-child {
        font-size: 14px;
        color: #333;
        margin-top: 10px;
      }
    }
  }
  .openUse,
  .departure {
    padding-right: 30px;
    .popExtraList {
      > li {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 30px;
        position: relative;
        > span {
          display: inline-block;
          width: 120px;
          font-size: 16px;
          color: #333333;
          font-weight: 600;
          text-align: right;
        }
        .tips {
          font-size: 12px;
          color: red;
          position: absolute;
          left: 120px;
          bottom: -22px;
          text-align: left;
        }
        .msgInput {
          width: 300px;
          height: 40px;
          padding: 0 15px;
          line-height: 40px;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          color: #909399;
          font-weight: 400;
          span {
            margin-right: 20px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .extraBtns {
    width: 100%;
    margin-top: 30px;
    div {
      width: 240px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
