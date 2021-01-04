<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">权限列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="addStaff()"
            >新增权限</el-button
          >
          <!-- <el-button class="btn p40" @click="deleteMore()">批量删除</el-button> -->
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
          :height="tableHeight"
        >
          >
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
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

      <!-- 分页区域 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @next-click="nextPage"
        @prev-click="prevPage"
        :current-page="listParams.page"
        :page-sizes="[10, 20, 50]"
        :page-size="listParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin:10px 0; float: right"
      ></el-pagination> -->

      <!-- 新增权限弹窗 -->
      <el-dialog
        :visible.sync="showAddPop"
        :close-on-click-modal="false"
        width="600px"
        top="20vh"
        center
      >
        <div class="nameInput">
          <span>权限名称</span>
          <el-input
            v-model="addParams.title"
            placeholder="请输入权限名称"
            class="elInput"
          ></el-input>
        </div>
        <div class="nameInput">
          <span class="title">上级权限</span>
          <el-select
            v-model="addParams.pid"
            class="elInput"
            placeholder="请选择上级权限"
          >
            <el-option
              v-for="(item, index) in fixedData.pers"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nameInput">
          <span>标题</span>
          <el-input
            v-model="addParams.name"
            placeholder="请输入标题"
            class="elInput"
          ></el-input>
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

      <!-- 编辑权限弹窗 -->
      <el-dialog
        :visible.sync="showEditPop"
        :close-on-click-modal="false"
        width="600px"
        top="20vh"
        center
      >
        <div class="nameInput">
          <span>权限名称</span>
          <el-input
            v-model="editParams.title"
            placeholder="请输入权限名称"
            class="elInput"
          ></el-input>
        </div>
        <div class="nameInput">
          <span class="title">上级权限</span>
          <el-select
            v-model="editParams.pid"
            class="elInput"
            placeholder="请选择上级权限"
          >
            <el-option
              v-for="(item, index) in fixedData.pers"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="nameInput">
          <span>标题</span>
          <el-input
            v-model="editParams.name"
            placeholder="请输入标题"
            class="elInput"
          ></el-input>
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
          title: "权限配置",
        },
      ],
      title: "权限配置",
      tableHeight: 500,
      // 表格数据
      tHeadList: [
        { label: "权限名称", prop: "name" },
        { label: "上级权限", prop: "ptitle" },
        { label: "标题", prop: "title" },
        { label: "创建时间", prop: "created_at" },
      ],
      viewsList: [],
      searchData: {
        viewsList_searchLoading: true,
      },
      // 新增权限的弹窗中的数据
      fixedData: {
        pers: [
          {
            name: "无", //标题（权限）
            title: "无", //权限名称
            id: 0, //上级权限id
          },
        ],
      },
      addParams: {
        name: "", //标题（权限）
        title: "", //权限名称
        pid: 0, //上级权限id
      },
      showAddPop: false, //是否显示弹窗
      permissionsData: [],
      // 编辑权限的弹窗
      showEditPop: false,
      editParams: {
        name: "", //标题（权限）
        title: "", //权限名称
        pid: "", //上级权限id
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
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - this.$refs.persTable.$el.offsetTop - 50;
      // console.log( this.tableHeight)
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.persTable.$el.offsetTop - 50
      }
    })  
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
    
    this.getPermissions();
  },
  methods: {
    // 获取权限列表
    getPermissions() {
      this.searchData.viewsList_searchLoading = true;
      PERMISSION_API.getPermission().then((res) => {
        if (res.status == 200) {
          this.searchData.viewsList_searchLoading = false;
          this.permissionsData = res.data;
          let resArr = [];
          this.fixedData.pers = [
            {
              name: "无", //标题（权限）
              title: "无", //权限名称
              id: 0, //上级权限id
            },
          ];
          this.recursive(res.data, resArr);
          this.fixedData.pers = [...this.fixedData.pers, ...resArr];
          this.viewsList = res.data;
        }else{
          this.$message.error('权限列表获取失败！')
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
    // 新增权限
    addStaff() {
      this.addParams = {
        name: "", //标题（权限）
        title: "", //权限名称
        pid: "", //上级权限id
      };
      this.showAddPop = true;
    },
    // 编辑权限
    editStaff(val) {
      this.editParams = {
        name: val.name, //标题（权限）
        title: val.title, //权限名称
        pid: val.pid, //上级权限id
      };
      this.editId = val.id;
      this.showEditPop = true;
    },
    // 删除权限
    removeById(val) {
      let message =
        val.sub.length > 0
          ? "删除此权限，其子权限也会删除，确认删除？"
          : "确认删除此权限?";
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
        .then(() => {
          PERMISSION_API.deletePermission({}, val.id).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getPermissions();
            } else {
              this.$message.error("删除失败！");
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
    // 批量删除权限
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
          PERMISSION_API.addPermission(this.addParams).then((res) => {
            if (res.status == 200) {
              this.showAddPop = false;
              this.$message.success("添加成功");
              this.getPermissions();
            } else {
              this.$message.error("添加失败！");
            }
          });
          break;
        case 2:
          this.showEditPop = false;
          break;
        case 3:
          PERMISSION_API.editPermission(this.editParams, this.editId).then(
            (res) => {
              if (res.status == 200) {
                this.showEditPop = false;
                this.$message.success("修改成功");
                this.getPermissions();
              } else {
                this.$message.error("修改失败！");
              }
            }
          );
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
