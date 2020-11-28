<template>
  <div class="header_container">
    <!-- logo -->
    <div class="logo"></div>
    <!-- 标题 -->
    <div class="title">
      <span>华录新媒管理系统</span>
    </div>
    <!-- 功能区 -->
    <div class="opration">
      <div class="more">
        <span class="tips">
          欢迎您,{{userInfo.name}}
        </span>
        <!-- <el-dropdown trigger="click" @command="userOption">
          <span class="el-dropdown-link">
            <i class="el-icon-s-operation"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="settings">设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
    </div>

    <!-- 编辑个人信息 -->
    <el-dialog
      title="个人信息设置"
      :visible.sync="minidialogVisible"
      :append-to-body="true"
      width="373px"
    >
      <el-form ref="userFormRef" :model="userForm" label-width="80px" label-position="left">
        <!-- name -->
        <el-form-item label="用户名">
          <el-input v-model="userForm.name" :disabled="!nameEdit"></el-input>
          <div v-if="!nameEdit">
            <el-button type="text" @click="nameEdit = !nameEdit">修改用户名</el-button>
          </div>
          <div v-if="nameEdit">
            <el-button type="text" @click="cancelEdit('name')">取消修改</el-button>
            <el-button type="text" @click="uploadEdit('name')">提交修改</el-button>
          </div>
        </el-form-item>
        <!-- email -->
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" :disabled="!emailEdit"></el-input>
          <div v-if="!emailEdit">
            <el-button type="text" @click="emailEdit = !emailEdit">修改邮箱</el-button>
          </div>
          <div v-if="emailEdit">
            <el-button type="text" @click="cancelEdit('email')">取消修改</el-button>
            <el-button type="text" @click="uploadEdit('email')">提交修改</el-button>
          </div>
        </el-form-item>
        <!-- password -->
        <el-form-item label="密码">
          <div v-if="!passwordEdit">
            <el-button type="text" @click="passwordEdit = !passwordEdit">修改密码</el-button>
          </div>
          <div v-if="passwordEdit">
            <el-input v-model="userForm.password" :disabled="!passwordEdit"></el-input>
            <el-button type="text" @click="cancelEdit('password')">取消修改</el-button>
            <el-button type="text" @click="uploadEdit('password')">提交修改</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// API
import {mapState} from 'vuex'
export default {
  data() {
    return {
      userName: "admin",
      minidialogVisible: false,
      userForm: {
        name: "",
        email: "",
        password: "",
      },
      nameEdit: false,
      emailEdit: false,
      passwordEdit: false,
    };
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      userInfo().then((result) => {
        if (result.status == "200") {
          (this.userForm.id = result.data.id),
            (this.userForm.name = result.data.name),
            (this.userForm.email = result.data.email),
            (this.minidialogVisible = true);
        }
      });
    },

    // 下拉框
    userOption(command) {
      // 用户设置
      if (command == "settings") {
        (this.nameEdit = false),
          (this.emailEdit = false),
          (this.passwordEdit = false);

        this.getUserInfo();
      }
      // 用户登出
      else if (command == "logout") {
        this.$confirm("退出后将需要重新登录系统, 是否退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 退出后台登录状态
            logout().then((result) => {
              if (result.status == "200") {
                // 删除缓存中token
                window.sessionStorage.clear();

                this.$router.push("/login");
                this.$message({
                  type: "success",
                  message: "退出成功!",
                });
              } else {
                // 删除缓存中token
                window.sessionStorage.clear();

                this.$router.push("/login");
                this.$message({
                  type: "success",
                  message: "退出成功!",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出",
            });
          });
      }
    },

    // 取消行内修改
    cancelEdit(data) {
      if (data == "name") {
        this.getUserInfo();
        this.nameEdit = false;
      } else if (data == "email") {
        this.getUserInfo();
        this.emailEdit = false;
      } else if (data == "password") {
        this.userForm.password = "";
        this.passwordEdit = false;
      }
    },

    // 提交行内修改
    uploadEdit(data) {
      updateUser(this.userForm).then((result) => {
        if (result.status == "200") {
          if (data == "name") {
            this.nameEdit = false;
          } else if (data == "email") {
            this.emailEdit = false;
          } else if (data == "password") {
            this.passwordEdit = false;
          }
          this.$message.success("修改成功！");
        } else {
          if (data == "name") {
            this.nameEdit = false;
          } else if (data == "email") {
            this.emailEdit = false;
          } else if (data == "password") {
            this.passwordEdit = false;
          }
          this.$message.warning("修改失败！" + result.error.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../src/assets/style/base.less";

.header_container {
  height: 56px;
  width: 100%;
  display: flex;
  line-height: 56px;
  position: relative;

  .logo {
    width: 50px;
    margin-left: 20px;
    background: url("../../assets/img/logo_white.png") no-repeat 0px 10px;
    background-size: 40px 40px;
  }

  .title {
    margin-left: 10px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
  }

  .opration {
    height: 56px;
    font-size: 24px;
    position: absolute;
    right: 40px;

    // div:hover {
    //   cursor: pointer;
    // }

    .userBox {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: lightskyblue;
      position: absolute;
      top: 50%;
      margin-top: -22px;
      right: 70px;
    }

    .more {
      .tips{
        font-size: 14px;
        color: #fff;
        letter-spacing: 1px;
      }
      .el-icon-s-operation {
        font-size: 24px;
      }
      .el-dropdown-menu {
        top: 52px;
        left: 2466px;
      }
    }
  }
}
</style>
