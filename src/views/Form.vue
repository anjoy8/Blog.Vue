<!-- 父组件 parent.vue -->

<template>
    <div class="parent">
        <h3>问卷调查</h3>
        子：
        <child :formData.sync="form"></child>
        <hr/>
        <div class="">
            父：
            <p>姓名：{{ form.name }}</p>
            <p>年龄：{{ form.age }}</p>
            <p>地址：{{ form.address }}</p>
            <button @click="ageAdd">父Age-1</button>
        </div>
    </div>
</template>

<script>
import child from "../components/dialog.vue";

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
    ageAdd: function() {
      this.form.age--;
      console.log(this.$router)
    }
  }
};
</script>
