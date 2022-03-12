<template>
  <div>
    <!-- 表单 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="100" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.$index + (currentPage - 1) * eachPage + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" align="center">
      </el-table-column>
      <el-table-column prop="description" label="项目描述" align="center">
      </el-table-column>
      <el-table-column prop="thumb" label="预览图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.thumb"
            fit="contain"
            :preview-src-list="srcList"
          >
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="iconfont icon-github-fill"
            class="iconfont"
            circle
            @click="jumpToGitHub(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEditBlog(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDeleteProject(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog
      title="请编辑该项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述(每一项请以英文;分隔)">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目连接">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目GitHub地址">
          <el-input v-model="form.github" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预览图">
          <upload v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="putProject(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, deleteProject, editProject } from "@/api/project";
import { project } from "@/fake";
import upload from "@/components/upload";
export default {
  data() {
    return {
      tableData: [],
      eachPage: 5, //每页显示项目数
      currentPage: 1, //当前页
      totalPage: 0, //总页数
      count: 0, //总项目数
      pagerCurrentPage: 1, //页面当前页
      srcList: [],
      form: {
        description: "",
        name: "",
        url: "",
        github: "",
        thumb: "",
        order: "",
      },
      dialogFormVisible: false,
    };
  },
  components: {
    upload,
  },
  created() {
    this.fetchProject();
  },
  methods: {
    fetchProject() {
      getProject().then((res) => {
        if (res.data[0]) {
          this.tableData = res.data;
        } else {
          this.tableData = project;
          for (var item of this.tableData) {
            this.srcList.push(item.thumb);
          }
        }
      });
    },
    jumpTo(id) {
      window.open(`localhost:8080/project/${id}`);
    },
    //删除项目
    handleDeleteProject(project) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject(project.id).then(() => {
            this.$message({
              type: "success",
              message: "模拟删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑项目
    handleEditBlog(project) {
      this.dialogFormVisible = true;
      this.form = { ...project, description: project.description.toString() };
    },
    //确认修改
    putProject(project) {
      let obj = { ...project };
      obj.description = project.description.split(";");
      obj.order = parseInt(project.order);
      editProject(obj.id).then((res) => {
        this.dialogFormVisible = false;
        const msg = JSON.parse(res);
        this.$message({
          showClose: true,
          message: msg.msg,
          type: "success",
        });
        this.fetchProject();
      });
    },
    //github地跳转
    jumpToGitHub(project) {
      window.open(project.github);
    },
  },
};
</script>

<style scoped>
.iconfont {
  background-color: gray;
  border: 1px solid gray;
}
</style>