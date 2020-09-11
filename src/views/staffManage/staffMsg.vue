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
    <el-card class="formCard">
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
              <div class="elInput">具体信息</div>
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
               <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">身份证号</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 出生日期/邮箱 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot"></span>
                <span class="label">出生日期</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">邮箱</span>
              </div>
               <div class="elInput">具体信息</div>
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
               <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">所属公司</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 部门/职位 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">部门</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">职位</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 入职时间/转正时间 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">入职时间</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">转正时间</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 试用期/工号 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">试用期</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">工号</span>
              </div>
               <div class="elInput">具体信息</div>
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
               <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学历</span>
              </div>
               <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 紧急联系人 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">紧急联系人</span>
              </div>
               <div class="elInput">具体信息</div>
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
          title: "员工信息",
        },
      ],
      title: "员工信息 -- 某某",
      menuList: [
        { name: "基础信息", id: 0 },
        { name: "转正信息", id: 1 },
        { name: "离职信息", id: 2 },
      ],
      curIndex: 0,
      gender:1,
    };
  },
  mounted() {},
  methods: {
    // 顶部菜单选择
    changeStatus(index, status) {
      this.curIndex = index;
    },
    editMsg(){
        this.$router.push({
            path:'/staffAdd'
        })
    }
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
              height: 40px;
              padding: 0 15px;
              line-height: 40px;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              box-sizing: border-box;
              color: #909399;
              font-weight: 400;
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
