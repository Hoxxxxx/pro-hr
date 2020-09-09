<template>
  <div class="aside_container">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#353E56"
      text-color="#fff"
      active-text-color="#409EFD"
      :unique-opened="true"
      router
    >
      <el-menu-item :index="item.path" v-for="(item,index) in  menuList" :key="index">
        <span slot="title">{{item.title}}</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <span>组织管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="item in department" :index="item.path" :key="item.id">{{item.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          id: 0,
          title: "员工管理",
          path: "/staffManage",
        },
      ],
      department: [{
        id: 0,
        title: "部门管理",
        path: "/department",
      },{
        id: 1,
        title: "职位管理",
        path: "/position",
      }],
    };
  },

  created() {},

  methods: {},
};
</script>

<style lang="less">
</style>