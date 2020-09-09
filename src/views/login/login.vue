<template>
  <div class="login_container">
    <!-- 左侧边背景 -->
    <div class="left_container">
      <img src="@/assets/img/login/3.png" />
    </div>

    <!-- 右侧边容器 -->
    <div class="right_container">
      <div class="formBox">
        <!-- 登录表单 -->
        <el-form
          class="login_form"
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          autocomplete="on"
          label-position="left"
        >
          <!-- logo占位 -->
          <div class="logoBox"></div>
          <!-- title -->
          <div class="title-container">
            <h3 class="title">华录新媒人力资源</h3>
          </div>
          <!-- 账号 -->
          <el-form-item prop="name">
            <el-input
              ref="name"
              prefix-icon="el-icon-user"
              v-model="loginForm.name"
              placeholder="请输入用户名"
              name="name"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <!-- 密码 -->
          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <el-input
                ref="password"
                prefix-icon="el-icon-key"
                v-model="loginForm.password"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                show-password
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
              />
            </el-form-item>
          </el-tooltip>
          <!-- 登录btn -->
          <el-button type="primary" class="login_Btn" @click="login('loginFormRef')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// API
// import { login } from "@/api/userAuth";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        name: "root",
        password: "123456",
      },
      loginRules: {
        name: [{ required: true, message: "请输用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输密码", trigger: "blur" }],
      },
      capsTooltip: false,
      showDialog: false,
      otherQuery: {},
      refreshToken: null,
    };
  },

  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },

    login(loginFormRef) {
      this.$refs[loginFormRef].validate(async (valid) => {
        if (!valid) {
          this.$message.warning("请正确填写登录信息");
        } else {
          login(this.loginForm).then((result) => {
            if (result.status == "200") {
              // 写入权限id
              sessionStorage.setItem("token", result.data.token);
              // 写入过期时间
              var timestampNow = Date.parse(new Date()) / 1000;
              var timestampLater = timestampNow + result.data.expiresTime - 250;
              // var timestampLater = timestampNow + 20;
              sessionStorage.setItem("expiresTime", timestampLater);

              // 跳转页面
              this.$router.push("/");

              this.$message.success("登录成功");
            } else {
              this.$message.warning("登录失败：" + result.error.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../src/assets/style/base.less";

.login_container {
  width: 100%;
  min-width: 1440px;
  height: 100%;

  .left_container {
    position: fixed;
    width: 75.5%;
    height: 100%;
    background: #9ae6f6;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right_container {
    position: fixed;
    width: 24.5%;
    min-width: 460px;
    height: 100%;
    right: 0;
    background: #ffffff;

    .formBox {
      position: absolute;
      width: 80%;
      margin: 0 auto;
      top: 15%;
      left: 10%;

      .login_form {
        .logoBox {
          width: 90px;
          height: 90px;
          background: url("../../assets/img/logo.png") 5px 5px no-repeat;
          background-size: 80px 80px;
          border-radius: 50%;
          margin: 0 auto;
        }

        .title-container .title {
          font-family: @mac_m_bold;
          font-size: 40px;
          color: @point_d_blue;
          letter-spacing: 0;
          text-align: center;
          margin: 60px 0 100px 0;
        }

        .el-input /deep/ .el-input__inner {
          height: 60px;
          background: #f5f5f5;
          margin-bottom: 30px;
          border: none;
          border-radius: 10px;
          font-family: @mac_regular;
          font-size: 18px;
          color: #999999;
          letter-spacing: 0;
          line-height: 60px;
          padding-left: 66px;
          padding-right: 66px;
        }

        .el-input /deep/ .el-input__prefix {
          top: -10px;
          left: 25px;
        }

        .el-input /deep/ .el-input__clear {
          margin-top: -10px;
          margin-right: 30px;
        }

        .login_Btn {
          width: 100%;
          height: 60px;
          margin-top: 50px;
          margin-bottom: 30px;

          span {
            font-size: 18px;
            letter-spacing: 10px;
          }
        }
      }
    }
  }
}
</style> 