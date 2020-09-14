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
          <el-button class="btn p40">批量删除</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          style="width: 100%"
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
      <el-dialog :visible.sync="showAddPop" width="26%" top="20vh" center>
        <div class="nameInput">
          <span>角色名称</span>
          <el-input v-model="roleName" placeholder="请输入角色名称" style="width:350px"></el-input>
        </div>
        <div class="permissions">
          <div class="title">角色权限</div>
          <el-tree
            :data="permissionsData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
          ></el-tree>
        </div>
        <div class="extraBtns">
          <div>
            <el-button style="width:95px;" @click="extraBtnClick(0)">取 消</el-button>
            <el-button style="width:95px;" @click="extraBtnClick(1)" type="primary">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import http from "../../utils/request";
import configUrl from "../../api/configUrl";
import navBar from "@/components/navBar/navBar";
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
        { label: "创建时间", prop: "job_number" },
        { label: "修改时间", prop: "department_id" },
      ],
      viewsList: [
        {
          name: "tom",
          job_number: "主管",
          department_id: "研发",
        },
        {
          name: "lisa",
          job_number: "主管",
          department_id: "研发",
        },
        {
          name: "paul",
          job_number: "主管",
          department_id: "研发",
        },
        {
          name: "jerry",
          job_number: "主管",
          department_id: "研发",
        },
      ],
      // 新增角色的弹窗中的数据
      roleName: "",
      showAddPop: false, //是否显示弹窗
      permissionsData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 分页
      total: 4,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    // this.getUserInfo();
    // this.getStaffList();
  },
  methods: {
    getUserInfo() {
      http.GET(configUrl.getUserInfo).then((res) => {});
    },
    // 获取员工列表
    getStaffList() {
      http.POST(configUrl.getStaffList).then((res) => {
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
