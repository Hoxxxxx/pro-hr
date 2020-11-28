<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">发票列表</span>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          style="width: 100%"
          :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
          :cell-style="{background:'#FCFDFF',color:'#666666'}"
        >
          <el-table-column align="center" type="index" width="55"></el-table-column>
          <el-table-column align="center" label="流水号" prop="code"></el-table-column>
          <el-table-column align="center" label="银行" prop="bank"></el-table-column>
          <el-table-column align="center" label="客户" prop="custmer"></el-table-column>
          <el-table-column align="center" label="日期" prop="date"></el-table-column>
          <el-table-column align="center" label="币种" prop="department">
            <template slot-scope="scope">
              <span
                v-for="(i,index) in scope.row.department"
                :key="index"
                style="margin:0 10px;"
              >{{i.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="金额" prop="mobile"></el-table-column>
          <el-table-column align="center" label="摘要" prop="entry_time"></el-table-column>
          <el-table-column align="center" label="用途" prop="positive_time"></el-table-column>
          <el-table-column label="审核状态" prop="ac_open_status" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.ac_open_status == 0"
                :style="scope.row.ac_open_status | color"
              >未开通</span>
              <span
                v-else-if="scope.row.ac_open_status == 1"
                :style="scope.row.ac_open_status | color"
              >已开通</span>
              <span v-else :style="scope.row.ac_open_status | color">已停用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.id)">查看</el-button>
              <el-button
                type="text"
                v-if="scope.row.status == 1 && scope.row.ac_open_status !=2"
                @click="positive(scope.row.id)"
              >编辑</el-button>
              <el-button type="text" @click="openDialog('remove',scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
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
import {invoiceList} from '@/api/reconciliation'
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
          title: "发票",
        },
        {
          title: "发票列表",
        },
      ],
      title: "发票列表",
      viewsList: [],
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  created(){
    this.getInvoiceList()
  },
  methods: {
    // 获取发票列表
    getDeliverList() {
      let params = {
        page:this.listParams.page,
        perPage:this.listParams.pageSize,
        'fliter[f01]':4436
      }
      invoiceList(params).then(res=>{
        console.log(res.data)
      })
    },
    // 分页数据变化处理
    handleSizeChange(newSize) {},
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getInvoiceList();
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
  }
}
</style>
