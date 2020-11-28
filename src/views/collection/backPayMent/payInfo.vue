<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <el-card class="formCard">
      <el-form :model="dataForm" 
                      :rules="rules"
                      ref="dataForm" 
                      label-width="100px" 
                      label-position="left"
                      class="payForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="图片" prop="upload_pic">
                <el-upload
                  :action="$store.state.upload_pic_url"
                  :headers="uploadParams.headers"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dataForm.pic" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流水号" prop="ssn">
                <el-input v-model="dataForm.ssn"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="银行" prop="bank">
                <div class="selectbox">
                  <div class="selector" @click="selectDialog('YH')">
                    {{dataForm.bank}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="客户" prop="customer">
                <div class="selectbox">
                  <div class="selector" @click="selectDialog('KH')">
                    {{dataForm.bank}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期" prop="date">
                <el-select v-model="dataForm.date" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="币种" prop="currency">
                <div class="selectbox">
                  <div class="selector" @click="selectDialog('BZ')">
                    {{dataForm.currency}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额" prop="amount">
                <el-input v-model="dataForm.amount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用途" prop="purpose">
                <el-input v-model="dataForm.purpose"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="摘要" prop="summary">
                <el-input v-model="dataForm.summary"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="所属部门" prop="department">
                <div class="selectbox">
                  <div class="selector" @click="selectDialog('BM')">
                    {{dataForm.department}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="集团凭证号" prop="jt_number">
                <el-input v-model="dataForm.jt_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div class="btnBox">
        <div class="btns">
          <el-button style="width:95px;" @click="addStaff(0)">取消</el-button>
          <el-button
            style="width:95px;"
            type="primary"
            @click="addStaff(1)"
          >提交</el-button>
        </div>
      </div>
    </el-card>

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

export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "index",
          title: "回款单列表",
        },
        {
          title: "新增回款单",
        },
      ],
      title: "新增回款单",
      // 页面类型
      editType: 'add',
      // upload
      uploadParams: {
        headers: {
          Org_Id: sessionStorage.getItem('OrgId')
        },
      },
      // form
      dataForm: {
        pic: '',
        bank: '',
        ssn: '',
        jt_number: '',
        purpose: '',
        summary: '',
        amount: '',
        currency: '',
        date: '',
        customer: '',
        confirmed: '',
        department: ''
      },
      rules: {
        bank: [
          { required: true, message: '请选择银行', trigger: 'change' },
        ],
        amount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
        ],
        ssn: [
          { required: true, message: '请输入流水号', trigger: 'blur' }
        ],
        jt_number: [
        ],
        purpose: [
        ],
        summary: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        currency: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        customer: [
          { required: true, message: '请输入客户编码', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
      },
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



      dialogVisible: false,
      
    };
  },
  components: {
    navBar,
    SelectData,
  },
  created() {
    this.initPage()
  },
  methods: {
    // **************** init ********************
    initPage() {
      this.staffId = this.$route.query.id;
      if (this.staffId && this.staffId !== "") {
        this.editType = 'edit'
        this.breadList[1].title = '编辑回款单'
      } else {
        this.editType = 'add'
        this.breadList[1].title = '新增回款单'
      }
    },
    // ****************upload*****************
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dataForm.pic = file.url;
      this.dialogVisible = true;
    },
    // *****************************************
    // ****************selectBox***************
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
    // ***************************************

    addStaff(type) {
      if (type == 0) {
        history.go(-1);
      } else {
        this.$refs.dataForm.validate(valid => {
          if(valid){
            console.log('1')
          }
        })
      }
    },
    //保存添加
    saveAdd(val) {
      let that = this;
      if (this.saveType == "edit") {
        http.PUT(`/api/users/${this.staffId}`, val).then((res) => {
          if (res.status == 0) {
            this.$message({
              message: "保存成功！",
              type: "success",
            });
            setTimeout(function () {
              history.go(-1);
            }, 500);
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        });
      } else {
        http.POST(configUrl.addStaff, val).then((res) => {
          if (res.status == 0) {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            setTimeout(function () {
              history.go(-1);
            }, 500);
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        });
      }
    },
    // 获取部门列表
    getDepart(val) {
      let params = {
        company_id: val ? val : this.company
      };
      http.GET(configUrl.getDepartments, params).then((res) => {
        this.department_options = res.data;
      });
    },
    // 获取职位列表
    getJobs(val) {
      let params = {
        company_id: val ? val : this.company
      };
      http.GET(configUrl.getJobs, params).then((res) => {
        this.job_options = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  .formCard {
    margin: 20px;
    .title {
      font-size: 16px;
      color: #999999;
    }
    .payForm {
      /deep/ .el-form-item__label {
        color: #333333;
        font-size: 15px;
        font-weight: 600;
      }
      .el-form-item {
        min-width: 356px;
        margin-right: 126px;
      }
      /deep/ .el-select {
        width: 100%;
      }
    }
    .btnBox {
      .btns {
        width: 210px;
        display: flex;
        margin: 20px auto;
      }
    }
  }
  .selectbox {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    .selector {
      padding: 0;
    }
  }
}
</style>
