<!-- 子组件 child.vue -->

<template>
  <div class="child">
    <el-form ref="form" :model="form" label-width="80px" style="width: 90%;">
      <el-form-item label="姓名">
        <el-input :placeholder="form.namePla" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input type="number"  v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="ageAdd">子Age+1</el-button>

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        name: "",
        namePla: "",
        age: "2",
        address: ""
      }
    };
  },
  methods: {
      ageAdd() {
        this.form.age++;
    }
  },
  props: {
    // 这个 prop 属性接收父组件传递进来的值
    formData: Object
  },
  watch: {
    // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
    // 在这里我们需要监听 formData，当它发生变化时，立即将值赋给 data 里的 form
    formData: {
      immediate: true,
      handler(val) {
        this.form = val;
      }
    }
  },
};
</script>
