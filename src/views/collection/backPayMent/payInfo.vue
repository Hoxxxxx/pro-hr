<template>
  <div class="staffManage">
    <nav-Bar v-if="$route.path !== '/OApayInfo'" :breadList="breadList" :title="title"></nav-Bar>
    <el-card class="formCard" :class="$route.path=='/OApayInfo'?'OA_listCard':''">
      <el-form :model="dataForm" 
                      :rules="rules"
                      ref="dataForm"
                      label-width="100px"
                      label-position="left"
                      class="payForm">
          <el-row>
            <el-col :span="10" style="height: 148px;  margin-bottom: 22px;">
              <el-form-item label="图片" prop="upload_pic" style="margin-right: 0;">
                <!-- <el-button type="primary" @click="checkSSN">跳转测试</el-button> -->
                <!-- 上传imgbox -->
                <el-upload
                  v-if="pageType!=='check'"
                  :disabled="pageType == 'check'" 
                  :file-list="uploadParams.fileList"
                  :action="$store.state.upload_scan"
                  :headers="uploadParams.headers"
                  list-type="picture-card"
                  :limit="1"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-exceed="handleExceed"
                  :on-change="handleChange"
                  accept=".png,.jpg,.jpeg">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <!-- check时imgbox -->
                <div class="uploadList" v-if="pageType=='check' && uploadParams.picSrc!==''" @click="handlePictureCardPreview">
                  <el-image
                    style="width: 148px; height: 148px"
                    :src="uploadParams.picSrc"
                    fit="fill">
                  </el-image>
                </div>
                <!-- 预览弹窗 -->
                <el-dialog :visible.sync="uploadParams.dialogVisible">
                  <img width="100%" :src="uploadParams.picSrc" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <div v-show="!showOcr" style="width: 10px; height:148px"></div>
              <!-- ocr结果 -->
              <div class="show_ocr" v-show="showOcr">
                <p class="title">识别结果</p>
                <p class="info" v-for="(value,key,index) in show_ocr" :key="index">
                  <span>{{key}} &nbsp; : &nbsp; {{value}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="5">
              <el-form-item label="审核否" v-if="breakUp==false">
                <div class="confirmBox" :class="dataForm.confirmed==1?'confirmed':''"></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="流水号" prop="ssn">
                <el-input v-model="dataForm.ssn" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="银行" prop="bank">
                <el-select v-model="dataForm.bank" filterable placeholder="请选择银行" :disabled="pageType == 'check'">
                  <el-option
                    v-for="item in YH_List"
                    :key="item.nma01"
                    :label="item.nma01 + ' ' + item.nma02"
                    :value="item.nma01">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item :label="breakUp==true?'付款方':'客户'" prop="customer">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataForm.customer_show}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('KH')">
                    {{dataForm.customer_show}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期" prop="date">
                <el-date-picker
                  :disabled="pageType == 'check'"
                  v-model="dataForm.date"
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
              <el-form-item label="币种" prop="currency">
                <el-select v-model="dataForm.currency" filterable placeholder="请选择币种" :disabled="pageType == 'check'">
                  <el-option
                    v-for="item in BZ_List"
                    :key="item.azi01"
                    :label="item.azi01 + ' ' + item.azi02"
                    :value="item.azi01">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="breakUp==true?'总金额':'金额'" prop="amount">
                <el-input v-model="dataForm.amount" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用途" prop="purpose">
                <el-input v-model="dataForm.purpose" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="摘要" prop="summary">
                <el-input v-model="dataForm.summary" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="所属部门" prop="department">
                <el-select v-model="dataForm.department" filterable placeholder="请选择部门" :disabled="pageType == 'check'">
                  <el-option
                    v-for="item in BM_List"
                    :key="item.gem01"
                    :label="item.gem01 + ' ' + item.gem02"
                    :value="item.gem01">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="集团作业号" prop="jt_number" v-if="breakUp==false">
                <el-input v-model="dataForm.jt_number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" v-if="pageType=='add'">
              <el-form-item label="是否分拆" prop="breakUp">
                <el-switch v-model="breakUp" @change="breakChange"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table
                v-loading="breakLoading"
                element-loading-text="加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.2)"
                v-if="breakUp==true"
                :data="breakTable"
                style="width: 100%"
                :cell-style="{ background: '#fff', color: '#666666', padding: 0 }"
                :row-style="{height: '40px'}"
                :header-cell-class-name="must_oaf"
                border
              >
                <el-table-column
                  prop="id"
                  label="增 / 删"
                  fixed="left"
                  width="100px"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div>
                      <div style="font-size: 24px; width: 100%; height: 100%">
                        <i
                          v-if="scope.$index == breakTable.length - 1"
                          @click="addRow()"
                          class="el-icon-circle-plus"
                          style="color: #409efd; width: 30px; cursor: pointer"
                        ></i>
                        <i
                          @click="deleteRow(scope.$index)"
                          class="el-icon-remove"
                          style="color: #f56c6c; width: 30px; cursor: pointer"
                        ></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  type="index"
                  label="序号"
                  width="55px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="customer"
                  label="客户"
                  min-width="160px"
                  align="center"
                >
                  <template slot-scope="scope">
                    <!-- <el-select 
                      class="break_input" 
                      v-model="scope.row.customer" 
                      filterable
                      placeholder="请选择客户" 
                      @focus="handleFocus"
                      :disabled="pageType == 'check'">
                      <el-option
                        v-for="item in KH_options"
                        :key="item.occ01"
                        :label="item.occ01 + ' ' + item.occ02"
                        :value="item.occ01">
                      </el-option>
                    </el-select> -->
                    <div v-if="pageType=='check'" class="editNot" style="height:40px">
                      {{scope.row.customer_show}}
                    </div>
                    <div v-if="pageType!=='check'">
                      <div class="selector" @click="selectDialog('break_KH', scope.$index)">
                        {{scope.row.customer_show}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="金额"
                  min-width="130px"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input class="break_input" v-model="scope.row.amount" :disabled="pageType == 'check'"></el-input>
                  </template>
                </el-table-column>
              </el-table>
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
        <div v-if="pageType=='check'" class="btns" style="width:666px">
          <el-button @click="btnClick(2)">回到列表</el-button>
          <el-button type="primary" @click="btnClick(4)">修改</el-button>
          <el-button type="danger" @click="btnClick(5)">删除</el-button>
          <el-button type="success" @click="btnClick(6)" v-if="dataForm.confirmed!==1 && dataForm.confirmed!==''">审核</el-button>
          <el-button type="warning" @click="btnClick(7)" v-if="dataForm.confirmed==1">取消审核</el-button>
          <el-button @click="btnClick(8)">抛转全媒体</el-button>
          <el-button @click="btnClick(9)">抛转全票通</el-button>
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

    <!-- 分拆弹窗 -->
    <el-dialog 
      :title="breakFinish?'分拆结束':'分拆中'"
      :visible.sync="showDialog"
      width="668px"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div class="breakContent">
        <p v-for="(item, index) in resList" :key="index">
          <span style="margin-right: 15px">客户：{{item.customer_show}}</span>
          <span style="margin-right: 15px">金额：{{item.amount}}</span>
          <i class="el-icon-loading" v-if="eachRes[index].reqLoading"></i>
          <span class="suc" v-if="!eachRes[index].reqLoading && eachRes[index].break">分拆完成</span>
          <span class="err" v-if="!eachRes[index].reqLoading && !eachRes[index].break">分拆失败</span>
          <span class="loading" v-if="!eachRes[index].reqLoading && eachRes[index].trans=='loading'">
            审核中<i class="el-icon-loading"></i>
          </span>
          <span class="suc" v-if="!eachRes[index].reqLoading && eachRes[index].trans=='suc'">审核成功</span>
          <span class="err" v-if="!eachRes[index].reqLoading && eachRes[index].trans=='err'">审核失败</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer" v-if="breakFinish">
        <el-button type="primary" @click="checkSSN(dataForm.ssn)">查看分拆结果</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import SelectData from "@/components/selectData";
// api
import { addCollList, transAdd, collInfo, transPar, can_Trans, editColl, delColl, downloadPic, YHList, BZList, BMList, KHList } from "@/api/collection";
// utils
import { OpenLoading } from "@/utils/utils.js";

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
      overloading: '', //加载定时器
      staffId: this.$route.query.id,
      pageType: this.$route.query.pageType?this.$route.query.pageType:'add',
      // upload
      uploadParams: {
        headers: {
          'Org-Id': sessionStorage.getItem('OrgId'),
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        },
        dialogVisible: false,
        picSrc: '', //图片预览地址
        fileList: [],
      },
      showOcr: false,
      show_ocr: {},
      // form
      dataForm: {
        id: '',
        jt_number: '',
        confirmed: '',
        pic: '',
        bank: '',
        ssn: '',
        purpose: '',
        summary: '',
        amount: '',
        currency: '',
        date: '',
        customer: '',
        customer_show: '',
        department: '',
      },
      KH_List: [],
      YH_List: [],
      BZ_List: [],
      BM_List: [],
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
          { required: true, message: '请选择客户', trigger: 'change' }
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
        head_KH: [
          { name: "occ01", title: "客户编号" },
          { name: "occ02", title: "客户名称" },
        ],
      },
      // 分拆参数
      rowIndex: '',
      breakUp: false,
      breakTable: [],
      breakLoading: false,
      KH_options: [],
      // 分拆弹窗
      showDialog: false,
      breakFinish: false, //分拆完毕
      eachRes: [], //每条请求结果：{reqLoading: Boolean; break: Boolean; trans: Boolean}
      resList: [], 

    };
  },
  components: {
    navBar,
    SelectData,
  },
  created() {
    this.initPage()
    this.getKH()
    this.getYH()
    this.getBZ()
    this.getBM()
  },
  methods: {
    // **************** init ********************
    initPage() {
      if (this.pageType == 'add') {
        this.breadList[1].title = '新增回款单'
        this.title = '新增回款单'
        this.dataForm.currency = 'RMB'
      } else if (this.pageType == 'edit') {
        this.breadList[1].title = '编辑回款单'
        this.title = '编辑回款单'
        this.getCollInfo(this.staffId)
      } else if (this.pageType == 'check') {
        this.breadList[1].title = '查看回款单'
        this.title = '查看回款单'
        this.getCollInfo(this.staffId)
      }
    },
    getKH() {
      KHList()
      .then( res => {
        if (res.status == 200) {
          this.KH_List = res.data
        } else {
          this.$message.error('获取客户列表失败：' + res.error.message)
        }
      })
    },
    getYH() {
      YHList()
      .then( res => {
        if (res.status == 200) {
          this.YH_List = res.data
        } else {
          this.$message.error('获取银行列表失败：' + res.error.message)
        }
      })
    },
    getBZ() {
      BZList()
      .then( res => {
        if (res.status == 200) {
          this.BZ_List = res.data
        } else {
          this.$message.error('获取币种列表失败：' + res.error.message)
        }
      })
    },
    getBM() {
      BMList()
      .then( res => {
        if (res.status == 200) {
          this.BM_List = res.data
        } else {
          this.$message.error('获取部门列表失败：' + res.error.message)
        }
      })
    },
    // ****************breakUp***************
    breakChange(event) {
      let flag = this.breakUp
      this.breakUp = !this.breakUp
      if (event == true) {
        this.breakTable = [{
          customer: '',
          amount: ''
        },
        {
          customer: '',
          amount: ''
        },
        {
          customer: '',
          amount: ''
        },
        {
          customer: '',
          amount: ''
        },
        {
          customer: '',
          amount: ''
        }]
        flag ? this.breakUp = true : this.breakUp = false
      }
      if (event == false) {
        this.$confirm("取消分拆将清空分拆数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.KH_options = []
          flag ? this.breakUp = true : this.breakUp = false
        }).catch(() => {});
      }
    },
    getKHList() {
      this.KH_options = this.KH_List
    },
    handleFocus(event) {
      if (this.KH_options.length == 0) {
        this.getKHList()
      }
    },
    must_oaf(obj) {
      // if (this.oaf_must.includes(obj.column.property)) {
      //   return "must";
      // }
    },
    // 添加一行
    addRow() {
      let data = {
        customer: '', // 客户
        amount: '', // 金额
      };
      this.breakTable.push(data);
    },
    // 删除当前行
    deleteRow(val) {
      if (this.breakTable.length !== 1) {
        this.breakTable.splice(val, 1);
      } else {
        this.breakUp = false
      }
    },
    // 查看分拆结果
    checkSSN(ssnData) {
      if (this.$route.path=='/OApayInfo') {
        this.$router.push({ 
          name: 'oa回款单管理', 
          params: { ssn: ssnData }
        })
      } else {
        this.$router.push({ 
          name: '回款单管理', 
          params: { ssn: ssnData }
        })
      }
    },
    
    // ****************upload*****************
    beforeAvatarUpload(file) {
      const loading = OpenLoading(this, 1)
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isJPEG = file.type === "image/jpeg";
      const isNull = file.type === '';
      const isLt200M = file.size / 1024 / 1024 < 200;

      if (!isPNG && !isJPG && !isJPEG) {
        this.$message.warning("上传文件仅限 png / jpg / jpeg 格式!");
        return false;
      }
      if (!isLt200M) {
        this.$message.warning("上传文件大小不能超过 200MB!");
        return false;
      }
      clearTimeout(this.overloading)
    },
    handleSuccess(response, file, fileList) {
      const loading = OpenLoading(this, 1)
      // 赋值结果卡片
      this.show_ocr = response.data.show_ocr
      this.showOcr = true
      // 赋值扫描结果
      this.dataForm.pic = response.data.id
      this.dataForm.ssn = response.data.ocr.ssn
      this.dataForm.bank = response.data.ocr.bank
      this.dataForm.customer = response.data.ocr.customer
      this.dataForm.customer_show = response.data.ocr.customer_show
      this.dataForm.date = response.data.ocr.date
      this.dataForm.currency = response.data.ocr.currency
      this.dataForm.amount = response.data.ocr.amount
      this.dataForm.summary = response.data.ocr.summary
      this.dataForm.purpose = response.data.ocr.purpose
      loading.close()
      clearTimeout(this.overloading)
      // 获取图片预览地址base64
      downloadPic(this.dataForm.pic)
      .then( res => {
        this.uploadParams.picSrc = 'data:image/jpg;base64,'+res
      })
    },
    handleError(err, file, fileList) {
      const loading = OpenLoading(this, 1)
      loading.close()
      clearTimeout(this.overloading)
      console.log(err)
      this.$message.error('上传失败：'+ err)
    },
    handleRemove(file, fileList) {
      this.dataForm.pic = ''
      this.showOcr = false
      this.show_ocr = {}
      this.$refs['dataForm'].resetFields();
    },
    handlePictureCardPreview(file) {
      this.uploadParams.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件！`);
    },
    handleChange() {
      // this.$refs['dataForm'].resetFields();
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
        case "KH":
          let filter_KH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_KH;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_KH;
          this.dataSelect.dialogTitle = "客户列表";
        break;
        case "break_KH":
          let filter_break_KH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_break_KH;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_KH;
          this.dataSelect.dialogTitle = "客户列表";
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
          case "KH":
            this.dataForm.customer = val[0].occ01;
            this.dataForm.customer_show = val[0].occ02;
          break;
          case "break_KH":
            this.breakTable[this.rowIndex].customer = val[0].occ01;
            this.breakTable[this.rowIndex].customer_show = val[0].occ02;
          break;
          default:
          return;
          break;
        }
      }
    },
    // ***************************************
    // 新增回款单
    addForm(type) {
      // 非分拆
      if (type == 'normal') {
        const loading = OpenLoading(this, 1)
        addCollList(this.dataForm)
        .then( res => {
          if (res.status == 200) {
            this.dataForm.id = res.data.id
            // 抛转集团
            transAdd(this.dataForm.id)
            .then( res => {
              loading.close()
              clearTimeout(this.overloading)
              if (res.status == 200) {
                this.dataForm = res.data[0]
                this.$message.success('审核成功！')
                setTimeout(() => {
                  this.$router.go(0)
                },500)
              } else {
                this.$message.error('抛转集团失败：' + res.error.message)
              }
              // 跳转
              if (this.$route.path=='/OApayInfo') {
                this.$router.push({
                  path: 'OApayInfo',
                  query:{
                    id: this.dataForm.id,
                    pageType: 'check'
                  }
                })
              } else {
                this.$router.push({
                  path: 'payInfo',
                  query:{
                    id: this.dataForm.id,
                    pageType: 'check'
                  }
                })
              }
              setTimeout(() => {
                this.$router.go(0)
              },200)
            })
          } else {
            loading.close()
            clearTimeout(this.overloading)
            this.$message.error('新增失败：' + res.error.message)
          }
        })
      }
      // 分拆 
      else {
        this.breakFinish = false
        this.breakTable.forEach((item, index) => {
          this.resList.push( item )
          this.eachRes.push({
            reqLoading: true,
            break: false,
            trans: 'loading'
          })
          this.dataForm.customer = item.customer
          this.dataForm.customer_show = item.customer_show
          this.dataForm.amount = item.amount
          addCollList(this.dataForm)
          .then( res => {
            if (res.status == 200) {
              this.eachRes[index].reqLoading = false
              this.eachRes[index].break = true
              this.dataForm.id = res.data.id
              // 审核
              transAdd(this.dataForm.id)
              .then( res => {
                if (res.status == 200) {
                  this.eachRes[index].trans = 'suc'
                } else {
                  this.eachRes[index].trans = 'err'
                  this.$message.error(`分拆${index}审核失败：` + res.error.message)
                }
                // console.log(index, this.eachRes[index].trans)
                // 分拆结束
                this.breakFinish = true
              })
            } else {
              this.eachRes[index].reqLoading = false
              this.eachRes[index].break = false
              this.$message.error(`分拆${index}新增失败：` + res.error.message)
              // 分拆结束
              this.breakFinish = true
            }
          })
          // console.log('aaa'+index, this.eachRes[index].trans)
        })
      }
    },
    // 编辑回款单
    editForm() {
      const loading = OpenLoading(this, 1)
      editColl(this.dataForm)
      .then( res => {
        loading.close()
        clearTimeout(this.overloading)
        if (res.status == 200) {
          if (this.$route.path=='/OApayInfo') {
            this.$router.push({
              path: 'OApayInfo',
              query:{
                id: this.dataForm.id,
                pageType: 'check'
              }
            })
          } else {
            this.$router.push({
              path: 'payInfo',
              query:{
                id: this.dataForm.id,
                pageType: 'check'
              }
            })
          }
          this.$message.success('编辑成功！')
          setTimeout(() => {
            this.$router.go(0)
          },500)
        } else {
          loading.close()
          clearTimeout(this.overloading)
          this.$message.error('编辑失败：' + res.error.message)
        }
      })
    },
    // 分拆提交前验证
    beforeBreak(type) {
      let corrFlag = true
      this.$refs.dataForm.validate(valid => {
        if(valid){
          // 验证是否有空提交
          try {
            this.breakTable.forEach((item, index) => {
              if (item.customer == '') {
                throw new Error('customer');
              } else if (item.amount == '')  {
                throw new Error('amount');
              }
            })
          } catch (error) {
            // console.log(error.message)
            if (error.message == 'customer') {
              this.$message.warning(`分拆列表客户不可为空`)
              corrFlag = false
            } else if (error.message == 'amount') {
              this.$message.warning(`分拆列表金额不可为空`)
              corrFlag = false
            }
          }
          if (corrFlag) {
            // 计算金额总数
            let sum = 0
            this.breakTable.forEach( item => {
              sum = sum + Number(item.amount)
            })
            if (sum == Number(this.dataForm.amount)) {
              this.showDialog = true
              if (type == 'add') {
                this.addForm('break')
              } else if (type == 'edit'){
                this.editForm('break')
              }
            } else {
              this.$message.warning(`分拆金额与总金额不相等，请重新填写！`)
            }
          }
        }
      })
    },
    
    // 0:取消 /1:新增/2:取消编辑/3:提交编辑/4:发起编辑/5:删除/6:审核/7:取消审核/8:抛转全媒体/9:抛转全票通
    btnClick(type) {
      if (type == 0) {
        if (this.$route.path=='/OApayInfo') {
          this.$router.push('/OAbackPayment')
        } else {
          this.$router.push('index')
        }
      } 
      else if (type == 1) {
        if (this.breakUp == false) {
          this.$refs.dataForm.validate(valid => {
            if(valid){
              this.addForm('normal')
            }
          })
        } else {
          this.beforeBreak('add')
        }
      }
      else if (type == 2) {
        if (this.$route.path=='/OApayInfo') {
          this.$router.push('/OAbackPayment')
        } else {
          this.$router.push('index')
        }
      } 
      else if (type == 3) {
        this.$refs.dataForm.validate(valid => {
          if(valid){
            this.editForm()
          }
        })
      }
      else if (type == 4) {
        if (this.$route.path=='/OApayInfo') {
          this.$router.push({
            path: 'OApayInfo',
            query:{
              id: this.dataForm.id,
              pageType: 'edit',
              routeName:'编辑回款单'
            }
          })
        } else {
          this.$router.push({
            path: 'payInfo',
            query:{
              id: this.dataForm.id,
              pageType: 'edit',
              routeName:'编辑回款单'
            }
          })
        }
        setTimeout(() => {
          this.$router.go(0)
        },500)
      }
      else if (type == 5) {
        this.$confirm('此操作将永久删除该回款单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = OpenLoading(this, 1)
          delColl(this.dataForm.id)
          .then( res => {
            if (res.status == 200) {
              this.$message.success('删除成功！' )
              if (this.$route.path=='/OApayInfo') {
                this.$router.push('/OAbackPayment')
              } else {
                this.$router.push('index')
              }
            } else {
              this.$message.error('删除失败：' + res.error.message)
            }
            loading.close()
            clearTimeout(this.overloading)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
      else if (type == 6) {
        const loading = OpenLoading(this, 1)
        transAdd(this.dataForm.id)
        .then( res => {
          loading.close()
          clearTimeout(this.overloading)
          if (res.status == 200) {
            this.dataForm = res.data[0]
            if (this.$route.path=='/OApayInfo') {
              this.$router.push({
                path: 'OApayInfo',
                query:{
                  id: this.dataForm.id,
                  pageType: 'check'
                }
              })
            } else {
              this.$router.push({
                path: 'payInfo',
                query:{
                  id: this.dataForm.id,
                  pageType: 'check'
                }
              })
            }
            this.$message.success('审核成功！')
            setTimeout(() => {
              this.$router.go(0)
            },500)
          } else {
            this.$message.error('审核失败：' + res.error.message)
          }
        })
      }
      else if (type == 7) {
        this.$confirm('确定取消审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = OpenLoading(this, 1)
          can_Trans(this.dataForm.id)
          .then( res => {
            loading.close()
            clearTimeout(this.overloading)
            if (res.status == 200) {
              if (this.$route.path=='/OApayInfo') {
                this.$router.push({
                  path: 'OApayInfo',
                  query:{
                    id: this.dataForm.id,
                    pageType: 'check'
                  }
                })
              } else {
                this.$router.push({
                  path: 'payInfo',
                  query:{
                    id: this.dataForm.id,
                    pageType: 'check'
                  }
                })
              }
              this.$message.success('取消审核成功！')
              setTimeout(() => {
                this.$router.go(0)
              },500)
            } else {
              this.$message.error('取消审核失败：' + res.error.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
      else if (type == 8) {
        this.sendTrans(this.dataForm.id, 'qmt')
      }
      else if (type == 9) {
        this.sendTrans(this.dataForm.id, 'qpt')
      }
    },
    // ****************其他操作*****************
    // 获取详情
    getCollInfo(id) {
      const loading = OpenLoading(this, 1)
      collInfo(id)
      .then( res => {
        if (res.status == 200) {
          this.dataForm = res.data[0]
          if (this.dataForm.pic && this.dataForm.pic!=='') {
            // 获取图片预览地址base64
            downloadPic(this.dataForm.pic)
            .then( res => {
              this.uploadParams.picSrc = 'data:image/jpg;base64,' + res
              this.uploadParams.fileList = [{
                name: '',
                url: 'data:image/jpg;base64,'+res
              }]
            })
          }
        } else {
          this.$message.error('获取详情失败：' + res.error.message)
        }
        loading.close()
        clearTimeout(this.overloading)
      })
    },
    // 抛转服务
    sendTrans(id, type) {
      const loading = OpenLoading(this, 1)
      const params = {
        id: id,
        partner: type
      }
      transPar(params)
      .then( res => {
        if (res.status == 200) {
          this.$message.success('抛转成功！')
        } else {
          this.$message.error('抛转失败：' + res.error.message)
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
    .show_ocr {
      max-width: 450px;
      height: 148px;
      background: #FBFDFF;
      border-radius: 10px;
      padding: 5px;
      box-sizing: border-box;
      overflow: hidden;
      .title {
        margin-bottom: 5px;
        color: #898989;
      }
      .info {
        font-size: 14px;
        color: #999999;
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

.break_input /deep/ .el-input__inner {
  height: 40px;
  border: none;
}

.el-dialog{
  .breakContent{
    width: fit-content;
    margin: 0 auto;
    span{
      font-size: 15px;
      margin-right: 15px;
    }
    .suc{
      color: #67C23A;
    }
    .err{
      color: #F56C6C;
    }
    .loading {
      color: #979797;
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
