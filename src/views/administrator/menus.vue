<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">菜单列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="addStaff()"
            >新增菜单</el-button
          >
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
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          row-key="id"
          ref="persTable"
          :tree-props="{ children: 'sub', hasChildren: 'hasChildren' }"
        >
          >
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
              <el-button type="text" @click="editStaff(scope.row)"
                >编辑</el-button
              >
              <!-- delete -->
              <el-button type="text" @click="removeById(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>


      <!-- 新增菜单弹窗 -->
      <el-dialog
        title="新增菜单"
        :visible.sync="showAddPop"
        :close-on-click-modal="false"
        width="668px"
      >
        <el-form :model="addParams" 
                        :rules="addRules" 
                        ref="addParams" 
                        label-width="110px">
          <el-form-item label="菜单名称" prop="name">
            <el-input
              v-model="addParams.name"
              placeholder="请输入菜单名称"
              class="elInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" prop="pid">
            <el-select
              v-model="addParams.pid"
              class="elInput"
              placeholder="请选择上级菜单"
            >
              <el-option
                v-for="(item, index) in fixedData.pers"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单路由" prop="url">
            <el-input
              v-model="addParams.url"
              placeholder="请输入菜单路由"
              class="elInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单ICON" prop="icon" v-if="addParams.pid == 0">
            <el-select
              v-model="addParams.icon"
              class="elInput"
              placeholder="请选择菜单ICON"
            >
              <el-option
                v-for="(item, index) in fixedData.icons"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
                <div class="iconBox">
                  <span style="float: left">{{ item.name }}</span>
                  <i style="float: right; color: #8492a6; font-size: 24px; line-height:34px"
                    :class="item.name"
                  ></i>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
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

      <!-- 编辑菜单弹窗 -->
      <el-dialog
        title="编辑菜单"
        :visible.sync="showEditPop"
        :close-on-click-modal="false"
        width="668px"
      >
        <el-form :model="editParams" 
                        :rules="addRules" 
                        ref="editParams" 
                        label-width="110px">
          <el-form-item label="菜单名称" prop="name">
            <el-input
              v-model="editParams.name"
              placeholder="请输入菜单名称"
              class="elInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" prop="pid">
            <el-select
              v-model="editParams.pid"
              class="elInput"
              placeholder="请选择上级菜单"
            >
              <el-option
                v-for="(item, index) in fixedData.pers"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单路由" prop="url">
            <el-input
              v-model="editParams.url"
              placeholder="请输入菜单路由"
              class="elInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单ICON" prop="icon" v-if="editParams.pid == 0">
            <el-select
              v-model="editParams.icon"
              class="elInput"
              placeholder="请选择菜单ICON"
            >
              <el-option
                v-for="(item, index) in fixedData.icons"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
                <div class="iconBox">
                  <span style="float: left">{{ item.name }}</span>
                  <i style="float: right; color: #8492a6; font-size: 24px; line-height:34px"
                    :class="item.name"
                  ></i>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
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
import { OpenLoading } from "@/utils/utils.js";
import navBar from "@/components/navBar/navBar";
import { renderTime } from "@/utils/function.js";
// api
import { MENUS_API } from "@/api/menus";
export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/administrator",
          title: "菜单管理",
        },
        {
          title: "菜单管理",
        },
      ],
      title: "菜单管理",
      // 表格数据
      tHeadList: [
        { label: "菜单名称", prop: "name" },
        { label: "父级菜单", prop: "pid" },
        { label: "创建时间", prop: "created_at" },
      ],
      viewsList: [],
      searchData: {
        viewsList_searchLoading: true,
      },
      // 新增菜单的弹窗中的数据
      fixedData: {
        pers: [
          {
            name: "无", //标题（菜单）
            url: "", //菜单名称
            id: 0, //上级菜单id
          },
        ],
        icons: [
          { id: 0, name: "el-icon-user-solid" },
          { id: 1, name: "el-icon-s-check" },
          { id: 2, name: "el-icon-menu" },
          { id: 3, name: "el-icon-s-finance" },
          { id: 4, name: "el-icon-s-cooperation" },
          { id: 5, name: "el-icon-phone" },
          { id: 6, name: "el-icon-s-tools" },
          { id: 7, name: "el-icon-s-goods" },
          { id: 8, name: "el-icon-video-camera-solid" },
          { id: 9, name: "el-icon-s-flag" },
          { id: 10, name: "el-icon-s-shop" },
          { id: 11, name: "el-icon-s-data" },
          { id: 12, name: "el-icon-s-grid" },
          { id: 13, name: "el-icon-s-ticket" },
          { id: 14, name: "el-icon-s-home" },
          { id: 15, name: "el-icon-s-order" },
        ],
      },
      addParams: {
        name: "",
        url: "", //
        pid: 0, //上级菜单id
        icon: "",
      },
      addRules: {
        name:[
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        pid:[
          { required: true, message: '请选择上级菜单', trigger: 'change' },
        ],
        url:[
          { required: true, message: '请输入菜单路由', trigger: 'blur' },
        ],
        icon:[
          { required: true, message: '请选择菜单ICON', trigger: 'change' },
        ]
      },
      showAddPop: false, //是否显示弹窗
      menusData: [],
      // 编辑菜单的弹窗
      showEditPop: false,
      editParams: {
        name: "",
        url: "", //
        pid: 0, //上级菜单id
        icon: "",
      },
      editId: "", //编辑时选中的id
      // 批量删除的角色id
      ids: [],
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    this.getMenus();
  },
  methods: {
    // 获取菜单列表
    getMenus() {
      this.searchData.viewsList_searchLoading = true;
      MENUS_API.getMenus().then((res) => {
        if (res.status == 200) {
          this.searchData.viewsList_searchLoading = false;
          this.menusData = res.data;
          this.viewsList = res.data;
          let resArr = [];
          this.fixedData.pers = [
            {
              name: "无", //标题（菜单）
              url: "", //菜单名称
              id: 0, //上级菜单id
            },
          ];
          this.recursive(res.data, resArr);
          this.fixedData.pers = [...this.fixedData.pers, ...resArr];
        }else{
          this.$message.error('菜单列表获取失败！')
          this.searchData.viewsList_searchLoading = false;
        }
      });
    },
    // 递归遍历生成新数组
    recursive(array, resData) {
      array.forEach((item) => {
        item.created_at = renderTime(item.created_at);
        resData.push(item);
        if (Array.isArray(item.sub) && item.sub.length > 0) {
          this.recursive(item.sub, resData);
        }
      });
    },
    // 新增菜单
    addStaff() {
      this.addParams = {
        name: "",
        url: "", //
        pid: 0, //上级菜单id
        icon:""
      };
      this.showAddPop = true;
    },
    // 编辑菜单
    editStaff(val) {
      this.editParams = {
        name: val.name, //标题（菜单）
        url: val.url, //菜单名称
        pid: val.pid, //上级菜单id
        icon: val.icon
      };
      this.editId = val.id;
      this.showEditPop = true;
    },
    // 删除菜单
    removeById(val) {
      let message =
        val.sub.length > 0
          ? "删除此菜单，其子菜单也会删除，确认删除？"
          : "确认删除此菜单?";
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
        .then(() => {
          const loading = OpenLoading(this, 1)
          MENUS_API.deleteMenu({}, val.id).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getMenus();
            } else {
              this.$message.error("删除失败！");
            }
            loading.close()
            clearTimeout(this.overloading)  
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量删除菜单
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
          const loading = OpenLoading(this, 1)
          ROLES_API.deleteRoles(params).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.rolesList();
            } else {
              this.$message.error(res.error.message);
            }
            loading.close()
            clearTimeout(this.overloading)
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
      val.forEach((item) => {
        if (item.sub.length > 0) {
          item.sub.forEach((ele) => {
            this.$refs.persTable.toggleRowSelection(ele, true);
          });
        }
      });
      // console.log(val)
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
          this.$refs.addParams.validate(valid => {
            if(valid){
              const loading = OpenLoading(this, 1)
              MENUS_API.addMenu(this.addParams).then((res) => {
                if (res.status == 200) {
                  this.showAddPop = false;
                  this.$message.success("添加成功");
                  this.getMenus();
                } else {
                  this.$message.error("添加失败！");
                }
                loading.close()
                clearTimeout(this.overloading)
              });
            }
          })
        break;
        case 2:
          this.showEditPop = false;
          break;
        case 3:
          this.$refs.editParams.validate(valid => {
            if(valid){
              const loading = OpenLoading(this, 1)
              MENUS_API.editMenu(this.editParams, this.editId).then((res) => {
                if (res.status == 200) {
                  this.showEditPop = false;
                  this.$message.success("修改成功");
                  this.getMenus();
                } else {
                  this.$message.error("修改失败！");
                }
                loading.close()
                clearTimeout(this.overloading)
              });
            }
          })
        break;
        default:
          break;
      }
    },
    // watch pagesize change
    handleSizeChange(newSize) {},
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

  .iconBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    div{
      height: 34px;
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
}
</style>
