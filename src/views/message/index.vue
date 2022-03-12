<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.$index + (currentPage - 1) * limit + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像" width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.avatar"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="content" label="内容" width="300">
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期" width="200">
      </el-table-column>
      <el-table-column prop="date" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next,total,->,sizes,jumper,slot"
      :total="max"
      :current-page.sync="fenyeCurrentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="limit"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @pre-click="handlePre"
      @next-click="handleNext"
    >
    </el-pagination>
  </div>
</template>

<script>
import { message } from "@/fake";
import { formatDate } from "@/utils/tools";
import { getMessage, deleteMessage } from "@/api/message";
export default {
  data() {
    return {
      tableData: [],
      max: "",
      limit: 5,
      currentPage: 1,
      maxPage: "",
      fenyeCurrentPage: 1,
    };
  },
  created() {
    for (var prop of message.data.rows) {
      prop.createDate = formatDate(prop.createDate);
    }
    this.tableData = message.data.rows;
    this.max = message.data.total;
    this.maxPage = Math.ceil(this.max / this.limit);
    if (this.currentPage > this.maxPage) {
      this.currentPage = this.maxPage;
      this.fetchMessage();
    }
    // fetchMessage()
  },
  methods: {
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMessage(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetchMessage();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    fetchMessage() {
      getMessage(this.page, this.limit).then((res) => {
        for (var prop of res.data.rows) {
          prop.createDate = formatDate(prop.createDate);
        }
        this.tableData = res.data.rows;
        this.max = res.data.total;
        this.maxPage = Math.ceil(this.max / this.limit);
        if (this.currentPage > this.maxPage) {
          this.currentPage = this.maxPage;
          this.fetchComment();
        }
      });
    },
    handleSizeChange(each) {
      this.limit = each;
      this.fetchComment();
    },
    handleCurrentChange(cur) {
      this.currentPage = cur;
      this.fetchComment();
    },
    handlePre() {
      this.currentPage--;
      this.fetchComment();
    },
    handleNext() {
      this.currentPage++;
      this.fetchComment();
    },
  },
};
</script>

<style>
</style>