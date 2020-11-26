<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <div class="searchBox">
          <el-select v-model="theadData.month" 
                            placeholder="请选择账期"
                            style="margin-right: 20px"
                            @change="getdepRecList">
            <el-option
              v-for="item in searchData.mon_Options"
              :key="item"
              :label="item + '月'"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="theadData.department_id" 
                            placeholder="请选择部门"
                            @change="getdepRecList">
            <el-option
              v-for="item in searchData.de_Options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="btns">
          <el-button type="primary" class="p40" @click="openDialog()">上传应收账款</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          ref="table"
          :data="tableData"
          v-loading = "searchData.searchLoading"
          element-loading-background = "rgba(0, 0, 0, 0.5)"
          element-loading-text = "数据正在加载中"
          element-loading-spinner = "el-icon-loading"
          style="width: 100%"
          :height="tableHeight"
          :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
          :cell-style="{background:'#FCFDFF',color:'#666666'}"
        >
          <el-table-column align="center" label="id" prop="id" fixed="left" min-width="50px"></el-table-column>
          <el-table-column align="center" label="年" prop="year" min-width="100px"></el-table-column>
          <el-table-column align="center" label="月" prop="month" min-width="100px"></el-table-column>
          <el-table-column align="center" label="客户编号" prop="customer_id	" min-width="100px"></el-table-column>
          <el-table-column align="center" label="客户名称" prop="customer_name" min-width="100px"></el-table-column>
          <el-table-column align="center" label="上期金额（万元）" prop="last_period_amount" min-width="100px"></el-table-column>
          <el-table-column align="center" label="本期增加（万元）" prop="current_period_increase" min-width="100px"></el-table-column>
          <el-table-column align="center" label="本期减少（万元）" prop="current_period_decrease" min-width="100px"></el-table-column>
          <el-table-column align="center" label="期末余额（万元）" prop="ending_balance" min-width="100px"></el-table-column>
          <el-table-column align="center" label="0-90天" prop="day_0_90" min-width="100px"></el-table-column>
          <el-table-column align="center" label="90-180天" prop="day_90_180	" min-width="100px"></el-table-column>
          <el-table-column align="center" label="180-270天" prop="day_180_270" min-width="100px"></el-table-column>
          <el-table-column align="center" label="270-365天" prop="day_270_365" min-width="100px"></el-table-column>
          <el-table-column align="center" label="1年以上" prop="over_year_1" min-width="100px"></el-table-column>
          <el-table-column align="center" label="1-2年" prop="over_year_1_2" min-width="100px"></el-table-column>
          <el-table-column align="center" label="2年以上" prop="over_year_2" min-width="100px"></el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 新增弹窗 -->
    <el-dialog 
      title="上传收入费用"
      :visible.sync="showDialog"
      width="668px">
      <el-form :model="uploadData" 
                      :rules="uploadRules" 
                      ref="uploadRef" 
                      label-width="100px">
        <el-form-item label="选择账期" prop="month">
          <el-select v-model="uploadData.month" 
                          placeholder="请选择账期"
                          style="width: 360px;
                                    margin: 0 20px 10px 0;
                                    border-radius: 4px;">
            <el-option
                v-for="item in allMonList"
                :key="item"
                :label="item + '月'"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="department_id">
          <div class="selectbox">
            <div class="selector" @click="selectDialog('BM')">
              {{uploadData.department}}
            </div>
          </div>
        </el-form-item>
        <el-form-item label="上传账单" prop="file_path">
          <el-upload
            class="upload_annex"
            :action="$store.state.upload_url"
            :headers="uploadParams.headers"
            :data="uploadParams.data"
            name="attachment[]"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="uploadParams.limit"
            :on-exceed="handleExceed"
            accept=".xls,.xlsx"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="extraBtns">
          <el-button style="width:95px;" @click="extraBtnClick(0)">取 消</el-button>
          <el-button style="width:95px;" @click="extraBtnClick(1)" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 数据选择弹出框 -->
    <SelectData
      :isLoading="dataSelect.selectLoading"
      :dialogTitle.sync="dataSelect.dialogTitle"
      :dialogVisible.sync="dataSelect.dialogVisible"
      :headList.sync="dataSelect.headList"
      :bodyData.sync="dataSelect.bodyData"
      :choosedData="dataSelect.choosedData"
      :editType.sync="dataSelect.editType"
      :searchApi="dataSelect.searchApi"
      :searchType="dataSelect.searchType"
      :searchParams="dataSelect.searchParams"
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>

  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import SelectData from "@/components/selectData";
//api
import { depRecInfo, depRecList, addDepRec } from '@/api/reconciliation'

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
          title: "财务管理",
        },
        {
          title: "部门应收账款",
        },
      ],
      title: "部门应收账款",
      tableHeight: 500,
      searchData: {
        searchLoading: true,
        de_Options: [],
        mon_Options: []
      },
      theadData: {
        month: '',
        department_id: '',
      },
      tableData: [],
      // 上传收入列表
      showDialog: false,
      allMonList: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      allDepList: [],
      //数据选择弹出框
      dataSelect: {
        editType:"entry",
        selectLoading:false,
        cur_input: "", // 当前点击的输入框
        dialogTitle: "数据选择", //当前弹框的title
        dialogVisible: false, //控制显示隐藏弹框
        headList: [], //表头
        bodyData: [], //表格数据
        choosedData: [], //选中的数据
        searchApi: "", //搜索框的接口地址
        searchParams:{},//搜索接口自带参数
        searchType:"",//搜索类型
        filter: [], //筛选条件
        keyMsg: [], //需要显示在顶部的数据
      },
      tableHead: {
        // 申请人
        head_BM: [
          { name: "id", title: "部门id" },
          { name: "name", title: "部门名称" },
          { name: "manager_name", title: "主管名称" },
        ],
      },
      uploadParams: {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        },
        data: {
          basket: ''
        },
        limit: 1,
      },
      uploadRules: {
        month:[
          { required: true, message: '请选择账期', trigger: 'change' },
        ],
        department_id:[
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
        file_path:[
          { required: true, message: '请上传账单', trigger: 'blur' },
        ],
      },
      fileList: [],
      uploadData: {
        month: '',
        department: '',
        department_id: '',
        file_path: ''
      },
    };
  },
  components: {
    navBar,
    SelectData,
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
      // console.log( this.tableHeight)
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 50
      }
    })  
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
  },
  created() {
    this.getSearchList()
  },
  methods: {
    // 获取账期及部门列表
    getSearchList() {
      depRecInfo().then(res => {
        if (res.status == 200) {
          this.searchData.mon_Options = res.data.month
          this.searchData.de_Options = res.data.department
          // 默认选择第一个
          if ( res.data.month !== null && res.data.month.length !== 0 ) {
            this.theadData.month = res.data.month[0]
          }
          if ( res.data.department !== null && res.data.department.length !== 0 ) {
            this.theadData.department_id = res.data.department[0].id
          }
          this.getdepRecList()
        } else {
          this.$message.error('获取检索信息失败：' + res.error.message)
        }
      })
    },
    // 获取收入列表
    getdepRecList() {
      this.searchData.searchLoading = true
      let params = {
        department_id: this.theadData.department_id,
        month: this.theadData.month,
      };
      depRecList(params).then(res => {
        if (res.status == 200) {
          this.tableData = res.data
          this.searchData.searchLoading = false
        }
      })
    },
    // ***************上传收入费用*************
    openDialog() {
      this.showDialog = true;
    },
    //select弹窗
    // 数据选择
    selectDialog(type,rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "BM":
          let filter_BM = [{ label: "", model_key_search: "name" },{ label: "page", model_key_search: "page", value: '1', disabled: true, hide: true}];
          this.dataSelect.filter = filter_BM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "hr/departments";
          this.dataSelect.headList = this.tableHead.head_BM;
          this.dataSelect.dialogTitle = "部门列表";
        break;
        default:
        return;
        break;
      }
    },
    selectCancel(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = val;
      this.dataSelect.choosedData = val;
    },
    selectSure(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = [];
      this.dataSelect.choosedData = val;
      if (val.length > 0) {
        switch (this.dataSelect.cur_input) {
          case "BM":
            this.uploadData.department_id = val[0].id;
            this.uploadData.department = val[0].name;
          break;
          default:
          return;
          break;
        }
      }
    },
    // 上传组件
    beforeAvatarUpload(file) {
      const isXls = file.type === "application/vnd.ms-excel";
      const isXlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isNull = file.type === '';
      const isLt5M = file.size / 1024 / 1024 < 5;

      if ( !isXls && !isXlsx && !isNull ) {
        this.$message.warning("上传文件仅限 xls / xlsx 格式!");
        return false;
      }
      if (!isLt5M) {
        this.$message.warning("上传文件大小不能超过 5MB!");
        return false;
      }
      else {
        this.uploadParams.data.basket = 'check'
      }
    },
    handleExceed() {
      this.$message.warning(`至多上传 ${ this.uploadParams.limit } 个文件！`)
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      if (response.data.length !== 0) {
        this.uploadData.file_path = response.data[0]
      } else {
        this.$message.error("数据库储存失败");
      }
    },
    // 移除前回调
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.uploadData.file_path = ''
    },
    
    // 0：取消； 1：确定
    extraBtnClick(type) {
      if (type == 0) {
        this.uploadData = {
          quarter: '',
          department: '',
          department_id: '',
          file_path: ''
        },
        this.fileList = []
        this.showDialog = false;
      } else if (type == 1) {
        this.$refs.uploadRef.validate(valid => {
          if(valid){
            addDepRec(this.uploadData)
            .then( res => {
              if (res.status == 200) {
                this.uploadData.file_path = ''
                this.fileList = []
                this.showDialog = false;
                this.$message.success("上传成功！" );
                // this.theadData.month = this.uploadData.month
                // this.theadData.department_id = this.uploadData.department_id
                this.getSearchList()
              } else {
                this.$message.error("上传失败：" + res.error.message);
              }
            })
          }
        })
      }
    },
    // *********************************
  


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
    .tableTitle {
      font-weight: bold;
    }

    .btns {
      position: absolute;
      right: 30px;
      .btn {
        color: #409efd;
        border-color: #409efd;
      }
      .p40 {
        padding: 12px 40px;
      }
    }
  }
}
.extraBtns {
  width: 100%;
  margin-top: 30px;
  width: 200px;
  margin: 0 auto;
}
.el-dialog {
  .selectbox {
    width: 360px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    padding: 0 15px;
  }
}
</style>
