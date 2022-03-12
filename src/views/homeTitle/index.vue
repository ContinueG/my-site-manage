<template>
  <div>
    <!-- 数据表格 -->
    <el-table :data="fake" border style="width: 100%">
      <el-table-column prop="title" label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="description" label="描述" width="180">
      </el-table-column>
      <el-table-column prop="title" label="大图" width="180">
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.bigImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="缩略图" width="180">
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.midImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="编辑" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹出框 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="大图">
              <!-- 大图 -->
              <upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="小图">
              <!-- 小图 -->
              <upload v-model="form.midImg" /> </el-form-item
          ></el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner";
import upload from "@/components/upload";
export default {
  data() {
    return {
      data: [],
      fake: [
        {
          //这里需要给img加上本地的域名,因为其访问的是直接的地址，没有加上域名。
          //例：url = 127.0.0.1:7001 + bigImg.遍历data，给img的url统一加上前缀
          midImg:
            "https://iconfont.alicdn.com/t/88562e11-c4a5-4bf4-9175-139926ed596e.png",
          bigImg:
            "https://iconfont.alicdn.com/t/88562e11-c4a5-4bf4-9175-139926ed596e.png",
          title: "凛冬将至",
          description: "人唯有恐惧的时候方能勇敢",
          id: "6090af0a9dcd41a467fb4cae",
        },
        {
          midImg:
            "https://iconfont.alicdn.com/t/88562e11-c4a5-4bf4-9175-139926ed596e.png",
          bigImg:
            "https://iconfont.alicdn.com/t/88562e11-c4a5-4bf4-9175-139926ed596e.png",
          title: "血火同源",
          description: "如果我回头，一切都完了",
          id: "6090af0a9dcd41a467fb4caf",
        },
        {
          midImg:
            "https://iconfont.alicdn.com/t/e01ba7e2-062c-4e1d-af23-a9e9e70e8cba.png",
          bigImg:
            "https://iconfont.alicdn.com/t/e01ba7e2-062c-4e1d-af23-a9e9e70e8cba.png",
          title: "听我怒吼",
          description: "兰尼斯特有债必偿",
          id: "6090af0a9dcd41a467fb4cb0",
        },
      ],
      dialogFormVisible: false,
      form: {
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
        id: "",
      },
    };
  },
  components: { upload },
  // created() {
  //   this.fetchBanner();
  // },
  methods: {
    fetchBanner() {
      getBanner().then((res) => {
        this.fake = res.data;
        for (const item in this.fake) {
          item.midImg = "127.0.0.1:7001" + item.midImg;
          item.bigImg = "127.0.0.1:7001" + item.bigImg;
        }
      });
    },
    editBannerHandle(scope) {
      this.form = { ...scope }; //这个...scope是新创建了一个对象，这样form和传进来的scope就不是同一个对象
      this.dialogFormVisible = true;
    },
    editBannerConfirm() {
      let arr = [...this.fake];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == this.form.id) {
          arr[i] = this.form;
        }
      }
      setBanner(arr).then((res) => {
        this.dialogFormVisible = false;
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fetchBanner();
      });
    },
  },
};
</script>

<style>
</style>