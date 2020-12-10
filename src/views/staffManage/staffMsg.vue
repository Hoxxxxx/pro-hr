<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" ></nav-Bar>
    <div class="menuList">
      <ul>
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="index == curIndex ? 'active' : ''"
          @click="changeStatus(index, item.id)"
        >
          <div class="index"></div>
          <div class="menuName">{{ item.name }}</div>
        </li>
      </ul>
    </div>
    <!-- 基础信息 -->
    <el-card class="formCard" v-if="curIndex == 0">
      <!-- 基本信息 -->
      <div class="baseInfo">
        <span class="title">基本信息</span>
        <ul class="inputBox">
          <!-- 姓名/性别 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">姓名</span>
              </div>
              <div class="elInput">{{ subParams.name }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">员工号</span>
              </div>
              <div class="elInput">{{ subParams.job_number }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">姓别</span>
              </div>
              <div class="genderBox">
                <el-radio
                  v-model="subParams.sex"
                  :label="1"
                  border
                  style="width: 108px"
                  disabled
                  >男</el-radio
                >
                <el-radio
                  v-model="subParams.sex"
                  :label="2"
                  border
                  style="width: 108px"
                  disabled
                  >女</el-radio
                >
              </div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">员工性质</span>
              </div>
              <div class="elInput">{{ subParams.type | type }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">职位</span>
              </div>
              <div class="elInput">
                <span
                  v-for="(position, index) in subParams.position"
                  :key="index"
                  class="forName"
                  >{{ position.name }}</span
                >
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">职位类别</span>
              </div>
              <div class="elInput">
                <span
                  v-for="(position_type, index) in subParams.position_type"
                  :key="index"
                  class="forName"
                  >{{ position_type | position_type }}</span
                >
              </div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">业务线</span>
              </div>
              <div class="elInput">{{ subParams.lob }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">部门</span>
              </div>
              <div class="elInput">
                <span
                  v-for="(depart, index) in subParams.department"
                  :key="index"
                  class="forName"
                  >{{ depart.name }}</span
                >
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">身份证号</span>
              </div>
              <div class="elInput">{{ subParams.card }}</div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">身份证有效期</span>
              </div>
              <div class="elInput">{{ subParams.card_valid }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">年龄</span>
              </div>
              <div class="elInput">{{ subParams.age }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">所属公司</span>
              </div>
              <div class="elInput">{{ subParams.company_id | company }}</div>
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
              <div class="elInput">{{ subParams.full_school }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">专业</span>
              </div>
              <div class="elInput">{{ subParams.full_major }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学历</span>
              </div>
              <div class="elInput">
                {{ subParams.full_education | education }}
              </div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学位</span>
              </div>
              <div class="elInput">{{ subParams.full_degree }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">毕业时间</span>
              </div>
              <div class="elInput">{{ subParams.full_graduation_time }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInputp"></div>
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
              <div class="elInput">{{ subParams.part_school }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">专业</span>
              </div>
              <div class="elInput">{{ subParams.part_major }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学历</span>
              </div>
              <div class="elInput">
                {{ subParams.part_education | education }}
              </div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学位</span>
              </div>
              <div class="elInput">{{ subParams.part_degree }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">毕业时间</span>
              </div>
              <div class="elInput">{{ subParams.part_graduation_time }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInputp"></div>
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
              <div class="elInput">{{ subParams.abroad | abroad }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">英语水平</span>
              </div>
              <div class="elInput">{{ subParams.english_level }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInputp"></div>
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
              <div class="elInput">{{ subParams.professional }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">职称级别</span>
              </div>
              <div class="elInput">{{ subParams.professional_level }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">参工时间</span>
              </div>
              <div class="elInput">{{ subParams.work_time }}</div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">华录入职时间</span>
              </div>
              <div class="elInput">{{ subParams.hualu_join_time }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">新媒入职时间</span>
              </div>
              <div class="elInput">{{ subParams.newmedia_join_time }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">劳动合同到期时间</span>
              </div>
              <div class="elInput">{{ subParams.labor_contract_deadline }}</div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">第一期劳动合同到期时间</span>
              </div>
              <div class="elInput">
                {{ subParams.first_labor_contract_deadline }}
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">第二期劳动合同到期时间</span>
              </div>
              <div class="elInput">
                {{ subParams.second_labor_contract_deadline }}
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">第三期劳动合同到期时间</span>
              </div>
              <div class="elInput">
                {{ subParams.third_labor_contract_deadline }}
              </div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">预计试用期截止时间</span>
              </div>
              <div class="elInput">{{ subParams.trial_deadline }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInputp"></div>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInputp"></div>
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
              <div class="elInput">{{ subParams.marriage | marriage }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">民族</span>
              </div>
              <div class="elInput">{{ subParams.nation | nation }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">政治面貌</span>
              </div>
              <div class="elInput">{{ subParams.politics | politics }}</div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">党群关系</span>
              </div>
              <div class="elInput">
                {{ subParams.party_masses_relation | party_masses_relation }}
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">工会关系</span>
              </div>
              <div class="elInput">
                {{ subParams.union_relation | party_masses_relation }}
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">籍贯</span>
              </div>
              <div class="elInput">{{ subParams.native_place }}</div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">户口所在地</span>
              </div>
              <div class="elInput">{{ subParams.domicile_place }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">户口性质</span>
              </div>
              <div class="elInput">{{ subParams.category | category }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">社保情况</span>
              </div>
              <div class="elInput">
                {{ subParams.social_security | social_security }}
              </div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">公积金情况</span>
              </div>
              <div class="elInput">
                {{ subParams.accumulation_fund | social_security }}
              </div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">手机号</span>
              </div>
              <div class="elInput">{{ subParams.mobile }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">公司邮箱</span>
              </div>
              <div class="elInput">{{ subParams.company_email }}</div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">个人邮箱</span>
              </div>
              <div class="elInput">{{ subParams.personal_email }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">可收信件地址</span>
              </div>
              <div class="elInput">{{ subParams.mail_address }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">紧急联系人</span>
              </div>
              <div class="elInput">{{ subParams.emergency_contact }}</div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">紧急联系电话</span>
              </div>
              <div class="elInput">{{ subParams.emergency_mobile }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">第二联系电话</span>
              </div>
              <div class="elInput">{{ subParams.second_mobile }}</div>
            </div>
            <div class="itemBox">
              <div class="labelBox"></div>
              <div class="elInputp"></div>
            </div>
          </li>
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">备注</span>
              </div>
              <div class="elInput areaInput">{{ subParams.remark }}</div>
            </div>
          </li>
        </ul>
        <div class="upload">
          <span class="label">附件</span>
          <ul v-if="subParams.attachment_url.length > 0">
            <li v-for="(file, index) in subParams.attachment_url" :key="index">
              <el-link
                type="primary"
                :underline="false"
                @click="downFile(file)"
                >{{ file }}</el-link
              >
            </li>
          </ul>
          <span class="tips" v-else>无附件</span>
        </div>
      </div>
      <div class="btnBox">
        <div class="btns">
          <el-button style="width: 95px" type="primary" @click="editMsg()"
            >编辑</el-button
          >
        </div>
      </div>
    </el-card>
    <!-- 转正信息 -->
    <el-card class="formCard" v-if="curIndex == 1">
      <div>
        <div class="positiveEdit" v-if="positiveData != null">
          <div class="baseInfo">
            <ul class="inputBox">
              <li>
                <div class="itemBox">
                  <div class="labelBox labelNon">
                    <span class="label">转正时间</span>
                  </div>
                  <div class="elInput">
                    {{
                      positiveData.positive_time
                        ? positiveData.positive_time
                        : "暂无"
                    }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 工作总结 -->
          <div class="baseInfo">
            <div class="conclusion">
              <span class="label">工作总结</span>
              <div class="turnover">
                {{ positiveData.summary ? positiveData.summary : "暂无" }}
              </div>
            </div>
            <div class="upload conclusion">
              <span class="label mr0">附件</span>
              <ul
                class="fileList"
                v-if="
                  positiveData.attachment_url &&
                  positiveData.attachment_url.length > 0
                "
              >
                <li
                  v-for="(item, index) in positiveData.attachment_url"
                  :key="index"
                >
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="downFile(item)"
                    >{{ item }}</el-link
                  >
                </li>
              </ul>
              <span class="tips" v-else>无附件</span>
            </div>
          </div>
        </div>
        <div class="positiveNull" v-else>
          <div>
            <img src="../../assets/img/dataNull.png" />
            <h5 class="nonTips">暂无转正信息</h5>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 离职信息 -->
    <el-card class="formCard" v-if="curIndex == 2">
      <div class="positiveEdit" v-if="turnoverData != null">
        <div class="baseInfo">
          <ul class="inputBox">
            <!-- 离职类型/离职日期 -->
            <li>
              <div class="itemBox">
                <div class="labelBox labelNon">
                  <span class="label">离职类型</span>
                </div>
                <div class="elInput">
                  {{
                    turnoverData.turnover_type &&
                    turnoverData.turnover_type | turnover
                  }}
                </div>
              </div>
              <div class="itemBox">
                <div class="labelBox labelNon">
                  <span class="label">离职日期</span>
                </div>
                <div class="elInput">
                  {{
                    turnoverData.turnover_time
                      ? turnoverData.turnover_time
                      : "暂无"
                  }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="baseInfo">
          <!-- 离职原因 -->
          <div class="conclusion">
            <span class="label">离职原因</span>
            <div class="turnover">
              {{
                turnoverData.turnover_reason
                  ? turnoverData.turnover_reason
                  : "暂无"
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="positiveNull" v-else>
        <div>
          <img src="../../assets/img/dataNull.png" />
          <h5 class="nonTips">暂无离职信息</h5>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import { renderTime } from "@/utils/function.js";
import { STAFFS_API } from "@/api/staffs";
export default {
  filters: {
    // 员工性质
    type(val) {
      switch (val) {
        case 1:
          return "试用 ";
          break;
        case 2:
          return "正式 ";
          break;
        case 3:
          return "离职";
          break;
        default:
          return "";
          break;
      }
    },
    company(val) {
      switch (val) {
        case 1:
          return "北京公司";
          break;
        case 2:
          return "成都公司";
          break;
        case 3:
          return "上海公司";
          break;
        default:
          return "";
          break;
      }
    },
    status(val) {
      switch (val) {
        case 0:
          return "在职";
          break;
        case 1:
          return "试用";
          break;
        case 2:
          return "正式";
          break;
        default:
          return "离职";
          break;
      }
    },
    position_type(val) {
      switch (val) {
        case 0:
          return "高管";
          break;
        case 1:
          return "职能类";
          break;
        case 2:
          return "职能支撑类";
          break;
        case 3:
          return "业务支撑类";
          break;
        case 4:
          return "业务类";
          break;
        default:
          return "";
          break;
      }
    },
    trial(val) {
      if (val == 0) {
        return "无";
      } else {
        return val ? `${val}个月` : "暂无";
      }
    },
    marriage(val) {
      if (val == 0) {
        return "未知";
      } else if (val == 1) {
        return "已婚";
      } else {
        return "未婚";
      }
    },
    education(val) {
      switch (val) {
        case 1:
          return "专科";
          break;
        case 2:
          return "本科  ";
          break;
        case 3:
          return "硕士 ";
          break;
        case 4:
          return "博士   ";
          break;
        case 5:
          return "专科以下 ";
          break;
        default:
          return "未知";
          break;
      }
    },
    nation(val) {
      if (val == 2) {
        return "汉族";
      } else if (val == 1) {
        return "少数名族";
      } else {
        return "未知";
      }
    },
    politics(val) {
      switch (val) {
        case 0:
          return "党员";
          break;
        case 1:
          return "团员 ";
          break;
        case 2:
          return "群众";
          break;
        default:
          return "暂无";
          break;
      }
    },
    party_masses_relation(val) {
      switch (val) {
        case 1:
          return "已转出";
          break;
        case 2:
          return "已转入 ";
          break;
        case 3:
          return "未转入";
          break;
        default:
          return "未知";
          break;
      }
    },
    abroad(val) {
      switch (val) {
        case 1:
          return "是";
          break;
        case 2:
          return "否 ";
          break;
        default:
          return "未知";
          break;
      }
    },
    category(val) {
      if (val == 0) {
        return "城镇 ";
      } else {
        return "农村";
      }
    },
    social_security(val) {
      if (val == 0) {
        return "新参统 ";
      } else {
        return "转入";
      }
    },
    turnover(val) {
      switch (val) {
        case 0:
          return "主动离职";
          break;
        case 1:
          return "被动离职";
          break;
        case 2:
          return "退休";
          break;
        default:
          return "暂无";
          break;
      }
    },
  },
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/staffManage",
          title: "员工管理",
        },
        {
          title: "员工信息",
        },
      ],
      menuList: [
        { name: "基础信息", id: 0 },
        { name: "转正信息", id: 1 },
        { name: "离职信息", id: 2 },
      ],
      curIndex: 0,
      staffInfo: {}, //员工信息
      staffId: "", //员工id
      subParams: {
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
        attachment_url: [], //附件地址
      },
      // 转正信息填写部分数据
      positiveData: {},
      // 离职数据
      turnoverData: {},
    };
  },
  created() {
    this.staffId = this.$route.query.id;
    this.staffInfo.status = this.$route.query.status;
    this.curIndex = this.$route.query.index ? this.$route.query.index : 0;
  },
  mounted() {
    this.getStaffInfo();
  },
  methods: {
    // 顶部菜单选择
    changeStatus(index, status) {
      this.curIndex = index;
    },
    // 编辑用户信息
    editMsg() {
      this.$router.push({
        path: "/staffAdd",
        query: {
          id: this.staffId,
          saveType: "edit",
        },
      });
    },
    // 获取员工信息
    getStaffInfo() {
      STAFFS_API.staffInfo({}, this.staffId).then((res) => {
        if (res.status == 200) {
          this.subParams = res.data;
          if (res.data.first_labor_contract_deadline == "1970-01-01 08:00:00") {
            this.subParams.first_labor_contract_deadline = "";
          }
          if (res.data.full_graduation_time == "1970-01-01 08:00:00") {
            this.subParams.full_graduation_time = "";
          }
          if (res.data.hualu_join_time == "1970-01-01 08:00:00") {
            this.subParams.hualu_join_time = "";
          }
          if (res.data.labor_contract_deadline == "1970-01-01 08:00:00") {
            this.subParams.labor_contract_deadline = "";
          }
          if (res.data.newmedia_join_time == "1970-01-01 08:00:00") {
            this.subParams.newmedia_join_time = "";
          }
          if (res.data.part_graduation_time == "1970-01-01 08:00:00") {
            this.subParams.part_graduation_time = "";
          }
          if (
            res.data.second_labor_contract_deadline == "1970-01-01 08:00:00"
          ) {
            this.subParams.second_labor_contract_deadline = "";
          }
          if (res.data.third_labor_contract_deadline == "1970-01-01 08:00:00") {
            this.subParams.third_labor_contract_deadline = "";
          }
          if (res.data.trial_deadline == "1970-01-01 08:00:00") {
            this.subParams.trial_deadline = "";
          }
          if (res.data.work_time == "1970-01-01 08:00:00") {
            this.subParams.work_time = "";
          }
          if (this.subParams.positive != null) {
            this.subParams.positive.positive_time = renderTime(
              this.subParams.positive.positive_time
            );
          }
          if (this.subParams.turnover != null) {
            this.subParams.turnover.turnover_time = renderTime(
              this.subParams.turnover.turnover_time
            );
          }
          this.positiveData = this.subParams.positive;
          this.turnoverData = this.subParams.turnover;
        } else {
          this.$message.error("员工信息获取失败！");
        }
      });
    },
    // 文件下载
    async downFile(val) {
      let params = {
        file_path: val,
      };
      const { data: res } = await this.axios({
        method: "get",
        url: `hr/files/down`,
        params: params,
        responseType: "blob",
      });
      let fileName = val;
      let fileType = {
        doc: "application/msword",
        docx:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx:
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        pdf: "application/pdf",
      };
      let type = fileName.split(".")[1]; //获取文件后缀名
      let curType = fileType[type];
      let blob = new Blob([res], {
        type: curType,
      });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  },
  components: {
    navBar,
  },
};
</script>

<style lang="less" scoped>
.staffManage {
  height: 100%;
  .navBox {
    margin-bottom: 0 !important;
  }
  .menuList {
    width: 100%;
    background: #fff;
    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 20px;
      li {
        position: relative;
        cursor: pointer;
        width: 80px;
        height: 40px;
        font-size: 14px;
        margin: 0 20px;
        color: #999999;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &:first-child {
          margin-left: 0;
        }
        &::after {
          display: block;
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 4px;
          width: 100%;
        }
        .index {
          width: 14px;
          height: 14px;
          border-radius: 100%;
          background: #999;
        }
        .menuName {
          line-height: 40px;
        }
        &.active {
          .index {
            background: #409efd;
          }
          .menuName,
          .count {
            color: #409efd;
          }
          &::after {
            background: #409efd;
          }
        }
      }
    }
  }

  .formCard {
    margin: 20px;
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
            .elInput {
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              box-sizing: border-box;
              color: #606266;
              min-height: 40px;
              line-height: 40px;
              padding: 0 15px;
            }
            .elInputp {
              width: 200px;
              flex: 1 1 auto;
            }
            .areaInput {
              width: 500px;
              flex: 1 1 auto;
            }
            .labelBox {
              width: 120px;
              margin-right: 20px;
              text-align: right;
              .label {
                color: #606266;
                margin-right: 0;
                font-size: 14px;
              }
            }
          }
        }
      }
      .innerTitle {
        font-size: 14px;
        padding-left: 30px;
        color: #999999;
        margin: 20px 0;
      }
      .inputBoxPositive {
        li {
          width: 100%;
          margin-right: 50px;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 20px;
          .itemBox {
            width: 480px;
            max-width: 500px;
            min-width: 450px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-right: 120px;
            .elInput {
              width: 370px;
            }
            .labelBox {
              width: 120px;
              text-align: left;
              .label {
                letter-spacing: 1px;
                color: #f56c6c;
                font-size: 16px;
                font-weight: bold;
                margin-right: 2px;
              }
              .label {
                color: #333333;
                margin-right: 0;
              }
            }
          }
        }
      }
      .turnover {
        margin-top: 20px;
      }
      .conclusion {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .label {
          display: block;
          width: 120px;
          letter-spacing: 1px;
          font-size: 16px;
          font-weight: bold;
          margin-right: 8px;
          text-align: left;
        }
        .turnover {
          width: 100%;
          min-height: 500px;
          padding: 15px;
          line-height: 34px;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          color: #909399;
          font-weight: 400;
        }
        ul {
          flex: 1 1 auto;
        }
        .tips {
          flex: 1 1 auto;
        }
        .mr0 {
          margin-right: 0;
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

    .positiveNull {
      min-height: 650px;
      position: relative;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img {
        margin-bottom: 20px;
      }
    }
  }
  .forName {
    background-color: #f4f4f5;
    border-color: #e9e9eb;
    border-radius: 4px;
    height: 24px;
    padding: 4px 8px;
    line-height: 22px;
    color: #909399;
    margin-right: 4px;
  }
  .labelNon {
    text-align: left !important;
    margin-right: 0 !important;
    .label {
      font-size: 16px !important;
      font-weight: bold;
    }
  }
  .nonTips {
    font-size: 14px;
    color: #666;
  }
  .upload {
    display: flex;
    flex-direction: row;
    align-items: normal;
    justify-content: flex-start;
    margin-bottom: 20px;
    .label {
      width: 120px;
      height: 40px;
      margin-right: 20px;
      padding-right: 0;
      line-height: 40px;
      text-align: right;
    }
    ul {
      li {
        height: 40px;
        line-height: 38px;
      }
    }
    .tips {
      flex: 1 1 auto;
      line-height: 40px;
    }
  }
}
</style>
