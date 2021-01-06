<template>
  <div class="home">
    <!-- 头部 -->
    <el-header>
      <header-Container></header-Container>
    </el-header>
    <!-- 主体 -->
    <div class="mainBox">
      <div :class="isCollapse==false?'asideBox':'coll_Box'">
        <div class="collBtn" @click="changeSize">
          <i v-if="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-if="isCollapse" class="el-icon-d-arrow-right"></i>
        </div>
        <aside-Container :isCollapse="isCollapse"></aside-Container>
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
  data() {
    return {
      isCollapse: false,
    }
  },
  components: {
    headerContainer,
    asideContainer,
  },
  methods: {
    changeSize() {
      this.isCollapse = !this.isCollapse
    }
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  min-width: 1024px;
  height: 100%;
  // min-height: 768px;

  .mainBox{
    padding-top: 56px;
    height: calc(100% - 56px);
    // min-height: 768px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .asideBox{
      position: relative;
      width: 260px;
      background: #353e56;
    }
    .coll_Box{
      position: relative;
      width: 70px;
      background: #353e56;
    }
    .collBtn {
      background: #3c7db6;
      width: 100%;
      height: 35px;
      padding: 0;
      z-index: 999;
      text-align: center;
      line-height: 35px;
      cursor: pointer;
      color: #FFFFFF;
    }
    .main{
      flex: 1 1 auto;
      background: #f5f5f5;
      overflow-y: auto;
      overflow-y: overlay;
      margin-top: 35px;
      .staffManage{
        height: calc(100% - 56px);
      }
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
