<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList"></nav-Bar>
    <div class="menuList">
      <ul>
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="index == curIndex ? 'active' : ''"
          @click="changeStatus(index, item.status)"
        >
          <div class="index"></div>
          <div class="menuName">{{ item.name }}</div>
          <div class="count">({{ item.val }})</div>
        </li>
      </ul>
    </div>

    <!-- 搜索框 -->
    <el-card class="searchCard">
      <div class="serchBox">
        <div class="checkBoxs">
          <div>
            <el-checkbox
              :indeterminate="checkedBox.isIndeterminate"
              v-model="checkedBox.checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              v-model="checkedBox.checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="(key, value) in checkedBox.cities"
                class="checkItem"
                :label="key"
                :key="value"
                >{{ key }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
        <div class="rangeBox">
          <el-input
            v-model="adminName"
            placeholder="请输入员工姓名"
            clearable
            style="width: 300px; border-radius: 4px"
          ></el-input>
          <!-- <div class="range">
            <span>年龄段：</span>
            <el-input
              v-model="ageMin"
              placeholder=""
              style="width: 80px; border-radius: 4px"
            ></el-input>
            <span style="margin: 0 10px">~</span>
            <el-input
              v-model="ageMax"
              placeholder=""
              style="width: 80px; border-radius: 4px"
            ></el-input>
          </div> -->
          <div class="btnBox">
            <el-button type="primary" size="medium" @click="search(0)"
              >搜索</el-button
            >
            <el-button class="secondary" size="medium" @click="search(1)"
              >重置</el-button
            >
          </div>
        </div>
      </div>
    </el-card>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">员工列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="addStaff()"
            >新增员工</el-button
          >
          <el-button class="btn p40">批量导入</el-button>
          <el-button class="btn p40" @click="deleteSelected()"
            >批量删除</el-button
          >
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          :data="viewsList"
          v-loading="searchData.viewsList_searchLoading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            align="center"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column
            align="center"
            v-for="(head, index) in headList"
            :key="index"
            :label="head.label"
            :prop="head.prop"
            min-width="160px"
          >
            <template slot-scope="scope">
              <div v-if="head.prop == 'department'">
                <span
                  v-for="(i, index) in scope.row.department"
                  :key="index"
                  style="margin: 0 10px"
                  >{{ i.name }}</span
                >
              </div>
              <div v-else-if="head.prop == 'position'">
                <span
                  v-for="(i, index) in scope.row.position"
                  :key="index"
                  style="margin: 0 10px"
                  >{{ i.name }}</span
                >
              </div>
              <div v-else-if="head.prop == 'status'">
                <span :style="scope.row.status | color">{{
                  scope.row.status
                }}</span>
              </div>
              <div v-else-if="head.prop == 'position_type'">
                <span
                  v-for="(i, index) in scope.row.position_type"
                  :key="index"
                  style="margin: 0 10px"
                  >{{ i }}</span
                >
              </div>
              <div v-else>
                <span>{{ scope.row[head.prop] }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="300px"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.id)"
                >查看</el-button
              >
              <el-button
                type="text"
                v-if="scope.row.type == '试用'"
                @click="positive(scope.row.id)"
                >转正</el-button
              >
              <el-button
                type="text"
                v-if="scope.row.type != '离职'"
                @click="openDialog('departure', scope.row.id)"
                >离职</el-button
              >
              <el-button type="text" @click="deleteStaff(scope.row.id)"
                >删除</el-button
              >
              <el-button
                type="text"
                v-if="scope.row.type != '离职' && scope.row.status == '未开通'"
                @click="openDialog('openUse', scope.row.id)"
                >开通账号</el-button
              >
              <el-button
                type="text"
                v-if="
                  scope.row.status != '已停用' ||
                  (scope.row.type == '离职' && scope.row.status == '已开通')
                "
                @click="openDialog('stopUse', scope.row.id)"
                >停用账号</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        :visible.sync="showDialog"
        width="600px"
        :close-on-click-modal="false"
        center
      >
        <div class="stopUse" v-if="dialogType == 'stopUse'">
          <span>确定停用该员工的账号？</span>
          <span>确认后该员工不可使用账号登录进入系统</span>
        </div>
        <div class="openUse" v-if="dialogType == 'openUse'">
          <ul class="popExtraList">
            <li>
              <span>账号名称：</span>
              <el-input
                style="width: 450px"
                placeholder="请输入账号名称"
                v-model="name_openUse"
              ></el-input>
              <span class="tips" v-if="name_openUse == ''">*请输入账号</span>
            </li>
            <li>
              <span>密码：</span>
              <el-input
                style="width: 450px"
                placeholder="请输入密码"
                show-password
                v-model="pwd_openUse"
              ></el-input>
              <span class="tips" v-if="pwd_openUse == ''">*请输入密码</span>
            </li>
            <li>
              <span>职位：</span>
              <div class="msgInput">
                <span v-for="(i, idx) in job_openUse" :key="idx">{{
                  i.name
                }}</span>
              </div>
            </li>
            <li>
              <span>部门：</span>
              <div class="msgInput">
                <span v-for="(i, idx) in depart_openUse" :key="idx">{{
                  i.name
                }}</span>
              </div>
            </li>
            <li>
              <span>公司：</span>
              <div class="msgInput">
                <span>{{ company_openUse }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="departure" v-if="dialogType == 'departure'">
          <ul class="popExtraList">
            <li>
              <span>离职类型：</span>
              <el-select
                style="width: 450px"
                v-model="depart"
                placeholder="请选择离职类型"
                class="elInput"
              >
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
                style="width: 450px"
              ></el-date-picker>
            </li>
            <li>
              <span>离职原因：</span>
              <el-input
                type="textarea"
                style="width: 450px"
                autosize
                placeholder="请输入离职原因"
                v-model="departReason"
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

      <!-- 转正弹框 -->
      <el-dialog
        :visible.sync="showPositive"
        width="1000px"
        :close-on-click-modal="false"
        center
      >
        <h3 class="positiveTitle">申请转正</h3>
        <div class="positiveEdit">
          <div class="baseInfo">
            <ul class="inputBox">
              <!-- 姓名/入职日期 -->
              <li>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">姓名</span>
                  </div>
                  <div class="elInput">{{ positiveData.name }}</div>
                </div>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">入职日期</span>
                  </div>
                  <div class="elInput">{{ positiveData.entryDate }}</div>
                </div>
              </li>
              <!-- 手机号 -->
              <li>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">手机号</span>
                  </div>
                  <div class="elInput">{{ positiveData.mobile }}</div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 转正时间 -->
          <div class="baseInfo">
            <ul class="inputBoxPositive">
              <!-- 转正时间 -->
              <li>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="redPot">&#10052;</span>
                    <span class="label">转正时间</span>
                  </div>
                  <el-date-picker
                    v-model="positiveData.positiveTime"
                    type="date"
                    placeholder="选择转正时间"
                    class="elInput"
                  ></el-date-picker>
                </div>
              </li>
            </ul>
            <!-- 工作总结 -->
            <div class="conclusion">
              <span class="label">工作总结</span>
              <el-input
                type="textarea"
                :rows="15"
                placeholder="请输入内容"
                minlength="30"
                v-model="positiveData.conclusion"
              ></el-input>
            </div>
            <div class="upload">
              <span class="label">附件</span>
              <el-upload
                class="upload-demo"
                :action="$store.state.upload_url"
                :headers="uploadParams.headers"
                :data="uploadParams.data"
                name="attachment[]"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :before-remove="beforeRemove"
                :on-remove="handleRemove"
                :file-list="files"
                :on-change="handleChange"
                multiple
              >
                <el-button size="small" type="primary" style="width: 120px"
                  >新增附件</el-button
                >
              </el-upload>
            </div>
          </div>
        </div>
        <div class="extraBtns">
          <div>
            <el-button style="width: 95px" @click="positiveClick(0)"
              >取 消</el-button
            >
            <el-button
              style="width: 95px"
              @click="positiveClick(1)"
              type="primary"
              >确 定</el-button
            >
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
import navBar from "@/components/navBar/navBar";
// api
import { STAFFS_API } from "@/api/staffs";
import { renderTime } from "@/utils/function.js";
export default {
  filters: {
    color(val) {
      switch (val) {
        case "未开通":
          return `color:#F56C6C;`;
          break;
        case "已开通":
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
      menuList: [
        { name: "在职", val: 0, status: 0 },
        { name: "离职", val: 0, status: 3 },
        { name: "正式", val: 0, status: 2 },
        { name: "试用", val: 0, status: 1 },
      ],
      searchData: {
        viewsList_searchLoading: true,
      },
      curIndex: 0,
      // 筛选字段
      checkedBox: {
        checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: true,
      },
      checked: [],
      checkData: [],
      defaultChecked:["name", "job_number", "department", "position"],//默认需要显示的表头
      // 
      adminName: "",
      ageMin: "", //
      ageMax: "", //
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
      headList: [], //表头
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
      multipleSelection: [],
      // 转正信息
      showPositive: false,
      positiveData: {
        staff_id: "",
        entryDate: "",
        mobile: "",
        positiveTime: "", //转正时间
        conclusion: "", //工作总结
        fileList: [], //附件
      },
      uploadParams: {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        data: {
          basket: "staff_positives",
        },
        limit: 1,
      },
      files: [],
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    this.getStaffList();
    this.getFields(); //获取筛选字字段
    this.staffCount(); //获取分类统计
    
  },
  methods: {
    // 初始化表头
    initHead(){
      this.checked = ["name", "job_number", "department", "position","type","company_age","mobile","work_age","age","positive_time","status"]
      let temp = []
      this.checked.forEach(item=>{
        switch (item) {
          case 'name':
            temp.push('员工姓名')
            break;
          case 'job_number':
            temp.push('工号')
            break
          case 'department':
            temp.push('部门')
            break
          case 'position':
            temp.push('职位')
            break
          default:
            temp.push(this.checkData[item])
            break;
        }
      })
      this.checkedBox.checkedCities = temp
    },
    // 顶部菜单选择
    changeStatus(index, status) {
      this.curIndex = index;
      this.listType = status;
      this.adminName = "";
      this.initHead();
      this.getStaffList();
    },
    // 筛选功能
    handleCheckAllChange(val) {
      this.checkedBox.checkedCities = val ? this.checkedBox.cities : [];
      let temp = [];
      for (let key in this.checkData) {
        this.checkedBox.checkedCities.forEach((item) => {
          if (this.checkData[key] == item) {
            temp.push(key);
          }
        });
      }
      this.checked = temp;
      this.checkedBox.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkedBox.checkAll = checkedCount === this.checkedBox.cities.length;
      this.checkedBox.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkedBox.cities.length;
      let temp = [];
      for (let key in this.checkData) {
        this.checkedBox.checkedCities.forEach((item) => {
          if (this.checkData[key] == item) {
            temp.push(key);
          }
        });
      }
      this.checked = [...temp,...this.defaultChecked];
    },
    // 搜索
    search(type) {
      if (type == 1) {
        this.adminName = "";
        this.initHead()
      }
      this.getStaffList();
    },
    // 获取员工列表
    getStaffList() {
      this.searchData.viewsList_searchLoading = true;
      this.headList = [];
      let params = {
        type:this.listType,
        page: this.listParams.page,
        is_paging: 0,
        name: this.adminName,
        field: this.checked,
      };
      STAFFS_API.getStaffs(params).then((res) => {
        if (res.status == 200) {
          this.searchData.viewsList_searchLoading = false;
          this.viewsList = res.data[0].data;
          if(this.viewsList.length > 0){
            this.viewsList.forEach((item) => {
              item.positive_time = renderTime(item.positive_time);
              item.card_valid = renderTime(item.card_valid);
              item.first_labor_contract_deadline = renderTime(item.first_labor_contract_deadline);
              item.full_graduation_time = renderTime(item.full_graduation_time);
              item.hualu_join_time = renderTime(item.hualu_join_time);
              item.labor_contract_deadline = renderTime(item.labor_contract_deadline);
              item.newmedia_join_time = renderTime(item.newmedia_join_time);
              item.part_graduation_time = renderTime(item.part_graduation_time);
              item.second_labor_contract_deadline = renderTime(item.second_labor_contract_deadline);
              item.third_labor_contract_deadline = renderTime(item.third_labor_contract_deadline);
              item.trial_deadline = renderTime(item.trial_deadline);
              item.work_time = renderTime(item.work_time);
            });
          }
          let tempHead = [];
          for (let key in res.data.head_arr) {
            let temp = {};
            temp.label = res.data.head_arr[key];
            temp.prop = key;
            tempHead.push(temp);
          }
          this.headList = tempHead
          this.total = res.data[0].total;
        } else {
          this.searchData.viewsList_searchLoading = false;
          this.$message.error("列表数据获取失败！");
        }
      });
    },
    //获取筛选字段
    async getFields() {
      await STAFFS_API.getFields().then((res) => {
        if (res.status == 200) {
          let temp = [];
          for (let key in res.data) {
            temp.push(res.data[key]);
          }
          this.checkedBox.cities = temp;
          this.checkData = res.data;
        }
      });
      this.initHead()
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
        case "stopUse":
          break;
        case "openUse":
          console.log(val);
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
            this.departure();
            break;
          default:
            break;
        }
      } else {
        this.showDialog = false;
      }
    },
    // 查看
    view(val) {
      this.$router.push({
        path: "/staffMsg",
        query: {
          id: val,
        },
      });
    },
    // 删除员工
    deleteStaff(val) {
      this.$confirm("确认删除该员工？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
        .then(() => {
          STAFFS_API.deleteStaff({}, val).then((res) => {
            if (res.status == 200) {
              this.$message({
                message: "删除成功！",
                type: "success",
              });
              this.getStaffList();
            } else {
              this.$message.error(res.error);
            }
          });
        })
        .catch(() => {});
    },
    // 离职
    departure() {
      let params = {
        staff_id: this.tempId,
        turnover_type: this.depart,
        turnover_time: this.departTime,
        turnover_reason: this.departReason,
      };
      STAFFS_API.turnover(params).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "离职成功！",
            type: "success",
          });
          this.showDialog = false;
          this.getStaffList();
          this.staffCount();
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });
    },
    // 转正
    async positive(val) {
      this.showPositive = true;
      let data = await STAFFS_API.staffInfo({}, val).then((res) => {
        return res.data;
      });
      this.positiveData = {
        name: data.name,
        mobile: data.mobile,
        staff_id: data.id,
        positiveTime: "",
        conclusion: "",
        fileList: [],
        entryDate: data.hualu_join_time,
      };
    },
    positiveClick(val) {
      let params = {
        staff_id: this.positiveData.staff_id,
        positive_time: this.positiveData.positiveTime,
        summary: this.positiveData.conclusion,
        attachment_url: this.positiveData.fileList,
      };
      console.log(params);
      if (val == 0) {
        this.showPositive = false;
      } else {
        STAFFS_API.positive(params).then((res) => {
          if (res.status == 200) {
            this.$message.success("转正成功！");
            this.showPositive = false;
            this.getStaffList();
          } else {
            this.$message.error(res.error.message);
          }
        });
      }
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
    closeAccount() {
      let that = this;
      http.PUT(`/api/users/${this.tempId}/forbidAccount`).then((res) => {
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
      });
    },
    // 分类人数统计
    staffCount() {
      STAFFS_API.staffsCount().then((res) => {
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
    // 分页数据变化处理
    handleSizeChange(newSize) {},
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getStaffList();
    },
    // 批量删除
    handleSelectionChange(val) {
      let temp = [];
      val.forEach((item) => {
        temp.push(item.id);
      });
      this.multipleSelection = temp;
    },
    deleteSelected() {
      let params = {
        ids: this.multipleSelection,
      };
      this.$confirm("确认删除选中的员工？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
        .then(() => {
          STAFFS_API.deleteStaff(params).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getStaffList();
            } else {
              this.$message.error("删除失败！");
            }
          });
        })
        .catch(() => {});
    },
    // 转正相关
    // 文件上传
    handleChange(file, fileList) {
      this.files = fileList;
    },
    handleSuccess(response, file, fileList) {
      this.positiveData.fileList.push(response.data[0]);
    },
    handleRemove(file, fileList) {},
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file, fileList) {
      const isXls = file.type === "application/vnd.ms-excel";
      const isXlsx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isPPT = file.type === "application/vnd.ms-powerpoint";
      const isPPTX =
        file.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const isDoc = file.type === "application/msword";
      const isDocx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isPDF = file.type === "application/pdf";
      const isNull = file.type === "";
      if (
        !isDoc &&
        !isDocx &&
        !isXls &&
        !isXlsx &&
        !isPPT &&
        !isPPTX &&
        !isPDF &&
        !isNull
      ) {
        this.$message.warning(
          "上传文件仅限 doc / docx / xls / xlsx / ppt / pptx / pdf 格式!"
        );
        return false;
      }
      console.log("上传");
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
    margin: 20px;
    .checkBoxs {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      .checkItem {
        margin-bottom: 10px;
      }
    }
    .rangeBox {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      .range {
        margin: 0 20px;
      }
      .btnBox {
        position: absolute;
        right: 0;

        .el-button {
          height: 40px;
        }
        .secondary {
          border: 1px solid #409efd;
          color: #409efd;
        }
      }
    }
  }
  .positiveTitle {
    text-align: center;
  }
  .baseInfo {
    border-bottom: 1px solid #f0f3f7;
    margin-bottom: 20px;

    .inputBox {
      margin-top: 20px;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex: 1 1 auto;
        margin-bottom: 10px;
        .itemBox {
          min-width: 400px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex: 1 1 auto;
          margin: 0 80px 20px 0;
          &:last-child {
            margin-right: 0;
          }
          .elInput {
            width: 200px;
            flex: 1 1 auto;
          }
          .elInput {
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            min-height: 40px;
            line-height: 40px;
            padding: 0 15px;
          }
          .labelBox {
            width: 116px;
            text-align: left;
            .label {
              color: #606266;
              margin-right: 0;
              font-size: 14px;
            }
          }
        }
      }
    }
    .inputBoxPositive {
      li {
        width: 100%;
        margin-right: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
        .itemBox {
          width: 480px;
          max-width: 500px;
          min-width: 450px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-right: 120px;
          .elInput {
            width: 370px;
          }
          .labelBox {
            width: 120px;
            text-align: left;
            .label {
              letter-spacing: 1px;
              color: #f56c6c;
              font-size: 16px;
              font-weight: bold;
              margin-right: 2px;
            }
            .label {
              color: #333333;
              margin-right: 0;
            }
          }
        }
      }
    }
    .turnover {
      margin-top: 20px;
    }
    .conclusion,
    .upload {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .label {
        display: block;
        width: 120px;
        margin-right: 2px;
        letter-spacing: 1px;
        font-size: 16px;
        font-weight: bold;
        margin-right: 12px;
      }
    }
    .upload {
      align-items: normal;
      justify-content: flex-start;
      .label {
        margin-right: 0;
        line-height: 32px;
      }
      .tips {
        font-size: 14px;
        color: #909399;
        font-weight: 400;
        line-height: 32px;
      }
      .fileList {
        li {
          margin-bottom: 10px;
          span {
            display: inline-block;
            height: 32px;
            line-height: 32px;
          }
          .fileName {
            font-size: 14px;
            color: #3b4859;
          }
          .fileDownload {
            width: 60px;
            height: 20px;
            cursor: pointer;
            line-height: 20px;
            color: #fff;
            background: #409efd;
            text-align: center;
            border-radius: 4px;
            margin-left: 20px;
          }
        }
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
      right: 0;
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
        .tips {
          font-size: 12px;
          color: red;
          position: absolute;
          left: 120px;
          bottom: -22px;
          text-align: left;
        }
        .msgInput {
          width: 450px;
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
