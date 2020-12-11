<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <!-- 筛选框 -->
    <el-button
      class="showSearch"
      @click="showSearch = !showSearch"
      type="text"
      :icon="showSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
      >{{ showSearch ? "隐藏筛选框" : "打开筛选框" }}</el-button
    >
    <el-collapse-transition>
      <div v-show="showSearch">
        <el-card class="searchCard">
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
              style="width: 200px; margin-right: 20px; border-radius: 4px"
            >
              <el-option
                v-for="item in adStatus"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="filterList.timeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 400px; margin-right: 20px; border-radius: 4px"
            >
            </el-date-picker>
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
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">人员异动表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="openDialog(0)"
            >新增</el-button
          >
          <el-button class="btn p40" @click="deleteIds()">导出</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          v-loading="searchData.viewsList_searchLoading"
          element-loading-background="rgba(0, 0, 0, 0.2)"
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          @selection-change="handleSelectionChange"
        >
          >
          <el-table-column type="index" width="50" prop="序号">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in tHeadList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
          ></el-table-column>
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

      <!-- 新增管理员弹窗 -->
      <el-dialog :visible.sync="showAddPop" width="600px" top="20vh" center>
        <div class="departure">
          <ul class="popExtraList">
            <li>
              <span>部门名称：</span>
              <el-input
                style="width: 400px"
                v-model="departName"
                placeholder="请输入部门名称"
              ></el-input>
            </li>
            <li>
              <span>部门负责人：</span>
              <el-input
                style="width: 400px"
                v-model="chargerName"
                placeholder="请输入部门负责人"
              ></el-input>
            </li>
            <li>
              <span>上级部门：</span>
              <el-select
                style="width: 400px"
                v-model="depart"
                placeholder="请选择上级部门"
                class="elInput"
              >
                <el-option
                  v-for="(item, index) in depart_options"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>部门描述：</span>
              <el-input
                type="textarea"
                style="width: 400px"
                autosize
                placeholder="请输入部门描述"
                v-model="departMsg"
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
      <!-- 编辑管理员弹窗 -->
      <el-dialog :visible.sync="showEditPop" width="600px" top="20vh" center>
        <div class="departure">
          <ul class="popExtraList">
            <li>
              <span>部门名称：</span>
              <el-input
                style="width: 400px"
                v-model="departName"
                placeholder="请输入部门名称"
              ></el-input>
            </li>
            <li>
              <span>部门负责人：</span>
              <el-input
                style="width: 400px"
                v-model="chargerName"
                placeholder="请输入部门负责人"
              ></el-input>
            </li>
            <li>
              <span>上级部门：</span>
              <el-select
                style="width: 400px"
                v-model="depart"
                placeholder="请选择上级部门"
                class="elInput"
              >
                <el-option
                  v-for="(item, index) in depart_options"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>部门描述：</span>
              <el-input
                type="textarea"
                style="width: 400px"
                autosize
                placeholder="请输入部门描述"
                v-model="departMsg"
              ></el-input>
            </li>
          </ul>
        </div>
        <div class="extraBtns">
          <div>
            <el-button style="width: 95px" @click="extraBtnClick(2)"
              >取 消</el-button
            >
            <el-button
              style="width: 95px"
              @click="extraBtnClick(3)"
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
import { DEPART_API } from "@/api/department";
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
      title: "人员异动表",
      // 筛选框
      // 筛选列表的参数
      filterList: {
        name: "",
        status: null,
        timeRange: [new Date(), new Date()],
      },
      adStatus: [
        {
          lable: "新进",
          value: 0,
        },
        {
          lable: "转正",
          value: 1,
        },
        {
          lable: "离职",
          value: 2,
        },
        {
          lable: "调岗",
          value: 3,
        },
        {
          lable: "劳动合同续签",
          value: 4,
        },
      ],
      showSearch: false,
      tHeadList: [
        { label: "员工姓名", prop: "name" },
        { label: "工号", prop: "manager_name" },
        { label: "部门", prop: "name" },
        { label: "职位", prop: "name" },
        { label: "身份证号码", prop: "name" },
        { label: "异动类型", prop: "name" },
        { label: "异动时间", prop: "name" },
        { label: "备注", prop: "name" },
      ],
      viewsList: [],
      ids: [], //批量删除
      // 新增角色的弹窗中的数据
      departName: "",
      chargerName: "",
      showAddPop: false, //是否显示弹窗
      showEditPop: false,
      depart_options: [{ id: 0, name: "无" }],
      depart: "", //上级部门
      departMsg: "", //部门描述
      editId: "",
      searchData: {
        viewsList_searchLoading: true
      },
      // 分页
      total: 4,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    // this.getUserInfo();
    this.getDepartmentList();
  },
  methods: {
    // 获取部门列表
    getDepartmentList(val) {
      this.searchData.viewsList_searchLoading = true;
      let params = {
        page: this.listParams.page,
        is_paging: 0,
      };
      if (val) {
        params = { ...params, ...val };
      }
      DEPART_API.getDeparts(params).then((res) => {
        if (res.status == 200) {
          this.searchData.viewsList_searchLoading = false;
          this.viewsList = res.data;
          this.total = res.pagination.total;
          this.depart_options = [...res.data, ...this.depart_options];
        }
      });
    },
    search() {
      this.listParams.page = 1;
      let params = {
        name: this.deName,
      };
      this.getDepartmentList(params);
    },
    reset() {
      this.listParams.page = 1;
      this.deName = "";
      this.getDepartmentList();
    },
    // 删除部门
    deleteById(val) {
      this.$confirm("确认删除部门?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DEPART_API.deleteDeparts({}, val).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getDepartmentList();
            } else {
              this.$message.error("删除成功！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量删除部门
    deleteIds(val) {
      let params = {
        ids: this.ids,
      };
      console.log(params);
      this.$confirm("确认删除选中的部门?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DEPART_API.deleteIds(params).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getDepartmentList();
            } else {
              this.$message.error("删除成功！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 新增部门
    openDialog(type, val) {
      switch (type) {
        case 0:
          this.showAddPop = true;
          this.departName = "";
          this.chargerName = "";
          this.depart = "";
          this.departMsg = "";
          break;
        case 1:
          this.showEditPop = true;
          this.editId = val.id;
          this.departName = val.name;
          this.chargerName = val.manager_name;
          this.depart = val.pid;
          this.departMsg = val.description;
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
          let params = {
            name: this.departName,
            manager_name: this.chargerName,
            pid: this.depart,
            description: this.departMsg,
          };
          DEPART_API.addDeparts(params).then((res) => {
            if (res.status == 200) {
              this.$message.success("添加成功！");
              this.getDepartmentList();
              this.showAddPop = false;
            } else {
              this.$message.error("添加失败！");
            }
          });
          break;
        case 2:
          this.showEditPop = false;
          break;
        case 3:
          let paramsEdit = {
            name: this.departName,
            manager_name: this.chargerName,
            pid: this.depart,
            description: this.departMsg,
          };
          DEPART_API.editDeparts(paramsEdit, this.editId).then((res) => {
            if (res.status == 200) {
              this.$message.success("修改成功！");
              this.getDepartmentList();
              this.showEditPop = false;
            } else {
              this.$message.error("修改失败！");
            }
          });
          break;
        default:
          break;
      }
    },
    handleSelectionChange(val) {
      let temp = [];
      val.forEach((item) => {
        temp.push(item.id);
      });
      this.ids = temp;
    },
    // watch pagesize change
    handleSizeChange(newSize) {},
    // watch page change
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getDepartmentList();
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
  .searchCard {
    height: 80px;
    margin: 20px 20px 0 20px;
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
    margin: 20px 20px 0 20px;
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
</style>
