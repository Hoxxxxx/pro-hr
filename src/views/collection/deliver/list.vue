<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">发货单列表</span>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          style="width: 100%"
          :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
          :cell-style="{background:'#FCFDFF',color:'#666666'}"
        >
          <el-table-column align="center" label="发货单OA单号" prop="fhd00"></el-table-column>
          <el-table-column align="center" label="集团作业号" prop="fhd01"></el-table-column>
          <el-table-column align="center" label="日期" prop="fhd02"></el-table-column>
          <el-table-column align="center" label="申请人" prop="fhd03"></el-table-column>
          <el-table-column align="center" label="摘要" prop="fhd04">
          </el-table-column>
          <el-table-column align="center" label="客户" prop="fhd05"></el-table-column>
          <el-table-column align="center" label="所属部门" prop="fhd06"></el-table-column>
          <el-table-column align="center" label="合同金额" prop="fhd07"></el-table-column>
          <el-table-column label="发票金额" prop="fhd08" align="center">
          </el-table-column>
          <el-table-column align="center" label="回款金额" prop="fhd09"></el-table-column>
          <el-table-column align="center" label="OA workid" prop="fhd10"></el-table-column>
          <!-- <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.id)">查看</el-button>
              <el-button
                type="text"
                v-if="scope.row.status == 1 && scope.row.ac_open_status !=2"
                @click="positive(scope.row.id)"
              >编辑</el-button>
              <el-button type="text" @click="openDialog('remove',scope.row.id)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>

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
import {deliverList} from '@/api/reconciliation'
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
          title: "发货单列表",
        },
      ],
      title: "发货单列表",
      viewsList: [],
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 30 },
    };
  },
  created(){
    this.getDeliverList()
  },
  methods: {
    // 获取发货单列表
    getDeliverList() {
      let params = {
        page:this.listParams.page,
        perPage:this.listParams.pageSize,
        'fliter[f10]':4436
      }
      deliverList(params).then(res=>{
        if(res.status == 200 ){
          this.viewsList = res.data
          this.total = res.pagination.total
        }else{
          this.$message.error('列表获取失败！')
        }
      })
    },
    // 分页数据变化处理
    handleSizeChange(newSize) {},
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
