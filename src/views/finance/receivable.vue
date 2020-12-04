<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>

    <!-- 表格 -->
    <el-card class="listCard">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <div class="searchBox">
          <el-select v-model="theadData.year" 
                            placeholder="请选择年份"
                            style="margin-right: 20px"
                            @change="getRecList('year')">
            <el-option
              v-for="item in searchData.year_Options"
              :key="item"
              :label="item + '年'"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="theadData.quarter" 
                            placeholder="请选择账期"
                            style="margin-right: 20px"
                            @change="getRecList('quarter')">
            <el-option
              v-for="item in searchData.year_mon_Info[theadData.year]"
              :key="item"
              :label="'第' + item + '季度'"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="theadData.department_id" 
                            placeholder="请选择部门"
                            @change="getRecList('dep')">
            <el-option
              v-for="item in searchData.de_Options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="btns">
          <el-button v-if="testBtn('receivables.store')" type="primary" class="p40" @click="openDialog()">上传应收账款</el-button>
          <el-button v-if="testBtn('receivables.checkAccount') && !StartRec" type="primary" class="p40" :disabled="!can_StartRec" @click="startReceive()">发起对账</el-button>
          <el-button v-if="testBtn('receivables.checkAccount') && StartRec" type="info" class="p40" @click="cancelReceive()">取消对账</el-button>
          <el-button v-if="testBtn('receivables.checkAccount') && StartRec" type="success" class="p40" @click="addReceive()">完成对账</el-button>
          <el-button v-if="testBtn('receivables.checkAccount') && !StartRec" type="warning" class="p40" :disabled="!can_StartRec" @click="addReceive_arr()">批量对账</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <el-table
        ref="table"
        :data="tableData"
        class="recTable"
        v-loading = "searchData.searchLoading"
        element-loading-background = "rgba(0, 0, 0, 0.5)"
        element-loading-text = "数据正在加载中"
        element-loading-spinner = "el-icon-loading"
        style="width: 100%"
        :height="tableHeight"
        :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
        :cell-style="{background:'#FCFDFF',color:'#666666',padding:'0','line-height':'24px'}"
        :header-row-style="{height:'24px','font-size':'12px'}"
        :row-style="{height:'24px','font-size':'12px'}"
      >
        <el-table-column align="center" label="id" prop="id" fixed="left" min-width="50px"></el-table-column>
        <el-table-column align="center" label="客户/厂商简称" prop="name" min-width="100px"></el-table-column>
        <el-table-column align="center" label="客户/厂商全称" prop="full_name" min-width="150px"></el-table-column>
        <el-table-column align="center" label="期末余额" prop="ending_balance" min-width="100px"></el-table-column>
        <el-table-column align="center" label="开票时间" prop="invoice_date" min-width="100px"></el-table-column>
        <el-table-column align="center" label="账龄（1-3月）" prop="aging_1_3" min-width="100px"></el-table-column>
        <el-table-column align="center" label="账龄（4-6月）" prop="aging_4_6" min-width="100px"></el-table-column>
        <el-table-column align="center" label="账龄（7-9月）" prop="aging_7_9" min-width="100px"></el-table-column>
        <el-table-column align="center" label="账龄（10-12月）" prop="aging_10_12" min-width="100px"></el-table-column>
        <el-table-column align="center" label="账龄（1年以上）" prop="aging_over_year" min-width="100px"></el-table-column>
        <el-table-column align="center" label="备注" prop="remark" min-width="150px"></el-table-column>
        <el-table-column align="center" label="对账结果" width="120px"  fixed="right">
          <template slot-scope="scope">
            <div>
              <!-- 未对账 -->
              <div v-if="scope.row.status == '未对账'">
                <!-- 未发起 -->
                <div v-if="!StartRec">{{scope.row.status}}</div>
                <!-- 发起 -->
                <div v-else-if="StartRec" class="recBox">
                  <div v-if="!checked_suc.includes(scope.row.id) && !checked_den.includes(scope.row.id)" class="basic">
                    <div type="text" class="right" @click="agreeRec(scope.$index)">
                      <span><i class="el-icon-circle-check"></i>正确</span>
                    </div>
                    <div type="text" class="wrong" @click="denyRec(scope.$index)">
                      <span><i class="el-icon-circle-close"></i>有误</span>
                    </div>
                  </div>
                  <div v-if="checked_suc.includes(scope.row.id) || checked_den.includes(scope.row.id)" class="nowStatus">
                    <div v-if="scope.row.check_res == '正确'" class="sucess">
                      正确
                      <i class="return el-icon-refresh-left" @click="returnRec(scope.row.id)"></i>
                    </div>
                    <div v-if="scope.row.check_res == '有误'" class="deny">
                      有误
                      <i class="return el-icon-refresh-left" @click="returnRec(scope.row.id)"></i>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 已对账 -->
              <div v-else-if="scope.row.status !== '未对账'">
                <div v-if="scope.row.check_res == '正确'" class="sucess">
                  正确
                </div>
                <div v-if="scope.row.check_res == '有误'" class="deny">
                  有误
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增弹窗 -->
    <el-dialog 
      title="上传应收账款"
      :visible.sync="showDialog"
      width="668px">
      <el-form :model="uploadData" 
                      :rules="uploadRules" 
                      ref="uploadRef" 
                      label-width="100px">
        <el-form-item label="选择年份" prop="year">
          <el-date-picker
            v-model="uploadData.year"
            type="year"
            placeholder="请选择年份"
            format="yyyy 年"
            value-format="yyyy"
            style="width: 360px;
                        margin: 0 20px 10px 0;
                        border-radius: 4px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择账期" prop="quarter">
          <el-select v-model="uploadData.quarter" 
                          placeholder="请选择账期"
                          style="width: 360px;
                                    margin: 0 20px 10px 0;
                                    border-radius: 4px;">
            <el-option
                v-for="item in allQuaList"
                :key="item"
                :label="'第' + item + '季度'"
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

    <!-- 批量对账弹窗 -->
    <el-dialog 
      title="提示"
      :visible.sync="addDialogVisiable"
      width="478px">
      <div class="warning_img"></div>
      <div class="info">
        <span>是否确认所有应收账款数据核对一致？</span>
      </div>
      <div class="extraBtns">
          <el-button style="width:95px;" @click="arr_Cancel()">取 消</el-button>
          <el-button style="width:95px;" @click="arr_Sure()" type="primary">确 认</el-button>
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
import { receivablesInfo, receivablesList, addReceivables, checkReceivables } from '@/api/reconciliation'
import { testBtnAuth } from '@/utils/permission'

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
          title: "应收账款核对",
        },
      ],
      title: "应收账款核对",
      tableHeight: 500,
      searchData: {
        searchLoading: true,
        de_Options: [],
        quarter_Options: [],
        year_mon_Info: {},
        year_Options: [],
      },
      theadData: {
        year: '',
        quarter: '',
        department_id: '',
      },
      tableData: [],
      // 上传收入列表
      showDialog: false,
      allQuaList: ['1','2','3','4'],
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
        year:[
          { required: true, message: '请选择年份', trigger: 'change' },
        ],
        quarter:[
          { required: true, message: '请选择季度', trigger: 'change' },
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
        year: '',
        quarter: '',
        department: '',
        department_id: '',
        file_path: ''
      },
      // 发起对账相关数据
      can_StartRec: false,
      StartRec: false, // 0：未发起；1：发起
      checked_suc: [], // 通过列表
      checked_den: [], // 有误列表
      addDialogVisiable: false, //批量弹窗
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
    testBtn(name) {
      const res = testBtnAuth(name)
      return res
    },
    // 获取账期及部门列表
    getSearchList() {
      this.searchData.year_Options = []
      receivablesInfo().then(res => {
        this.searchData.searchLoading = false
        if (res.status == 200) {
          this.searchData.year_mon_Info = res.data.params
          this.searchData.de_Options = res.data.department
          for(let key in this.searchData.year_mon_Info){
            this.searchData.year_Options.push(key)
            this.searchData.year_Options.reverse()
          }
          // 默认选择第一个
          if ( this.searchData.year_Options !== null && this.searchData.year_Options.length !== 0 ) {
            this.theadData.year = this.searchData.year_Options[0]
            if ( this.searchData.year_mon_Info[this.theadData.year] !== null && this.searchData.year_mon_Info[this.theadData.year] !== 0 ) {
              this.theadData.quarter = this.searchData.year_mon_Info[this.theadData.year][0]
            }
          }
          if ( res.data.department !== null && res.data.department.length !== 0 ) {
            this.theadData.department_id = res.data.department[0].id
          }
          if (this.theadData.year !== '' && this.theadData.quarter !== '' && this.theadData.department_id !== '' ) {
            this.getRecList('year')
          } else {
            this.$message.warning('暂无数据')
          }
        } else {
          this.$message.error('获取检索信息失败：' + res.error.message)
        }
      })
    },
    // 获取收入列表
    getRecList(type) {
      this.can_StartRec = false
      this.cancelReceive()
      this.searchData.searchLoading = true
      if (type == 'year') {
        if ( this.searchData.year_mon_Info[this.theadData.year] !== null && this.searchData.year_mon_Info[this.theadData.year] !== 0 ) {
          this.theadData.quarter = this.searchData.year_mon_Info[this.theadData.year][0]
        }
      }
      let params = {
        year: this.theadData.year,
        quarter: this.theadData.quarter,
        department_id: this.theadData.department_id,
      };
      receivablesList(params).then(res => {
        if (res.status == 200) {
          this.tableData = res.data
          if (this.tableData !== null && this.tableData !== []) {
            this.tableData.forEach(item => {
              if (item.status == '未对账') {
                this.can_StartRec = true
              }
            })
          }
          this.searchData.searchLoading = false
        } else {
          this.searchData.searchLoading = false
          this.$message.error('查询失败：' + res.error.message)
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
          let filter_BM = [
            { label: "", model_key_search: "name" },
            { label: "", model_key_search: "page", value: '1', disabled: true, hide: true},
            { label: "", model_key_search: "is_paging", value: '0', disabled: true, hide: true},];
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
            addReceivables(this.uploadData)
            .then( res => {
              if (res.status == 200) {
                this.uploadData.file_path = ''
                this.fileList = []
                this.showDialog = false;
                this.$message.success("上传成功！" );
                // this.theadData.quarter = this.uploadData.quarter
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
    // **************对账**************
    // 发起对账
    startReceive() {
      this.StartRec = true
    },
    // 取消对账
    cancelReceive() {
      this.StartRec = 0
      this.checked_suc = []
      this.checked_den = []
    },
    // 通过
    agreeRec(index) {
      this.tableData[index].check_res = '正确'
      this.checked_suc.push(this.tableData[index].id)
    },
    // 拒绝
    denyRec(index) {
      this.tableData[index].check_res = '有误'
      this.checked_den.push(this.tableData[index].id)
    },
    returnRec(id) {
      this.checked_suc.forEach((item, index) => {
        if (item == id) {
          this.checked_suc.splice(index,1)
        }
      })
      this.checked_den.forEach((item, index) => {
        if (item == id) {
          this.checked_den.splice(index,1)
        }
      })
    },
    addReceive_arr() {
      this.addDialogVisiable = true
    },
    arr_Cancel() {
      this.addDialogVisiable = false
    },
    arr_Sure() {
      this.addDialogVisiable = false
      this.searchData.searchLoading = true
      const params = []
      this.tableData.forEach(item => {
        if (item.status == '未对账') {
          params.push({
            id: item.id,
            check_res: 2
          })
        }
      })
      checkReceivables(params)
      .then(res=> {
        this.searchData.searchLoading = false
        if (res.status == 200) {
          this.$message.success('对账成功！')
          this.getRecList()
        } else {
          this.$message.error("对账失败：" + res.error.message);
        }
      })
    },
    // 提交对账
    addReceive() {
      const params = []
      this.checked_suc.forEach(item => {
        params.push({
          id: item,
          check_res: 2
        })
      })
      this.checked_den.forEach(item => {
        params.push({
          id: item,
          check_res: 1
        })
      })
      if (params.length !== 0) {
        this.searchData.searchLoading = true
        checkReceivables(params)
        .then(res=> {
          this.searchData.searchLoading = false
          if (res.status == 200) {
            this.$message.success('对账成功！')
            this.getRecList()
          } else {
            this.$message.error("对账失败：" + res.error.message);
          }
        })
      } else {
        this.$message.info('未变更对账信息！')
        this.getRecList()
      }
    },

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
  .recTable /deep/ .cell {
    line-height: 24px !important;
  }
  // 对账
  .recBox {
    width: 120px;
    height: 24px;
    .nowStatus {
      position: relative;
      .return {
        position: absolute;
        right: 5px;
        line-height: 24px;
        cursor: pointer;
      }
    }
  }
  .basic {
    display: flex;
    width: 100%;
    .right,
    .wrong {
      width: 60px;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
    }
    .right {
      color: #6DD400;
    }
    .right:hover {
      background: #F2FFE3;
    }
    .wrong {
      color: #F56C6C;
    }
    .wrong:hover {
      background: #FFE3E3;
    }
  }
  .sucess {
    width: 100%;
    color: #FFFFFF;
    background: #6DD400;
  }
  .deny {
    width: 100%;
    color: #FFFFFF;
    background: #F56C6C;
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
.el-table /deep/ .cell {
  padding: 0;
}
// 批量弹窗
.warning_img {
  width: 40px;
  height: 40px;
  background: url(../../assets/img/warning.png);
  background-size: 40px 40px;
  margin: 0 auto;
}
.info {
  color: #7E8187;
  font-size: 16px;
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
}
</style>
