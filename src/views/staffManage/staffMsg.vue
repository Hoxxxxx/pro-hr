<template>
  <div class="staffManage">
    <nav-Bar :breadList="breadList" :title="title"></nav-Bar>
    <div class="menuList">
      <ul>
        <li
          v-for="(item,index) in menuList"
          :key="index"
          :class="index == curIndex ? 'active' : ''"
          @click="changeStatus(index,item.id)"
        >
          <div class="index"></div>
          <div class="menuName">{{item.name}}</div>
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
              <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">姓别</span>
              </div>
              <div class="genderBox">
                <el-radio v-model="gender" :label="1" disabled border style="width:108px">男</el-radio>
                <el-radio v-model="gender" :label="2" disabled border style="width:108px">女</el-radio>
              </div>
            </div>
          </li>
          <!-- 手机号/身份证号 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">手机号</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">身份证号</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 出生日期/邮箱 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="redPot"></span>
                <span class="label">出生日期</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">邮箱</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 职位信息 -->
      <div class="baseInfo">
        <span class="title">职位信息</span>
        <ul class="inputBox">
          <!-- 员工状态/所属公司 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">员工状态</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">所属公司</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 部门/职位 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">部门</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">职位</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 入职时间/转正时间 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">入职时间</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">转正时间</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 试用期/工号 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">试用期</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">工号</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 其他信息 -->
      <div class="baseInfo">
        <span class="title">其他信息</span>
        <ul class="inputBox">
          <!-- 婚姻状况/学历 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">婚姻状况</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">学历</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
          </li>
          <!-- 紧急联系人 -->
          <li>
            <div class="itemBox">
              <div class="labelBox">
                <span class="label">紧急联系人</span>
              </div>
              <div class="elInput">具体信息</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="btnBox">
        <div class="btns">
          <el-button style="width:95px;" type="primary" @click="editMsg()">编辑</el-button>
        </div>
      </div>
    </el-card>
    <!-- 转正信息 -->
    <el-card class="formCard" v-if="curIndex == 1">
      <!-- 转正信息填写 -->
      <div class="positiveEdit" v-if="positiveStatus != 0">
        <div class="baseInfo">
          <ul class="inputBox">
            <!-- 姓名/入职日期 -->
            <li v-if="positiveStatus == 1">
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">姓名</span>
                </div>
                <div class="elInput">具体信息</div>
              </div>
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">入职日期</span>
                </div>
                <div class="elInput">具体信息</div>
              </div>
            </li>
            <!-- 手机号 -->
            <li v-if="positiveStatus == 1">
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">手机号</span>
                </div>
                <div class="elInput">具体信息</div>
              </div>
            </li>
            <!-- 申请时间/试用期 -->
            <li v-if="positiveStatus == 2">
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">申请时间</span>
                </div>
                <div class="elInput">具体信息</div>
              </div>
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">试用期</span>
                </div>
                <div class="elInput">具体信息</div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 转正时间 -->
        <div class="baseInfo">
          <ul class="inputBoxPositive">
            <!-- 转正时间 -->
            <li v-if="positiveStatus == 1">
              <div class="itemBox">
                <div class="labelBox">
                  <span class="redPot">&#10052;</span>
                  <span class="label">转正时间</span>
                </div>
                <el-date-picker
                  v-model="positiveTime"
                  type="date"
                  placeholder="选择转正时间"
                  class="elInput"
                ></el-date-picker>
              </div>
            </li>
          </ul>
          <!-- 工作总结 -->
          <div class="conclusion">
            <span class="label">工作总结</span>
            <el-input
              type="textarea"
              :rows="25"
              placeholder="请输入内容"
              minlength="30"
              v-model="conclusion"
              :disabled="positiveStatus == 1 ? false : true"
            ></el-input>
          </div>
          <div class="upload">
            <span class="label">附件</span>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              v-if="positiveStatus == 1"
            >
              <el-button size="small" type="primary" style="width:120px;">新增附件</el-button>
            </el-upload>
            <ul class="fileList" v-if="positiveStatus == 2">
              <li v-for="(item,index) in fileList" :key="index">
                <span class="fileName">文件名</span>
                <span class="fileDownload">下载</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="btnBox" v-if="positiveStatus == 1">
          <div class="btns">
            <el-button style="width:95px;">取消</el-button>
            <el-button style="width:95px;" type="primary" @click="positiveSave()">保存</el-button>
          </div>
        </div>
      </div>
      <!-- 未转正 -->
      <div class="positiveNull" v-if="positiveStatus == 0">
        <div>
          <img src="../../assets/img/dataNull.png" />
          <el-button style="width:95px;" type="primary" @click="positive()">转正</el-button>
        </div>
      </div>
    </el-card>
    <!-- 离职信息 -->
    <el-card class="formCard" v-if="curIndex == 2">
      <div class="positiveEdit">
        <div class="baseInfo">
          <ul class="inputBox">
            <!-- 离职类型/离职日期 -->
            <li>
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">离职类型</span>
                </div>
                <div class="elInput">具体信息</div>
              </div>
              <div class="itemBox">
                <div class="labelBox">
                  <span class="label">离职日期</span>
                </div>
                <div class="elInput">具体信息</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="baseInfo">
          <!-- 离职原因 -->
          <div class="conclusion">
            <span class="label">离职原因</span>
            <el-input
              type="textarea"
              :rows="25"
              placeholder="请输入内容"
              minlength="30"
              v-model="departure"
              :disabled="positiveStatus == 1 ? false : true"
            ></el-input>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import http from "../../utils/request";
import configUrl from "../../api/configUrl";
import navBar from "@/components/navBar/navBar";
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
          title: "员工信息",
        },
      ],
      title: "员工信息 -- 某某",
      menuList: [
        { name: "基础信息", id: 0 },
        { name: "转正信息", id: 1 },
        { name: "离职信息", id: 2 },
      ],
      curIndex: 0,
      gender: 1,
      // 转正信息填写部分数据
      positiveStatus: 0,
      positiveTime: "", //转正时间
      conclusion: "", //工作总结
      fileList: [], //附件
      // 离职信息
      departure: "",
    };
  },
  mounted() {},
  methods: {
    // 顶部菜单选择
    changeStatus(index, status) {
      this.curIndex = index;
    },
    editMsg() {
      this.$router.push({
        path: "/staffAdd",
      });
    },
    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 转正按钮点击
    positive() {
      this.positiveStatus = 1;
    },
    // 保存转正信息
    positiveSave() {
      this.positiveStatus = 2;
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
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
        li {
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
              height: 40px;
              padding: 0 15px;
              line-height: 40px;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              box-sizing: border-box;
              color: #909399;
              font-weight: 400;
            }
            .genderBox {
              flex: 1 1 auto;
            }
            .labelBox {
              width: 120px;
              .redPot,
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
              .redPot,
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
      .conclusion,
      .upload {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .label {
          display: block;
          width: 120px;
          margin-right: 2px;
          letter-spacing: 1px;
          font-size: 16px;
          font-weight: bold;
          margin-right: 8px;
        }
      }
      .upload {
        align-items: normal;
        justify-content: flex-start;
        .label {
          margin-right: 0;
          line-height: 32px;
        }
        .fileList {
          li {
            margin-bottom: 10px;
            span {
              display: inline-block;
              height: 32px;
              line-height: 32px;
            }
            .fileName {
              font-size: 14px;
              color: #3b4859;
            }
            .fileDownload {
              width: 60px;
              height: 20px;
              cursor: pointer;
              line-height: 20px;
              color: #fff;
              background: #409efd;
              text-align: center;
              border-radius: 4px;
              margin-left: 20px;
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
}
</style>
