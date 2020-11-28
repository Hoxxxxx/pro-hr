<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <el-card class="formCard">
      <el-form :model="ruleForm" 
                      :rules="rules" ref="ruleForm" 
                      label-width="100px" 
                      label-position="left"
                      class="payForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="图片" prop="upload_pic">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流水号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="币种" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用途" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="摘要" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属部门" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="集团凭证号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
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
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/staffManage",
          title: "回款单列表",
        },
        {
          title: "新增回款单",
        },
      ],
      title: "新增回款单",
      // upload
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        pic: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    navBar,
  },
  created() {
    // this.staffId = this.$route.query.id;
    // this.saveType = this.$route.query.saveType;
    // this.company = this.userInfo.company_id;
    if (this.staffId && this.staffId != "") {
      this.getStaffInfo();
      this.title = "编辑员工";
    } else {
      console.log("从新增页面跳转过来");
    }
  },
  methods: {
    // ****************upload*****************
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // *****************************************

    addStaff(type) {
      if (type == 0) {
        history.go(-1);
      } else {

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
        width: 200px;
        display: flex;
        margin: 20px auto;
      }
    }
  }
}
</style>
