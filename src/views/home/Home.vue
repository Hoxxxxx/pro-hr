<template>
  <div class="home">
    <!-- 头部 -->
    <el-header>
      <header-Container></header-Container>
    </el-header>
    <!-- 主体 -->
    <div class="mainBox">
      <div class="asideBox">
        <aside-Container></aside-Container>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
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

  .mainBox{
    padding-top: 56px;
    height: calc(100% - 56px);
    min-height: 768px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .asideBox{
      width: 260px;
      height: 100%;
      background: #353e56;
      flex: 0 0 auto;
    }
    .main{
      flex: 1 1 auto;
      background: #f5f5f5;
      overflow-y: auto;
    }
  }

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
