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
          <el-menu-item :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </fragment>
        <!-- 两级菜单 -->
        <fragment v-if="item.menuType == 1">
          <el-submenu :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(itm,idx) in item.sub"
                :index="itm.url"
                :key="idx"
              >{{itm.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </fragment>
      </fragment>
    </el-menu>
  </div>
</template>

<script>
import { MENUS_API } from "@/api/menus";
export default {
  props: {
    isCollapse: Boolean,
  },
  data() {
    return {
      menuList: [
      //   {
      //     name: "员工管理",
      //     icon: "el-icon-user-solid",
      //     url: "/staffManage",
      //     menuType: 0,
      //   },
      //   {
      //     name: "权限管理",
      //     icon: "el-icon-s-check",
      //     url: "/administrator",
      //     menuType: 1,
      //     sub: [
      //       {
      //         id: 0,
      //         name: "管理员管理",
      //         url: "/admins",
      //       },
      //       {
      //         id: 1,
      //         name: "角色管理",
      //         url: "/roles",
      //       },
      //       {
      //         id: 1,
      //         name: "权限配置",
      //         url: "/permissions",
      //       },
      //       {
      //         id: 1,
      //         name: "菜单管理",
      //         url: "/menus",
      //       },
      //     ],
      //   },
      //   {
      //     name: "组织管理",
      //     icon: "el-icon-menu",
      //     url: "/organization",
      //     menuType: 1,
      //     sub: [
      //       {
      //         id: 0,
      //         name: "部门管理",
      //         url: "/department",
      //       },
      //       {
      //         id: 1,
      //         name: "职位管理",
      //         url: "/position",
      //       },
      //     ],
      //   },
      //   {
      //     name: "财务管理",
      //     icon: "el-icon-s-finance",
      //     url: "/reconciliation",
      //     menuType: 1,
      //     sub: [
      //       {
      //         id: 0,
      //         name: "收入费用情况",
      //         url: "/finance/income",
      //       },
      //       {
      //         id: 1,
      //         name: "应收账款核对",
      //         url: "/finance/receivable",
      //       },
      //       {
      //         id: 2,
      //         name: "部门应收账款",
      //         url: "/finance/depReceivable",
      //       },
      //     ],
      //   },
      //   {
      //     name: "收款管理",
      //     icon: "el-icon-s-cooperation",
      //     url: "/collection",
      //     menuType: 1,
      //     sub: [
      //       {
      //         id: 0,
      //         name: "回款单管理",
      //         url: "/collection/backPayment/index",
      //       },
      //       {
      //         id: 0,
      //         name: "发货单管理",
      //         url: "/collection/deliver/list",
      //       },
      //       {
      //         id: 0,
      //         name: "发票申请管理",
      //         url: "/collection/invoice/list",
      //       },
      //       {
      //         id: 0,
      //         name: "收款冲账单",
      //         url: "/collection/strike/list",
      //       },
      //     ],
      //   }
      ],
    };
  },

  created() {
    this.getMenus()
  },

  methods: {
    getMenus(){
      MENUS_API.getPerMenu().then(res=>{
        res.data.forEach(item=>{
          if(item.sub.length == 0){
            this.$set(item,'menuType',0)
          }else{
            this.$set(item,'menuType',1)
          }
        })
        this.menuList = res.data
      })
    }
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