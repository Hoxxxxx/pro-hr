<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">收款冲账单详情</span>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <div class="info">
          <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox middlebox editNot">
                  {{ tableData.oaa03 }}
                </div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox middlebox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
        </div>
        <el-table
          :data="viewsList"
          style="width: 100%"
          :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
          :cell-style="{background:'#FCFDFF',color:'#666666'}"
        >
          <el-table-column align="center" label="冲帐单号" prop="oob01"></el-table-column>
          <el-table-column align="center" label="项次" prop="oob02"></el-table-column>
          <el-table-column align="center" label="借贷别。1：借，2：贷" prop="oob03"></el-table-column>
          <el-table-column align="center" label="参考单号" prop="oob06"></el-table-column>
          <el-table-column align="center" label="币别" prop="oob07"></el-table-column>
          <el-table-column align="center" label="汇率" prop="oob08"></el-table-column>
          <el-table-column align="center" label="原币金额" prop="oob09"></el-table-column>
          <el-table-column align="center" label="本币金额" prop="oob10"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import {strikeDetail} from '@/api/reconciliation'
export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/",
          title: "首页",
        },
        {
          title: "收款冲账单",
        },
        {
          title: "收款冲账单详情",
        },
      ],
      title: "收款冲账单详情",
      viewsList: [],
      id:"",
    };
  },
  created(){
    this.id = this.$route.query.id
    this.getstrikeDetail()
  },
  methods: {
    // 获取发票列表
    getstrikeDetail() {
      let params = {
        id:this.id
      }
      strikeDetail(params).then(res=>{
        if(res.status == 200 ){
          this.viewsList = res.data[0].oob
        }else{
          this.$message.error('列表获取失败！')
        }
      })
    },
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  height: 100%;
}

.listCard {
  margin: 20px;
  .clearfix {
    display: flex;
    align-items: center;
    position: relative;
  }
  .tableTitleBox {
    padding: 10px 0;
    .tableTitle {
      font-weight: bold;
    }
  }
}
</style>
