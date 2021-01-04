<template>
  <div class="staffManage">
    <nav-Bar
      v-if="$route.path !== '/OAstaffChange'"
      :breadList="breadList"
    ></nav-Bar>
    <!-- 搜索框 -->
    <el-button
      class="showSearch"
      :class="$route.path == '/OAstaffChange' ? 'OA_showSearch' : ''"
      @click="showSearch = !showSearch"
      type="text"
      :icon="showSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
      >{{ showSearch ? "隐藏搜索框" : "打开搜索框" }}</el-button
    >
    <el-collapse-transition>
      <div v-show="showSearch">
        <el-card
          class="searchCard"
          :class="$route.path == '/OAstaffChange' ? 'OA_searchCard' : ''"
        >
          <div class="serchBox">
            <el-input
              v-model="filterList.name"
              placeholder="请输入姓名"
              clearable
              style="width: 260px; margin-right: 20px; border-radius: 4px"
            ></el-input>
            <el-select
              v-model="filterList.status"
              placeholder="请选择异动类型"
              style="width: 260px; margin-right: 20px; border-radius: 4px"
            >
              <el-option
                v-for="item in adStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- <el-date-picker
              v-model="filterList.timeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 400px; margin-right: 20px; border-radius: 4px"
            >
            </el-date-picker> -->
          </div>
          <div class="btnBox">
            <el-button type="primary" size="medium" @click="search()"
              >搜索</el-button
            >
            <el-button class="secondary" size="medium" @click="reset()"
              >重置</el-button
            >
          </div>
        </el-card>
      </div>
    </el-collapse-transition>

    <!-- 表格 -->
    <el-card
      class="listCard"
      :class="$route.path == '/OAstaffChange' ? 'OA_listCard' : ''"
    >
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">人员异动表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="openDialog(0)"
            >新增</el-button
          >
          <el-button class="btn p40" @click="exportChange()">导出</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          ref="table"
          :data="viewsList"
          v-loading="searchData.viewsList_searchLoading"
          element-loading-background="rgba(0, 0, 0, 0.2)"
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          :height="tableHeight"
        >
          >
          <el-table-column
            type="index"
            width="50"
            prop="index"
            label="序号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-for="(item, index) in tHeadList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="item.prop == 'department'">
                <span
                  v-for="(i, index) in scope.row.department"
                  :key="index"
                  style="margin: 0 10px"
                  >{{ i.name }}</span
                >
              </div>
              <div v-else-if="item.prop == 'position'">
                <span
                  v-for="(i, index) in scope.row.position"
                  :key="index"
                  style="margin: 0 10px"
                  >{{ i.name }}</span
                >
              </div>
              <div v-else>
                <span>{{ scope.row[item.prop] }}</span>
              </div>
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
        style="margin:10px 0; float: right"
      ></el-pagination>

      <!-- 新增管理员弹窗 -->
      <el-dialog :visible.sync="showAddPop" width="600px" top="20vh" center>
        <div class="departure">
          <ul class="popExtraList">
            <li>
              <span>员工姓名：</span>
              <el-input
                style="width: 400px"
                v-model="addParams.name"
                placeholder="请输入姓名"
              ></el-input>
            </li>
            <li>
              <span>异动类型：</span>
              <el-select
                style="width: 400px"
                v-model="addParams.type"
                placeholder="请选择异动类型"
                class="elInput"
              >
                <el-option
                  v-for="(item, index) in adStatus"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>备注：</span>
              <el-input
                type="textarea"
                style="width: 400px"
                autosize
                placeholder="请输入备注"
                maxlength="50"
                show-word-limit
                v-model="addParams.remark"
              ></el-input>
            </li>
          </ul>
        </div>
        <div class="extraBtns">
          <div>
            <el-button style="width: 95px" @click="extraBtnClick(0)"
              >取 消</el-button
            >
            <el-button
              style="width: 95px"
              @click="extraBtnClick(1)"
              type="primary"
              >确 定</el-button
            >
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
// api
import { STAFFS_API } from "@/api/staffs";
import { OpenLoading } from "@/utils/utils.js";
export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/organization",
          title: "首页",
        },
        {
          title: "员工管理",
        },
        {
          title: "人员异动表",
        },
      ],
      tableHeight: 500,
      // 搜索框
      // 筛选列表的参数
      filterList: {
        name: "",
        status: null,
        timeRange: [new Date(), new Date()],
      },
      adStatus: [
        {
          name: "新进",
          id: 0,
        },
        {
          name: "转正",
          id: 1,
        },
        {
          name: "离职",
          id: 2,
        },
        {
          name: "调岗",
          id: 3,
        },
        {
          name: "调薪",
          id: 4,
        },
        {
          name: "劳动合同续签",
          id: 5,
        },
      ],
      showSearch: false,
      tHeadList: [
        { label: "员工姓名", prop: "name" },
        { label: "工号", prop: "job_number" },
        { label: "部门", prop: "department" },
        { label: "职位", prop: "position" },
        { label: "身份证号码", prop: "card" },
        { label: "异动类型", prop: "type" },
        { label: "异动时间", prop: "change_time" },
        { label: "备注", prop: "remark" },
      ],
      viewsList: [],
      // 新增角色的弹窗中的数据
      addParams: {
        name: "",
        type: "",
        remark: "",
      },
      showAddPop: false, //是否显示弹窗
      searchData: {
        viewsList_searchLoading: true,
      },
      // 分页
      total: 4,
      listParams: { name: "", page: 1, pageSize: 20 },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      // console.log( this.tableHeight)
      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 100;
      };
    });
    this.getChangeList();
  },
  methods: {
    // 获取异动列表
    getChangeList(val) {
      this.searchData.viewsList_searchLoading = true;
      let params = {
        name: this.filterList.name,
        type: this.filterList.status,
        page: this.listParams.page,
        page_size: this.listParams.pageSize,
      };
      STAFFS_API.staffChanges(params).then((res) => {
        if (res.status == 200) {
          this.searchData.viewsList_searchLoading = false;
          this.viewsList = res.data;
          this.total = res.pagination.total;
        }
      });
    },
    search() {
      this.listParams.page = 1;
      this.getChangeList();
    },
    reset() {
      this.listParams.page = 1;
      this.filterList = {
        name: "",
        status: null,
        timeRange: [new Date(), new Date()],
      };
      this.getChangeList();
    },
    // 导出表格
    async exportChange() {
      let params = {
        name: this.filterList.name,
        type: this.filterList.status,
      };
      const loading = OpenLoading(this, 1, "文件下载中");
      let res = null;
      await this.axios({
        method: "get",
        url: `hr/staff-changes/export`,
        params: params,
        responseType: "blob",
      }).then((result) => {
        if (result.status == 200) {
          res = result.data;
        } else {
          this.$message.error("文件获取失败！");
        }
        loading.close();
      });
      if (res) {
        let fileName = "人员异动表";
        let fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // xlsx文件
        let blob = new Blob([res], {
          type: fileType,
        });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.log("未获取到下载文件！");
      }
    },
    // 新增部门
    openDialog(type, val) {
      switch (type) {
        case 0:
          this.showAddPop = true;
          this.addParams.name = "";
          this.addParams.type = "";
          this.addParams.remark = "";
          break;
        default:
          break;
      }
    },
    extraBtnClick(type) {
      switch (type) {
        case 0:
          this.showAddPop = false;
          break;
        case 1:
          STAFFS_API.addChange(this.addParams).then((res) => {
            if (res.status == 200) {
              this.$message.success("添加成功！");
              this.getChangeList();
              this.showAddPop = false;
            } else {
              this.$message.error("添加失败！");
            }
          });
          break;
        default:
          break;
      }
    },
    // watch pagesize change
    handleSizeChange(newSize) {
      this.listParams.pageSize = newSize;
      this.getChangeList();
    },
    // watch page change
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getChangeList();
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
  .showSearch {
    margin-left: 20px;
  }
  

  .listCard {
    margin: 0 20px;
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
  .departure {
    padding-right: 30px;
    .popExtraList {
      > li {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 120px;
          font-size: 16px;
          color: #333333;
          font-weight: 600;
          text-align: right;
        }
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
  .popExtraList {
    > li {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin: 20px 0;
      span {
        font-size: 16px;
        color: #333333;
        font-weight: 600;
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
