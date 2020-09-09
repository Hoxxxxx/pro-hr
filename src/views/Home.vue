<template>
  <div class="home">
    <!-- 头部 -->
    <el-header>
      <header-Container></header-Container>
    </el-header>
    <!-- 主体 -->
    <el-container class="body_container">
      <!-- 侧边栏 -->
      <el-aside>
        <aside-Container></aside-Container>
      </el-aside>
      <!-- 内容 -->
      <el-container class="main_container">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerContainer from "@/components/headBar/header_container";
import asideContainer from "@/components/sideBar/aside_Container";
export default {
  name: "Home",
  components: {
    headerContainer,
    asideContainer,
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  min-width: 1024px;
  height: 100%;
  min-height: 768px;

  .el-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 56px;
    z-index: 999;
    background: #353e56;
    height: 56px !important;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1);
  }
  .body_container {
    .el-aside {
      position: fixed;
      top: 56px;
      height: 100%;
      width: 242px !important;
      background-color: #353e56;
      z-index: 99;
    }

    .main_container {
      background-color: #f5f5f5;
      padding-top: 56px;
      padding-left: 242px;

      .el-main {
        padding: 0;
      }
    }
  }
}
</style>
