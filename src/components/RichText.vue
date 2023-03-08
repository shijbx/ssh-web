<template>
  <Editor :api-key="apiKey" :init="Object.assign(editConfig, config)" :disabled="disabled" v-model="content" />
</template>

<script setup>
import axios from "axios";
import Editor from "@tinymce/tinymce-vue";

const props = defineProps({
  modelValue: String,
  disabled: Boolean,
  config: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["update:modelValue"]);

const content = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const apiKey = "3ppql1xopb05l338knfm4nsbdvnsx81n1kvhp7xkf0fg0peo"; //key值从官网注册申请来的
const editConfig = {
  height: 500, //富文本高度
  // language_url: "/tinymce/zh_CN.js", //中文包
  // language: "zh_CN", //中文
  browser_spellcheck: true, // 拼写检查
  branding: false, // 去水印
  elementpath: true, //禁用编辑器底部的状态栏
  statusbar: false, // 隐藏编辑器底部的状态栏
  paste_data_images: false, // 是否允许粘贴图像
  menubar: false, // 隐藏最上方menu
  fontsize_formats: "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", //字体大小
  font_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times", //字体
  // file_picker_types: "image",
  // images_upload_credentials: true,
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "fontselect fontsizeselect lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | quicklink h2 h3 blockquote numlist bullist preview fullscreen",
  // plugins: [
  //   "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
  // ],
  // toolbar:
  //   "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample hr bullist numlist link charmap preview anchor pagebreak insertdatetime table emoticons forecolor backcolor fullscreen",
};
</script>

<style lang="scss" scoped></style>
