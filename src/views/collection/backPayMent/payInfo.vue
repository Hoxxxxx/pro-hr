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
                  v-if="pageType=='add'"
                  :disabled="pageType == 'check'"
                  :action="$store.state.upload_pic_url"
                  :headers="uploadParams.headers"
                  list-type="picture-card"
                  :limit="1"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleSuccess"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-exceed="handleExceed">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <div v-if="pageType!=='add'">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="picSrc"
                    fit="fill">
                  </el-image>
                </div>
                <el-dialog :visible.sync="uploadParams.dialogVisible">
                  <img v-if="pageType=='add'" width="100%" :src="dataForm.pic" alt="">
                  <img v-if="pageType!=='add'" width="100%" :src="fileList[0].id" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流水号" prop="ssn">
                <el-input v-model="dataForm.ssn" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="银行" prop="bank">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataForm.bank_show}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('YH')">
                    {{dataForm.bank_show}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="客户" prop="customer">
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
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataForm.currency_show}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('BZ')">
                    {{dataForm.currency_show}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额" prop="amount">
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
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataForm.department_show}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('BM')">
                    {{dataForm.department_show}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="集团作业号" prop="jt_number">
                <el-input v-model="dataForm.jt_number" disabled></el-input>
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
        <div v-if="pageType=='check'" class="btns" style="width:666px">
          <el-button @click="btnClick(2)">回到列表</el-button>
          <el-button type="primary" @click="btnClick(4)">修改</el-button>
          <el-button type="danger" @click="btnClick(5)">删除</el-button>
          <el-button type="success" @click="btnClick(6)">审核</el-button>
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
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import SelectData from "@/components/selectData";
// api
import { addCollList, transAdd, collInfo, transPar, can_Trans, editColl, delColl, downloadPic } from "@/api/collection";
// utils
import { OpenLoading } from "@/utils/utils.js";

export default {
  data() {
    return {
      picSrc: '',
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
      pageType: this.$route.query.pageType,
      // upload
      uploadParams: {
        headers: {
          Org_Id: sessionStorage.getItem('OrgId')
        },
        dialogVisible: false,
      },
      // form
      dataForm: {
        id: '',
        jt_number: '',
        confirmed: 0,
        pic: '',
        bank: '',
        bank_show: '',
        ssn: '',
        purpose: '',
        summary: '',
        amount: '',
        currency: '',
        currency_show: '',
        date: '',
        customer: '',
        customer_show: '',
        department: '',
        department_show: ''
      },
      fileList: [{id: ''}],
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
        head_YH: [
          { name: "nma01", title: "银行编号" },
          { name: "nma02", title: "银行名称" },
          { name: "nma28", title: "1支存/2活存/3其它" },
          { name: "nma04", title: "银行账号" },
          { name: "nma09", title: "存款类别" },
          { name: "nma10", title: "存款币别" },
        ],
        head_KH: [
          { name: "occ01", title: "客户编号" },
          { name: "occ02", title: "客户名称" },
        ],
        head_BZ: [
          { name: "azi01", title: "币别编号" },
          { name: "azi02", title: "币别名称" },
        ],
        head_BM: [
          { name: "gem01", title: "部门编号" },
          { name: "gem02", title: "部门名称" },
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
    this.getPicUrl()
  },
  methods: {
    
    // **************** init ********************
    initPage() {
      if (this.pageType == 'add') {
        this.breadList[1].title = '新增回款单'
        this.title = '新增回款单'
        this.dataForm.currency = 'RMB'
        this.dataForm.currency_show = '人民幣'
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
    // ****************upload*****************
    beforeAvatarUpload(file) {
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
    },
    handleSuccess(response, file, fileList) {
      this.dataForm.pic = response.data.id
    },
    handleRemove(file, fileList) {
      this.dataForm.pic = ''
    },
    handlePictureCardPreview(file) {
      this.uploadParams.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件！`);
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
        case "YH":
          let filter_YH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_YH;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/nmas";
          this.dataSelect.headList = this.tableHead.head_YH;
          this.dataSelect.dialogTitle = "银行列表";
        break;
        case "KH":
          let filter_KH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_KH;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_KH;
          this.dataSelect.dialogTitle = "客户列表";
        break;
        case "BZ":
          let filter_BZ = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_BZ;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/azis";
          this.dataSelect.headList = this.tableHead.head_BZ;
          this.dataSelect.dialogTitle = "币种列表";
        break;
        case "BM":
          let filter_BM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_BM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gems";
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
          case "YH":
            this.dataForm.bank = val[0].nma01;
            this.dataForm.bank_show = val[0].nma02;
          break;
          case "KH":
            this.dataForm.customer = val[0].occ01;
            this.dataForm.customer_show = val[0].occ02;
          break;
          case "BZ":
            this.dataForm.currency = val[0].azi01;
            this.dataForm.currency_show = val[0].azi02;
          break;
          case "BM":
            this.dataForm.department = val[0].gem01;
            this.dataForm.department_show = val[0].gem02;
          break;
          default:
          return;
          break;
        }
      }
    },
    // ***************************************
    // 0:取消 /1:新增/2:取消编辑/3:提交编辑/4:发起编辑/5:删除/6:审核/7:取消审核/8:抛转全媒体/9:抛转全票通
    btnClick(type) {
      if (type == 0) {
        this.$router.push('index')
      } 
      else if (type == 1) {
        this.$refs.dataForm.validate(valid => {
          if(valid){
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
                    this.$router.push({
                      path: 'payInfo',
                      query:{
                        id: this.dataForm.id,
                        pageType: 'check'
                      }
                    })
                    this.$message.success('新增成功！')
                    this.$router.go(0)
                  } else {
                    this.$message.error('抛转集团失败：' + res.error.message)
                  }
                })
              } else {
                loading.close()
                clearTimeout(this.overloading)
                this.$message.error('新增失败：' + res.error.message)
              }
            })
          }
        })
      }
      else if (type == 2) {
        this.$router.push('index')
      } 
      else if (type == 3) {
        this.$refs.dataForm.validate(valid => {
          if(valid){
            const loading = OpenLoading(this, 1)
            editColl(this.dataForm)
            .then( res => {
              loading.close()
              clearTimeout(this.overloading)
              if (res.status == 200) {
                this.$router.push({
                  path: 'payInfo',
                  query:{
                    id: this.dataForm.id,
                    pageType: 'check'
                  }
                })
                this.$message.success('编辑成功！')
                this.$router.go(0)
              } else {
                loading.close()
                clearTimeout(this.overloading)
                this.$message.error('编辑失败：' + res.error.message)
              }
            })
          }
        })
      }
      else if (type == 4) {
        this.$router.push({
          path: 'payInfo',
          query:{
            id: this.dataForm.id,
            pageType: 'edit'
          }
        })
        this.$router.go(0)
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
              this.$router.push('index')
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
            this.$router.push({
              path: 'payInfo',
              query:{
                id: this.dataForm.id,
                pageType: 'check'
              }
            })
            this.$message.success('审核成功！')
            this.$router.go(0)
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
              this.$router.push({
                path: 'payInfo',
                query:{
                  id: this.dataForm.id,
                  pageType: 'check'
                }
              })
              this.$message.success('取消审核成功！')
              this.$router.go(0)
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
    getPicUrl() {
      downloadPic(145)
      .then( res => {
        console.log(res)
        this.picSrc = res
      })
    },
    // 获取详情
    getCollInfo(id) {
      const loading = OpenLoading(this, 1)
      collInfo(id)
      .then( res => {
        if (res.status == 200) {
          this.dataForm = res.data[0]
          
          
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
</style>
