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
                    <el-form-item label="详细"  prop="bcontent">
                        <div class="edit_container">
                            <quill-editor v-model="infoForm.bcontent"
                                          ref="myQuillEditor"
                                          class="editer"
                                          :options="editorOption" @ready="onEditorReady($event)">
                            </quill-editor>
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
    import {quillEditor} from "vue-quill-editor"; //调用编辑器
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'


    export default {
        data() {
            return {
                infoForm: {
                    btitle: "",
                    bsubmitter: "",
                    bcategory:"技术博文",
                    bcontent: ""
                },
                editorOption: {},
                //表单验证
                rules: {
                    btitle: [{required: true, message: "请输入标题", trigger: "blur"}],
                    bcontent: [
                        {required: true, message: "请输入详细内容", trigger: "blur"}
                    ]
                }
            };
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            }
        },
        mounted() {
            //初始化
        },
        methods: {
            onEditorReady(editor) {
            },
            onSubmit() {
                //提交
                //this.$refs.infoForm.validate，这是表单验证
                this.$refs.infoForm.validate(valid => {
                    if (valid) {
                        console.log(this.infoForm)
                        var postPara=this.infoForm;
                        this.$api.post("Blog", postPara, r => {
                            debugger
                            if(r.success){
                                var id=r.response
                                this.$notify({
                                    type: "success",
                                    message: "添加成功，感谢技术分享!",
                                    duration: 3000
                                });
                                this.$router.replace(`/content/${id}`);

                            }else{
                                var errorMsg=r.msg
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
            quillEditor
        }
    };
</script>

<style>
    .warp{
        background: #fff;
        padding-top: 20px;
        width: 75%;
        margin: 0 auto;
    }
    .ql-container.ql-snow,.ql-editor.ql-blank {
        min-height: 300px !important;
    }
    .el-form{
        padding-right: 80px !important;
    }
</style>
