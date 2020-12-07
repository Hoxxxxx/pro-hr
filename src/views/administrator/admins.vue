<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <!-- 搜索框 -->
    <el-button
      class="showSearch"
      @click="showSearch = !showSearch"
      type="text"
      :icon="showSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
      >{{ showSearch ? "隐藏搜索框" : "打开搜索框" }}</el-button
    >
    <el-collapse-transition>
      <div v-show="showSearch">
        <el-card class="searchCard">
          <div class="serchBox">
            <el-input
              v-model="filterList.name"
              placeholder="请输入员工姓名"
              @clear="reset"
              clearable
              style="width: 360px; margin-right: 20px; border-radius: 4px"
            ></el-input>
            <el-select
              v-model="filterList.status"
              placeholder="请选择状态"
              style="width: 360px; border-radius: 4px"
            >
              <el-option
                v-for="item in adStatus"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
              ></el-option>
            </el-select>
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
        <span class="tableTitle">管理员列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="addStaff()"
            >新增管理员</el-button
          >
          <el-button class="btn p40" @click="deleteMore()">批量删除</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            label="用户名称"
            prop="adm_name"
            align="center"
          ></el-table-column>
          <el-table-column label="职位" prop="position" align="center">
            <template slot-scope="scope">
              <span
                v-for="position in scope.row.position"
                :key="position.id"
                style="margin: 0 10px"
                >{{ position.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="department" align="center">
            <template slot-scope="scope">
              <span
                v-for="department in scope.row.department"
                :key="department.id"
                style="margin: 0 10px"
                >{{ department.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="角色" prop="ro_name" align="center">
            <template slot-scope="scope">
              <span
                v-for="roName in scope.row.roles"
                :key="roName.id"
                style="margin: 0 10px"
                >{{ roName.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="admin_status">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <!-- edit -->
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <!-- delete -->
              <el-button type="text" @click="removeById(scope.row.id)"
                >删除</el-button
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
        @next-click="nextPage"
        @prev-click="prevPage"
        :page-sizes="[10, 20, 50]"
        :page-size="listParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 20px; margin-bottom: 20px; float: right"
      ></el-pagination>

      <!-- 新增管理员弹窗 -->
      <el-dialog
        :visible.sync="showAddPop"
        :close-on-click-modal="false"
        width="600px"
        top="35vh"
        center
      >
        <ul class="popExtraList">
          <li>
            <span>用户名称</span>
            <el-input
              v-model="addParams.name"
              class="elInput"
              placeholder="请输入用户名称"
            ></el-input>
          </li>
          <li>
            <span>选择员工</span>
            <el-select
              v-model="addParams.staff_id"
              placeholder="请选择员工"
              class="elInput"
            >
              <el-option
                v-for="(staff, index) in staffList"
                :key="index"
                :label="staff.name"
                :value="staff.id"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>选择角色</span>
            <el-select
              multiple
              v-model="addParams.role_ids"
              placeholder="请选择角色"
              class="elInput"
            >
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </li>
        </ul>
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
      <el-dialog
        :visible.sync="showEditPop"
        :close-on-click-modal="false"
        width="600px"
        top="35vh"
        center
      >
        <ul class="popExtraList">
          <li>
            <span>用户名称</span>
            <el-input
              v-model="addParams.name"
              class="elInput"
              placeholder="请输入用户名称"
            ></el-input>
          </li>
          <li>
            <span>选择员工</span>
            <el-select
              v-model="addParams.staff_id"
              placeholder="请选择员工"
              class="elInput"
            >
              <el-option
                v-for="(staff, index) in staffList"
                :key="index"
                :label="staff.name"
                :value="staff.id"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>选择角色</span>
            <el-select
              multiple
              v-model="addParams.role_ids"
              placeholder="请选择角色"
              class="elInput"
            >
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </li>
        </ul>
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
import { ADMINS_API } from "@/api/adminsApi";
import { ROLES_API } from "@/api/rolesApi";
import { STAFFS_API } from "@/api/staffs";
export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/administrator",
          title: "权限管理",
        },
        {
          title: "管理员管理",
        },
      ],
      title: "管理员管理",
      // 搜索框
      showSearch: false,
      adStatus: [
        {
          lable: "正常",
          value: 1,
        },
        {
          lable: "禁用",
          value: 0,
        },
      ],
      viewsList: [],
      // 新增管理员的弹窗中的数据
      showAddPop: false, //是否显示弹窗
      addParams: {
        name: "", //用户名
        role_ids: "", //角色
        staff_id: "", //员工
      },
      staffList: [], //员工列表
      roles: [], //角色列表
      // 编辑管理员
      showEditPop: false,
      editID: "", //当前编辑的管理员
      // 批量删除
      ids: [], //批量选中的管理员
      // 筛选列表的参数
      filterList: {
        name: "",
        status: "",
      },
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    // this.getAdmins()
    this.getUsers();
    this.rolesList();
    this.getAdminsList();
  },
  methods: {
    // 获取所有员工
    getUsers() {
      let params = {
        page: 1,
      };
      STAFFS_API.getStaffs(params).then((res) => {
        if (res.status == 200) {
          this.staffList = res.data[0].data;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // 获取角色列表
    rolesList() {
      let params = {
        is_paging:1
      };
      ROLES_API.getRoles(params).then((res) => {
        if (res.status == 200) {
          this.roles = res.data;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // 获取管理员列表
    getAdminsList() {
      let params = {
        page: this.listParams.page,
      };
      ADMINS_API.getAdmins(params).then((res) => {
        if (res.status == 200) {
          this.viewsList = res.data;
          this.total = res.pagination.total;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // 查看某个管理员
    getAdmins() {
      let id = 4;
      ADMINS_API.getAdmins({}, id).then((res) => {
        console.log(res);
      });
    },
    // 搜索列表
    search() {
      console.log(this.filterList);
      let params = {
        page: this.listParams.page,
      };
      if (this.filterList.name != "") {
        params.name = this.filterList.name;
      }
      if (this.filterList.status != "") {
        params.status = this.filterList.status;
      }
      ADMINS_API.getAdmins(params).then((res) => {
        if (res.status == 200) {
          this.viewsList = res.data;
          this.total = res.pagination.total;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // 重置
    reset() {
      this.filterList.name = "";
      this.filterList.status = "";
      this.search();
    },
    // 新增管理员
    addStaff() {
      this.showAddPop = true;
      this.addParams = {
        name: "", //用户名
        role_ids: "", //角色
        staff_id: "", //员工
      };
    },
    extraBtnClick(type) {
      if (type == 1) {
        ADMINS_API.addAdmins(this.addParams).then((res) => {
          if (res.status == 200) {
            this.$message.success("添加成功！");
            this.getAdminsList();
            this.showAddPop = false;
          } else {
            this.$message.error(res.error.message);
          }
        });
      } else if (type == 3) {
        ADMINS_API.editAdmins(this.addParams, this.editID).then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.$message.success("修改成功！");
            this.getAdminsList();
            this.showEditPop = false;
          } else {
            this.$message.error(res.error.message);
          }
        });
      } else {
        this.addParams = {
          name: "", //用户名
          role_ids: "", //角色
          staff_id: "", //员工
        };
        this.showAddPop = false;
        this.showEditPop = false;
      }
    },
    // 修改管理员状态
    changeStatus(val) {
      let params = {
        id: val.id,
        status: val.status,
      };
      ADMINS_API.changeStatus(params).then((res) => {
        if (res.status == 200) {
          this.$message.success("状态修改成功！");
        } else {
          this.$message.error(res.error.message);
        }
      });
    },
    // 编辑管理员、
    edit(val) {
      console.log(val)
      this.showEditPop = true;
      this.editID = val.id;
      let temp = [];
      val.roles.forEach((item) => {
        temp.push(item.id);
      });
      this.addParams = {
        name: val.adm_name,
        role_ids: temp,
        staff_id: val.id,
      };
    },
    // 删除管理员
    removeById(val) {
      this.$confirm("确认删除此管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ADMINS_API.deleteAdmins({}, val).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getAdminsList();
            } else {
              this.$message.error(res.error.message);
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
    // 批量删除管理员
    deleteMore() {
      let params = {
        ids: this.ids,
      };
      this.$confirm("确认删除选中的管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ADMINS_API.deleteAdmins(params).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getAdminsList();
            } else {
              this.$message.error(res.error.message);
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
    handleSelectionChange(val) {
      let temp = [];
      val.forEach((ele) => {
        temp.push(ele.id);
      });
      this.ids = temp;
    },
    // watch pagesize change
    handleSizeChange(newSize) {},

    handleCurrentChange(newPage) {
      this.listParams.page = newPage
      this.getAdminsList()
    },
    nextPage() {
      this.listParams.page ++;
      this.getAdminsList()
    },
    prevPage() {
      this.listParams.page --;
      this.getAdminsList()
    },
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/style/public.less");
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
        margin-right: 40px;
      }
    }
  }
  .extraBtns {
    width: 100%;
    margin: 30px 0 20px 0;
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
