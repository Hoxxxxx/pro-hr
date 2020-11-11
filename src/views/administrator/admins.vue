<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <!-- 搜索框 -->
    <el-card class="searchCard">
      <div class="serchBox">
        <el-input
          v-model="adminName"
          placeholder="请输入员工姓名"
          clearable
          style="width: 360px; margin-right: 20px; border-radius: 4px"
        ></el-input>
        <el-select
          v-model="status"
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
        <el-button type="primary" size="medium">搜索</el-button>
        <el-button id="secondary" class="secondary" size="medium"
          >重置</el-button
        >
      </div>
    </el-card>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">管理员列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="addStaff()"
            >新增管理员</el-button
          >
          <el-button class="btn p40">批量删除</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          style="width: 100%"
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
                v-for="(i, index) in scope.row.position"
                :key="index"
                style="margin: 0 10px"
                >{{ i.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="department" align="center">
            <template slot-scope="scope">
              <span
                v-for="(i, index) in scope.row.department"
                :key="index"
                style="margin: 0 10px"
                >{{ i.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="角色"
            prop="ro_name"
            align="center"
          ></el-table-column>
          <el-table-column label="状态" align="center" prop="admin_status">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.admin_status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <!-- edit -->
              <el-button type="text" @click="edit(scope.row.id)"
                >编辑</el-button
              >
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
        :page-sizes="[10, 20, 50]"
        :page-size="listParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 20px; margin-bottom: 20px; float: right"
      ></el-pagination>

      <!-- 新增管理员弹窗 -->
      <el-dialog :visible.sync="showAddPop" width="25%" top="35vh" center>
        <ul class="popExtraList">
          <li>
            <span>选择员工</span>
            <el-select
              v-model="staff"
              placeholder="请选择员工"
              style="flex: 1 1 auto"
            >
              <el-option
                v-for="i in staffList"
                :key="i.value"
                :label="i.name"
                :value="i.id"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>选择角色</span>
            <el-select
              v-model="role"
              placeholder="请选择角色"
              style="flex: 1 1 auto"
            >
              <el-option
                v-for="i in roles"
                :key="i.value"
                :label="i.name"
                :value="i.id"
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
    </el-card>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
// api
import {ADMINS_API} from "@/api/adminsApi";
import {ROLES_API} from '@/api/rolesApi'
import {STAFFS_API} from '@/api/staffsApi'
export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/administrator",
          title: "管理员管理",
        },
        {
          title: "管理员列表",
        },
      ],
      title: "管理员列表",

      // 搜索框
      adminName: "",
      status: "",
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
      staffList: [],
      staff: "",
      roles: [],
      role: "",
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    this.getAdmins()
    this.getUsers();
    this.rolesList();
    this.getAdminsList();
  },
  methods: {
    // 获取所有员工
    getUsers() {
      let params = {
        page: 1
      };
      STAFFS_API.getStaffs(params).then(res=>{
        if (res.status == 200) {
          this.staffList = res.data[0].data;
        }else{
          this.$message.error(res.error)
        }
      })
    },
    // 获取角色列表
    rolesList() {
      ROLES_API.getRoles().then(res=>{
        if(res.status == 200){
          this.roles = res.data;
        }else{
          this.$message.error(res.error)
        }
      })
    },
    // 获取管理员列表
    getAdminsList() {
      let params = {
        page: 1,
      };
      ADMINS_API.getAdmins(params).then((res) => {
        if (res.status == 200) {
          this.viewsList = res.data;
          this.total = res.pagination.total;
        }else{
          this.$message.error(res.error)
        }
      });
    },
    // 查看某个管理员
    getAdmins() {
      let id = 4;
      ADMINS_API.getAdmins({},id).then((res) => {
        console.log(res);
      });
    },
    // 新增管理员
    addStaff() {
      this.showAddPop = true;
    },
    extraBtnClick(type) {
      this.showAddPop = false;
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
