<template>
  <div class="staffManage">
    <nav-Bar
      v-if="$route.path !== '/OAstaffManage'"
      :breadList="breadList"
    ></nav-Bar>
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
    <el-button
      class="showSearch"
      :class="$route.path == '/OAstaffManage' ? 'OA_showSearch' : ''"
      @click="showSearch = !showSearch"
      type="text"
      :icon="showSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
      >{{ showSearch ? "隐藏搜索框" : "打开搜索框" }}</el-button
    >
    <el-collapse-transition>
      <div v-show="showSearch">
        <el-card
          class="searchCard"
          :class="$route.path == '/OAstaffManage' ? 'OA_searchCard' : ''"
        >
          <div class="serchBox">
            <div class="rangeBox">
              <el-input
                v-model="adminName"
                placeholder="请输入员工姓名"
                clearable
                style="width: 300px; border-radius: 4px"
              ></el-input>
              <div class="range">
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
              </div>
              <div class="btnBox">
                <el-button
                  type="primary"
                  size="medium"
                  @click="search(0)"
                  >搜索</el-button
                >
                <el-button
                  class="secondary"
                  size="medium"
                  @click="search(1)"
                  >重置</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-collapse-transition>

    <!-- 表格 -->
    <el-card
      class="listCard"
      :class="$route.path == '/OAstaffManage' ? 'OA_listCard' : ''"
    >
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <div class="filterOut">
          <span class="tableTitle">员工列表</span>
          <el-button
            @click="showfilter = !showfilter"
            type="text"
            :icon="showfilter ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
            >列表内容筛选</el-button
          >
          <div class="btns">
            <el-button type="primary" class="p40" @click="addStaff()"
              >新增员工</el-button
            >
            <el-button class="btn p40" @click="deleteSelected()"
              >批量删除</el-button
            >
            <el-button class="btn p40" @click="exportChange()">导出</el-button>
          </div>
        </div>
        <div class="tableFilter">
          <el-collapse-transition>
            <div v-show="showfilter">
              <div class="checkBoxs">
                <div>
                  <el-checkbox
                    :indeterminate="checkedBox.isIndeterminate"
                    v-model="checkedBox.checkAll"
                    @change="handleCheckAllChange"
                    style="margin-bottom:10px;"
                    >全选</el-checkbox
                  >
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
            </div>
          </el-collapse-transition>
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
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          @selection-change="handleSelectionChange"
          :height="tableHeight"
        >
          <el-table-column
            align="center"
            type="selection"
            min-width="55"
            fixed="left"
          ></el-table-column>
          <el-table-column
            align="center"
            v-for="(head, index) in headList"
            :key="index"
            :label="head.label"
            :prop="head.prop"
            min-width="120px"
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
            :label="viewsList.length > 0 ? '操作' : ''"
            width="230px"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="btnFixed">
                <el-button type="text" class="w56" @click="view(scope.row.id)"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  class="w56"
                  v-if="scope.row.type == '试用'"
                  @click="positive(scope.row.id)"
                  >转正</el-button
                >
                <el-button
                  type="text"
                  class="w56"
                  v-if="scope.row.type != '离职'"
                  @click="openDialog('departure', scope.row.id)"
                  >离职</el-button
                >
                <el-button
                  type="text"
                  class="w56"
                  @click="deleteStaff(scope.row.id)"
                  >删除</el-button
                >
                <el-button
                  type="text"
                  class="w56"
                  v-if="
                    scope.row.type != '离职' && scope.row.status == '未开通'
                  "
                  @click="openDialog('openUse', scope.row.id)"
                  >开通账号</el-button
                >
                <el-button
                  type="text"
                  class="w56"
                  v-if="
                    (scope.row.type == '离职' ||
                      scope.row.type == '正式' ||
                      scope.row.type == '试用') &&
                    scope.row.status == '已开通'
                  "
                  @click="openDialog('stopUse', scope.row.id)"
                  >停用账号</el-button
                >
              </div>
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
                placeholder=""
                v-model="name_openUse"
                disabled
              ></el-input>
              <!-- <span class="tips" v-if="name_openUse == ''">*请输入账号</span> -->
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
            <!-- <li>
              <span>公司：</span>
              <div class="msgInput">
                <span>{{ company_openUse }}</span>
              </div>
            </li> -->
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
                    <span class="label point">转正时间</span>
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
              <span class="label point">工作总结</span>
              <el-input
                type="textarea"
                :rows="6"
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
        style="margin:10px 0; float: right"
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
import { KT, TY } from "@/api/reconciliation.js";
import { OpenLoading } from "@/utils/utils.js";
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
      tableHeight: 500,
      menuList: [
        { name: "在职", val: 0, status: 0 },
        { name: "离职", val: 0, status: 3 },
        { name: "正式", val: 0, status: 2 },
        { name: "试用", val: 0, status: 1 },
      ],
      showSearch: false,
      showfilter: false,
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
      defaultChecked: ["name", "job_number", "department", "position"], //默认需要显示的表头
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
      pwd_openUse: "123456",
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
      fileMark: [],
      // 分页
      total: 0,
      listParams: { name: "", page: 1, pageSize: 20 },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      // console.log( this.tableHeight)
      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 100;
      };
    });
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
    this.getStaffList();
    this.getFields(); //获取筛选字字段
    this.staffCount(); //获取分类统计
  },
  methods: {
    // 初始化表头
    initHead() {
      this.checked = [
        "name",
        "job_number",
        "department",
        "position",
        "type",
        "company_age",
        "mobile",
        "work_age",
        "age",
        "positive_time",
        "status",
      ];
      let temp = [];
      this.checked.forEach((item) => {
        switch (item) {
          case "name":
            temp.push("员工姓名");
            break;
          case "job_number":
            temp.push("工号");
            break;
          case "department":
            temp.push("部门");
            break;
          case "position":
            temp.push("职位");
            break;
          default:
            temp.push(this.checkData[item]);
            break;
        }
      });
      this.checkedBox.checkedCities = temp;
    },
    // 顶部菜单选择
    changeStatus(index, status) {
      this.curIndex = index;
      this.listType = status;
      this.adminName = "";
      this.getStaffList();
    },
    // 筛选功能
    handleCheckAllChange(val) {
      this.checkedBox.checkedCities = val ? this.checkedBox.cities : [];
      this.checkedBox.isIndeterminate = val;
      if (this.checkedBox.isIndeterminate) {
        let temp = [];
        for (let key in this.checkData) {
          this.checkedBox.checkedCities.forEach((item) => {
            if (this.checkData[key] == item) {
              temp.push(key);
            }
          });
        }
        this.checked = [...temp, ...this.defaultChecked];
      } else {
        this.initHead();
      }
      this.getStaffList();
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
      this.checked = [...temp, ...this.defaultChecked];
      this.getStaffList();
    },
    // 搜索
    search(type) {
      if (type == 1) {
        this.adminName = "";
        this.ageMax = "";
        this.ageMin = "";
        this.initHead();
      }
      this.getStaffList();
    },
    // 获取员工列表
    getStaffList() {
      this.searchData.viewsList_searchLoading = true;
      this.headList = [];
      this.viewsList = [];
      let params = {
        type: this.listType,
        page: this.listParams.page,
        is_paging: 0,
        name: this.adminName,
        field: this.checked,
        page_size: this.listParams.pageSize,
        start_age: this.ageMin,
        end_age: this.ageMax,
      };
      STAFFS_API.getStaffs(params).then((res) => {
        if (res.status == 200) {
          this.searchData.viewsList_searchLoading = false;
          this.viewsList = res.data[0].data;
          if (this.viewsList.length > 0) {
            this.viewsList.forEach((item) => {
              item.positive_time = item.positive_time
                ? renderTime(item.positive_time)
                : "无";
              item.card_valid = item.card_valid
                ? renderTime(item.card_valid)
                : "无";
              item.first_labor_contract_deadline = item.first_labor_contract_deadline
                ? renderTime(item.first_labor_contract_deadline)
                : "无";
              item.full_graduation_time = item.full_graduation_time
                ? renderTime(item.full_graduation_time)
                : "无";
              item.hualu_join_time = item.hualu_join_time
                ? renderTime(item.hualu_join_time)
                : "无";
              item.labor_contract_deadline = item.labor_contract_deadline
                ? renderTime(item.labor_contract_deadline)
                : "无";
              item.newmedia_join_time = item.newmedia_join_time
                ? renderTime(item.newmedia_join_time)
                : "无";
              item.part_graduation_time = item.part_graduation_time
                ? renderTime(item.part_graduation_time)
                : "无";
              item.second_labor_contract_deadline = item.second_labor_contract_deadline
                ? renderTime(item.second_labor_contract_deadline)
                : "无";
              item.third_labor_contract_deadline = item.third_labor_contract_deadline
                ? renderTime(item.third_labor_contract_deadline)
                : "无";
              item.trial_deadline = item.trial_deadline
                ? renderTime(item.trial_deadline)
                : "无";
              item.work_time = item.work_time
                ? renderTime(item.work_time)
                : "无";
            });
          }
          let tempHead = [];
          for (let key in res.data.head_arr) {
            let temp = {};
            temp.label = res.data.head_arr[key];
            temp.prop = key;
            tempHead.push(temp);
          }
          this.headList = tempHead;
          this.total = res.data[0].total;
          let that = this;
          this.$nextTick(() => {
            that.$refs.table.doLayout();
          }); //重新渲染表格
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
      this.initHead();
    },
    // 新增员工
    addStaff() {
      if (this.$route.path == "/OAstaffManage") {
        this.$router.push({
          path: "/OAstaffAdd",
          query: {
            routeName: "新增员工",
          },
        });
      } else {
        this.$router.push({
          path: "/staffAdd",
          query: {
            routeName: "新增员工",
          },
        });
      }
    },
    openDialog(type, val) {
      this.showDialog = true;
      this.dialogType = type;
      this.tempId = val;
      switch (type) {
        case "stopUse":
          break;
        case "openUse":
          this.job_openUse = "";
          this.depart_openUse = "";
          this.name_openUse = "";
          STAFFS_API.staffInfo({}, this.tempId).then((res) => {
            this.job_openUse = res.data.position;
            this.depart_openUse = res.data.department;
            this.name_openUse = res.data.company_email;
            this.pwd_openUse = "123456";
          });
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
            break;
          case "openUse":
            if (this.name_openUse != "" && this.pwd_openUse != "") {
              this.openAccount();
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
      if (this.$route.path == "/OAstaffManage") {
        this.$router.push({
          path: "/OAstaffMsg",
          query: {
            id: val,
          },
        });
      } else {
        this.$router.push({
          path: "/staffMsg",
          query: {
            id: val,
          },
        });
      }
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
          const loading = OpenLoading(this, 1)
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
            loading.close()
            clearTimeout(this.overloading)
          });
        })
        .catch(() => {});
    },
    // 离职
    departure() {
      const loading = OpenLoading(this, 1)
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
        loading.close()
        clearTimeout(this.overloading)
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
      if (val == 0) {
        this.showPositive = false;
      } else {
        if (!params.positive_time) {
          this.$message.error("请选择转正日期");
        } else if (!params.summary) {
          this.$message.error("请填写工作总结");
        } else {
          const loading = OpenLoading(this, 1)
          STAFFS_API.positive(params).then((res) => {
            if (res.status == 200) {
              this.$message.success("转正成功！");
              this.showPositive = false;
              this.getStaffList();
            } else {
              this.$message.error(res.error.message);
            }
            loading.close()
            clearTimeout(this.overloading)
          });
        }
      }
    },
    // 开通账号
    openAccount() {
      const loading = OpenLoading(this, 1)
      let id = this.tempId;
      let params = {
        account_name: this.name_openUse,
        password: this.pwd_openUse,
      };
      KT(params, id).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "开通成功！",
            type: "success",
          });
          this.showDialog = false;
          this.getStaffList();
        } else {
          this.showDialog = false;
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
        loading.close()
        clearTimeout(this.overloading)
      });
    },
    // 停用账号
    closeAccount() {
      const loading = OpenLoading(this, 1)
      TY(this.tempId).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "停用成功！",
            type: "success",
          });
          this.showDialog = false;
          this.getStaffList();
        } else {
          this.showDialog = false;
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
        loading.close()
        clearTimeout(this.overloading)
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
    handleSizeChange(newSize) {
      this.listParams.pageSize = newSize;
      this.getStaffList();
    },
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
          if (params.ids.length == 0) {
            this.$message.warning("未选择员工");
          } else {
            const loading = OpenLoading(this, 1)
            STAFFS_API.deleteStaff(params).then((res) => {
              if (res.status == 200) {
                this.$message.success("删除成功！");
                this.getStaffList();
              } else {
                this.$message.error("删除失败！");
              }
              loading.close()
              clearTimeout(this.overloading)
            });
          }
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
      this.fileMark.push({
        name: file.name,
      });
    },
    handleRemove(file, fileList) {
      this.fileMark.forEach((item, index) => {
        if (item.name == file.name) {
          this.positiveData.fileList.splice(index, 1);
          this.fileMark.splice(index, 1);
        }
      });
    },
    beforeRemove(file, fileList) {
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
    //
    async exportChange() {
      let params = {
        name: this.adminName,
        type: this.listType,
        field: this.checked,
        start_age: this.ageMin,
        end_age: this.ageMax,
      };
      const loading = OpenLoading(this, 1, "文件下载中");
      let res = null;
      await this.axios({
        method: "get",
        url: `hr/staffs/export`,
        params: params,
        responseType: "blob",
      }).then((result) => {
        if (result.status == 200) {
          res = result.data;
        } else {
          this.$message.error("文件获取失败！");
        }
        loading.close();
      });
      if (res) {
        let fileName = "员工列表";
        let fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // xlsx文件
        let blob = new Blob([res], {
          type: fileType,
        });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.log("未获取到下载文件！");
      }
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
  .el-table /deep/ td,
  .el-table /deep/ th {
    padding: 4px 0 !important;
  }
  .el-table /deep/ th > .cell {
    padding: 10px 0;
  }
  .navBox {
    margin-bottom: 0 !important;
  }
  .showSearch {
    margin-left: 20px;
  }
  
  .searchCard {
    border-radius: 10px;
    margin: 0 20px 20px 20px;
    .rangeBox {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      .range {
        margin: 0 20px;
      }
      .btnBox {
        width: 180px;
        position: absolute;
        right: 0;
        top: 40px;

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
            flex: 1;
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
            flex: 1;
          }
          .labelBox {
            width: 116px;
            text-align: left;
            .label {
              letter-spacing: 1px;
              color: #f56c6c;
              font-size: 14px;
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
        font-size: 14px;
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
  margin: 0 20px;
  .clearfix {
    // display: flex;
    // align-items: center;
    // position: relative;
  }
  .tableTitleBox {
    .filterOut {
      width: 100%;
      position: relative;
      .btns {
        position: absolute;
        right: 0;
        top: 0;
        .btn {
          color: #409efd;
          border-color: #409efd;
        }
        .p40 {
          padding: 12px 40px;
        }
      }
    }
    .tableTitle {
      font-weight: bold;
      margin-right: 10px;
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
.tableFilter {
  margin: -10px 0 10px 0;
  .checkBoxs {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    .checkItem {
      margin-bottom: 10px;
    }
  }
}
.btnFixed {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .w56 {
    width: 68px;
    padding: 0 !important;
    margin-left: 0 !important;
    text-align: center;
    margin: 4px 0;
  }
}
.point {
  &::before {
    content: "*";
    font-size: 14px;
    color: red;
  }
}

.OA_listCard {
  margin: 0 !important;
}
.OA_showSearch {
  margin-left: 0 !important;
}
.OA_searchCard {
  margin: 0 0 20px 0 !important;
}
</style>
