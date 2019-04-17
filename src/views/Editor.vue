<template>
    <div>
        <el-row class="warp">

            <!--
            Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
            -->
            <el-col :span="24" class="warp-main">
                <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
                    <el-form-item label="标题" prop="a_title">
                        <el-input v-model="infoForm.a_title"></el-input>
                    </el-form-item>

                    <el-form-item label="来源" prop="a_source">
                        <el-input v-model="infoForm.a_source"></el-input>
                    </el-form-item>
                    <!--使用编辑器
                    -->
                    <el-form-item label="详细">
                        <div class="edit_container">
                            <quill-editor v-model="infoForm.a_content"
                                          ref="myQuillEditor"
                                          class="editer"
                                          :options="infoForm.editorOption" @ready="onEditorReady($event)">
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
    export default {
        data() {
            return {
                infoForm: {
                    a_title: "",
                    a_source: "",
                    a_content: "",
                    editorOption: {}
                },
                //表单验证
                rules: {
                    a_title: [{required: true, message: "请输入标题", trigger: "blur"}],
                    a_content: [
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
                 debugger

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
    .ql-editor.ql-blank {
        min-height: 300px !important;
    }
    .el-form{
        padding-right: 80px !important;
    }
</style>
