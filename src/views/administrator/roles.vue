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
              v-model="adminName"
              placeholder="请输入角色名称"
              class="elInput"
              @clear="reset"
              clearable
            ></el-input>
          </div>
          <div class="btnBox">
            <el-button type="primary" size="medium" @click="search"
              >搜索</el-button
            >
            <el-button class="secondary" size="medium" @click="reset"
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
        <span class="tableTitle">角色列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="addStaff()"
            >新增角色</el-button
          >
          <el-button class="btn p40" @click="deleteMore()">批量删除</el-button>
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
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          :height="tableHeight"
        >
          <el-table-column 
            type="selection" 
            width="55"
            align="center"
            fixed="left">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in tHeadList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
          ></el-table-column>
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
        @next-click="nextPage"
        @prev-click="prevPage"
        :current-page="listParams.page"
        :page-sizes="[10, 20, 50]"
        :page-size="listParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 20px; margin-bottom: 20px; float: right"
      ></el-pagination>

      <!-- 新增角色弹窗 -->
      <el-dialog
        :visible.sync="showAddPop"
        :close-on-click-modal="false"
        width="600px"
        top="20vh"
        center
      >
        <div class="nameInput">
          <span>角色名称</span>
          <el-input
            v-model="addParams.roleName"
            placeholder="请输入角色名称"
            class="elInput"
          ></el-input>
        </div>
        <div class="dialogBox">
          <div class="permissions">
            <div class="title">角色权限</div>
            <el-tree
              :data="addParams.permissions"
              show-checkbox
              node-key="id"
              @getCurrentNode="getCurrentAddNode"
              :props="defaultProps"
              ref="addCodeTree"
              :label="title"
            ></el-tree>
          </div>
          <div class="permissions">
            <div class="title">菜单权限</div>
            <el-tree
              :data="addParams.menus"
              show-checkbox
              node-key="id"
              @getCurrentNode="getCurrentMenuNode"
              :props="defaultMenuProps"
              ref="addMenuTree"
            ></el-tree>
          </div>
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

      <!-- 编辑角色弹窗 -->
      <el-dialog
        :visible.sync="showEditPop"
        :close-on-click-modal="false"
        width="600px"
        top="20vh"
        center
      >
        
          <div class="nameInput">
            <span>角色名称</span>
            <el-input
              v-model="editParams.roleName"
              placeholder="请输入角色名称"
              class="elInput"
            ></el-input>
          </div>
          <div class="dialogBox">
          <div class="permissions">
            <div class="title">角色权限</div>
            <el-tree
              :data="editParams.permissions"
              show-checkbox
              node-key="id"
              @getCurrentNode="getCurrentEditNode"
              ref="editCodeTree"
              :props="defaultProps"
              :label="title"
            ></el-tree>
          </div>
          <div class="permissions">
            <div class="title">菜单权限</div>
            <el-tree
              :data="editParams.menus"
              show-checkbox
              node-key="id"
              @getCurrentNode="getCurrentMenuNode"
              :props="defaultMenuProps"
              ref="editMenuTree"
            ></el-tree>
          </div>
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
import { renderTime } from "@/utils/function.js";
// api
import { PERMISSION_API } from "@/api/permission";
import { ROLES_API } from "@/api/rolesApi";
import { MENUS_API } from "@/api/menus";
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
          title: "角色管理",
        },
      ],
      title: "角色管理",
      tableHeight: 500,
      // 搜索框
      showSearch: false,
      adminName: "",
      tHeadList: [
        { label: "角色名称", prop: "name" },
        { label: "创建时间", prop: "created_at" },
        { label: "修改时间", prop: "updated_at" },
      ],
      viewsList: [],
      searchData: {
        viewsList_searchLoading: true,
      },
      // 新增角色的弹窗中的数据
      addParams: {
        roleName: "",
        permissions: [],
        menus: [],
      },
      editParams: {
        roleName: "",
        permissions: [],
        menus: [],
      },
      showAddPop: false, //是否显示弹窗
      permissionsData: [],
      menusData: [],
      defaultProps: {
        children: "sub",
        label: "name",
      },
      defaultMenuProps: {
        children: "sub",
        label: "name",
      },
      // 批量删除的角色id
      ids: [],
      // 编辑角色弹窗
      showEditPop: false,
      editId: "", //当前编辑时选中的项
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 10 },
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
    
    this.rolesList();
    this.getPermissions();
    this.getMenus();
  },
  methods: {
    // 获取角色列表
    rolesList() {
      this.searchData.viewsList_searchLoading = true;
      let params = {
        name: this.adminName,
        page: this.listParams.page,
        is_paging:0,
        page_size:this.listParams.pageSize
      };
      ROLES_API.getRoles(params).then((res) => {
        if (res.status == 200) {
          this.searchData.viewsList_searchLoading = false;
          res.data.forEach((item) => {
            item.created_at = renderTime(item.created_at);
            item.updated_at = renderTime(item.updated_at);
          });
          this.viewsList = res.data;
          this.total = res.pagination.total;
        } else {
          this.searchData.viewsList_searchLoading = false;
          this.$message.error(res.error);
        }
      });
    },
    // 获取权限列表
    getPermissions() {
      PERMISSION_API.getPermission().then((res) => {
        if (res.status == 200) {
          this.permissionsData = res.data;
        }
      });
    },
    // 获取菜单列表
    getMenus() {
      MENUS_API.getMenus().then((res) => {
        if (res.status == 200) {
          this.menusData = res.data;
        }
      });
    },
    // 搜索角色
    search() {
      this.rolesList();
    },
    // 重置
    reset() {
      this.adminName = "";
      this.rolesList();
    },
    // 编辑角色
    edit(val) {
      this.showEditPop = true;
      this.editParams = {
        roleName: val.name,
        permissions: this.permissionsData,
        menus: this.menusData,
      };
      this.editId = val.id;
      this.$nextTick(function () {
        this.$refs.editCodeTree.setCheckedNodes(val.permissions);
        this.$refs.editMenuTree.setCheckedNodes(val.menus);
      });
    },
    // 新增角色
    addStaff() {
      this.addParams = {
        roleName: "",
        permissions: this.permissionsData,
        menus: this.menusData,
      };
      this.showAddPop = true;
    },
    // 删除角色
    removeById(val) {
      this.$confirm("确认删除此角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ROLES_API.deleteRoles({}, val).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.rolesList();
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
    // 批量删除角色
    deleteMore() {
      let params = {
        ids: this.ids,
      };
      this.$confirm("确认删除选中的角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ROLES_API.deleteRoles(params).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.rolesList();
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
    // 批量删除时选中
    handleSelectionChange(val) {
      let temp = [];
      val.forEach((ele) => {
        temp.push(ele.id);
      });
      this.ids = temp;
    },
    extraBtnClick(type) {
      switch (type) {
        case 0:
          this.showAddPop = false;
          break;
        case 1:
          let params = {
            name: this.addParams.roleName,
            permission: this.getCurrentAddNode(),
            menu: this.getCurrentMenuNode(),
          };
          ROLES_API.addRoles(params).then((res) => {
            if (res.status == 200) {
              this.showAddPop = false;
              this.$message.success("添加成功");
              this.rolesList();
            }
            // 新增成功过后需要清空已选中的节点
            this.$refs.addCodeTree.setCheckedNodes([]);
            this.$refs.addMenuTree.setCheckedNodes([]);
          });
          break;
        case 2:
          this.showEditPop = false;
          break;
        case 3:
          let params_edit = {
            name: this.editParams.roleName,
            permission: this.getCurrentEditNode(),
            menu: this.getCurrentEditMenu(),
          };
          ROLES_API.editRoles(params_edit, this.editId).then((res) => {
            if (res.status == 200) {
              this.showEditPop = false;
              this.$message.success("修改成功");
              this.rolesList();
            }
            // 编辑成功过后需要清空已选中的节点
            this.$refs.editCodeTree.setCheckedNodes([]);
            this.$refs.editMenuTree.setCheckedNodes([]);
          });
          break;
        default:
          break;
      }
    },
    // 新增时获取已选中的节点
    getCurrentAddNode() {
      let data = this.$refs.addCodeTree.getCheckedNodes();
      let temp = [];
      data.forEach((item) => {
        temp.push(item.id);
      });
      return temp;
    },
    getCurrentMenuNode() {
      let data = this.$refs.addMenuTree.getCheckedNodes();
      let temp = [];
      data.forEach((item) => {
        temp.push(item.id);
      });
      return temp;
    },
    //编辑时获取已选中的节点
    getCurrentEditNode() {
      let data = this.$refs.editCodeTree.getCheckedNodes();
      let temp = [];
      data.forEach((item) => {
        temp.push(item.id);
      });
      return temp;
    },
    getCurrentEditMenu() {
      let data = this.$refs.editMenuTree.getCheckedNodes();
      let temp = [];
      data.forEach((item) => {
        temp.push(item.id);
      });
      return temp;
    },
    // watch pagesize change
    handleSizeChange(newSize) {
      this.listParams.pageSize = newSize;
      this.rolesList();
    },
    // watch page change
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.rolesList();
    },
    nextPage() {
      this.listParams.page++;
      this.rolesList();
    },
    prevPage() {
      this.listParams.page--;
      this.rolesList();
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
    border-radius: 10px;
    height: 80px;
    margin: 0px 20px 0 20px;
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
  .nameInput {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #dcdfe6;
    span {
      font-size: 16px;
      color: #333333;
      font-weight: 600;
    }
  }
  .permissions {
    .title {
      font-size: 14px;
      color: #666666;
      margin: 20px 0;
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
  .dialogBox {
    height: 400px;
    overflow: auto;
  }
}
</style>
