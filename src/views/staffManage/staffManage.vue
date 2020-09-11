<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <div class="menuList">
      <ul>
        <li
          v-for="(item,index) in menuList"
          :key="index"
          :class="index == curIndex ? 'active' : ''"
          @click="changeStatus(index,item.status)"
        >
          <div class="index"></div>
          <div class="menuName">{{item.name}}</div>
          <div class="count">({{item.val}})</div>
        </li>
      </ul>
    </div>

    <!-- 搜索框 -->
    <el-card class="searchCard">
      <div class="serchBox">
        <el-input
          v-model="adminName"
          placeholder="请输入员工姓名"
          clearable
          style="width: 360px;margin-right: 20px;border-radius: 4px;"
          @clear="getAdmins()"
        ></el-input>
        <el-select v-model="status" placeholder="请选择状态" style="width: 360px;border-radius: 4px;">
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
        <el-button id="secondary" class="secondary" size="medium">重置</el-button>
      </div>
    </el-card>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">员工列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="addStaff()">新增员工</el-button>
          <el-button class="btn p40">批量导入</el-button>
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
          <el-table-column label="OA账号" prop="proof_state" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.proof_state === 0" :style="scope.row.proof_state | color">已开通</span>
              <span
                v-else-if="scope.row.proof_state === 1"
                :style="scope.row.proof_state | color"
              >未开通</span>
              <span v-else :style="scope.row.proof_state | color">已停用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <!-- column -->
              <!-- screen -->
              <el-button
                type="text"
                @click="$router.push({path:'/staffMsg'})"
              >查看</el-button>
              <!-- edit -->
              <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
              <!-- use -->
              <el-button type="text" @click="use(scope.row.id)">使用</el-button>
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
    </el-card>
  </div>
</template>

<script>
import http from "../../utils/request";
import configUrl from "../../api/configUrl";
import navBar from '@/components/navBar/navBar'
export default {
  filters: {
    color(val) {
      switch (val) {
        case 0:
          return `color:#6DD400;`;
          break;
        case 1:
          return `color:#F56C6C;`;
          break;
        default:
          return `color:#CCCCCC;`;
          break;
      }
    },
  },
  data() {
    return {
      // 面包屑
      breadList:[
        {
          path: "/",
          title: "首页",
        },
        {
          title: "员工管理",
        },
        {
          title: "员工列表",
        },
      ],
      title:'员工管理',
      menuList: [
        { name: "在职", val: 0, status: 0 },
        { name: "离职", val: 0, status: 3 },
        { name: "正式", val: 0, status: 2 },
        { name: "试用", val: 0, status: 1 },
      ],
      curIndex: 0,
      // 搜索框
      adminName: "",
      status: "",
      adStatus: [
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
        { label: "员工姓名", prop: "name" },
        { label: "工号", prop: "job_number" },
        { label: "部门", prop: "department_id" },
        { label: "职位", prop: "position_id" },
        { label: "员工状态", prop: "status" },
        { label: "入职日期", prop: "entry_time" },
        { label: "转正日期", prop: "positive_time" },
      ],
      viewsList: [
        {
          proof_num: "2019第一期",
          proof_font: "借 12198",
          proof_person: "张三",
          proof_entry_time: "2015-06-06",
          proof_last_change_time: "2015-09-09",
          proof_amount: 19008.0,
          proof_state: 0,
          id: 0,
        },
        {
          proof_num: "2019第二期",
          proof_font: "字 12198",
          proof_person: "李四",
          proof_entry_time: "2015-09-06",
          proof_last_change_time: "2015-11-09",
          proof_amount: 12008.98,
          proof_state: 1,
          id: 1,
        },
        {
          proof_num: "2019第三期",
          proof_font: "号 12345",
          proof_person: "晚五",
          proof_entry_time: "2018-06-06",
          proof_last_change_time: "2019-09-09",
          proof_amount: 9800.12,
          proof_state: 2,
          id: 2,
        },
        {
          proof_num: "2019第四期",
          proof_font: "号 98765",
          proof_person: "赵六",
          proof_entry_time: "2016-06-06",
          proof_last_change_time: "2016-09-09",
          proof_amount: 123.12,
          proof_state: 3,
          id: 3,
        },
      ],
      total: 4,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    // this.getUserInfo();
    // this.getStaffList();
  },
  methods: {
    // 顶部菜单选择
    changeStatus(index, status) {
      this.curIndex = index;
    },
    getUserInfo() {
      http.GET(configUrl.getUserInfo).then((res) => {});
    },
    // 获取员工列表
    getStaffList() {
      http.POST(configUrl.getStaffList).then((res) => {
        console.log(res);
      });
    },
    // 新增员工
    addStaff(){
      this.$router.push({
        path:'/staffAdd'
      })
    },
    // watch pagesize change
    handleSizeChange(newSize) {},

    // watch page change
    handleCurrentChange(newPage) {},
  },
  components: {
    navBar
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  height: 100%;
  .navBox{
    margin-bottom: 0!important;
  }
  .menuList {
    width: 100%;
    background: #fff;
    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 20px;
      li {
        position: relative;
        cursor: pointer;
        width: 80px;
        height: 40px;
        font-size: 14px;
        margin: 0 20px;
        color: #999999;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &:first-child {
          margin-left: 0;
        }
        &::after {
          display: block;
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 4px;
          width: 100%;
        }
        .index {
          width: 14px;
          height: 14px;
          border-radius: 100%;
          background: #999;
        }
        .menuName {
          line-height: 40px;
        }
        &.active {
          .index {
            background: #409efd;
          }
          .menuName,
          .count {
            color: #409efd;
          }
          &::after {
            background: #409efd;
          }
        }
      }
    }
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
</style>
