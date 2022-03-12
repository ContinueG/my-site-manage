<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      label-width="100px"
      width="500px"
    >
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          placeholder="请输入旧密码"
          type="password"
          v-model="ruleForm.oldLoginPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          placeholder="请输入新密码"
          type="password"
          v-model="ruleForm.loginPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="loginPwdConfirm">
        <el-input
          placeholder="请输入新密码，并保证两次输入密码一致"
          type="password"
          v-model="ruleForm.loginPwdConfirm"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAdmin, setAdmin } from "@/api/admin";
export default {
  data() {
    var confirmPwd = (rule, value, callback) => {
      if (value) {
        if (value !== this.ruleForm.loginPwd) {
          callback(new Error("两次输入不一致，请重新输入"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入旧密码"));
      }
    };
    return {
      ruleForm: {
        name: "",
        loginPwdConfirm: "",
        loginPwd: "",
        oldLoginPwd: "",
      },
      rules: {
        loginPwd: [
          { required: true, trigger: "blur", message: "请输入新密码" },
        ],
        oldLoginPwd: [
          { required: true, trigger: "blur", message: "请输入旧密码" },
        ],
        loginPwdConfirm: [{ validator: confirmPwd, trigger: "blur" }],
      },
    };
  },
  created() {
    getAdmin().then((res) => {
      this.ruleForm.name = res.data.name;
    });
  },
  methods: {
    handleSubmit() {
      if (
        this.ruleForm.name &&
        this.ruleForm.loginPwdConfirm &&
        this.ruleForm.loginPwd &&
        this.ruleForm.oldLoginPwd
      ) {
        setAdmin(this.ruleForm).then((res) => {
          //验证失败
          if (typeof res === "string") {
            const message = JSON.parse(res);
            this.$message.error(message.msg);
          } else {
            this.$message.success("修改成功,请重新登陆");
            this.dispatch("user/logout").then(() => {
              this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            });
          }
        });
      } else {
        this.$message.error("请填写所有信息");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 500px;
}
</style>