<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <div class="menuList">
      <ul>
        <li
          v-for="(item,index) in menuList"
          :key="index"
          :class="index == curIndex ? 'active' : ''"
          @click="changeStatus(index,item.id)"
        >
          <div class="index"></div>
          <div class="menuName">{{item.name}}</div>
        </li>
      </ul>
    </div>
    <!-- 基础信息 -->
    <el-card class="formCard" v-if="curIndex == 0">
      <!-- 基本信息 -->
      <div class="baseInfo">
        <span class="title">基本信息</span>
        <ul class="inputBox">
          <!-- 姓名/性别 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">姓名</span>
              </div>
              <div class="elInput">{{staffInfo.name}}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">姓别</span>
              </div>
              <div class="genderBox">
                <el-radio v-model="gender" :label="1" disabled border style="width:108px">男</el-radio>
                <el-radio v-model="gender" :label="2" disabled border style="width:108px">女</el-radio>
              </div>
            </div>
          </li>
          <!-- 手机号/身份证号 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">手机号</span>
              </div>
              <div class="elInput">{{staffInfo.mobile}}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">身份证号</span>
              </div>
              <div class="elInput">{{staffInfo.card}}</div>
            </div>
          </li>
          <!-- 出生日期/邮箱 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot"></span>
                <span class="label">出生日期</span>
              </div>
              <div class="elInput">{{staffInfo.birthday?staffInfo.birthday:'暂无'}}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">邮箱</span>
              </div>
              <div class="elInput">{{staffInfo.email ? staffInfo.email :'暂无'}}</div>
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
                <span class="label">员工状态</span>
              </div>
              <div class="elInput">{{staffInfo.status | status}}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">所属公司</span>
              </div>
              <div class="elInput msgInput">
                <span>{{staffInfo.company}}</span>
              </div>
            </div>
          </li>
          <!-- 部门/职位 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">部门</span>
              </div>
              <div class="elInput msgInput">
                <span v-for="(i,idx) in staffInfo.department" :key="idx">{{i.name}}</span>
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">职位</span>
              </div>
              <div class="elInput msgInput">
                <span v-for="(i,idx) in staffInfo.position" :key="idx">{{i.name}}</span>
              </div>
            </div>
          </li>
          <!-- 入职时间/转正时间 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">入职时间</span>
              </div>
              <div class="elInput">{{staffInfo.entry_time ? staffInfo.entry_time : '暂无'}}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">转正时间</span>
              </div>
              <div class="elInput">{{staffInfo.positive_time ? staffInfo.positive_time :'暂无'}}</div>
            </div>
          </li>
          <!-- 试用期/工号 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">试用期</span>
              </div>
              <div class="elInput">{{staffInfo.trial_period | trial}}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">工号</span>
              </div>
              <div class="elInput">{{staffInfo.job_number?staffInfo.job_number:'暂无'}}</div>
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
              <div class="elInput">{{staffInfo.marriage | marriage}}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学历</span>
              </div>
              <div class="elInput">{{staffInfo.education | education}}</div>
            </div>
          </li>
          <!-- 紧急联系人 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">紧急联系人</span>
              </div>
              <div class="elInput">{{staffInfo.emergency_contact}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="btnBox">
        <div class="btns">
          <el-button style="width:95px;" type="primary" @click="editMsg()">编辑</el-button>
        </div>
      </div>
    </el-card>
    <!-- 转正信息 -->
    <el-card class="formCard" v-if="curIndex == 1">
      <!-- 未转正时显示 -->
      <div v-if="staffInfo.status == 1">
        <!-- 转正信息填写 -->
        <div class="positiveEdit" v-if="positiveStatus != 0">
          <div class="baseInfo">
            <ul class="inputBox">
              <!-- 姓名/入职日期 -->
              <li>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">姓名</span>
                  </div>
                  <div class="elInput">{{staffInfo.name}}</div>
                </div>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">入职日期</span>
                  </div>
                  <div class="elInput">{{staffInfo.entry_time ? staffInfo.entry_time :'暂无'}}</div>
                </div>
              </li>
              <!-- 手机号 -->
              <li>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">手机号</span>
                  </div>
                  <div class="elInput">{{staffInfo.mobile}}</div>
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
                    v-model="positiveTime"
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
                :rows="25"
                placeholder="请输入内容"
                minlength="30"
                v-model="conclusion"
              ></el-input>
            </div>
            <div class="upload">
              <span class="label">附件</span>
              <el-upload
                class="upload-demo"
                action
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeUpload"
                :on-change="handleChange"
                :headers="header"
                :auto-upload="false"
                multiple
                :file-list="fileList"
              >
                <el-button size="small" type="primary" style="width:120px;">新增附件</el-button>
              </el-upload>
            </div>
          </div>
          <div class="btnBox">
            <div class="btns">
              <el-button style="width:95px;" @click="positive(0)">取消</el-button>
              <el-button style="width:95px;" type="primary" @click="positiveSave()">保存</el-button>
            </div>
          </div>
        </div>
        <!-- 未转正 -->
        <div class="positiveNull" v-if="positiveStatus == 0">
          <div>
            <img src="../../assets/img/dataNull.png" />
            <el-button style="width:95px;" type="primary" @click="positive(1)">转正</el-button>
          </div>
        </div>
      </div>
      <!-- 已经转正时显示 -->
      <div v-else>
        <!-- 转正信息填写 -->
        <div class="positiveEdit">
          <div class="baseInfo">
            <ul class="inputBox">
              <!-- 申请时间/试用期 -->
              <li>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">转正时间</span>
                  </div>
                  <div
                    class="elInput"
                  >{{staffInfo.positive ? staffInfo.positive.positive_time :'暂无'}}</div>
                </div>
                <!-- <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">试用期</span>
                  </div>
                  <div class="elInput">{{staffInfo.positive ? staffInfo.positive.id+'个月' :'暂无'}}</div>
                </div>-->
              </li>
            </ul>
          </div>
          <!-- 工作总结 -->
          <div class="baseInfo">
            <div class="conclusion">
              <span class="label">工作总结</span>
              <div class="turnover">{{staffInfo.positive?staffInfo.positive.summary:'暂无'}}</div>
            </div>
            <div class="upload">
              <span class="label">附件</span>
              <ul class="fileList" v-if="staffInfo.positive && staffInfo.positive.attachment_url">
                <li
                  v-for="(item,index) in JSON.parse(staffInfo.positive.attachment_url)"
                  :key="index"
                >
                  <span class="fileName">{{item}}</span>
                  <span class="fileDownload" @click="download(item)">下载</span>
                  <a :href="`http://luxy.hr.com/api/downfiles/index?file_name=${item}`">下载</a>
                </li>
              </ul>
              <span class="tips" v-else>无附件</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 离职信息 -->
    <el-card class="formCard" v-if="curIndex == 2">
      <div class="positiveEdit" v-if="staffInfo.status == 3">
        <div class="baseInfo">
          <ul class="inputBox">
            <!-- 离职类型/离职日期 -->
            <li>
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">离职类型</span>
                </div>
                <div
                  class="elInput"
                >{{staffInfo.turnover && staffInfo.turnover.turnover_type | turnover}}</div>
              </div>
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">离职日期</span>
                </div>
                <div class="elInput">{{staffInfo.turnover? staffInfo.turnover.turnover_time:'暂无'}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="baseInfo">
          <!-- 离职原因 -->
          <div class="conclusion">
            <span class="label">离职原因</span>
            <div class="turnover">{{staffInfo.turnover ? staffInfo.turnover.turnover_reason:'暂无'}}</div>
          </div>
        </div>
      </div>
      <div class="positiveEdit" v-else>
        <div v-if="turnoverStatus == 1">
          <div class="baseInfo">
            <ul class="inputBoxPositive turnover">
              <!-- 离职类型/离职日期 -->
              <li>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">离职类型</span>
                  </div>
                  <el-select
                    v-model="turnoverType"
                    placeholder="请选择离职类型"
                    style="width:370px"
                    class="elInput"
                  >
                    <el-option
                      v-for="item in turnoverType_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="itemBox">
                  <div class="labelBox">
                    <span class="label">离职日期</span>
                  </div>
                  <el-date-picker
                    v-model="turnoverTime"
                    type="date"
                    placeholder="选择离职时间"
                    style="width:370px"
                    class="elInput"
                  ></el-date-picker>
                </div>
              </li>
            </ul>
          </div>
          <div class="baseInfo">
            <!-- 离职原因 -->
            <div class="conclusion">
              <span class="label">离职原因</span>
              <el-input
                type="textarea"
                :rows="25"
                placeholder="请输入内容"
                minlength="30"
                v-model="turnoverReason"
              ></el-input>
            </div>
          </div>
          <div class="btnBox">
            <div class="btns">
              <el-button style="width:95px;" @click="turnover(0)">取消</el-button>
              <el-button style="width:95px;" type="primary" @click="saveTurnover()">确认离职</el-button>
            </div>
          </div>
        </div>
        <!-- 未离职 -->
        <div class="positiveNull" v-if="turnoverStatus == 0">
          <div>
            <img src="../../assets/img/dataNull.png" />
            <el-button style="width:95px;" type="primary" @click="turnover(1)">离职</el-button>
          </div>
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
  filters: {
    status(val) {
      switch (val) {
        case 0:
          return "在职";
          break;
        case 1:
          return "试用";
          break;
        case 2:
          return "正式";
          break;
        default:
          return "离职";
          break;
      }
    },
    trial(val) {
      if (val == 0) {
        return "无";
      } else {
        return val ? `${val}个月` : "暂无";
      }
    },
    marriage(val) {
      if (val == 0) {
        return "未婚";
      } else if (val == 1) {
        return "已婚";
      } else {
        return "暂无";
      }
    },
    education(val) {
      if (val == 0) {
        return "专科";
      } else if (val == 1) {
        return "本科";
      } else if (val == 2) {
        return "硕士";
      } else {
        return "暂无";
      }
    },
    turnover(val) {
      switch (val) {
        case 0:
          return "主动离职";
          break;
        case 1:
          return "被动离职";
          break;
        case 2:
          return "退休";
          break;
        default:
          return "暂无";
          break;
      }
    },
  },
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/staffManage",
          title: "员工管理",
        },
        {
          title: "员工信息",
        },
      ],
      title: "员工信息",
      menuList: [
        { name: "基础信息", id: 0 },
        { name: "转正信息", id: 1 },
        { name: "离职信息", id: 2 },
      ],
      curIndex: 0,
      gender: 1,
      staffInfo: {}, //员工信息
      staffId: "", //员工id
      // 转正信息填写部分数据
      positiveStatus: 0,
      positiveTime: "", //转正时间
      conclusion: "", //工作总结
      fileList: [], //附件
      // 离职数据
      turnoverStatus: 0,
      turnoverType_options: [
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
      turnoverType: null, //离职类型
      turnoverTime: "", //离职时间
      turnoverReason: "", //离职原因
    };
  },
  computed: {
    header() {
      let token = sessionStorage.getItem("token");
      return {
        Authorization: "Bearer " + token,
      };
    },
  },
  created() {
    this.staffId = this.$route.query.id;
    this.curIndex = this.$route.query.index ? this.$route.query.index : 0;
  },
  mounted() {
    this.getStaffInfo();
  },
  methods: {
    // 顶部菜单选择
    changeStatus(index, status) {
      this.curIndex = index;
    },
    // 编辑用户信息
    editMsg() {
      this.$router.push({
        path: "/staffAdd",
        query: {
          id: this.staffId,
          saveType: "edit",
        },
      });
    },
    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file, fileList) {
      return false;
    },
    // 获取员工信息
    getStaffInfo() {
      http.GET(`${configUrl.getStaffList}/${this.staffId}`).then((res) => {
        if (res.status == 0) {
          this.staffInfo = res.data;
          this.gender = res.data.sex;
          this.title = `员工信息 - ${res.data.name}`;
          console.log(this.staffInfo);
        } else {
          this.$message({
            message: "获取员工信息失败！",
            type: "warning",
          });
        }
      });
    },
    // 转正按钮点击
    positive(val) {
      this.positiveStatus = val;
    },
    // 保存转正信息
    positiveSave() {
      let that = this;
      let params = {
        uid: this.staffId,
        positive_time: this.positiveTime,
        summary: this.conclusion,
      };
      let formData = new FormData(); //  用FormData存放上传文件
      this.fileList.forEach((item) => {
        formData.append("attachment[]", item.raw);
      });
      formData.append("uid", params.uid);
      formData.append("positive_time", "2020-09-18");
      formData.append("summary", params.summary);
      switch (true) {
        case params.positive_time == "":
          this.$message({
            message: "请填写转正时间！",
            type: "warning",
          });
          break;
        case params.summary == "":
          this.$message({
            message: "请填写工作总结！",
            type: "warning",
          });
          break;
        default:
          http.POST(configUrl.positiveSave, formData).then((res) => {
            if (res.status == 0) {
              this.getStaffInfo();
              this.curIndex = 1;
              setTimeout(function () {
                that.$message({
                  message: "转正成功！",
                  type: "success",
                });
              }, 500);
            } else {
              setTimeout(function () {
                that.$message({
                  message: res.msg,
                  type: "warning",
                });
              }, 500);
            }
          });
          break;
      }
    },
    // 转正文件下载
    download(val) {
      console.log(val);
      let params = {
        file_name: val,
      };
      http.GET(configUrl.fileDownload, params).then((res) => {
          a.download = params.file_name;
          a.href = `http://luxy.hr.com/${params.file_name}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      });
    },
    // 离职按钮点击val
    turnover(val) {
      this.turnoverStatus = val;
    },
    // 保存离职信息
    saveTurnover() {
      let that = this;
      let params = {
        uid: this.staffId,
        turnover_type: this.turnoverType,
        turnover_time: this.turnoverTime,
        turnover_reason: this.turnoverReason,
      };
      switch (true) {
        case params.turnover_type == null:
          this.$message({
            message: "请选择离职类型",
            type: "warning",
          });
          break;
        case !params.turnover_time:
          this.$message({
            message: "请选择离职时间",
            type: "warning",
          });
          break;
        case !params.turnover_reason:
          this.$message({
            message: "请填写离职原因",
            type: "warning",
          });
          break;
        default:
          http.POST(configUrl.departure, params).then((res) => {
            if (res.status == 0) {
              this.getStaffInfo();
              this.curIndex = 2;
              setTimeout(function () {
                that.$message({
                  message: "离职成功！",
                  type: "success",
                });
              }, 500);
            } else {
              setTimeout(function () {
                that.$message({
                  message: res.msg,
                  type: "warning",
                });
              }, 500);
            }
          });
          break;
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
              height: 40px;
              padding: 0 15px;
              line-height: 40px;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              box-sizing: border-box;
              color: #909399;
              font-weight: 400;
            }
            .msgInput {
              span {
                margin-right: 20px;
                &:last-child {
                  margin-right: 0;
                }
              }
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
          margin-right: 8px;
        }
        .turnover {
          width: 100%;
          height: 500px;
          padding: 15px;
          line-height: 34px;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          color: #909399;
          font-weight: 400;
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

    .positiveNull {
      min-height: 650px;
      position: relative;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
