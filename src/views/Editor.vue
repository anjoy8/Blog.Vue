<template>
  <div>
    <el-row class="warp">
      <!--
            Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
      -->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="btitle">
            <el-input v-model="infoForm.btitle"></el-input>
          </el-form-item>

          <el-form-item label="分类">
            <el-select v-model="infoForm.bcategory" placeholder="请选择文章分类">
              <el-option label="技术博文" value="技术博文"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="作者" prop="bsubmitter">
            <el-input v-model="infoForm.bsubmitter"></el-input>
          </el-form-item>
          <!--使用编辑器
          -->
          <el-form-item label="详细" prop="bcontent">
            <div class="edit_container">
              <quill-editor
                v-model="infoForm.bcontent"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { quillRedefine } from "vue-quill-editor-upload"; // 上传图片

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      infoForm: {
        btitle: "",
        bsubmitter: "",
        bcategory: "技术博文",
        bcontent: ""
      },
      editorOption: {},
      //表单验证
      rules: {
        btitle: [{ required: true, message: "请输入标题", trigger: "blur" }],
        bcontent: [
          { required: true, message: "请输入详细内容", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    editor() {
      var quill=this.$refs.myQuillEditor.quill;
      var toolbar = quill.getModule('toolbar');
      toolbar.addHandler('image', imageUpload);
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {
    this.editorOption = quillRedefine({
      // 图片上传的设置
      uploadConfig: {
        action: "/images/Upload/Pic", // 必填参数 图片上传地址
        // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
        // 你必须把返回的数据中所包含的图片地址 return 回去
        res: respnse => {
        
          console.log(respnse.response);
          return "/"+respnse.response;
        },
        methods: "POST", // 可选参数 图片上传方式  默认为post
        name: "img", // 可选参数 文件的参数名 默认为img
        size: 500, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
        accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon", // 可选参数 可上传的图片格式
        header: (xhr, formData) => {
              xhr.setRequestHeader('Authorization',"Bearer "+localStorage.Token);
              // formData: 表单对象
              // formData.append('Name', "laozhang")
        },
        start: () => {}, // 可选参数 接收一个函数 开始上传数据时会触发
        end: () => {}, // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
        success: () => {}, // 可选参数 接收一个函数 上传数据成功时会触发
        error: () => {} // 可选参数 接收一个函数 上传数据中断时会触发
      }
    });
  },
  mounted() {
    //初始化
  },
  methods: {
    onEditorReady(editor) {},
    onSubmit() {
      //提交
      //this.$refs.infoForm.validate，这是表单验证
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          console.log(this.infoForm);
          var postPara = this.infoForm;
          this.$api.post("Blog", postPara, r => {
            if (r.success) {
              var id = r.response;
              this.$notify({
                type: "success",
                message: "添加成功，感谢技术分享!",
                duration: 3000
              });
              this.$router.replace(`/content/${id}`);
            } else {
              var errorMsg = r.msg;
              this.$message({
                type: "error",
                message: errorMsg,
                showClose: true
              });
            }
            this.list = r.data;
            this.page = r.page;
            this.TotalCount = r.pageCount;
            this.isShow = false;
          });
        }
      });
    }
  },
  components: {
    //使用编辑器
    quillEditor,
    quillRedefine
  }
};
</script>

<style>
.warp {
  background: #fff;
  padding-top: 20px;
  width: 75%;
  margin: 0 auto;
}
.ql-container.ql-snow,
.ql-editor.ql-blank {
  min-height: 300px !important;
}
.el-form {
  padding-right: 80px !important;
}
</style>
