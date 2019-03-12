<!-- 父组件 parent.vue -->

<template>
    <div class="parent">
        <h3>问卷调查</h3>
        <child ></child><!-- 注意： 这里已经没有 .sync 了 -->
        <div class="">
            <br>
            <br>
            <p>数据：{{_fatherData}}</p>
        </div>

        <el-button type="primary" @click="getData">测试api，请看控制台</el-button>
    </div>
</template>

<script>
import child from "../components/dialogVuex.vue";
import axios from "axios";
export default {
  components: {
    child
  },
  data: function() {
    return {
      form: {
        name: "",
        namePla: "姓名不能为空",
        address: "",
        age: ""
      }
    };
  },
  methods: {
    getData() {
      axios({
        url: "/api/blog"
      }).then(res => {
        console.log(res);
      });
    }
  },
  computed: {
    _fatherData() {
      // 读取store里面的值
      return this.$store.state.formDatas;
    }
  }
};
</script>

<style>
.parent {
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}
button {
  margin-bottom: 10px !important;
}
</style>
