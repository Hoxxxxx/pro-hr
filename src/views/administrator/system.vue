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
        <el-switch v-model="IDcard"> </el-switch>
      </div>
      <div class="tipsBox">
        <div>
          <span class="title">劳动合同到期提醒</span>
          <el-switch v-model="contract"> </el-switch>
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
        <el-switch v-model="trial"> </el-switch>
      </div>
    </el-card>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
// api
import { PERMISSION_API } from "@/api/permission";
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
      IDcard: "",
      contract: "",
      days: "",
      trial: "",
      mails: [],
    };
  },
  mounted() {
    this.mails.push({ mail: "" });
  },
  methods: {
    addMail() {
      this.mails.push({ mail: "" });
      console.log(this.mails);
    },
    deleteMail(index){
      if(this.mails.length == 1){
        this.mails[0].mail = ''
      }else{
        this.mails.splice(index,1)
      }
    },
    save(){
      
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
    width: 60px;
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
