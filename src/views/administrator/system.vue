<template>
  <div class="staffManage">
    <nav-Bar v-if="$route.path !== '/OAsystem'" :breadList="breadList"></nav-Bar>
    <!-- 表格 -->
    <el-card class="listCard" :class="$route.path=='/OAsystem'?'OA_listCard':''">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">提醒设置</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="save()"
            >保存设置</el-button
          >
        </div>
      </div>
      <div class="tipsBox">
        <div>
          <span class="title">身份证有效期提醒</span>
          <el-switch
            v-model="IDcard"
            :active-value="1"
            :inactive-value="0"
            @change="change($event, 0)"
          >
          </el-switch>
        </div>
        <div v-if="IDcard == 1">
          <div class="flex_row ml20">
            <span class="title title_short">到期前</span>
            <el-input v-model="days_ID" class="w50" placeholder=""></el-input>
            <span class="title_left">天</span>
          </div>
          <div class="flex_ul ml20">
            <span class="title title_short">提醒邮箱</span>
            <ul>
              <li
                v-for="(item, index) in mails_ID"
                :key="index"
                class="flex_row_center mb10"
              >
                <el-input
                  v-model="item.mail"
                  class="w250 mr10"
                  placeholder="请输入邮箱地址"
                ></el-input>
                <i
                  class="el-icon-circle-plus plus"
                  v-if="index == 0"
                  @click="addMail(0)"
                ></i>
                <i
                  class="el-icon-remove delete"
                  @click="deleteMail(index, 'idCard')"
                ></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tipsBox" style="margin-bottom: 0">
        <div>
          <span class="title">劳动合同到期提醒</span>
          <el-switch
            v-model="contract"
            :active-value="1"
            :inactive-value="0"
            @change="change($event, 1)"
          >
          </el-switch>
        </div>
        <div v-if="contract == 1">
          <div class="flex_row ml20">
            <span class="title title_short">到期前</span>
            <el-input
              v-model="days_contract"
              class="w50"
              placeholder=""
            ></el-input>
            <span class="title_left">天</span>
          </div>
          <div class="flex_ul ml20">
            <span class="title title_short">提醒邮箱</span>
            <ul>
              <li
                v-for="(item, index) in mails_contract"
                :key="index"
                class="flex_row_center mb10"
              >
                <el-input
                  v-model="item.mail"
                  class="w250 mr10"
                  placeholder="请输入邮箱地址"
                ></el-input>
                <i
                  class="el-icon-circle-plus plus"
                  v-if="index == 0"
                  @click="addMail(1)"
                ></i>
                <i
                  class="el-icon-remove delete"
                  @click="deleteMail(index, 'contract')"
                ></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tipsBox">
        <div>
          <span class="title">试用期到期提醒</span>
          <el-switch
            v-model="trial"
            :active-value="1"
            :inactive-value="0"
            @change="change($event, 2)"
          >
          </el-switch>
        </div>
        <div v-if="trial == 1">
          <div class="flex_row ml20">
            <span class="title title_short">到期前</span>
            <el-input
              v-model="days_trial"
              class="w50"
              placeholder=""
            ></el-input>
            <span class="title_left">天</span>
          </div>
          <div class="flex_ul ml20">
            <span class="title title_short">提醒邮箱</span>
            <ul>
              <li
                v-for="(item, index) in mails_trial"
                :key="index"
                class="flex_row_center mb10"
              >
                <el-input
                  v-model="item.mail"
                  class="w250 mr10"
                  placeholder="请输入邮箱地址"
                ></el-input>
                <i
                  class="el-icon-circle-plus plus"
                  v-if="index == 0"
                  @click="addMail(2)"
                ></i>
                <i
                  class="el-icon-remove delete"
                  @click="deleteMail(index, 'trial')"
                ></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { OpenLoading } from "@/utils/utils.js";
import navBar from "@/components/navBar/navBar";
// api
import { BASE_API } from "@/api/baseApi";
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
          title: "系统设置",
        },
      ],
      IDcard: 0,
      contract: 0,
      trial: 0,
      days_ID: 0,
      days_contract: 0,
      days_trial: 0,
      mails_ID: [],
      mails_contract: [],
      mails_trial: [],
      id: "",
    };
  },
  mounted() {
    this.getSets();
  },
  methods: {
    getSets() {
      BASE_API.systemSets().then((res) => {
        if (res.status == 200) {
          if (res.data != null) {
            this.IDcard = res.data.card_is_enabled;
            this.contract = res.data.laborcontract_is_enabled;
            this.trial = res.data.trial_is_enabled;
            this.days_ID = res.data.card_deadline;
            this.days_contract = res.data.laborcontract_deadline;
            this.days_trial = res.data.trial_deadline;
            this.mails_trial = res.data.trial_notice_email;
            this.id = res.data.id;
            let cardTemp = [];
            let contTemp = [];
            let trialTemp = [];
            if (res.data.card_notice_email.length > 0) {
              res.data.card_notice_email.forEach((item) => {
                let temp = {};
                temp.mail = item;
                cardTemp.push(temp);
              });
              this.mails_ID = cardTemp;
            } else {
              this.mails_ID = [];
            }
            if (res.data.laborcontract_notice_email.length > 0) {
              res.data.laborcontract_notice_email.forEach((item) => {
                let temp = {};
                temp.mail = item;
                contTemp.push(temp);
              });
              this.mails_contract = contTemp;
            } else {
              this.mails_contract = [];
            }
            if (res.data.trial_notice_email.length > 0) {
              res.data.trial_notice_email.forEach((item) => {
                let temp = {};
                temp.mail = item;
                trialTemp.push(temp);
              });
              this.mails_trial = trialTemp;
            }else{
              this.mails_trial = [];
            }
          }
        } else {
          this.$message.error("设置信息获取失败！");
        }
      });
    },
    addMail(index) {
      switch (index) {
        case 0:
          this.mails_ID.push({ mail: "" });
          break;
        case 1:
          this.mails_contract.push({ mail: "" });
          break;
        case 2:
          this.mails_trial.push({ mail: "" });
          break;
        default:
          break;
      }
    },
    deleteMail(index, type) {
      switch (type) {
        case "idCard":
          if (this.mails_ID.length == 1) {
            this.mails_ID[0].mail = "";
          } else {
            this.mails_ID.splice(index, 1);
          }
          break;
        case "contract":
          if (this.mails_contract.length == 1) {
            this.mails_contract[0].mail = "";
          } else {
            this.mails_contract.splice(index, 1);
          }
          break;
        case "trial":
          if (this.mails_trial.length == 1) {
            this.mails_trial[0].mail = "";
          } else {
            this.mails_trial.splice(index, 1);
          }
          break;
        default:
          break;
      }
    },
    change($event, val) {
      switch (val) {
        case 0:
          if ($event == 0) {
            // this.mails_ID = [];
          } else {
            if (this.mails_ID.length == 0) {
              this.mails_ID.push({ mail: "" });
            }
          }
          break;
        case 1:
          if ($event == 0) {
            // this.mails_contract = [];
          } else {
            if (this.mails_contract.length == 0) {
              this.mails_contract.push({ mail: "" });
            }
          }
          break;
        case 2:
          if ($event == 0) {
            // this.mails_trial = [];
          } else {
            if (this.mails_trial.length == 0) {
              this.mails_trial.push({ mail: "" });
            }
          }
          break;
        default:
          break;
      }
    },
    save() {
      const loading = OpenLoading(this, 1)
      let params = {
        card_is_enabled: this.IDcard,
        laborcontract_is_enabled: this.contract,
        trial_is_enabled: this.trial,
        card_deadline: parseInt(this.days_ID),
        card_notice_email: this.mails_ID,
        laborcontract_deadline: parseInt(this.days_contract),
        laborcontract_notice_email: this.mails_contract,
        trial_deadline: parseInt(this.days_trial),
        trial_notice_email: this.mails_trial,
        id: this.id,
      };
      let temp_cardMail = [];
      let temp_contractMail = [];
      let temp_trialMail = [];
      if (this.mails_ID.length > 0) {
        this.mails_ID.forEach((item) => {
          temp_cardMail.push(item.mail);
        });
        params.card_notice_email = temp_cardMail;
      }else{
        params.card_notice_email = [];
      }
      if (this.mails_contract.length > 0) {
        this.mails_contract.forEach((item) => {
          temp_contractMail.push(item.mail);
        });
        params.laborcontract_notice_email = temp_contractMail;
      }else{
        params.laborcontract_notice_email = [];
      }
      if (this.mails_trial.length > 0) {
        this.mails_trial.forEach((item) => {
          temp_trialMail.push(item.mail);
        });
        params.trial_notice_email = temp_trialMail;
      }else{
        params.trial_notice_email = [];
      }
      BASE_API.editSets(params).then((res) => {
        if (res.status == 200) {
          this.$message.success("设置成功！");
          this.getSets();
        } else {
          this.$message.error("设置失败！");
        }
        loading.close()
        clearTimeout(this.overloading)
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
  height: 100%;

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
    }
    .btns {
      position: absolute;
      right: 0px;
      .btn {
        color: #409efd;
        border-color: #409efd;
      }
      .p40 {
        padding: 12px 40px;
      }
    }
  }

  .tipsBox {
    margin-bottom: 10px;
    .title {
      display: inline-block;
      text-align: right;
      width: 120px;
      margin-right: 20px;
      line-height: 40px;
    }
  }

  .flex_row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
  }
  .flex_ul {
    display: flex;
    flex-direction: row;
  }

  .flex_row_center {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .plus {
    font-size: 22px;
    color: #409eff;
    line-height: 40px;
    margin-right: 10px;
    cursor: pointer;
  }
  .delete {
    font-size: 22px;
    color: #f56c6c;
    line-height: 40px;
    cursor: pointer;
  }

  .w50 {
    width: 50px;
  }
  .w250 {
    width: 250px;
  }

  .title_left {
    margin-left: 20px;
  }

  .title_short {
    width: 100px !important;
    margin-right: 0 !important;
    padding-right: 20px;
  }

  .ml20 {
    margin-left: 20px;
  }
  .mb10 {
    margin-bottom: 10px;
  }
  .mr10 {
    margin-right: 10px;
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
