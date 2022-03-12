<template>
  <div class="app-container">
    <div class="block">文章标题</div>
    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="500px"
    />
    <div class="block">文章描述</div>
    <el-input
      v-model="form.description"
      placeholder="请输入文章描述"
      type="textarea"
      rows="6"
    ></el-input>
    <div class="block">文章头图</div>
    <upload v-model="form.thumb" />
    <div class="block">请选择分类</div>
    <el-select
      v-model="form.select"
      slot="prepend"
      placeholder="请选择文章分类"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <div style="margin: 15px 0">
      <el-button type="primary" @click="handleSubmit">确认提交</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import upload from "@/components/upload";
import { getBlogType } from "@/api/blogType";
import { putOneBlog } from "@/api/blog";
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        thumb: "",
        editorText: "",
        select: "",
      },
      blogType: "",
    };
  },
  components: {
    Editor,
    upload,
  },
  created() {
    this.fetchBlogType();
  },
  methods: {
    fetchBlogType() {
      getBlogType().then((res) => {
        this.blogType = res.data;
      });
    },
    handleSubmit() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        // toc 传递一个空数组过去，之后在服务器根据 markdown 的内容来生成 toc 目录
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        putOneBlog(obj).then(() => {
          this.$message({
            showClose: true,
            message: "恭喜你，添加成功",
            type: "success",
          });
          this.$router.push("/articleManage1");
        });
      } else {
        this.$message({
          showClose: true,
          message: "请完整填写所有内容",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-weight: 100px;
}
</style>