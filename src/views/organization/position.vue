<template>
  <div class="staffManage">
    <nav-Bar v-if="$route.path !== '/OAposition'" :breadList="breadList" :title="title"></nav-Bar>
    <!-- 搜索框 -->
    <el-button
      class="showSearch"
      :class="$route.path=='/OAposition'?'OA_showSearch':''"
      @click="showSearch = !showSearch"
      type="text"
      :icon="showSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
      >{{ showSearch ? "隐藏搜索框" : "打开搜索框" }}</el-button
    >
    <el-collapse-transition>
      <div v-show="showSearch">
        <el-card class="searchCard" :class="$route.path=='/OAposition'?'OA_searchCard':''">
          <div class="serchBox">
            <el-input
              v-model="jobName"
              placeholder="请输入职位名称"
              clearable
              style="width: 360px; margin-right: 20px; border-radius: 4px"
            ></el-input>
          </div>
          <div class="btnBox">
            <el-button type="primary" size="medium" @click="search()"
              >搜索</el-button
            >
            <el-button class="secondary" size="medium" @click="reset()"
              >重置</el-button
            >
          </div>
        </el-card>
      </div>
    </el-collapse-transition>

    <!-- 表格 -->
    <el-card class="listCard" :class="$route.path=='/OAposition'?'OA_listCard':''">
      <!-- 卡片提头 -->
      <div slot="header" class="clearfix tableTitleBox">
        <span class="tableTitle">职位列表</span>
        <div class="btns">
          <el-button type="primary" class="p40" @click="openDialog(0)"
            >新增职位</el-button
          >
          <el-button class="btn p40" @click="deleteIds()">批量删除</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableBox">
        <el-table
          ref="table"
          :data="viewsList"
          v-loading="searchData.viewsList_searchLoading"
          element-loading-background="rgba(0, 0, 0, 0.2)"
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
          @selection-change="handleSelectionChange"
          :height="tableHeight"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column
            v-for="(item, index) in tHeadList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <!-- edit -->
              <el-button type="text" @click="openDialog(1, scope.row)"
                >编辑</el-button
              >
              <!-- delete -->
              <el-button type="text" @click="deleteById(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listParams.page"
        :page-sizes="[10, 20, 50]"
        :page-size="listParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin:10px 0; float: right"
      ></el-pagination>

      <!-- 新增管理员弹窗 -->
      <el-dialog 
        title="新增职位"
        :visible.sync="showAddPop" 
        width="668px">
        <el-form :model="addParams" 
                        :rules="addRules" 
                        ref="addParams" 
                        label-width="110px">
          <el-form-item label="职位名称" prop="positionName">
            <el-input
              v-model="addParams.positionName"
              class="elInput"
              placeholder="请输入职位名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级职位" prop="position">
            <el-select
              v-model="addParams.position"
              placeholder="请选择上级职位"
              class="elInput"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in position_options"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位描述" prop="positionMsg">
            <el-input
              type="textarea"
              class="elInput"
              autosize
              placeholder="请输入职位描述"
              v-model="addParams.positionMsg"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="extraBtns">
          <div>
            <el-button style="width: 95px" @click="extraBtnClick(0)"
              >取 消</el-button
            >
            <el-button
              style="width: 95px"
              @click="extraBtnClick(1)"
              type="primary"
              >确 定</el-button
            >
          </div>
        </div>
      </el-dialog>

      <!-- 编辑职位弹窗 -->
      <el-dialog 
        title="编辑职位"
        :visible.sync="showEditPop" 
        width="668px">
        <el-form :model="addParams" 
                        :rules="addRules" 
                        ref="editParams" 
                        label-width="110px">
          <el-form-item label="职位名称" prop="positionName">
            <el-input
              v-model="addParams.positionName"
              class="elInput"
              placeholder="请输入职位名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级职位" prop="position">
            <el-select
              v-model="addParams.position"
              placeholder="请选择上级职位"
              class="elInput"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in position_options"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位描述" prop="positionMsg">
            <el-input
              type="textarea"
              class="elInput"
              autosize
              placeholder="请输入职位描述"
              v-model="addParams.positionMsg"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="extraBtns">
          <div>
            <el-button style="width: 95px" @click="extraBtnClick(2)"
              >取 消</el-button
            >
            <el-button
              style="width: 95px"
              @click="extraBtnClick(3)"
              type="primary"
              >确 定</el-button
            >
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { OpenLoading } from "@/utils/utils.js";
import navBar from "@/components/navBar/navBar";
import { POSI_API } from "@/api/positions";
import { renderTime } from "@/utils/function.js";
export default {
  data() {
    return {
      // 面包屑
      breadList: [
        {
          path: "/organization",
          title: "首页",
        },
        {
          title: "组织管理",
        },
        {
          title: "职位管理",
        },
      ],
      title: "职位管理",
      tableHeight: 500,
      // 搜索框
      showSearch: false,
      searchData: {
        viewsList_searchLoading: true,
      },
      jobName: "",
      tHeadList: [
        { label: "职位名称", prop: "name" },
        { label: "上级职位", prop: "p_name" },
        { label: "创建人", prop: "adm_name" },
        { label: "创建时间", prop: "created_at" },
        { label: "描述", prop: "description" },
      ],
      viewsList: [],
      // 新增角色的弹窗中的数据
      addParams: {
        positionName: "",
        position: "", //上级部门
        positionMsg: "", //部门描述
      },
      addRules: {
        positionName:[
          { required: true, message: '请输入职位名称', trigger: 'blur' },
        ],
        position:[
          { required: true, message: '请选择上级职位', trigger: 'change' },
        ],
        // positionMsg:[
        //   { required: true, message: '请输入职位描述', trigger: 'blur' },
        // ]
      },
      showAddPop: false, //是否显示弹窗
      showEditPop: false, //是否显示弹窗
      position_options: [{ id: 0, name: "无" }],
      editId: "", //
      ids: [], //批量删除
      // 分页
      total: 4,
      listParams: { name: "", page: 1, pageSize: 10 },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      // console.log( this.tableHeight)
      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 100;
      };
    });
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度

    this.getPositionsList();
  },
  methods: {
    // 获取职位列表
    getPositionsList(val) {
      this.searchData.viewsList_searchLoading = true;
      let params = {
        page: this.listParams.page,
        is_paging: 0,
        page_size: this.listParams.pageSize,
      };
      if (val) {
        params = { ...params, ...val };
      }
      POSI_API.getPositions(params).then((res) => {
        if (res.status == 200) {
          this.searchData.viewsList_searchLoading = false;
          res.data.forEach((item) => {
            item.created_at = renderTime(item.created_at);
            item.p_name = item.p_name == null ? "无" : item.p_name;
          });
          this.viewsList = res.data;
          this.total = res.pagination.total;
          this.position_options = [...res.data, ...this.position_options];
        }else{
          this.$message.error('职位列表获取失败！')
          this.searchData.viewsList_searchLoading = false;
        }
      });
    },
    search() {
      this.listParams.page = 1;
      let params = {
        name: this.jobName,
      };
      this.getPositionsList(params);
    },
    reset() {
      this.listParams.page = 1;
      this.jobName = "";
      this.getPositionsList();
    },
    // 删除职位
    deleteById(val) {
      this.$confirm("确认删除职位?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const loading = OpenLoading(this, 1)
          POSI_API.deletePosi({}, val).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getPositionsList();
            } else {
              this.$message.error("删除成功！");
            }
            loading.close()
            clearTimeout(this.overloading)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量删除
    deleteIds() {
      let params = {
        ids: this.ids,
      };
      // console.log(params);
      this.$confirm("确认删除选中的职位?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const loading = OpenLoading(this, 1)
          POSI_API.deleteIds(params).then((res) => {
            if (res.status == 200) {
              this.$message.success("删除成功！");
              this.getPositionsList();
            } else {
              this.$message.error("删除失败！");
            }
            loading.close()
            clearTimeout(this.overloading)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 新增管理员
    openDialog(type, val) {
      switch (type) {
        case 0:
          this.showAddPop = true;
          this.addParams.positionName = "";
          this.addParams.position = "";
          this.addParams.positionMsg = "";
          break;
        case 1:
          this.showEditPop = true;
          this.addParams.positionName = val.name;
          this.addParams.position = val.pid;
          this.addParams.positionMsg = val.description;
          this.editId = val.id;
          break;
        default:
          break;
      }
    },
    extraBtnClick(type) {
      switch (type) {
        case 0:
          this.showAddPop = false;
          break;
        case 1:
          this.$refs.addParams.validate(valid => {
            if(valid){
              const loading = OpenLoading(this, 1)
              let params = {
                name: this.addParams.positionName,
                pid: this.addParams.position,
                description: this.addParams.positionMsg,
              };
              POSI_API.addPosi(params).then((res) => {
                if (res.status == 200) {
                  this.$message.success("添加成功！");
                  this.getPositionsList();
                  this.showAddPop = false;
                } else {
                  this.$message.error("添加失败！");
                }
                loading.close()
                clearTimeout(this.overloading)
              });
            }
          })
        break;
        case 2:
          this.showEditPop = false;
          break;
        case 3:
          this.$refs.editParams.validate(valid => {
            if(valid){
              const loading = OpenLoading(this, 1)
              let paramsEdit = {
                name: this.addParams.positionName,
                pid: this.addParams.position,
                description: this.addParams.positionMsg,
              };
              POSI_API.editPosi(paramsEdit, this.editId).then((res) => {
                if (res.status == 200) {
                  this.$message.success("修改成功！");
                  this.getPositionsList();
                  this.showEditPop = false;
                } else {
                  this.$message.error("修改失败！");
                }
                loading.close()
                clearTimeout(this.overloading)
              });
            }
          })
        break;
        default:
        break;
      }
    },
    handleSelectionChange(val) {
      let temp = [];
      val.forEach((item) => {
        temp.push(item.id);
      });
      this.ids = temp;
    },
    // watch pagesize change
    handleSizeChange(newSize) {
      this.listParams.pageSize = newSize;
      this.getPositionsList();
    },
    // watch page change
    handleCurrentChange(newPage) {
      this.listParams.page = newPage;
      this.getPositionsList();
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
  .showSearch {
    margin-left: 20px;
  }

  .listCard {
    margin: 0 20px !important;
    .clearfix {
      display: flex;
      align-items: center;
      position: relative;
    }
    .tableTitleBox {
      padding: 10px 0;
      .tableTitle {
        font-weight: bold;
      }

      .btns {
        position: absolute;
        right: 0px;
        .btn {
          color: #409efd;
          border-color: #409efd;
        }
        .p40 {
          padding: 12px 40px;
        }
      }
    }
  }
  .departure {
    padding-right: 30px;
    .popExtraList {
      > li {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 120px;
          font-size: 16px;
          color: #333333;
          font-weight: 600;
          text-align: right;
        }
      }
    }
  }
  .deleteMsg {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  .popExtraList {
    > li {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin: 20px 0;
      span {
        font-size: 16px;
        color: #333333;
        font-weight: 600;
      }
    }
  }
  .extraBtns {
    width: 100%;
    margin-top: 30px;
    div {
      width: 240px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}

.el-dialog{
  .elInput{
    width: 430px !important;
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
