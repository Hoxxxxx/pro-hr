<template>
  <div class="breadcrumbBox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="breadList[0].path">{{breadList[0].title}}</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadList.slice(1)"
        :key="index"
        :class="item.title == title ? 'now' : ''"
        >{{ item.title }}</el-breadcrumb-item
      > -->
      <el-breadcrumb-item
        v-for="(bread, index) in breads"
        :key="index"
        :to="bread.path"
        :class="index != breads.length - 1 ? 'point' : ''"
        >{{ bread.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  // props: ["breadList", "title"],
  data() {
    return {
      breads: [], // 路由集合
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    isHome(route) {
      return route.name === "home";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/", name: "首页" }].concat(matched);
      }
      this.breads = matched;
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumbBox {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  line-height: 12px;
}

.point/deep/ .el-breadcrumb__inner {
  font-weight: bold;
}
</style>