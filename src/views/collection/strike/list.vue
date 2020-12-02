<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">收款冲账单列表</span>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
        >
          <el-table-column
            align="center"
            label="冲账单号"
            prop="ooa01"
          ></el-table-column>
          <el-table-column
            align="center"
            label="冲账日期"
            prop="ooa02"
          ></el-table-column>
          <el-table-column
            align="center"
            label="输入日期"
            prop="ooa021"
          ></el-table-column>
          <el-table-column
            align="center"
            label="账款客户编号"
            prop="ooa03"
          ></el-table-column>
          <el-table-column
            align="center"
            label="账款客户简称"
            prop="ooa032"
          ></el-table-column>
          <el-table-column
            align="center"
            label="币别"
            prop="ooa23"
          ></el-table-column>
          <el-table-column
            align="center"
            label="汇率"
            prop="ooa24"
          ></el-table-column>
          <el-table-column
            align="center"
            label="原币借方金额合计"
            prop="ooa31d"
          ></el-table-column>
          <el-table-column
            align="center"
            label="原币贷方金额合计"
            prop="ooa31c"
          ></el-table-column>
          <el-table-column
            align="center"
            label="本币借方金额合计"
            prop="ooa32d"
          ></el-table-column>
          <el-table-column
            align="center"
            label="本币贷方金额合计"
            prop="ooa32c"
          ></el-table-column>
          <el-table-column label="操作" width="300px" align="center">
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
        style="margin-top: 20px; margin-bottom: 20px; float: right"
      ></el-pagination>

      <el-dialog
        title="收款冲账单详情"
        :visible.sync="dialogVisible"
        center
        width="1200px"
      >
        <div style="margin-bottom: 10px">
          <div class="form_line">
            <div class="titlebox bdNone brNone">冲账单号</div>
            <div class="infobox bdNone brNone">
              {{ detail.ooa01 }}
            </div>
            <div class="titlebox bdNone brNone">冲账日期</div>
            <div class="infobox selectbox last_row bdNone brNone">
              {{ detail.ooa02 }}
            </div>
            <div class="titlebox bdNone brNone">输入日期</div>
            <div class="infobox bdNone brNone">
              {{ detail.ooa021 }}
            </div>
            <div class="titlebox brNone bdNone"></div>
            <div class="infobox selectbox last_row bdNone"></div>
          </div>
          <div class="form_line">
            <div class="titlebox bdNone brNone">客户编号</div>
            <div class="infobox selectbox last_row brNone bdNone">
              {{ detail.ooa03 }}
            </div>
            <div class="titlebox bdNone brNone">客户简称</div>
            <div class="infobox bdNone brNone">
              {{ detail.ooa032 }}
            </div>
            <div class="titlebox bdNone brNone">币别</div>
            <div class="infobox selectbox last_row bdNone brNone">
              {{ detail.ooa23 }}
            </div>
            <div class="titlebox bdNone brNone">汇率</div>
            <div class="infobox bdNone">
              {{ detail.ooa24 }}
            </div>
          </div>
          <div class="form_line">
            <div class="titlebox brNone">原币借方金额合计</div>
            <div class="infobox selectbox last_row brNone">
              {{ detail.ooa31d }}
            </div>
            <div class="titlebox brNone">原币贷方金额合计</div>
            <div class="infobox selectbox last_row brNone">
              {{ detail.ooa31c }}
            </div>
            <div class="titlebox brNone">本币借方金额合计</div>
            <div class="infobox selectbox last_row brNone">
              {{ detail.ooa32d }}
            </div>
            <div class="titlebox brNone">本币借方金额合计</div>
            <div class="infobox">
              {{ detail.ooa32c }}
            </div>
          </div>
        </div>
        <el-table
          :data="detailList"
          style="width: 100%"
          height="550px"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
        >
          <el-table-column
            align="center"
            label="冲帐单号"
            prop="oob01"
          ></el-table-column>
          <el-table-column
            align="center"
            label="项次"
            prop="oob02"
          ></el-table-column>
          <el-table-column
            align="center"
            label="借贷别"
            prop="oob03"
          >
            <template slot-scope="scope">
              <span>{{scope.row.oob03 | typeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="参考单号"
            prop="oob06"
          ></el-table-column>
          <el-table-column
            align="center"
            label="币别"
            prop="oob07"
          ></el-table-column>
          <el-table-column
            align="center"
            label="汇率"
            prop="oob08"
          ></el-table-column>
          <el-table-column
            align="center"
            label="原币金额"
            prop="oob09"
          ></el-table-column>
          <el-table-column
            align="center"
            label="本币金额"
            prop="oob10"
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
import navBar from "@/components/navBar/navBar";
import { strikeList, strikeDetail } from "@/api/reconciliation";
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
          title: "收款冲账单",
        },
        {
          title: "收款冲账单列表",
        },
      ],
      title: "收款冲账单列表",
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
  created() {
    this.getStrikeList();
  },
  methods: {
    // 获取发票列表
    getStrikeList() {
      let params = {
        page: this.listParams.page,
        perPage: this.listParams.pageSize,
        "fliter[ooa01]": 4436,
      };
      strikeList(params).then((res) => {
        if (res.status == 200) {
          this.viewsList = res.data;
          this.total = res.pagination.total;
        } else {
          this.$message.error("列表获取失败！");
        }
      });
    },
    // 分页数据变化处理
    handleSizeChange(newSize) {},
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getStrikeList();
    },
    view(val) {
      this.dialogVisible = true;
      this.getstrikeDetail(val);
    },
    // 获取发票详情
    getstrikeDetail(id) {
      let params = {
        id: id,
      };
      strikeDetail(params).then((res) => {
        if (res.status == 200) {
          this.detailList = res.data[0].oob;
          this.detail = res.data[0];
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
</style>
