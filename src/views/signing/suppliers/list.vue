<template>
  <div class="staffManage">
    <nav-Bar v-if="$route.path !== '/OAsuppliers'" :breadList="breadList" ></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard" :class="$route.path=='/OAsuppliers'?'OA_listCard':''">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">供应商列表</span>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          ref="table"
          :data="viewsList"
          v-loading="searchData.viewsList_searchLoading"
          element-loading-background = "rgba(0, 0, 0, 0.5)"
          element-loading-text = "数据正在加载中"
          element-loading-spinner = "el-icon-loading"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          :height="tableHeight"
        >
          <el-table-column
            align="center"
            label="供应商编号"
            prop="code"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="厂商简称"
            prop="name"
            min-width="100px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="厂商全称"
            prop="full_name"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="惯用税种"
            prop="tax_code"
            min-width="100px"
          ></el-table-column>
          <el-table-column label="操作" width="160px" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.id)"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
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
        style="margin:10px 0; float: right"
      ></el-pagination>

      <!-- 供应商详情弹窗 -->
      <el-dialog
        title="供应商详情"
        :visible.sync="dialogVisible"
        center
        width="1200px"
      >
        <!-- 银行信息 -->
        <div style="margin-bottom: 10px">
          <div class="form_line">
            <div class="titlebox bdNone brNone">创建日期</div>
            <div class="infobox selectbox last_row brNone bdNone">
              {{ detail.created_at }}
            </div>
            <div class="titlebox bdNone brNone">供应商编号</div>
            <div class="infobox bdNone brNone">
              {{ detail.code }}
            </div>
            <div class="titlebox bdNone brNone">厂商简称</div>
            <div class="infobox selectbox last_row bdNone">
              {{ detail.name }}
            </div>
          </div>
          <div class="form_line">
            <div class="titlebox brNone">厂商全称</div>
            <div class="infobox selectbox last_row brNone">
              {{ detail.full_name }}
            </div>
            <div class="titlebox brNone">惯用税种</div>
            <div class="infobox selectbox last_row brNone">
              {{ detail.tax_code }}
            </div>
            <div class="titlebox brNone"></div>
            <div class="infobox selectbox last_row"></div>
          </div>
        </div>

        <el-table
          :data="detailList"
          v-loading = "searchData.detailList_searchLoading"
          element-loading-background = "rgba(0, 0, 0, 0.5)"
          element-loading-text = "数据正在加载中"
          element-loading-spinner = "el-icon-loading"
          style="width: 100%"
          height="300px"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
        >
          <el-table-column
            align="center"
            label="银行账号"
            prop="bank_code"
          ></el-table-column>
          <el-table-column
            align="center"
            label="开户行"
            prop="bank"
          ></el-table-column>
          <el-table-column
            align="center"
            label="账户名称"
            prop="bank_account"
          ></el-table-column>
          <el-table-column
            align="center"
            label="供应商编号"
            prop="supplier_code"
          ></el-table-column>
          <el-table-column
            align="center"
            label="是否默认选中"
            prop="is_default"
          ></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="dialogVisible = false"
            style="width: 100px"
            >关 闭</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { OpenLoading } from "@/utils/utils.js";
import navBar from "@/components/navBar/navBar";
import { suppliersList, suppliersInfo } from "@/api/signing";
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
          title: "供应商列表",
        },
      ],
      tableHeight: 500,
      searchData: {
        viewsList_searchLoading: true,
        detailList_searchLoading: true,
      },
      viewsList: [],
      detailList: [],
      detail: {},
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 30 },
      dialogVisible: false,
    };
  },
  filters:{
    typeFilter(val){
      if(val == 1){
        return '借'
      }else{
        return '贷'
      }
    },
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
    this.getSuppliersList();
  },
  methods: {
    // 获取发票列表
    getSuppliersList() {
      this.searchData.viewsList_searchLoading = true;
      let params = {
        page: this.listParams.page,
        perPage: this.listParams.pageSize,
        "fliter[ooa01]": 4436,
      };
      suppliersList(params).then((res) => {
        if (res.status == 200) {
          this.viewsList = res.data;
          this.searchData.viewsList_searchLoading = false;
          this.total = res.pagination.total;
        } else {
          this.searchData.viewsList_searchLoading = false;
          this.$message.error("列表获取失败！");
        }
      });
    },
    // 分页数据变化处理
    handleSizeChange(newSize) {
      this.listParams.pageSize = newSize;
      this.getSuppliersList();
    },
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getSuppliersList();
    },
    view(val) {
      this.dialogVisible = true;
      this.getSuppDetail(val);
    },
    // 获取发票详情
    getSuppDetail(id) {
      this.detailList = []
      this.detail = {}
      this.searchData.detailList_searchLoading = true;
      suppliersInfo(id).then((res) => {
        if (res.status == 200) {
          this.detailList = res.data[0].banks;
          this.detail = res.data[0];
          this.searchData.detailList_searchLoading = false;
        } else {
          this.$message.error("列表获取失败！");
        }
      });
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
  .form_line {
    width: 100%;
    min-height: 40px;
    border-bottom: 1px solid #f0f3f7;
    display: flex;
    color: #666666;
    font-size: 12px;

    .titlebox {
      width: 133px;
      min-height: 40px;
      text-align: center;
      border: 1px solid #cccccc;
      background: rgb(243, 245, 249);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      flex-shrink: 0;
      flex-grow: 0;
    }

    .infobox {
      width: 282px;
      padding: 10px 20px;
      box-sizing: border-box;
      border: 1px solid #cccccc;
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    // 选择格
    .selectbox {
      padding-top: 0;
      padding-bottom: 0;
    }

    .bdNone {
      border-bottom: none;
    }
    .brNone {
      border-right: none;
    }
  }

  .last_line {
    border: none;
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
