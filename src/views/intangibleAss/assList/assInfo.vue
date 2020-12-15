<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <el-card class="formCard">
      <el-form :model="dataForm" 
                      :rules="rules"
                      ref="dataForm"
                      label-width="130px"
                      label-position="left"
                      class="payForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="资产ID" prop="id">
                <el-input v-model="dataForm.ias04" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资产类别" prop="ias02">
                <el-select v-model="dataForm.ias02" 
                                :disabled="pageType == 'check'" 
                                placeholder="">
                  <el-option
                    v-for="item in ias02List"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="保管人" prop="ias03" style="height:40px">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataShow.ias03_name}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('BGR')">
                    {{dataShow.ias03_name}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="采购地" prop="ias04" style="height:40px">
                <el-input v-model="dataForm.ias04" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="供应商" prop="ias05" style="height:40px">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataShow.ias05_name}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('GYS')">
                    {{dataShow.ias05_name}}
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中文名称" prop="ias06">
                <el-input v-model="dataForm.ias06" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="英文名称" prop="ias07">
                <el-input v-model="dataForm.ias07" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购日期" prop="ias08">
                <el-date-picker
                  :disabled="pageType == 'check'"
                  v-model="dataForm.ias08"
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
              <el-form-item label="授权开始日期" prop="ias09">
                <el-date-picker
                  :disabled="pageType == 'check'"
                  v-model="dataForm.ias09"
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
              <el-form-item label="授权结束日期" prop="ias10">
                <el-date-picker
                  :disabled="pageType == 'check'"
                  v-model="dataForm.ias10"
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
              <el-form-item label="采购成本" prop="ias11">
                <el-input v-model="dataForm.ias11" :disabled="pageType == 'check'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 62px">
              <el-form-item label="存放位置" prop="ias12">
                <div v-if="pageType=='check'" class="selectbox editNot" style="height:40px">
                  {{dataShow.ias12_name}}
                </div>
                <div v-if="pageType!=='check'" class="selectbox">
                  <div class="selector" @click="selectDialog('CFWZ')">
                    {{dataShow.ias12_name}}
                  </div>
                </div>
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
import { addAsset, assetsInfo, editAsset } from '@/api/assets'
// utils
import { OpenLoading } from "@/utils/utils.js";
// validate
import { validFloatNumber, } from '@/utils/validate'

export default {
  data() {

    const validateFNumber = (rule, value, callback) => {
      if (!validFloatNumber(value)) {
        callback(new Error('仅限数字'))
      } else {
        callback()
      }
    }

    return {
      // 面包屑
      breadList: [
        {
          path: "index",
          title: "资产列表",
        },
        {
          title: "新增资产",
        },
      ],
      title: "新增资产",
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
        ias02: '',
        ias03: '',
        ias04: '',
        ias05: '',
        ias06: '',
        ias07: '',
        ias08: '',
        ias09: "",
        ias10: '',
        ias11: "",
        ias12: '',
      },
      dataShow: {
        ias03_name: "",
        ias05_name: "",
        ias12_name: "",
      },
      newfileList: [], // 新上传文件
      saveList: [], // 已有文件
      ias02List: [{
        label: '电影',
        value: '0811'
      },{
        label: '电视剧',
        value: '0812'
      },{
        label: '其它',
        value: '0813'
      }],
      rules: {
        ias02: [
          { required: true, message: '请选择资产类别', trigger: 'change' },
        ],
        ias03: [
          { required: true, message: '请输入保管人', trigger: 'blur' },
        ],
        ias04: [
          // { required: true, message: '请选择采购地', trigger: 'change' },
        ],
        ias05: [
          { required: true, message: '请选择供应商', trigger: 'change' },
        ],
        ias06: [
          { required: true, message: '请输入中文名称', trigger: 'blur' },
        ],
        ias07: [
          // { required: true, message: '请输入英文名称', trigger: 'blur' },
        ],
        ias08: [
          // { required: true, message: '请选择采购日期', trigger: 'change' }
        ],
        ias09: [
          // { required: true, message: '请选择授权开始日期', trigger: 'change' },
        ],
        ias10: [
          // { required: true, message: '请选择授权结束日期', trigger: 'change' },
        ],
        ias11: [
          { required: true, message: '请输入采购成本', trigger: 'blur' },
          { validator: validateFNumber, trigger: 'blur' }
        ],
        ias12: [
          // { required: true, message: '请选择存放位置', trigger: 'change' }
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
        head_BGR: [
          { name: "gen01", title: "员工编号" },
          { name: "gen02", title: "员工名称" },
          { name: "gen03", title: "所属部门编号" },
          { name: "gen04", title: "所属部门名称" },
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
        head_CFWZ: [
          { name: "faf01", title: "位置编号" },
          { name: "faf02", title: "位置名称" },
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
        this.breadList[1].title = '新增资产'
        this.title = '新增资产'
      } else if (this.pageType == 'edit') {
        this.breadList[1].title = '编辑资产'
        this.title = '编辑资产'
        this.getAssetsInfo(this.staffId)
      } else if (this.pageType == 'check') {
        this.breadList[1].title = '查看资产'
        this.title = '查看资产'
        this.getAssetsInfo(this.staffId)
      }
    },
    // ****************selectBox***************
    // 数据选择
    selectDialog(type,rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "BGR":
          let filter_BGR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_BGR;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_BGR;
          this.dataSelect.dialogTitle = "员工列表";
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
        case "CFWZ":
          let filter_CFWZ = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_CFWZ;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/fafs";
          this.dataSelect.headList = this.tableHead.head_CFWZ;
          this.dataSelect.dialogTitle = "位置列表";
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
          case "BGR":
            this.dataForm.ias03 = val[0].gen01;
            this.dataShow.ias03_name = val[0].gen02;
          break;
          case "GYS":
            this.dataForm.ias05 = val[0].pmc01;
            this.dataShow.ias05_name = val[0].pmc03;
          break;
          case "CFWZ":
            this.dataForm.ias12 = val[0].faf01;
            this.dataShow.ias12_name = val[0].faf02;
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
        this.$router.push('assList')
      } 
      else if (type == 1) {
        this.$refs.dataForm.validate(valid => {
          if(valid){
            const loading = OpenLoading(this, 1)
            addAsset(this.dataForm)
            .then( res => {
              if (res.status == 200) {
                loading.close()
                clearTimeout(this.overloading)
                // this.dataForm = res.data
                this.$message.success('新增成功！')
                setTimeout(() => {
                  this.$router.push('assList')
                },500)
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
        this.$router.push('assList')
      } 
      else if (type == 3) {
        this.$refs.dataForm.validate(valid => {
          if(valid){
            const loading = OpenLoading(this, 1)
            editAsset(this.dataForm)
            .then( res => {
              if (res.status == 200) {
                loading.close()
                clearTimeout(this.overloading)
                // this.dataForm = res.data
                this.$message.success('编辑成功！')
                setTimeout(() => {
                  this.$router.push('assList')
                },500)
              } else {
                loading.close()
                clearTimeout(this.overloading)
                this.$message.error('编辑失败：' + res.error.message)
              }
            })
          }
        })
      }
    },
    // ****************其他操作*****************
    // 获取详情
    getAssetsInfo(id) {
      const loading = OpenLoading(this, 1)
      assetsInfo(id)
      .then( res => {
        if (res.status == 200) {
          this.dataForm = res.data,
          this.dataShow = {
            ias03_name: res.data.ias03_name,
            ias05_name: res.data.ias05_name,
            ias12_name: res.data.ias12_name,
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
  width: 300px;
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
</style>
