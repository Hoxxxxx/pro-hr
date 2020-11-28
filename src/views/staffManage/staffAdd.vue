<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <el-card class="formCard">
      <!-- 基本信息 -->
      <div class="baseInfo">
        <span class="title">基本信息</span>
        <ul class="inputBox">
          <!-- 姓名/性别 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">姓名</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.name"
                placeholder="请输入姓名"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">姓别</span>
              </div>
              <div class="genderBox">
                <el-radio v-model="subParams.sex" :label="1" border style="width: 108px"
                  >男</el-radio
                >
                <el-radio v-model="subParams.sex" :label="2" border style="width: 108px"
                  >女</el-radio
                >
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">员工号</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.job_number"
                placeholder="请输入员工号"
              ></el-input>
            </div>
          </li>
          <!--  -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">员工性质</span>
              </div>
              <el-select
                v-model="subParams.type"
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
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">职位</span>
              </div>
              <el-select
                v-model="subParams.position_id"
                multiple
                placeholder="请选择职位"
                class="elInput"
              >
                <el-option
                  v-for="item in fixedData.job_options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">职位类别</span>
              </div>
              <el-select
                v-model="subParams.position_type"
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
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">业务线</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.lob"
                placeholder="请输入业务线内容"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">部门</span>
              </div>
              <el-select
                v-model="subParams.department_id"
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
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">身份证号</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.card"
                placeholder="请输入身份证号"
              ></el-input>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">身份证有效期</span>
              </div>
              <el-date-picker
                v-model="subParams.card_valid"
                type="date"
                placeholder="选择身份证有效期"
                class="elInput"
              ></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">年龄</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.age"
                placeholder="请输入年龄"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">所属公司</span>
              </div>
              <el-select
                v-model="subParams.company_id"
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
            </div>
          </li>
        </ul>
      </div>
      <!-- 教育信息 -->
      <div class="baseInfo">
        <span class="title">教育信息</span>
        <h5 class="innerTitle">全日制教育</h5>
        <ul class="inputBox">
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学校名称</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.full_school"
                placeholder="请输入学校名称"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">专业</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.full_major"
                placeholder="请输入专业"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学历</span>
              </div>
              <el-select
                v-model="subParams.full_education"
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
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学位</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.full_degree"
                placeholder="请输入学位"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">毕业时间</span>
              </div>
              <el-date-picker
                v-model="subParams.full_graduation_time"
                type="date"
                placeholder="选择毕业时间"
                class="elInput"
              ></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInput"></div>
            </div>
          </li>
        </ul>
        <h5 class="innerTitle">在职教育</h5>
        <ul class="inputBox">
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学校名称</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.part_school"
                placeholder="请输入学校名称"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">专业</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.part_major"
                placeholder="请输入专业"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学历</span>
              </div>
              <el-select
                v-model="subParams.part_education"
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
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学位</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.part_degree"
                placeholder="请输入学位"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">毕业时间</span>
              </div>
              <el-date-picker
                v-model="subParams.part_graduation_time"
                type="date"
                placeholder="选择毕业时间"
                class="elInput"
              ></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInput"></div>
            </div>
          </li>
        </ul>
        <h5 class="innerTitle">其他</h5>
        <ul class="inputBox">
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">留学</span>
              </div>
              <el-select
                v-model="subParams.abroad"
                placeholder="是否留学"
                class="elInput"
              >
                <el-option
                  v-for="item in fixedData.abroad_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">英语水平</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.english_level"
                placeholder="请输入英语水平"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInput"></div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 工作信息 -->
      <div class="baseInfo">
        <span class="title">工作信息</span>
        <ul class="inputBox">
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">职称</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.professional"
                placeholder="请输入职称"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">职称级别</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.professional_level"
                placeholder="请输入职称级别"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">参工时间</span>
              </div>
              <el-date-picker
                v-model="subParams.work_time"
                type="date"
                placeholder="选择参工时间"
                class="elInput"
              ></el-date-picker>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">华录入职时间</span>
              </div>
              <el-date-picker
                v-model="subParams.hualu_join_time"
                type="date"
                placeholder="选择华录入职时间"
                class="elInput"
              ></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">新媒入职时间</span>
              </div>
              <el-date-picker
                v-model="subParams.newmedia_join_time"
                type="date"
                placeholder="选择新媒入职时间"
                class="elInput"
              ></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">劳动合同到期时间</span>
              </div>
              <el-date-picker
                v-model="subParams.labor_contract_deadline"
                type="date"
                placeholder="选择劳动合同到期时间"
                class="elInput"
              ></el-date-picker>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">第一期劳动合同到期时间</span>
              </div>
              <el-date-picker
                v-model="subParams.first_labor_contract_deadline"
                type="date"
                placeholder="选择华录入职时间"
                class="elInput"
              ></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">第二期劳动合同到期时间</span>
              </div>
              <el-date-picker
                v-model="subParams.second_labor_contract_deadline"
                type="date"
                placeholder="选择新媒入职时间"
                class="elInput"
              ></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">第三期劳动合同到期时间</span>
              </div>
              <el-date-picker
                v-model="subParams.third_labor_contract_deadline"
                type="date"
                placeholder="选择劳动合同到期时间"
                class="elInput"
              ></el-date-picker>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">预计试用期截止时间</span>
              </div>
              <el-date-picker
                v-model="subParams.trial_deadline"
                type="date"
                placeholder="选择参工时间"
                class="elInput"
              ></el-date-picker>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInput"></div>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInput"></div>
            </div>
          </li>
        </ul>
      </div>
      <!--  -->
      <div class="baseInfo">
        <span class="title">其他信息</span>
        <ul class="inputBox">
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">婚姻状况</span>
              </div>
              <el-select
                v-model="subParams.marriage"
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
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">民族</span>
              </div>
              <el-select
                v-model="subParams.nation"
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
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">政治面貌</span>
              </div>
              <el-select
                v-model="subParams.politics"
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
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">党群关系</span>
              </div>
              <el-select
                v-model="subParams.party_masses_relation"
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
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">工会关系</span>
              </div>
              <el-select
                v-model="subParams.union_relation"
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
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">籍贯</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.native_place"
                placeholder="请输入籍贯"
              ></el-input>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">户口所在地</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.domicile_place"
                placeholder="请输入户口所在地"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">户口性质</span>
              </div>
              <el-select
                v-model="subParams.category"
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
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">社保情况</span>
              </div>
              <el-select
                v-model="subParams.social_security"
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
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">公积金情况</span>
              </div>
              <el-select
                v-model="subParams.accumulation_fund"
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
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">手机号</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.mobile"
                placeholder="请输入手机号"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">公司邮箱</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.company_email"
                placeholder="请输入公司邮箱"
              ></el-input>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">个人邮箱</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.personal_email"
                placeholder="请输入个人邮箱"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">可收信件地址</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.mail_address"
                placeholder="请输入可收信件地址"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">紧急联系人</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.emergency_contact"
                placeholder="请输入紧急联系人"
              ></el-input>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot">*</span>
                <span class="label">紧急联系电话</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.emergency_mobile"
                placeholder="请输入紧急联系电话"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">第二联系电话</span>
              </div>
              <el-input
                class="elInput"
                v-model="subParams.second_mobile"
                placeholder="请输入第二联系电话"
              ></el-input>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInput"></div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">备注</span>
              </div>
              <el-input
                class="areaInput"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="subParams.remark"
                placeholder="请输入备注"
              ></el-input>
            </div>
          </li>
        </ul>
      </div>
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
// import configUrl from "../../api/configUrl";
import navBar from "@/components/navBar/navBar";
import { mapState } from "vuex";
import { STAFFS_API } from "@/api/staffs";
import { DEPART_API } from "@/api/department"
import {POSI_API} from "@/api/positions"
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
          title: "新增员工",
        },
      ],
      title: "新增员工",
      //   表单数据
      //基本信息
      staffId: "", //员工id（从员工信息页面跳转过来会有此值）
      subParams: {
        name: "", //姓名
        gender: null,
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
        attachment_url: [], //附件地址
      },
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
        department_options:[],
        job_options:[],
      }, //
      saveType: "", //保存类型（编辑保存/新增保存）
    };
  },
  computed: {
    ...mapState(["userInfo"]),
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
  mounted() {
    this.getDepart();
    this.getPosis();
  },
  methods: {
    addStaff(type) {
      console.log(this.subParams)
      if (type == 0) {
        history.go(-1);
      } else {
        STAFFS_API.addStaff(this.subParams).then(res=>{
          if(res.status == 200){
            this.$message.success('添加成功！')
          }else{
            this.$message.error(res.error.message)
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
        page:1
      };
      DEPART_API.getDeparts(params).then((res) => {
        if(res.status == 200){
          this.fixedData.department_options = res.data;
        }else{
          console.log('获取部门失败！')
        }
      });
    },
    // 获取职位列表
    getPosis(val) {
      let params = {
        page:1
      };
      POSI_API.getPositions(params).then((res) => {
        if(res.status == 200){
          this.fixedData.job_options = res.data;
          let temp = [{
            id: 0,
            name: "职位1",
          },
          {
            id: 1,
            name: "职位2",
          },]
          this.fixedData.job_options = temp
        }else{
          console.log('获取职位失败！')
        }
      });
    },
    // 获取员工信息
    getStaffInfo() {
      http.GET(`${configUrl.getStaffList}/${this.staffId}`).then((res) => {
        if (res.status == 0) {
          let info = res.data;
          this.name = info.name;
          this.gender = info.sex;
          this.phone = info.mobile;
          this.idCard = info.card;
          this.birthday = info.birthday;
          this.email = info.email;
          this.status = info.status;
          this.company = JSON.parse(info.company_id);
          this.department = JSON.parse(info.department_id);
          this.job = JSON.parse(info.position_id);
          this.entryTime = info.entry_time;
          this.positiveTime = info.positive_time;
          this.probation = info.trial_period;
          this.workNum = info.job_number;
          this.marrige = info.marriage;
          this.study = info.education;
          this.emergency = info.emergency_contact;
        } else {
          this.$message({
            message: "获取员工信息失败！",
            type: "warning",
          });
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

<style lang="less" scoped>
.staffManage {
  .formCard {
    margin: 20px;
    padding: 20px 40px;
    .title {
      font-size: 16px;
      color: #999999;
    }
    .baseInfo {
      border-bottom: 1px solid #f0f3f7;
      margin-bottom: 20px;
      .inputBox {
        margin-top: 20px;
        li {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          flex: 1 1 auto;
          margin-bottom: 10px;
          .itemBox {
            min-width: 400px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex: 1 1 auto;
            margin: 0 80px 20px 0;
            &:last-child {
              margin-right: 0;
            }
            .elInput,
            .genderBox {
              width: 200px;
              flex: 1 1 auto;
            }
            .areaInput {
              width: 500px;
              flex: 1 1 auto;
            }
            // .genderBox {
            //   width: 370px;
            //   flex: 1 1 auto;
            // }
            .labelBox {
              width: 120px;
              margin-right: 20px;
              text-align: right;
              .redPot,
              .label {
                letter-spacing: 1px;
                color: #f56c6c;
                font-size: 20px;
                font-weight: bold;
                margin-right: 2px;
              }
              .label {
                color: #333333;
                margin-right: 0;
                font-size: 16px;
              }
            }
          }
        }
      }
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
    .innerTitle {
      margin-top: 20px;
      font-size: 14px;
      padding-left: 30px;
      color: #999999;
    }
  }
}
</style>
