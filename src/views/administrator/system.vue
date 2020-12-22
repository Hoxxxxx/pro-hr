<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList"></nav-Bar>
    <!-- 表格 -->
    <el-card class="listCard">
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
        <span class="title">身份证有效期提醒</span>
        <el-switch v-model="IDcard" :active-value="1" :inactive-value="0"> </el-switch>
      </div>
      <div class="tipsBox" style="margin-bottom:0;">
        <div>
          <span class="title">劳动合同到期提醒</span>
          <el-switch v-model="contract" :active-value="1" :inactive-value="0"> </el-switch>
        </div>
        <div class="flex_row ml20">
          <span class="title title_short">到期前</span>
          <el-input v-model="days" class="w50" placeholder=""></el-input>
          <span class="title_left">天</span>
        </div>
        <div class="flex_ul ml20">
          <span class="title title_short">提醒邮箱</span>
          <ul>
            <li
              v-for="(item, index) in mails"
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
                @click="addMail()"
              ></i>
              <i class="el-icon-remove delete" @click="deleteMail(index)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="tipsBox">
        <span class="title">试用期到期提醒</span>
        <el-switch v-model="trial" :active-value="1" :inactive-value="0"> </el-switch>
      </div>
    </el-card>
  </div>
</template>

<script>
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
      days: 0,
      trial: 0,
      mails: [],
      id:''
    };
  },
  mounted() {
    this.getSets()
    this.mails.push('');
  },
  methods: {
    getSets(){
      BASE_API.systemSets().then(res=>{
        if(res.status == 200){
          if(res.data != null){
            this.IDcard = res.data.card_is_enabled
            this.contract = res.data.laborcontract_is_enabled
            this.trial = res.data.trial_is_enabled
            this.days = res.data.deadline
            this.mails = res.data.notice_email
            this.id = res.data.id
          }
        }else{
          this.$message.error('设置信息获取失败！')
        }
      })
    },
    addMail() {
      this.mails.push({ mail: "" });
    },
    deleteMail(index){
      if(this.mails.length == 1){
        this.mails[0].mail = ''
      }else{
        this.mails.splice(index,1)
      }
    },
    save(){
      let params = {
        card_is_enabled:this.IDcard,
        laborcontract_is_enabled:this.contract,
        trial_is_enabled:this.trial,
        deadline:this.days,
        notice_email:this.mails,
        id:this.id
      }
      BASE_API.editSets(params).then(res=>{
        if(res.status == 200){
          this.$message.success('设置成功！')
          this.getSets()
        }else{
          this.$message.error('设置失败！')
        }
      })
    }
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/style/public.less");
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
  .delete{
    font-size: 22px;
    color: #F56C6C;
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
    width: 100px!important;
    margin-right: 0!important;
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
</style>
