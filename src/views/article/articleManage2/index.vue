<template>
  <div style="margin-top: 15px">
    <el-input
      placeholder="请输入要添加的分类，左边选择该分类的等级"
      v-model="input"
      class="input-with-select typeInput"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </el-input>
    <el-button
      type="primary"
      style="margin-left: 15px"
      @click="handleAddBlogType"
      >添加分类</el-button
    >
    <!-- 文章分类 -->
    <el-table :data="tableData" border style="width: 100%; margin-top: 25px">
      <el-table-column prop="date" label="序号" width="100" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="博客类别" align="center">
      </el-table-column>
      <el-table-column prop="articleCount" label="文章数量" align="center">
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editBlogType(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteBlogType(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑文章分类 -->
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章序号">
          <el-select v-model="form.order" placeholder="请选择序号">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="offClick">取 消</el-button>
        <el-button type="primary" @click="sureClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { blogType } from "@/fake";
import {
  addBlogType,
  getOneBlogType,
  deleteOneBlog,
  getBlogType,
  changeBlogType,
} from "@/api/blogType";
export default {
  data() {
    return {
      input: "",
      select: "1",
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
    };
  },
  created() {
    // this.tableData = blogType.data;
    this.fetchBlogType();
  },
  methods: {
    fetchBlogType() {
      getBlogType().then((res) => {
        if (res.data == "") {
          console.log(res, "res");
          this.tableData = blogType.data;
        } else {
          console.log(blogType.data);
          this.tableData = res.data;
        }
      });
    },
    handleAddBlogType() {
      if (this.input) {
        addBlogType({ order: this.select, name: this.input }).then((res) => {
          this.fetchBlogType();
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success",
          });
        });
      } else {
        this.$message({
          showClose: true,
          message: "请填写分类名",
          type: "error",
        });
      }
    },
    deleteBlogType(blogtype) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOneBlog(blogtype.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchBlogType();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editBlogType(blogtype) {
      console.log(blogtype.id);
      getOneBlogType(blogtype.id).then((res) => {
        this.dialogFormVisible = true;
        this.form = res.data;
      });
    },
    sureClick() {
      changeBlogType({
        id: this.form.id, //这里明面上是没有id的，是在前面编辑的时候，进行了请求数据的交互。
        data: this.form,
      }).then(() => {
        this.fetchBlogType();
        this.$message.success("更新分类信息成功");
        this.dialogFormVisible = false;
      });
      console.log(this.form.id, this.form);
    },
    offClick() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.typeInput {
  width: 500px;
  margin-left: 25px;
  margin-top: 25px;
}
</style>