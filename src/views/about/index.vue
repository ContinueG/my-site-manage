<template>
  <div class="app-container">
    <div class="block">
      <el-input
        v-model="input"
        :disabled="isDisable"
        style="width: 400px"
      ></el-input>
    </div>

    <el-button type="primary" @click="handleChange">{{ btnContent }}</el-button>
  </div>
</template>

<script>
import { getURL, setURL } from "@/api/about";
export default {
  data() {
    return {
      input: "",
      isDisable: true,
      btnContent: "编辑",
    };
  },
  created() {
    // getURl().then((res) => {
    //   this.input = res.data;
    // });
    this.input =
      "https://www.iconfont.cn/illustrations/index?spm=a313x.7781069.1998910419.3";
  },
  methods: {
    handleChange() {
      if (this.btnContent == "编辑") {
        this.btnContent = "完成";
        this.isDisable = !this.isDisable;
      } else {
        if (this.input) {
          this.btnContent = "编辑";
          this.isDisable = !this.isDisable;
          setURL(this.input).then(() => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          });
        } else {
          this.$message({
            message: "请填写正确的地址",
            type: "warning",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
}
</style>