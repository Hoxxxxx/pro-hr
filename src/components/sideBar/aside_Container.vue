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
    >
      <div v-for="(item,index) in menuList" :key="index">
        <!-- 单级菜单 -->
        <div v-if="item.menuType == 0">
          <el-menu-item :index="item.path">
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
        <!-- 两级菜单 -->
        <div v-if="item.menuType == 1">
          <el-submenu :index="item.path">
            <template slot="title">
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(itm,idx) in item.children"
                :index="itm.path"
                :key="idx"
              >{{itm.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          title: "员工管理",
          path: "/staffManage",
          menuType: 0,
        },
        {
          title: "权限管理",
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
          ],
        },
        {
          title: "组织管理",
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
        {
          title: "回款单",
          path: "/backPayment",
          menuType: 0,
        },
      ],
    };
  },

  created() {},

  methods: {},
};
</script>

<style lang="less">
</style>