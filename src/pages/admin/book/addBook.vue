<template>
<div id="addBook">
<el-form ref="form" :model="form" :label-position="right"  label-width="120px" style="max-width:700px;" >
  <el-form-item label="书名：">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="分类：">
    <el-select v-model="form.categories" placeholder="请选择书类" style="float:left;" >
      <el-option label="IT" value="0"></el-option>
      <el-option label="厨艺" value="1"></el-option>
      <el-option label="励志" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="出版时间：">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
  </el-form-item>
  <el-form-item label="是否上架：">
  <div class="box">
  <el-switch
  v-model="form.is_shelf"
  active-color="#13ce66"
  inactive-color="#ff4949"
   active-text="上架"
  inactive-text="下架" 
  style=" top:50%; margin: -40px 0 0 0; position:relative;">
</el-switch>
</div>
  </el-form-item>
  
  <el-form-item label="照片上传：">
  <div class="upload-box"> <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="form.img_url"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload></div>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          categories: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          img_url:[{name:'test',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
<style>
.box{
  height:40px;
  position:absolute;
}
.upload-box{
  background-color:#fff;
   background-color:#fcf9ec;
    border-radius:5px;
    border: 2px #2d132c dashed ;
    line-height: 10px;
    padding:15px;
}
</style>