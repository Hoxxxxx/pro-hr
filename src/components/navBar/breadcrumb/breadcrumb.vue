<template>
  <div class="breadcrumbBox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="breadList[0].path">{{breadList[0].title}}</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item,index) in breadList.slice(1)"
        :key="index"
        v-bind:class="item.title==title ? 'now' : ''"
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ["breadList", "title"],

  // inheritAttrs: false,
};
</script>

<style lang="less" scoped>
@import "@/assets/style/base.less";

.breadcrumbBox {
  width: 100%;
  height: 12px;
  font-family: @mac_regular;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  line-height: 12px;
  margin-bottom: 14px;
}

.now /deep/ .el-breadcrumb__inner {
  font-weight: 700;
}
</style>