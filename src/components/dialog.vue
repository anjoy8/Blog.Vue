<!-- 子组件 child.vue -->

<template>
    <div class="child">
        <label>
            姓名：<input :placeholder="form.namePla" type="text" v-model="form.name">
        </label>
        <label>
            年龄：<input type="text" v-model="form.age">
        </label>
        <label>
            地址：<input type="text" v-model="form.address">
        </label>
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
  mounted() {
    // props 是单向数据流，通过触发 update 事件绑定 formData，
    // 将 data 里的 form 指向父组件通过 formData 绑定的那个对象
    // 父组件在绑定 formData 的时候，需要加上 .sync
    this.$emit("update:formData", this.form);
  }
};
</script>
