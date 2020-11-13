<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <!-- 搜索框 -->
    <el-card class="searchCard">
      <div class="serchBox">
        <el-select
          v-model="roleChoosed"
          placeholder="请选择角色"
          style="width: 360px;border-radius: 4px;"
        >
          <el-option
            v-for="item in roleType"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="btnBox">
        <el-button type="primary" size="medium">搜索</el-button>
        <el-button id="secondary" class="secondary" size="medium">重置</el-button>
      </div>
    </el-card>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">角色列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="addStaff()">新增角色</el-button>
          <el-button class="btn p40" @click="deleteMore()">批量删除</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
          :cell-style="{background:'#FCFDFF',color:'#666666'}"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="(item,index) in tHeadList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <!-- edit -->
              <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
              <!-- delete -->
              <el-button type="text" @click="removeById(scope.row.id)">删除</el-button>
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
        style="margin-top: 20px; margin-bottom: 20px; float: right"
      ></el-pagination>

      <!-- 新增管理员弹窗 -->
      <el-dialog :visible.sync="showAddPop" :close-on-click-modal="false" width="600px" top="20vh" center>
        <div class="nameInput">
          <span>角色名称</span>
          <el-input v-model="roleName" placeholder="请输入角色名称" class="elInput"></el-input>
        </div>
        <div class="permissions">
          <div class="title">角色权限</div>
          <el-tree
            :data="permissionsData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :label="title"
          ></el-tree>
        </div>
        <div class="extraBtns">
          <div>
            <el-button style="width:95px;" @click="extraBtnClick(0)">取 消</el-button>
            <el-button style="width:95px;" @click="extraBtnClick(1)" type="primary">确 定</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 编辑管理员弹窗 -->
      <el-dialog :visible.sync="showEditPop" :close-on-click-modal="false" width="600px" top="20vh" center>
        <div class="nameInput">
          <span>角色名称</span>
          <el-input v-model="roleName" placeholder="请输入角色名称" class="elInput"></el-input>
        </div>
        <div class="permissions">
          <div class="title">角色权限</div>
          <el-tree
            :data="permissionsData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :label="title"
          ></el-tree>
        </div>
        <div class="extraBtns">
          <div>
            <el-button style="width:95px;" @click="extraBtnClick(2)">取 消</el-button>
            <el-button style="width:95px;" @click="extraBtnClick(3)" type="primary">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import {renderTime} from '@/utils/function.js'
// api
import { PERMISSION_API } from "@/api/permission";
import { ROLES_API } from "@/api/rolesApi";
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

      // 搜索框
      adminName: "",
      roleChoosed: "",
      roleType: [
        {
          lable: "离职",
          value: 3,
        },
        {
          lable: "正式",
          value: 2,
        },
        {
          lable: "试用",
          value: 1,
        },
      ],
      tHeadList: [
        { label: "角色名称", prop: "name" },
        { label: "创建时间", prop: "created_at" },
        { label: "修改时间", prop: "updated_at" },
      ],
      viewsList: [],
      // 新增角色的弹窗中的数据
      roleName: "",
      showAddPop: false, //是否显示弹窗
      permissionsData: [
        // {
        //   id: 1,
        //   label: "一级 1",
        //   children: [
        //     {
        //       id: 4,
        //       label: "二级 1-1",
        //       children: [
        //         {
        //           id: 9,
        //           label: "三级 1-1-1",
        //         },
        //         {
        //           id: 10,
        //           label: "三级 1-1-2",
        //         },
        //       ],
        //     },
        //   ],
        // }
      ],
      defaultProps: {
        children: "sub",
        label: "title",
      },
      // 批量删除的角色id
      ids:[],
      // 编辑角色弹窗
      showEditPop:false,
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    this.rolesList();
    // this.getStaffList();
    this.getPermissions()
  },
  methods: {
    // 获取角色列表
    rolesList() {
      ROLES_API.getRoles().then((res) => {
        if (res.status == 200) {
          res.data.forEach(item=>{
            item.created_at=renderTime(item.created_at)
            item.updated_at=renderTime(item.updated_at)
          })
          this.viewsList = res.data;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // 获取员工列表
    getStaffList() {
      http.POST(configUrl.getStaffList).then((res) => {
        console.log(res);
      });
    },
    getPermissions(){
      PERMISSION_API.getPermission().then(res=>{
        if(res.status == 200){
          this.permissionsData = res.data
        }
      })
    },
    // 编辑角色
    edit(){
      this.showEditPop = true
    },
    // 新增角色
    addStaff() {
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
          this.showAddPop = false;
          break;
        case 2:
          this.showEditPop = false;
          break;
        case 3:
          this.showEditPop = false;
          break;
        default:
          break;
      }
    },
    // watch pagesize change
    handleSizeChange(newSize) {},

    // watch page change
    handleCurrentChange(newPage) {},
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" scoped>
@import url('../../assets/style/public.less');
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
  .nameInput {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #DCDFE6;
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
