<template>
  <div class="staffManage">
    <nav-Bar v-if="$route.path !== '/OAcontractInfo'" :breadList="breadList" :title="title"></nav-Bar>
    <el-card class="formCard" :class="$route.path=='/OAcontractInfo'?'OA_listCard':''">
      <el-form :model="dataForm" 
                      :rules="rules"
                      ref="dataForm"
                      label-width="130px"
                      label-position="left"
                      class="payForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="department_id" style="height:40px">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataShow.department_name}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('BM')">
                    {{dataShow.department_name}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同编号" prop="number">
                <el-input v-model="dataForm.number" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同名称" prop="title">
                <el-input v-model="dataForm.title" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同金额（元）" prop="contract_value">
                <el-input v-model="dataForm.contract_value" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="归档日期" prop="archived_date">
                <el-date-picker
                  :disabled="pageType == 'check'"
                  v-model="dataForm.archived_date"
                  style="width: 100%"
                  type="date"
                  placeholder=""
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="合同类型" prop="contract_type">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataShow.contract_type_name}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('HTLX')">
                    {{dataShow.contract_type_name}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="副本数量" prop="copies_number">
                <el-input v-model="dataForm.copies_number" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="经办人" prop="operator">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataShow.operator_name}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('JBR')">
                    {{dataShow.operator_name}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位类型" prop="opposite_type">
                <el-select v-model="dataForm.opposite_type" 
                                :disabled="pageType == 'check'" 
                                placeholder=""
                                @change="oppositeChange()">
                  <el-option
                    v-for="item in opposite_type_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位名称" prop="opposite_id">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataShow.opposite_name}}
                </div>
                <div v-if="pageType!=='check' && dataForm.opposite_type==''" class="selectbox editNot" style="height:42px">
                  <span>请先选择单位类型</span>
                </div>
                <div v-if="pageType!=='check' && dataForm.opposite_type==1" class="selectbox">
                  <div class="selector" @click="selectDialog('GYS')">
                    {{dataShow.opposite_name}}
                  </div>
                </div>
                <div v-if="pageType!=='check' && dataForm.opposite_type==2" class="selectbox">
                  <div class="selector" @click="selectDialog('KH')">
                    {{dataShow.opposite_name}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同开始时间" prop="start_date">
                <el-date-picker
                  :disabled="pageType == 'check'"
                  v-model="dataForm.start_date"
                  style="width: 100%"
                  type="date"
                  placeholder=""
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同结束时间" prop="end_date">
                <el-date-picker
                  :disabled="pageType == 'check'"
                  v-model="dataForm.end_date"
                  style="width: 100%"
                  type="date"
                  placeholder=""
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="comment">
                <el-input v-model="dataForm.comment" 
                                :disabled="pageType == 'check'"
                                type="textarea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上传文件" prop="files">
                <!-- 已有文件部分 -->
                <div class="saveList" v-if="pageType!=='add'">
                  <div class="saveItem" v-for="(item, index) in saveList" :key="index">
                    <i class="el-icon-document" style="margin-right: 7px"></i>
                    <a style="cursor: pointer" @click="download(item.id, item.filename)"><span>{{ item.filename }}</span></a>
                    <div class="btnBox">
                      <el-button type="text" @click="download(item.id, item.filename)">下载</el-button>
                      <el-button type="text" @click="del_file(item.id, item.filename)" style="margin-left: 10px; color: #F56C6C">删除</el-button>
                    </div>
                  </div>
                </div>
                <el-upload
                  class="upload"
                  v-if="pageType!=='check'"
                  :disabled="pageType == 'check'"
                  :file-list="uploadParams.fileList"
                  :action="$store.state.upload_pic_url"
                  :headers="uploadParams.headers"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  accept=".pdf,.doc,.dox,.xls,.xlsx,.ppt,.pptx"
                  >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div class="btnBox">
        <div v-if="pageType=='add'" class="btns" style="width:280px">
          <el-button @click="btnClick(0)">取消</el-button>
          <el-button type="primary" @click="btnClick(1)">提交</el-button>
        </div>
        <div v-if="pageType=='edit'" class="btns" style="width:280px">
          <el-button @click="btnClick(2)">取消</el-button>
          <el-button type="primary" @click="btnClick(3)">提交</el-button>
        </div>
        <div v-if="pageType=='check'" class="btns" style="width:140px">
          <el-button @click="btnClick(2)">回到列表</el-button>
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
// api
import { addContract, contractInfo, editContract } from '@/api/contract'
// utils
import { OpenLoading } from "@/utils/utils.js";
// validate
import { validNameNoCN_only, validFloatNumber, validInt, } from '@/utils/validate'

export default {
  data() {

    const validateNoCN = (rule, value, callback) => {
      if (!validNameNoCN_only(value)) {
        callback(new Error('仅限非中文'))
      } else {
        callback()
      }
    }
    const validateFNumber = (rule, value, callback) => {
      if (!validFloatNumber(value)) {
        callback(new Error('仅限数字'))
      } else {
        callback()
      }
    }
    const validateIntNumber = (rule, value, callback) => {
      if (!validInt(value)) {
        callback(new Error('仅限整数'))
      } else {
        callback()
      }
    }

    return {
      // 面包屑
      breadList: [
        {
          path: "index",
          title: "合同列表",
        },
        {
          title: "新增合同",
        },
      ],
      title: "新增合同",
      // 页面类型
      overloading: '', //加载定时器
      staffId: this.$route.query.id,
      pageType: this.$route.query.pageType,
      // upload
      uploadParams: {
        headers: {
          Org_Id: sessionStorage.getItem('OrgId')
        },
        dialogVisible: false,
        picSrc: '',
        fileList: [],
      },
      // form
      dataForm: {
        id: '',
        department_id: '',
        number: '',
        title: '',
        contract_value: '',
        archived_date: '',
        contract_type: '',
        copies_number: '',
        operator: "",
        opposite_type: '',
        opposite_id: "",
        start_date: '',
        end_date: '',
        comment: '',
        files: []
      },
      dataShow: {
        department_name: "",
        contract_type_name: "",
        operator_name: "",
        opposite_name: "",
      },
      newfileList: [], // 新上传文件
      saveList: [], // 已有文件
      opposite_type_options: [{
        label: '供应商',
        value: 1
      },{
        label: '客户',
        value: 2
      }],
      rules: {
        department_id: [
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
        number: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { validator: validateNoCN, trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入合同名称', trigger: 'blur' },
        ],
        contract_value: [
          { required: true, message: '请输入合同金额（元）', trigger: 'blur' },
          { validator: validateFNumber, trigger: 'blur' }
        ],
        archived_date: [
          { required: true, message: '请输入归档日期', trigger: 'blur' },
        ],
        contract_type: [
          { required: true, message: '请选择合同类型', trigger: 'change' },
        ],
        copies_number: [
          { required: true, message: '请输入副本数量', trigger: 'blur' },
          { validator: validateIntNumber, trigger: 'blur' }
        ],
        operator: [
          { required: true, message: '请选择经办人', trigger: 'change' },
        ],
        opposite_type: [
          { required: true, message: '请选择单位类型', trigger: 'change' },
        ],
        opposite_id: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        start_date: [
          { required: true, message: '请选择合同开始时间', trigger: 'change' }
        ],
        end_date: [
          { required: true, message: '请选择合同结束时间', trigger: 'change' }
        ],
        files: [
          { required: true, message: '请上传文件', trigger: 'change' }
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
        head_BM: [
          { name: "id", title: "部门id" },
          { name: "name", title: "部门名称" },
        ],
        head_HTLX: [
          { name: "name", title: "合同类别" },
          { name: "number", title: "类别编号" },
          { name: "comment", title: "备注" },
        ],
        head_JBR: [
          { name: "id", title: "用户编号" },
          { name: "name", title: "用户名称" },
        ],
        head_GYS: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "简称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
          { name: "pmc56", title: "银行账号" },
          { name: "pmcud01", title: "开户银行" },
          { name: "pmcud04", title: "账户名称" },
        ],
        head_KH: [
          { name: "occ01", title: "客户编号" },
          { name: "occ02", title: "客户名称" },
        ],
      },

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
      if (this.pageType == 'add') {
        this.breadList[1].title = '新增合同'
        this.title = '新增合同'
      } else if (this.pageType == 'edit') {
        this.breadList[1].title = '编辑合同'
        this.title = '编辑合同'
        this.getContractInfo(this.staffId)
      } else if (this.pageType == 'check') {
        this.breadList[1].title = '查看合同'
        this.title = '查看合同'
        this.getContractInfo(this.staffId)
      }
    },
    // ****************upload*****************
    beforeAvatarUpload(file) {
      const isPDF = file.type === "application/pdf";
      const isDOC = file.type === "application/msword";
      const isDOCX = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isXLS = file.type === "application/vnd.ms-excel";
      const isXLSX = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isPPT = file.type === "application/vnd.ms-powerpoint";
      const isPPTX = file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const isNull = file.type === '';
      const isLt50M = file.size / 1024 / 1024 < 50;

      if (!isPDF && !isDOC && !isDOCX && !isXLS && !isXLSX && !isPPT && !isPPTX && !isNull) {
        this.$message.warning("上传文件仅限 pdf / doc / docx / xls / xlsx / ppt / pptx  格式!");
        return false;
      }
      if (!isLt50M) {
        this.$message.warning("上传文件大小不能超过 50MB!");
        return false;
      }
    },
    handleSuccess(response, file, fileList) {
      this.newfileList.push({
        id: response.data.id,
      })
      // console.log(this.newfileList)
    },
    handleRemove(file, fileList) {
      this.newfileList.forEach( (item, index) => {
        if (item.id == file.response.data.id) {
          this.newfileList.splice(1, index)
        }
      })
    },
    
    // 下载文件流
    async download(id, filename) {
      const { data: res } = await this.axios({
          method: 'get',
          url: `files/download/${id}`,
          responseType: "blob",
      })
      let fileName = filename;
      let fileType = {
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        pdf: 'application/pdf',
      }
      let type=fileName.split('.')[1];//获取文件后缀名
      let blob = new Blob([res],{
        type:fileType.type
      });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },

    del_file(id, filename) {
      this.$confirm(`确认删除文件：${filename}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataForm.files.forEach( (item, index) => {
          if (item.id == id) {
            this.dataForm.files.splice(index, 1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // *****************************************
    // ****************selectBox***************
    // 切换用户类型
    oppositeChange() {
      this.dataForm.opposite_id = ''
      this.dataShow.opposite_name = ''
    },
    // 数据选择
    selectDialog(type,rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "BM":
          let filter_BM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_BM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "oa/departments";
          this.dataSelect.headList = this.tableHead.head_BM;
          this.dataSelect.dialogTitle = "部门列表";
        break;
        case "HTLX":
          let filter_HTLX = [
            { label: "合同类别", model_key_search: "name" },
            { label: "", model_key_search: "page", value: '1', disabled: true, hide: true},];
          this.dataSelect.filter = filter_HTLX;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "hr/contracttypes";
          this.dataSelect.headList = this.tableHead.head_HTLX;
          this.dataSelect.dialogTitle = "合同类别列表";
        break;
        case "JBR":
          let filter_JBR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_JBR;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "oa/users";
          this.dataSelect.headList = this.tableHead.head_JBR;
          this.dataSelect.dialogTitle = "用户列表";
        break;
        case "GYS":
          let filter_GYS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_GYS;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.headList = this.tableHead.head_GYS;
          this.dataSelect.dialogTitle = "供应商列表";
        break;
        case "KH":
          let filter_KH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_KH;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_KH;
          this.dataSelect.dialogTitle = "供应商列表";
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
            this.dataForm.department_id = val[0].id;
            this.dataShow.department_name = val[0].name;
          break;
          case "HTLX":
            this.dataForm.contract_type = val[0].id;
            this.dataShow.contract_type_name = val[0].name;
          break;
          case "JBR":
            this.dataForm.operator = val[0].id;
            this.dataShow.operator_name = val[0].name;
          break;
          case "GYS":
            this.dataForm.opposite_id = val[0].pmc01;
            this.dataShow.opposite_name = val[0].pmc03;
          break;
          case "KH":
            this.dataForm.opposite_id = val[0].occ01;
            this.dataShow.opposite_name = val[0].occ02;
          break;
          default:
          return;
          break;
        }
      }
    },
    // ***************************************
    // 0:取消 /1:新增/2:取消编辑/3:提交编辑
    btnClick(type) {
      if (type == 0) {
        if (this.$route.path=='/OAcontractInfo') {
          this.$router.push('OAcontractList')
        } else {
          this.$router.push('contractList')
        }
      } 
      else if (type == 1) {
        // 赋值上传文件
        this.dataForm.files = this.newfileList
        this.$refs.dataForm.validate(valid => {
          if(valid){
            const loading = OpenLoading(this, 1)
            addContract(this.dataForm)
            .then( res => {
              if (res.status == 200) {
                // this.dataForm = res.data
                this.$message.success('新增成功！')
                setTimeout(() => {
                  if (this.$route.path=='/OAcontractInfo') {
                    this.$router.push('OAcontractList')
                  } else {
                    this.$router.push('contractList')
                  }
                },500)
              } else {
                this.$message.error('新增失败：' + res.error.message)
              }
              loading.close()
              clearTimeout(this.overloading)
            })
          }
        })
      }
      else if (type == 2) {
        if (this.$route.path=='/OAcontractInfo') {
          this.$router.push('OAcontractList')
        } else {
          this.$router.push('contractList')
        }
      } 
      else if (type == 3) {
        // 赋值上传文件
        this.dataForm.files = this.newfileList.concat(this.saveList)
        this.$refs.dataForm.validate(valid => {
          if(valid){
            const loading = OpenLoading(this, 1)
            editContract(this.dataForm)
            .then( res => {
              if (res.status == 200) {
                // this.dataForm = res.data
                this.$message.success('编辑成功！')
                setTimeout(() => {
                  if (this.$route.path=='/OAcontractInfo') {
                    this.$router.push('OAcontractList')
                  } else {
                    this.$router.push('contractList')
                  }
                },500)
              } else {
                this.$message.error('编辑失败：' + res.error.message)
              }
              loading.close()
              clearTimeout(this.overloading)
            })
          }
        })
      }
    },
    // ****************其他操作*****************
    // 获取详情
    getContractInfo(id) {
      const loading = OpenLoading(this, 1)
      contractInfo(id)
      .then( res => {
        if (res.status == 200) {
          this.dataForm = res.data,
          this.saveList = res.data.files,
          this.dataShow = {
            'department_name' : res.data.department_name,
            'contract_type_name' : res.data.contract_type_name,
            'operator_name' : res.data.operator_name,
            'opposite_name' : res.data.opposite_name,
          }
        } else {
          this.$message.error('获取详情失败：' + res.error.message)
        }
        loading.close()
        clearTimeout(this.overloading)
      })
    },

    // ***************************************

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
        display: flex;
        margin: 20px auto;
        .el-button {
          margin-right: 15px;
        }
      }
    }
  }
  .selectbox {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    .selector {
      box-sizing: border-box;
      padding-left: 15px;
    }
  }
}
.uploadList {
  width: 148px;
  height: 148px;
  cursor: pointer;
}
.confirmBox {
  width: 148px;
  height: 148px;
  background: url(../../../assets/img/unconfirm.png) no-repeat;
  background-size: 148px 148px;
  border-radius: 4px;
}
.confirmed {
  background: url(../../../assets/img/confirm.png) no-repeat;
  background-size: 148px 148px;
}
.upload /deep/ .el-upload-list {
  width: 300px;
}

.saveList {
  color: #606266;
  margin-bottom: 20px;

  .saveItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    line-height: 20px;
    margin-bottom: 4px;
    .btnBox {
      .el-button {
        padding: 0;
        margin-left: 15px;
      }
      float: right;
    }
  }
}


.OA_listCard {
  margin: 0 !important;
}
.OA_showSearch {
  margin-left: 0 !important;
}
.OA_searchCard {
  margin: 0 0 20px 0 !important;
}
</style>
