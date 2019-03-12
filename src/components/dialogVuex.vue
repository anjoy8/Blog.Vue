<!-- 子组件 child.vue -->

<template>
    <div class="child">
        <el-form ref="form" :model="form" label-width="80px"  style="width: 90%;">
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        name: "",
        namePla: "",
        age: "",
        address: ""
      }
    };
  },
  mounted() {
    // 将数据提交到 store
    this.$store.commit('getFormData', this.form)
  }
};
</script>
