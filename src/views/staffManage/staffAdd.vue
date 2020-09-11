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
              <el-select v-model="company" placeholder="请选择所属公司" class="elInput">
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
              <el-select v-model="department" placeholder="请选择部门" class="elInput">
                <el-option
                  v-for="item in department_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">&#10052;</span>
                <span class="label">职位</span>
              </div>
              <el-select v-model="job" placeholder="请选择职位" class="elInput">
                <el-option
                  v-for="item in job_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
          <el-button style="width:95px;">取消</el-button>
          <el-button style="width:95px;" type="primary">确认添加</el-button>
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
      name: "",
      gender: 1,
      birthday: "",
      phone: "",
      idCard: "",
      email: "",
      // 职位信息
      status_options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      status: "",

      company_options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      company: "",

      department_options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      department: "",

      job_options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      job: "",

      job_options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      job: "",
      entryTime: "",
      positiveTime: "",
      probation_options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      probation: "",
      workNum: "",
      //   其他信息
      marrige_options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      marrige: "",
      study_options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      study: "",
      emergency: "",
    };
  },
  mounted() {},
  methods: {},
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
