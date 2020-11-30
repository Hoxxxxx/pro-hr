<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">发票申请列表</span>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          style="width: 100%"
          :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
          :cell-style="{background:'#FCFDFF',color:'#666666'}"
        >
          <el-table-column align="center" label="OA单号" prop="fp00"></el-table-column>
          <el-table-column align="center" label="回款单 workid" prop="fp01"></el-table-column>
          <el-table-column align="center" label="日期" prop="fp02"></el-table-column>
          <el-table-column align="center" label="申请人" prop="fp03"></el-table-column>
          <!-- <el-table-column align="center" label="摘要" prop="fp04"></el-table-column> -->
          <el-table-column align="center" label="客户" prop="fp05"></el-table-column>
          <el-table-column align="center" label="所属部门" prop="fp06"></el-table-column>
          <!-- <el-table-column align="center" label="摘要" prop="fp07"></el-table-column> -->
          <el-table-column align="center" label="发票金额" prop="fp08"></el-table-column>
          <!-- <el-table-column align="center" label="用途" prop="fp09"></el-table-column> -->
          <el-table-column align="center" label="OA workid" prop="fp10"></el-table-column>
          <el-table-column align="center" label="OA申请单"
            ><template slot-scope="scope">
              <el-link type="primary" @click="jump(scope.row.id)"
                >查看申请单</el-link
              >
            </template></el-table-column
          >
          <el-table-column align="center" label="发货单列表"
            ><template slot-scope="scope">
              <el-link type="primary" @click="open(scope.row.id)"
                >查看发货单</el-link
              >
            </template></el-table-column
          >
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
      <el-dialog
        title="发票列表"
        :visible.sync="dialogVisible"
        center
        width="800px"
      >
        <div>
          <el-link
            v-for="(item, index) in links"
            :key="index"
            type="primary"
            @click="openMore(item)"
            >{{item}}</el-link
          >
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
import Axios from 'axios'
import navBar from "@/components/navBar/navBar";
import {invoiceList,invoicesLink} from '@/api/reconciliation'
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
          title: "发票申请",
        },
        {
          title: "发票申请列表",
        },
      ],
      title: "发票申请列表",
      viewsList: [],
      dialogVisible: false,
      links:[],
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 30 },
    };
  },
  created(){
    if(this.$route.query.url){
      this.getJumpUrl(this.$route.query.url)
    }else{
      this.getInvoiceList()
    }
  },
  methods: {
    // 获取发票列表
    getInvoiceList() {
      let params = {
        page:this.listParams.page,
        perPage:this.listParams.pageSize,
        'fliter[f01]':4436
      }
      invoiceList(params).then(res=>{
        if(res.status == 200 ){
          this.viewsList = res.data
          this.total = res.pagination.total
        }else{
          this.$message.error('列表获取失败！')
        }
      })
    },
    getJumpUrl(url){
      Axios.get(url).then(res=>{
        if(res.status == 200){
          this.viewsList = res.data.data
          this.total = res.data.pagination.total
        }
      })
    },
    jump(val) {
      let params = {
        id: val,
      };
      invoicesLink(params).then((res) => {
        if (res.status == 200) {
          console.log(res);
          window.open(res.data.followOaLink, "_blank");
        }
      });
    },
    open(val) {
      this.dialogVisible = true;
      let params = {
        id: val,
      };
      invoicesLink(params).then((res) => {
        if (res.status == 200) {
          this.links = res.data.followReceivableLink
        }
      });
    },
    openMore(val){
      this.$router.push({
        path:"/collection/deliver/list",
        query:{
          url:val
        }
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
