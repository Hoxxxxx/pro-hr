<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <el-card class="formCard">
      <!-- 基本信息 -->
      <div class="baseInfo">
        <span class="title">基本信息</span>
        <ul class="inputBox">
          <!-- 姓名/性别 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">姓名</span>
              </div>
              <el-input class="elInput" v-model="name" placeholder="请输入姓名"></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">姓别</span>
              </div>
              <div class="genderBox">
                <el-radio v-model="gender" :label="1" border style="width:108px">男</el-radio>
                <el-radio v-model="gender" :label="2" border style="width:108px">女</el-radio>
              </div>
            </div>
          </li>
          <!-- 手机号/身份证号 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">手机号</span>
              </div>
              <el-input class="elInput" v-model="phone" placeholder="请输入手机号"></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">身份证号</span>
              </div>
              <el-input class="elInput" v-model="idCard" placeholder="请输入身份证号"></el-input>
            </div>
          </li>
          <!-- 出生日期/邮箱 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot"></span>
                <span class="label">出生日期</span>
              </div>
              <el-date-picker v-model="birthday" type="date" placeholder="选择日期" class="elInput"></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">邮箱</span>
              </div>
              <el-input class="elInput" v-model="email" placeholder="请输入邮箱"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <!-- 职位信息 -->
      <div class="baseInfo">
        <span class="title">职位信息</span>
        <ul class="inputBox">
          <!-- 员工状态/所属公司 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">员工状态</span>
              </div>
              <el-select v-model="status" placeholder="请选择员工状态" class="elInput">
                <el-option
                  v-for="item in status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">所属公司</span>
              </div>
              <el-select v-model="company" multiple placeholder="请选择所属公司" class="elInput">
                <el-option
                  v-for="item in company_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </li>
          <!-- 部门/职位 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">部门</span>
              </div>
              <el-select v-model="department" multiple placeholder="请选择部门" class="elInput">
                <el-option
                  v-for="item in department_options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">职位</span>
              </div>
              <el-select v-model="job" multiple placeholder="请选择职位" class="elInput">
                <el-option
                  v-for="item in job_options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </li>
          <!-- 入职时间/转正时间 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">入职时间</span>
              </div>
              <el-date-picker v-model="entryTime" type="date" placeholder="选择入职时间" class="elInput"></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">转正时间</span>
              </div>
              <el-date-picker
                v-model="positiveTime"
                type="date"
                placeholder="选择转正时间"
                class="elInput"
              ></el-date-picker>
            </div>
          </li>
          <!-- 试用期/工号 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">试用期</span>
              </div>
              <el-select v-model="probation" placeholder="请选择试用期" class="elInput">
                <el-option
                  v-for="item in probation_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">工号</span>
              </div>
              <el-input class="elInput" v-model="workNum" placeholder="请输入工号"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <!-- 其他信息 -->
      <div class="baseInfo">
        <span class="title">其他信息</span>
        <ul class="inputBox">
          <!-- 婚姻状况/学历 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">婚姻状况</span>
              </div>
              <el-select v-model="marrige" placeholder="请选择婚姻状况" class="elInput">
                <el-option
                  v-for="item in marrige_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学历</span>
              </div>
              <el-select v-model="study" placeholder="请选择学历" class="elInput">
                <el-option
                  v-for="item in study_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </li>
          <!-- 紧急联系人 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">紧急联系人</span>
              </div>
              <el-input class="elInput" v-model="emergency" placeholder="请输入紧急联系人"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <div class="btnBox">
        <div class="btns">
          <el-button style="width:95px;" @click="addStaff(0)">取消</el-button>
          <el-button
            style="width:95px;"
            type="primary"
            @click="addStaff(1)"
          >{{saveType == 'edit' ? '保存编辑' :'确认添加'}}</el-button>
        </div>
      </div>
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
          path: "/staffManage",
          title: "员工管理",
        },
        {
          title: "新增员工",
        },
      ],
      title: "新增员工",
      //   表单数据
      //基本信息
      staffId: "", //员工id（从员工信息页面跳转过来会有此值）
      name: "",
      gender: null,
      birthday: "",
      phone: "",
      idCard: "",
      email: "",
      // 员工状态
      status_options: [
        {
          value: 0,
          label: "在职",
        },
        {
          value: 1,
          label: "试用",
        },
        {
          value: 2,
          label: "正式",
        },
        {
          value: 3,
          label: "离职",
        },
      ],
      status: null,
      // 公司
      company_options: [
        {
          value: 0,
          label: "成都公司",
        },
        {
          value: 1,
          label: "北京公司",
        },
        {
          value: 2,
          label: "上海公司",
        },
      ],
      company: "",
      // 部门
      department_options: [],
      department: "",
      // 职位
      job_options: [],
      job: "",
      entryTime: "",
      positiveTime: "",
      // 试用期
      probation_options: [
        {
          value: 0,
          label: "无",
        },
        {
          value: 1,
          label: "1个月",
        },
        {
          value: 2,
          label: "2个月",
        },
        {
          value: 3,
          label: "3个月",
        },
        {
          value: 4,
          label: "4个月",
        },
        {
          value: 5,
          label: "5个月",
        },
        {
          value: 6,
          label: "6个月",
        },
      ],
      probation: "",
      // 工号
      workNum: "",
      //   其他信息
      marrige_options: [
        {
          value: 0,
          label: "未婚",
        },
        {
          value: 1,
          label: "已婚",
        },
      ],
      marrige: "",
      study_options: [
        {
          value: 0,
          label: "专科",
        },
        {
          value: 1,
          label: "本科",
        },
        {
          value: 2,
          label: "硕士",
        },
      ],
      study: "",
      emergency: "",
      saveType: "", //保存类型（编辑保存/新增保存）
    };
  },
  created() {
    this.staffId = this.$route.query.id;
    this.saveType = this.$route.query.saveType;
    if (this.staffId && this.staffId != "") {
      this.getStaffInfo();
      this.title = "编辑员工";
    } else {
      console.log("从新增页面跳转过来");
    }
  },
  mounted() {
    this.getDepart();
    this.getJobs();
  },
  methods: {
    addStaff(type) {
      if (type == 0) {
        history.go(-1);
      } else {
        switch (true) {
          case this.name == "":
            this.$message.error("请填写姓名！");
            break;
          case this.gender == null:
            this.$message.error("请选择性别！");
            break;
          case this.phone == "":
            this.$message.error("请填写手机号！");
            break;
          case this.idCard == "":
            this.$message.error("请填写身份证号码！");
            break;
          case this.status == null:
            this.$message.error("请选择员工状态！");
            break;
          case this.company == "":
            this.$message.error("请选择所属公司！");
            break;
          case this.department == "":
            this.$message.error("请选择部门！");
            break;
          case this.job == "":
            this.$message.error("请选择职位！");
            break;
          case !this.entryTime:
            this.$message.error("请填写入职时间！");
            break;
          case !this.positiveTime:
            this.$message.error("请填写转正时间！");
            break;
          case this.probation == "":
            this.$message.error("请选择试用期！");
            break;
          default:
            this.saveAdd();
            break;
        }
      }
    },
    //保存添加
    saveAdd() {
      let that = this;
      let params = {
        name: this.name,
        sex: this.gender,
        status: this.status,
        mobile: this.phone,
        position_id: this.job,
        department_id: this.department,
        card: this.idCard,
        birthday: this.birthday,
        entry_time: this.entryTime,
        positive_time: this.positiveTime,
        job_number: String(this.workNum),
        emergency_contact: this.emergency,
        trial_period: this.probation,
        education: this.study,
        marrige: this.marrige,
        email: this.email,
        company_id: this.company,
      };
      if (this.saveType == "edit") {
        http.PUT(`/api/users/${this.staffId}`, params).then((res) => {
          if (res.status == 0) {
            this.$message({
              message: "保存成功！",
              type: "success",
            });
            setTimeout(function () {
              history.go(-1);
            }, 500);
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        });
      } else {
        http.POST(configUrl.addStaff, params).then((res) => {
          if (res.status == 0) {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            setTimeout(function () {
              history.go(-1);
            }, 500);
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        });
      }
    },
    // 获取部门列表
    getDepart() {
      let params = {
        page: 1,
      };
      http.GET(configUrl.getDepartments, params).then((res) => {
        this.department_options = res.data;
      });
    },
    // 获取职位列表
    getJobs() {
      let params = {
        page: 1,
      };
      http.GET(configUrl.getJobs, params).then((res) => {
        this.job_options = res.data.positions.data;
      });
    },
    // 获取员工信息
    getStaffInfo() {
      http.GET(`${configUrl.getStaffList}/${this.staffId}`).then((res) => {
        if (res.status == 0) {
          let info = res.data;
          this.name = info.name;
          this.gender = info.sex;
          this.phone = info.mobile;
          this.idCard = info.card;
          this.birthday = info.birthday;
          this.email = info.email;
          this.status = info.status;
          this.company = JSON.parse(info.company_id);
          this.department = JSON.parse(info.department_id);
          this.job = JSON.parse(info.position_id);
          this.entryTime = info.entry_time;
          this.positiveTime = info.positive_time;
          this.probation = info.trial_period;
          this.workNum = info.job_number;
          this.marrige = info.marriage;
          this.study = info.education;
          this.emergency = info.emergency_contact;
        } else {
          this.$message({
            message: "获取员工信息失败！",
            type: "warning",
          });
        }
      });
    },
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  .formCard {
    margin: 20px;
    .title {
      font-size: 16px;
      color: #999999;
    }
    .baseInfo {
      border-bottom: 1px solid #f0f3f7;
      margin-bottom: 20px;
      .inputBox {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
        li {
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
            .genderBox {
              flex: 1 1 auto;
            }
            .labelBox {
              width: 120px;
              .redPot,
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
    }
    .btnBox {
      .btns {
        width: 200px;
        position: relative;
        left: 50%;
        margin-left: -100px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }
    }
  }
}
</style>
