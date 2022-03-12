<template>
  <div class="app-container">
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
      <el-button type="primary" @click="putProject">确 定</el-button>
    </div>
  </div>
</template>

<script>
import upload from "@/components/upload";
import { addProject } from "@/api/project";
export default {
  data() {
    return {
      form: {
        description: "",
        name: "",
        url: "",
        github: "",
        thumb: "",
        order: "",
      },
    };
  },
  components: {
    upload,
  },
  methods: {
    putProject() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(";");
      obj.order = parseInt(this.form.order);
      if (
        obj.description &&
        obj.github &&
        obj.name &&
        obj.url &&
        obj.thumb &&
        obj.order
      ) {
        addProject(obj).then((res) => {
          this.$message({
            message: "模拟上传成功",
            type: "success",
          });
          this.$router.push("/list");
        });
      } else {
        this.$message({
          message: "请填写完整所有数据",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style>
</style>