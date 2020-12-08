<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList"></nav-Bar>
    <el-card class="formCard">
      <!-- 基本信息 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="baseInfo">
          <span class="title">基本信息</span>
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input
                  class="elInput"
                  placeholder="请输入姓名"
                  v-model="ruleForm.name"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工号" prop="job_number">
                <el-input
                  class="elInput"
                  v-model="ruleForm.job_number"
                  placeholder="请输入员工号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio border="" style="width: 90px" :label="1"
                    >男</el-radio
                  >
                  <el-radio border="" style="width: 90px" :label="2"
                    >女</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工性质" prop="type">
                <el-select
                  v-model="ruleForm.type"
                  placeholder="请选择员工性质"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.status_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位" prop="position_id">
                <el-select
                  v-model="ruleForm.position_id"
                  multiple
                  placeholder="请选择职位"
                  class="elInput"
                >
                  <el-option
                    v-for="(item, key) in fixedData.job_options"
                    :key="key"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.name }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.p_name }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位类别" prop="position_type">
                <el-select
                  v-model="ruleForm.position_type"
                  multiple
                  placeholder="请选择职位类别"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.position_types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务线" prop="lob">
                <el-input
                  class="elInput"
                  v-model="ruleForm.lob"
                  placeholder="请输入业务线"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门" prop="department_id">
                <el-select
                  v-model="ruleForm.department_id"
                  multiple
                  placeholder="请选择部门"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.department_options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号" prop="card">
                <el-input
                  class="elInput"
                  v-model="ruleForm.card"
                  placeholder="请输入身份证号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="身份证有效期"
                prop="card_valid"
                class="label"
              >
                <el-date-picker
                  v-model="ruleForm.card_valid"
                  type="date"
                  placeholder="选择身份证有效期"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄" prop="age">
                <el-input
                  class="elInput"
                  v-model="ruleForm.age"
                  placeholder="请输入年龄"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属公司">
                <el-select
                  v-model="ruleForm.company_id"
                  :disabled="userInfo.is_root == 1 ? false : true"
                  @change="companyChange"
                  placeholder="请选择所属公司"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.company_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="baseInfo">
          <span class="title">教育信息</span>
          <h5 class="innerTitle">全日制教育</h5>
          <el-row>
            <el-col :span="8">
              <el-form-item label="学校名称" prop="full_school">
                <el-input
                  class="elInput"
                  v-model="ruleForm.full_school"
                  placeholder="请输入学校名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="专业" prop="full_major">
                <el-input
                  class="elInput"
                  v-model="ruleForm.full_major"
                  placeholder="请输入专业"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历" prop="full_education">
                <el-select
                  v-model="ruleForm.full_education"
                  placeholder="请选择学历"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.study_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学位" prop="full_degree">
                <el-input
                  class="elInput"
                  v-model="ruleForm.full_degree"
                  placeholder="请输入学位"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业时间" prop="full_graduation_time">
                <el-date-picker
                  v-model="ruleForm.full_graduation_time"
                  type="date"
                  placeholder="选择毕业时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <h5 class="innerTitle">在职教育</h5>
          <el-row>
            <el-col :span="8">
              <el-form-item label="学校名称" prop="part_school">
                <el-input
                  class="elInput"
                  v-model="ruleForm.part_school"
                  placeholder="请输入学校名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="专业" prop="part_major">
                <el-input
                  class="elInput"
                  v-model="ruleForm.part_major"
                  placeholder="请输入专业"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历" prop="part_education">
                <el-select
                  v-model="ruleForm.part_education"
                  placeholder="请选择学历"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.study_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学位" prop="part_degree">
                <el-input
                  class="elInput"
                  v-model="ruleForm.part_degree"
                  placeholder="请输入学位"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业时间" prop="part_graduation_time">
                <el-date-picker
                  v-model="ruleForm.part_graduation_time"
                  type="date"
                  placeholder="选择毕业时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="baseInfo">
          <span class="title">工作信息</span>
          <el-row>
            <el-col :span="8">
              <el-form-item label="职称" prop="professional">
                <el-input
                  class="elInput"
                  v-model="ruleForm.professional"
                  placeholder="请输入职称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职称级别" prop="professional_level">
                <el-input
                  class="elInput"
                  v-model="ruleForm.professional_level"
                  placeholder="请输入职称级别"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="参工时间" prop="work_time">
                <el-date-picker
                  v-model="ruleForm.work_time"
                  type="date"
                  placeholder="选择参工时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="华录入职时间" prop="hualu_join_time">
                <el-date-picker
                  v-model="ruleForm.hualu_join_time"
                  type="date"
                  placeholder="选择华录入职时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="新媒入职时间" prop="newmedia_join_time">
                <el-date-picker
                  v-model="ruleForm.newmedia_join_time"
                  type="date"
                  placeholder="选择新媒入职时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="劳动合同到期时间"
                prop="labor_contract_deadline"
                class="label"
              >
                <el-date-picker
                  v-model="ruleForm.labor_contract_deadline"
                  type="date"
                  placeholder="选择劳动合同到期时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="第一期劳动合同到期时间"
                prop="first_labor_contract_deadline"
                class="label"
              >
                <el-date-picker
                  v-model="ruleForm.first_labor_contract_deadline"
                  type="date"
                  placeholder="选择第一期劳动合同到期时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="第二期劳动合同到期时间"
                prop="second_labor_contract_deadline"
                class="label"
              >
                <el-date-picker
                  v-model="ruleForm.second_labor_contract_deadline"
                  type="date"
                  placeholder="选择第二期劳动合同到期时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="第三期劳动合同到期时间"
                prop="third_labor_contract_deadline"
                class="label"
              >
                <el-date-picker
                  v-model="ruleForm.third_labor_contract_deadline"
                  type="date"
                  placeholder="选择劳动合同到期时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="预计试用期截止时间"
                prop="trial_deadline"
                class="label"
              >
                <el-date-picker
                  v-model="ruleForm.trial_deadline"
                  type="date"
                  placeholder="选择预计试用期截止时间"
                  class="elInput"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="baseInfo">
          <span class="title">其他信息</span>
          <el-row>
            <el-col :span="8">
              <el-form-item label="婚姻状况" prop="marriage">
                <el-select
                  v-model="ruleForm.marriage"
                  placeholder="请选择婚姻状况"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.marrige_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="民族" prop="nation">
                <el-select
                  v-model="ruleForm.nation"
                  placeholder="请选择民族"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.nation_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="政治面貌" prop="politics">
                <el-select
                  v-model="ruleForm.politics"
                  placeholder="请选择政治面貌"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.politics_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="党群关系" prop="party_masses_relation">
                <el-select
                  v-model="ruleForm.party_masses_relation"
                  placeholder="请选择党群关系"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.masses_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工会关系" prop="union_relation">
                <el-select
                  v-model="ruleForm.union_relation"
                  placeholder="请选择工会关系"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.masses_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="籍贯" prop="native_place">
                <el-input
                  class="elInput"
                  v-model="ruleForm.native_place"
                  placeholder="请输入籍贯"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="户口所在地" prop="domicile_place">
                <el-input
                  class="elInput"
                  v-model="ruleForm.domicile_place"
                  placeholder="请输入户口所在地"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="户口性质" prop="category">
                <el-select
                  v-model="ruleForm.category"
                  placeholder="请选择户口性质"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.category_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社保情况" prop="social_security">
                <el-select
                  v-model="ruleForm.social_security"
                  placeholder="请选择社保情况"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.social_security_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公积金情况" prop="accumulation_fund">
                <el-select
                  v-model="ruleForm.accumulation_fund"
                  placeholder="请选择公积金情况"
                  class="elInput"
                >
                  <el-option
                    v-for="item in fixedData.social_security_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="mobile">
                <el-input
                  class="elInput"
                  v-model="ruleForm.mobile"
                  placeholder="请输入手机号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司邮箱" prop="company_email">
                <el-input
                  class="elInput"
                  v-model="ruleForm.company_email"
                  placeholder="请输入公司邮箱"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="个人邮箱" prop="personal_email">
                <el-input
                  class="elInput"
                  v-model="ruleForm.personal_email"
                  placeholder="请输入个人邮箱"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="可收信件地址" prop="mail_address">
                <el-input
                  class="elInput"
                  v-model="ruleForm.mail_address"
                  placeholder="请输入可收信件地址"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="紧急联系人" prop="emergency_contact">
                <el-input
                  class="elInput"
                  v-model="ruleForm.emergency_contact"
                  placeholder="请输入紧急联系人"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="紧急联系电话"
                prop="emergency_mobile"
                class="label"
              >
                <el-input
                  class="elInput"
                  v-model="ruleForm.emergency_mobile"
                  placeholder="请输入紧急联系电话"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系电话" prop="second_mobile">
                <el-input
                  class="elInput"
                  v-model="ruleForm.second_mobile"
                  placeholder="请输入第二联系电话"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="备注" prop="remark">
                <el-input
                  class="elInput"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  v-model="ruleForm.remark"
                  placeholder="请输入备注"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="btnBox">
        <div class="btns">
          <el-button style="width: 95px" @click="addStaff(0)">取消</el-button>
          <el-button style="width: 95px" type="primary" @click="addStaff(1)">{{
            saveType == "edit" ? "保存编辑" : "确认添加"
          }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import http from "../../utils/request";
import navBar from "@/components/navBar/navBar";
import { mapState } from "vuex";
import { STAFFS_API } from "@/api/staffs";
import { DEPART_API } from "@/api/department";
import { POSI_API } from "@/api/positions";
import { renderTime } from "@/utils/function.js";
export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/staffManage",
          title: "员工管理",
        },
        {
          title: "",
        },
      ],
      ruleForm: {
        name: "", //姓名
        sex: "",
        job_number: "", //工号
        type: "", //性质  1：试用 2：正式 3:离职
        position_id: [], //职位id
        position_type: [], //职位类别 0：高管 1：职能类 2：职能支撑类 3：业务支撑类 4：业务类
        lob: "", //业务线
        department_id: [], //部门id
        card: "", //身份证号
        card_valid: "", //日期
        age: "", //年龄
        company_id: "", //公司 1：北京公司 2：成都公司 3：上海公司
        full_school: "", //全日制学校名称
        full_major: "", //全日制专业
        full_education: "", //全日制学历
        full_degree: "", //全日制学位
        full_graduation_time: "", //全日制毕业时间
        part_school: "", //在职教育学校名称
        part_major: "", //在职教育专业
        part_education: "", //在职教育学历
        part_degree: "", //在职教育学位
        part_graduation_time: "", //在职教育毕业时间
        abroad: "", //留学信息 0：是 1：否
        english_level: "", //英语水平
        professional: "", //职称
        professional_level: "", //职称级别
        work_time: "", //参工时间
        hualu_join_time: "", //华录入职之间
        newmedia_join_time: "", //新媒入职时间
        labor_contract_deadline: "", //劳动合同到期时间
        first_labor_contract_deadline: "", //第一期劳动合同到期时间
        second_labor_contract_deadline: "", //第二期劳动合同到期时间
        third_labor_contract_deadline: "", //第三期劳动合同到期时间
        trial_deadline: "", //预计使用期截止时间
        marriage: "", //婚姻 0：未婚 1：已婚
        nation: "", //民族 0：汉族 1：少数民族
        politics: "", //政治面貌 0：党员 1：团员 2：群众
        party_masses_relation: "", //党群关系 0：已转出 1：已转入 2：未转入
        union_relation: "", //工会关系 0：已转出 1：已转入 2：未转入
        native_place: "", //籍贯
        domicile_place: "", //户口所在地
        category: "", //户口性质 0：城镇 1：农村
        social_security: "", //社保情况 0：新参统 1：转入
        accumulation_fund: "", //公积金情况 0：新参统 1：转入
        mobile: "", //手机号
        company_email: "", //公司邮箱
        mobipersonal_emaille: "", //个人邮箱
        mail_address: "", //可收信件地址
        emergency_contact: "", //紧急联系人
        emergency_mobile: "", //紧急联系电话
        second_mobile: "", //第二联系电话
        remark: "", //备注
        attachment_url: "", //附件地址
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        job_number: [
          { required: true, message: "请输入员工号", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择员工性质", trigger: "change" },
        ],
        position_id: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个职位",
            trigger: "change",
          },
        ],
        position_type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个职位类别",
            trigger: "change",
          },
        ],
        lob: [{ required: true, message: "请输入业务线", trigger: "blur" }],
        department_id: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个部门",
            trigger: "change",
          },
        ],
        card: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        card_valid: [
          {
            type: "date",
            required: true,
            message: "请选择身份证有效期",
            trigger: "change",
          },
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        native_place: [
          { required: true, message: "请输入籍贯", trigger: "blur" },
        ],
        domicile_place: [
          { required: true, message: "请输入户口所在地", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择户口性质", trigger: "change" },
        ],
        social_security: [
          { required: true, message: "请选择社保情况", trigger: "change" },
        ],
        accumulation_fund: [
          { required: true, message: "请选择公积金情况", trigger: "change" },
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        company_email: [
          { required: true, message: "请输入公司邮箱", trigger: "blur" },
        ],
        emergency_contact: [
          { required: true, message: "请输入紧急联系人", trigger: "blur" },
        ],
        emergency_mobile: [
          { required: true, message: "请输入紧急联系电话", trigger: "blur" },
        ],
      },
      //   表单数据
      //基本信息
      staffId: "", //员工id（从员工信息页面跳转过来会有此值）
      fixedData: {
        // 员工性质
        status_options: [
          {
            value: 1,
            label: "试用",
          },
          {
            value: 2,
            label: "正式",
          },
          {
            value: 3,
            label: "离职",
          },
        ],
        // 职位类别
        position_types: [
          {
            value: 0,
            label: "高管",
          },
          {
            value: 1,
            label: "职能类",
          },
          {
            value: 2,
            label: "职能支撑类",
          },
          {
            value: 3,
            label: "业务支撑类",
          },
          {
            value: 4,
            label: "业务类",
          },
        ],

        // 公司
        company_options: [
          {
            value: 1,
            label: "北京公司",
          },
          {
            value: 2,
            label: "成都公司",
          },
          {
            value: 3,
            label: "上海公司",
          },
        ],
        // 留学信息
        abroad_options: [
          { value: 0, label: "是" },
          { value: 1, label: "否" },
        ],
        nation_options: [
          { value: 0, label: "汉族" },
          { value: 1, label: "少数民族" },
        ],
        politics_options: [
          { value: 0, label: "党员 " },
          { value: 1, label: "团员" },
          { value: 2, label: "群众" },
        ],
        masses_options: [
          { value: 0, label: "已转出 " },
          { value: 1, label: "已转入" },
          { value: 2, label: "未转入" },
        ],
        category_options: [
          { value: 0, label: "城镇  " },
          { value: 1, label: "农村" },
        ],
        social_security_options: [
          { value: 0, label: "新参统  " },
          { value: 1, label: "转入" },
        ],
        probation_options: [
          {
            value: 0,
            label: "无",
          },
          {
            value: 1,
            label: "1个月",
          },
          {
            value: 2,
            label: "2个月",
          },
          {
            value: 3,
            label: "3个月",
          },
          {
            value: 4,
            label: "4个月",
          },
          {
            value: 5,
            label: "5个月",
          },
          {
            value: 6,
            label: "6个月",
          },
        ],
        marrige_options: [
          {
            value: 0,
            label: "未婚",
          },
          {
            value: 1,
            label: "已婚",
          },
        ],
        study_options: [
          {
            value: 0,
            label: "专科",
          },
          {
            value: 1,
            label: "本科",
          },
          {
            value: 2,
            label: "硕士",
          },
        ],
        department_options: [],
        job_options: [],
      }, //
      saveType: "", //保存类型（编辑保存/新增保存）
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.staffId = this.$route.query.id;
    this.saveType = this.$route.query.saveType;
    this.company = this.userInfo.company_id;
    if (this.staffId && this.staffId != "") {
      this.getStaffInfo();
      this.breadList[1].title = "编辑员工";
    } else {
      this.breadList[1].title = '新增员工'
    }
  },
  mounted() {
    this.getDepart();
    this.getPosis();
  },
  methods: {
    addStaff(type) {
      this.ruleForm.job_number = parseInt(this.ruleForm.job_number)
      if (type == 0) {
        history.go(-1);
      } else {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            STAFFS_API.addStaff(this.ruleForm).then((res) => {
              if (res.status == 200) {
                this.$message.success("添加成功！");
              } else {
                this.$message.error(res.error.message);
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
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
        is_paging: 1,
      };
      DEPART_API.getDeparts(params).then((res) => {
        if (res.status == 200) {
          this.fixedData.department_options = res.data;
        } else {
          console.log("获取部门失败！");
        }
      });
    },
    // 获取职位列表
    getPosis(val) {
      let params = {
        is_paging: 1,
      };
      POSI_API.getPositions(params).then((res) => {
        if (res.status == 200) {
          this.fixedData.job_options = res.data;
        } else {
          console.log("获取职位失败！");
        }
      });
    },
    // 获取员工信息
    getStaffInfo() {
      STAFFS_API.staffInfo({}, this.staffId).then((res) => {
        if (res.status == 200) {
          this.ruleForm = res.data;
          let a = [];//职位
          let b = [];//部门
          res.data.position.forEach(item=>{
            a.push(item.id)
          })
          this.$set(this.ruleForm,'position_id',a)
          res.data.department.forEach(item=>{
            b.push(item.id)
          })
          this.$set(this.ruleForm,'department_id',b)
        } else {
          this.$message.error("员工信息获取失败！");
        }
      });
    },
    // 公司发生变化时触发
    companyChange(val) {
      this.getDepart(val);
      this.getJobs(val);
    },
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" >
.staffManage {
  .formCard {
    margin: 20px;
    padding: 20px;
    .baseInfo {
      border-bottom: 1px solid #f0f3f7;
      margin-bottom: 20px;
    }
    .btnBox {
      .btns {
        width: 200px;
        position: relative;
        left: 50%;
        margin-left: -100px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }
    }
  }

  .elInput {
    width: 90%;
  }
  .title {
    display: block;
    font-size: 16px;
    color: #999999;
    margin-bottom: 20px;
  }
  .innerTitle {
    font-size: 14px;
    padding-left: 20px;
    color: #999999;
    margin-bottom: 20px;
  }
  .label {
    .el-form-item__label {
      line-height: 20px;
    }
  }
}
</style> 