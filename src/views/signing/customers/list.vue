<template>
  <div class="staffManage">
    <nav-Bar v-if="$route.path !== '/OAcustomers'" :breadList="breadList" ></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard" :class="$route.path=='/OAcustomers'?'OA_listCard':''">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">客户列表</span>
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
            label="客户编号"
            prop="code"
            min-width="160px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="客户简称"
            prop="name"
            min-width="100px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="客户全称"
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
              <el-button type="text" @click="getCustDetail(scope.row.id)"
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

      <!-- 客户详情弹窗 -->
      <el-dialog
        title="客户详情"
        :visible.sync="dialogVisible"
        center
        width="1200px"
      >

        <!-- 客户信息 -->
        <div style="margin-bottom: 10px">
          <div class="form_line">
            <div class="titlebox bdNone brNone">创建日期</div>
            <div class="infobox selectbox last_row brNone bdNone">
              {{ detail.created_at }}
            </div>
            <div class="titlebox bdNone brNone">客户编号</div>
            <div class="infobox bdNone brNone">
              {{ detail.code }}
            </div>
            <div class="titlebox bdNone brNone">客户简称</div>
            <div class="infobox selectbox last_row bdNone">
              {{ detail.name }}
            </div>
          </div>
          <div class="form_line">
            <div class="titlebox brNone">客户全称</div>
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

        <!-- 开票信息 -->
        <div style="margin-bottom: 10px">
          <div class="form_line">
            <div class="titlebox bdNone brNone">名称</div>
            <div class="infobox selectbox last_row brNone bdNone">
              {{ detail.name }}
            </div>
            <div class="titlebox bdNone brNone">纳税人识别号</div>
            <div class="infobox bdNone brNone">
              {{ detail.tax_number }}
            </div>
            <div class="titlebox bdNone brNone">地址</div>
            <div class="infobox selectbox last_row bdNone">
              {{ detail.address }}
            </div>
          </div>
          <div class="form_line">
            <div class="titlebox brNone">银行账号</div>
            <div class="infobox selectbox last_row brNone">
              {{ detail.bank_code }}
            </div>
            <div class="titlebox brNone">开户行</div>
            <div class="infobox selectbox last_row brNone">
              {{ detail.bank }}
            </div>
            <div class="titlebox brNone">电话</div>
            <div class="infobox selectbox last_row">
              {{ detail.phone }}
            </div>
          </div>
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
    </el-card>
  </div>
</template>
<script>
import { OpenLoading } from "@/utils/utils.js";
import navBar from "@/components/navBar/navBar";
import { customersList, customersInfo } from "@/api/signing";
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
          title: "客户列表",
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
    this.getCustomersList();
  },
  methods: {
    // 获取发票列表
    getCustomersList() {
      this.searchData.viewsList_searchLoading = true;
      let params = {
        page: this.listParams.page,
        perPage: this.listParams.pageSize,
        "fliter[ooa01]": 4436,
      };
      customersList(params).then((res) => {
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
      this.getCustomersList();
    },
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getCustomersList();
    },
    // 获取发票详情
    getCustDetail(id) {
      const loading = OpenLoading(this, 1)
      this.detailList = []
      this.detail = {}
      this.searchData.detailList_searchLoading = true;
      customersInfo(id).then((res) => {
        if (res.status == 200) {
          this.detailList = res.data[0].banks;
          this.detail = res.data[0];
          this.searchData.detailList_searchLoading = false;
          // open
          this.dialogVisible = true;
        } else {
          this.$message.error("列表获取失败！");
        }
        loading.close()
        clearTimeout(this.overloading)
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
