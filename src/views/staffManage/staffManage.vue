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
        <el-button type="primary" size="medium" @click="search(0)">搜索</el-button>
        <el-button class="secondary" size="medium" @click="search(1)">重置</el-button>
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
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="姓名" prop="name"></el-table-column>
          <el-table-column align="center" label="工号" prop="job_number"></el-table-column>
          <el-table-column align="center" label="部门" prop="department">
            <template slot-scope="scope">
              <span
                v-for="(i,index) in scope.row.department"
                :key="index"
                style="margin:0 10px;"
              >{{i.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="职位" prop="position">
            <template slot-scope="scope">
              <span
                v-for="(i,index) in scope.row.position"
                :key="index"
                style="margin:0 10px;"
              >{{i.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="员工状态" prop="status">
            <template slot-scope="scope">
              <span>{{scope.row.status == 1 ? '试用': (scope.row.status == 2 ? '正式' : (scope.row.status == 3 ? '离职':'在职'))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号" prop="mobile"></el-table-column>
          <el-table-column align="center" label="入职日期" prop="entry_time"></el-table-column>
          <el-table-column align="center" label="转正日期" prop="positive_time"></el-table-column>
          <el-table-column label="账号状态" prop="ac_open_status" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.ac_open_status == 0"
                :style="scope.row.ac_open_status | color"
              >未开通</span>
              <span
                v-else-if="scope.row.ac_open_status == 1"
                :style="scope.row.ac_open_status | color"
              >已开通</span>
              <span v-else :style="scope.row.ac_open_status | color">已停用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.id)">查看</el-button>
              <el-button type="text" v-if="scope.row.status == 1 && scope.row.ac_open_status !=2" @click="positive(scope.row.id)">转正</el-button>
              <el-button type="text" v-if="scope.row.status !=3 && scope.row.ac_open_status !=2" @click="openDialog('departure',scope.row.id)">离职</el-button>
              <el-button type="text" @click="openDialog('remove',scope.row.id)">删除</el-button>
              <el-button type="text" v-if="scope.row.status !=3 && scope.row.ac_open_status ==0" @click="openDialog('openUse',scope.row.id)">开通账号</el-button>
              <el-button type="text" v-if="scope.row.ac_open_status == 1" @click="openDialog('stopUse',scope.row.id)">停用账号</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 新增管理员弹窗 -->
      <el-dialog :visible.sync="showDialog" width="30%" center>
        <div class="deleteMsg" v-if="dialogType == 'remove'">确定要删除该条数据？</div>
        <div class="stopUse" v-if="dialogType == 'stopUse'">
          <span>确定停用该员工的账号？</span>
          <span>确认后该员工不可使用账号登录进入系统</span>
        </div>
        <div class="openUse" v-if="dialogType == 'openUse'">
          <ul class="popExtraList">
            <li>
              <span>账号名称：</span>
              <el-input style="width:300px" placeholder="请输入账号名称" v-model="name_openUse"></el-input>
              <span class="tips" v-if="name_openUse ==''">*请输入账号</span>
            </li>
            <li>
              <span>密码：</span>
              <el-input style="width:300px" placeholder="请输入密码" show-password v-model="pwd_openUse"></el-input>
              <span class="tips" v-if="pwd_openUse ==''">*请输入密码</span>
            </li>
            <li>
              <span>职位：</span>
              <div class="msgInput">
                <span v-for="(i,idx) in job_openUse" :key="idx">{{i.name}}</span>
              </div>
            </li>
            <li>
              <span>部门：</span>
              <div class="msgInput">
                <span v-for="(i,idx) in depart_openUse" :key="idx">{{i.name}}</span>
              </div>
            </li>
            <li>
              <span>公司：</span>
              <div class="msgInput">
                <span v-for="(i,idx) in company_openUse" :key="idx">{{i}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="departure" v-if="dialogType == 'departure'">
          <ul class="popExtraList">
            <li>
              <span>离职类型：</span>
              <el-select style="width:300px" v-model="depart" placeholder="请选择离职类型" class="elInput">
                <el-option
                  v-for="item in depart_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>离职日期：</span>
              <el-date-picker
                v-model="departTime"
                type="date"
                placeholder="选择离职日期："
                class="elInput"
                style="width:300px"
              ></el-date-picker>
            </li>
            <li>
              <span>离职原因：</span>
              <el-input
                type="textarea"
                style="width:300px"
                autosize
                placeholder="请输入离职原因"
                v-model="departReason"
              ></el-input>
            </li>
          </ul>
        </div>
        <div class="extraBtns">
          <div>
            <el-button style="width:95px;" @click="extraBtnClick(0)">取 消</el-button>
            <el-button style="width:95px;" @click="extraBtnClick(1)" type="primary">确 定</el-button>
          </div>
        </div>
      </el-dialog>

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
import navBar from "@/components/navBar/navBar";
export default {
  filters: {
    color(val) {
      switch (val) {
        case 0:
          return `color:#F56C6C;`;
          break;
        case 1:
          return `color:#6DD400;`;
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
      breadList: [
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
      title: "员工管理",
      menuList: [
        { name: "在职", val: 0, status: 0 },
        { name: "离职", val: 0, status: 3 },
        { name: "正式", val: 0, status: 2 },
        { name: "试用", val: 0, status: 1 },
      ],
      curIndex: 0,
      // 搜索框
      adminName: "",
      status: null,
      adStatus: [
        {
          lable: "未开通",
          value: 0,
        },
        {
          lable: "已开通",
          value: 1,
        },
        {
          lable: "已停用",
          value: 2,
        },
      ],
      listType: 0, //数据类型：3：离职、2：正式、1：试用、0：在职
      viewsList: [],
      showDialog: false,
      dialogType: "",
      // 开通账号相关数据
      name_openUse: "",
      pwd_openUse: "",
      job_openUse: "",
      depart_openUse: "",
      company_openUse: "",
      // 离职相关数据
      depart_options: [
        {
          value: 0,
          label: "主动离职",
        },
        {
          value: 1,
          label: "被动离职",
        },
        {
          value: 2,
          label: "退休",
        },
      ],
      depart: "", //离职类型
      departTime: "", //离职时间
      departReason: "", //离职原因
      tempId: "", //存放列表中需要执行某个操作时点击的某一项
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    this.getStaffList();
    this.staffCount();
  },
  methods: {
    // 顶部菜单选择
    changeStatus(index, status) {
      this.curIndex = index;
      this.listType = status;
      this.getStaffList();
    },
    // 搜索
    search(type) {
      if(type == 0){
        this.getStaffList(this.adminName, this.status);
      }else{
        this.status = null;
        this.adminName = ''
        this.getStaffList();
      }
    },
    // 获取员工列表
    getStaffList(adminName, status) {
      let params = {
        page: this.listParams.page,
        type: this.listType,
      };
      if (adminName) {
        params.name = adminName;
      } else if (status) {
        params.status = status;
      }
      http.GET(configUrl.getStaffList, params).then((res) => {
        this.viewsList = res.data.users.data;
        this.total = res.data.users.total;
      });
    },
    // 新增员工
    addStaff() {
      this.$router.push({
        path: "/staffAdd",
      });
    },
    openDialog(type, val) {
      this.showDialog = true;
      this.dialogType = type;
      this.tempId = val;
      switch (type) {
        case "remove":
          break;
        case "stopUse":
          break;
        case "openUse":
          for (let i = 0, len = this.viewsList.length; i < len; i++) {
            if (this.viewsList[i].id == this.tempId) {
              console.log(this.viewsList[i]);
              this.job_openUse = this.viewsList[i].position;
              this.depart_openUse = this.viewsList[i].department;
              this.company_openUse = this.viewsList[i].company;
            }
          }
          break;
        case "departure":
          break;
        default:
          break;
      }
    },
    extraBtnClick(type) {
      if (type == 1) {
        switch (this.dialogType) {
          case "remove":
            this.deleteStaff();
            this.showDialog = false;
            break;
          case "stopUse":
            this.closeAccount();
            this.showDialog = false;
            break;
          case "openUse":
            if (this.name_openUse != "" && this.pwd_openUse != "") {
              this.openAccount();
              this.showDialog = false;
            }
            break;
          case "departure":
            this.departure()
            this.showDialog = false;
            break;
          default:
            break;
        }
      }else{
        this.showDialog = false;
      }
    },
    // 查看
    view(val){
      this.$router.push({
        path:'/staffMsg',
        query:{
          id:val
        }
      })
    },
    // 删除员工
    deleteStaff() {
      let params = {
        id: this.tempId,
      };
      http.DELETE(configUrl.deleteStaff, params.id).then((res) => {
        console.log(res);
        if (res.status == 0) {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.getStaffList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 离职
    departure(){
      let that = this;
      let params={
        uid:this.tempId,
        turnover_type:this.depart,
        turnover_time:this.departTime,
        turnover_reason:this.departReason
      }
      http.POST(configUrl.departure,params).then(res=>{
        if (res.status == 0) {
          setTimeout(function () {
            that.$message({
              message: "离职成功！",
              type: "success",
            });
          }, 500);
          this.getStaffList();
          this.staffCount();
        } else {
          setTimeout(function () {
            that.$message({
              message: res.msg,
              type: "warning",
            });
          }, 500);
        }
      })
    },
    // 转正
    positive(val){
      
    },
    // 开通账号
    openAccount() {
      let that = this;
      let params = {
        id: this.tempId,
        account_name: this.name_openUse,
        password: this.pwd_openUse,
      };
      http.POST(`/api/users/${params.id}/openAccount`, params).then((res) => {
        if (res.status == 0) {
          setTimeout(function () {
            that.$message({
              message: "开通成功！",
              type: "success",
            });
          }, 500);
          this.getStaffList();
        } else {
          setTimeout(function () {
            that.$message({
              message: res.msg,
              type: "warning",
            });
          }, 500);
        }
      });
    },
    // 停用账号
    closeAccount(){
      let that = this;
      http.PUT(`/api/users/${this.tempId}/forbidAccount`).then(res=>{
        if (res.status == 0) {
          setTimeout(function () {
            that.$message({
              message: "停用成功！",
              type: "success",
            });
          }, 500);
          this.getStaffList();
        } else {
          setTimeout(function () {
            that.$message({
              message: res.msg,
              type: "warning",
            });
          }, 500);
        }
      })
    },
    // 分类人数统计
    staffCount() {
      http.GET(configUrl.staffCount).then((res) => {
        let temp = this.menuList;
        for (let i = 0, len = temp.length; i < len; i++) {
          switch (temp[i].status) {
            case 0:
              temp[i].val = res.data.on_job;
              break;
            case 1:
              temp[i].val = res.data.trial;
              break;
            case 2:
              temp[i].val = res.data.official;
              break;
            default:
              temp[i].val = res.data.turnover;
              break;
          }
        }
      });
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
        .count {
          letter-spacing: 1px;
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
    margin: 20px;
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
  margin: 20px;
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
  .deleteMsg {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  .stopUse {
    span {
      display: block;
      text-align: center;
      &:first-child {
        font-size: 16px;
        color: #000;
        font-weight: 600;
      }
      &:last-child {
        font-size: 14px;
        color: #333;
        margin-top: 10px;
      }
    }
  }
  .openUse,
  .departure {
    padding-right: 30px;
    .popExtraList {
      > li {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 30px;
        position: relative;
        > span {
          display: inline-block;
          width: 120px;
          font-size: 16px;
          color: #333333;
          font-weight: 600;
          text-align: right;
        }
        .tips{
          font-size: 12px;
          color: red;
          position: absolute;
          left: 120px;
          bottom: -22px;
        }
        .msgInput {
          width: 300px;
          height: 40px;
          padding: 0 15px;
          line-height: 40px;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          color: #909399;
          font-weight: 400;
          span {
            margin-right: 20px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
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
