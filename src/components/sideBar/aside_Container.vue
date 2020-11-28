<template>
  <div class="aside_container">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#353E56"
      text-color="#fff"
      active-text-color="#409EFD"
      :default-active="$route.path"
      :unique-opened="true"
      router
      :collapse="isCollapse"
    >
      <fragment v-for="(item,index) in menuList" :key="index">
        <!-- 单级菜单 -->
        <fragment v-if="item.menuType == 0">
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </fragment>
        <!-- 两级菜单 -->
        <fragment v-if="item.menuType == 1">
          <el-submenu :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(itm,idx) in item.children"
                :index="itm.path"
                :key="idx"
              >{{itm.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </fragment>
      </fragment>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: Boolean,
  },
  data() {
    return {
      menuList: [
        {
          title: "员工管理",
          icon: "el-icon-user-solid",
          path: "/staffManage",
          menuType: 0,
        },
        {
          title: "权限管理",
          icon: "el-icon-s-check",
          path: "/administrator",
          menuType: 1,
          children: [
            {
              id: 0,
              title: "管理员管理",
              path: "/admins",
            },
            {
              id: 1,
              title: "角色管理",
              path: "/roles",
            },
            {
              id: 1,
              title: "权限配置",
              path: "/permissions",
            },
            {
              id: 1,
              title: "菜单管理",
              path: "/menus",
            },
          ],
        },
        {
          title: "组织管理",
          icon: "el-icon-menu",
          path: "/organization",
          menuType: 1,
          children: [
            {
              id: 0,
              title: "部门管理",
              path: "/department",
            },
            {
              id: 1,
              title: "职位管理",
              path: "/position",
            },
          ],
        },
        {
          title: "财务管理",
          icon: "el-icon-s-finance",
          path: "/reconciliation",
          menuType: 1,
          children: [
            {
              id: 0,
              title: "收入费用情况",
              path: "/finance/income",
            },
            {
              id: 1,
              title: "应收账款核对",
              path: "/finance/receivable",
            },
            {
              id: 2,
              title: "部门应收账款",
              path: "/finance/depReceivable",
            },
          ],
        },
        // {
        //   title: "回款单",
        //   icon: "el-icon-s-order",
        //   path: "/backPayment",
        //   menuType: 0,
        // },
      ],
    };
  },

  created() {},

  methods: {
  },
};
</script>

<style lang="less">
.el-menu {
  width: 260px;
}
.el-menu--collapse {
  width: 70px;
}
.aside_container /deep/ .collapse-transition {
  -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
  transition: 0s height, 0s padding-top, 0s padding-bottom
}
 
.aside_container /deep/ .horizontal-collapse-transition {
  -webkit-transition: 0s width, 0s padding-left, 0s padding-right;
  transition: 0s width, 0s padding-left, 0s padding-right
}
 
.aside_container /deep/ .horizontal-collapse-transition .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transition: 0s;
  transition: 0s;
  opacity: 0
}
</style>