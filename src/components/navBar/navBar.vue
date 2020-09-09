<template>
  <div class="navBox">
    <bread-Nav v-bind="$attrs" :title="title"></bread-Nav>
    <div class="titleBox">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
import breadNav from "./breadcrumb/breadcrumb";

export default {
  components: {
    breadNav,
  },

  props: ["title"],

  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import "@/../src/assets/style/base.less";

.navBox {
  width: 100%;
  height: 76px;
  background: #ffffff;
  box-sizing: border-box;
  padding-top: 15px;
  padding-left: 20px;
  margin-bottom: 20px;

  .titleBox {
    width: 100%;
    height: 20px;
    font-family: @mac_m_bold;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    line-height: 20px;
    font-weight: 900;
  }
}
</style>