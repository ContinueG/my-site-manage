<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="100" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.$index + (currentPage - 1) * eachPage + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章名称" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="200"
            trigger="hover"
          >
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            >
            </el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="jumpTo(scope.row.id)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="文章描述"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column prop="scanNumber" label="浏览数" align="center">
      </el-table-column>
      <el-table-column prop="commentNumber" label="评论量" align="center">
      </el-table-column>
      <el-table-column prop="category.name" label="所属分类" align="center">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建日期"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editBlog(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteBlog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      layout="prev, pager, next,total,->,sizes,jumper"
      :total="count"
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrev"
      @next-click="handleNext"
    >
    </el-pagination>
  </div>
</template>

<script>
import { blog } from "@/fake.js"; //假数据
import { getBlog, deleteOneBlog } from "@/api/blog";
import { formatDate } from "@/utils/tools";
export default {
  data() {
    return {
      tableData: [],
      srcList: [],
      eachPage: 5,
      currentPage: 1,
      totalPage: 0,
      count: 0,
      pagerCurrentPage: 1,
    };
  },
  created() {
    this.tableData = blog.data.rows;
    for (var item of this.tableData) {
      item.createDate = formatDate(item.createDate);
      this.srcList.push(item.thumb);
    }
    this.count = blog.data.total;
    this.totalPage = Math.ceil(this.count / this.eachPage);
    if (this.currentPage > this.totalPage) {
      this.currentPage = this.totalPage;
    }

    // this.fetchBlog();
  },
  methods: {
    fetchBlog() {
      getBlog(this.currentPage, this.eachPage).then((res) => {
        this.tableData = res.data.rows;
        console.log(res);
        for (var item in this.tableData) {
          item.createData = formatDate(item.createData);
          item.thunmb = "127.0.0.1:7001" + item.thunmb;
          this.srcList.push(item.thumb);
        }
        this.count = res.data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
        }
      });
    },
    jumpTo(url) {
      //拼接真实的前台页面地址以及对应的id
      window.open(`localhost:8080/article/${url}`);
    },
    //删除当前行博客数据
    deleteBlog(blogInfo) {
      this.$confirm("删除该文章会将评论一并删除", "是否删除此篇文章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOneBlog(blogInfo.id).then(() => {
            this.fetchBlog();
            this.$message({
              type: "success",
              message: "删除成功!",
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
    handleSizeChange(eachPg) {
      this.eachPage = eachPg;
      this.fetchBlog();
      this.currentPage = 1;
    },
    handleCurrentChange(curpage) {
      this.currentPage = curpage;
      this.fetchBlog();
    },
    handlePrev() {
      this.currentPage -= 1;
    },
    handleNext() {
      this.currentPage += 1;
    },
    //编辑文章
    editBlog(blogInfo) {
      this.$router.push("/editBlog");
    },
  },
};
</script>

<style>
</style>