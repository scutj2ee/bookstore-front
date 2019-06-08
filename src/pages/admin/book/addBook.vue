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
  <el-form-item label="价格：">
  <el-input v-model="form.price"></el-input>
  </el-form-item>
  <el-form-item label="商城价：">
  <el-input v-model="form.marketPrice"></el-input>
  </el-form-item>
  <el-form-item label="会员价：">
  <el-input v-model="form.memberPrice"></el-input>
  </el-form-item>
  <el-form-item label="库存：">
  <div class="block">
    <el-slider
      v-model="form.storeMount"
      show-input>
    </el-slider>
  </div>
  </el-form-item>
  <el-form-item label="作者：">
  <el-input v-model="form.author"></el-input>
  </el-form-item>
  <el-form-item label="翻译：">
  <el-input v-model="form.translator"></el-input>
  </el-form-item>
  <el-form-item label="出版社：">
  <el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  :disable-transitions="false"
  @click="selectTag(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ </el-button>

<div style="height:80px; width:200px; background-color:#c1f6e7; border:3px #000000 dashed; border-radius: 10px;"> <el-tag v-if="form.press" v-model="form.press" >{{form.press}}</el-tag> </div>

  </el-form-item>
  <el-form-item label="规格：">
  <el-input placeholder="请输入规格(例如：55开)" v-model="form.size">
    <template slot="append">开</template>
  </el-input>
  </el-form-item>
  <el-form-item label="页数：">
  <el-input placeholder="请输入页数(例如：250页)" v-model="form.pages">
  <template slot="append">页</template>
  </el-input>
  </el-form-item>
  <el-form-item label="版本：">
   <el-select
    v-model="form.version"
    filterable
    allow-create
    default-first-option
    placeholder="请选择版本" style="float:left;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label="装订方式：">
  <el-input v-model="form.packStyle"></el-input>
  </el-form-item>
  <el-form-item label="ISBN：">
  <el-input v-model="form.isbn"></el-input>
  </el-form-item>
  
  <el-form-item label="出版时间：">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.publishDate" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
  </el-form-item>
  <el-form-item label="是否上架：">
  <div class="box">
  <el-switch
  v-model="form.isShelf"
  active-color="#ff9900"
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
  :file-list="form.imageUrl"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload></div>
  </el-form-item>
  <el-form-item label="大纲">
    <el-input  v-model="form.outline"></el-input>
  </el-form-item>
  <el-form-item label="目录：">
    <el-input type="textarea" v-model="form.catalog"></el-input>
  </el-form-item>
  <el-form-item label="详细介绍:">
    <el-input type="textarea" v-model="form.detail"></el-input>
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
        options: [{
          value: '精装版',
          label: '精装版'
        }, {
          value: '简装版',
          label: '简装版'
        },{
          value: '白金版',
          label: '白金版'
        },{
          value: '纪念版',
          label: '纪念版'
        }],
         dynamicTags: ['新华出版社', '人民邮电出版社', '高等教育出版社','人民文学出版社'],
        inputVisible: false,
        inputValue: '',
        form: {
          author: "",
          bookCategory: null,
          bookCategoryId: 1,
          bookId: 1,
          catalog: "",
          dealMount: 0,
          detail: "",
          discount: 0,
          imageUrl: "",
          isShelf: 1,
          isbn: "",
          lookMount: 0,
          marketPrice: 0,
          memberPrice: 0,
          name: "",
          outline: "",
          packStyle: "",
          pages: 150,
          press: "",
          price: 0,
          publishDate: 1559779960000,
          size: "",
          storeMount: 21,
          storeTime: new Date(),
          translator: "",
          version: "",
          imageUrl:[{name:'test',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        }
      }
    },
    mounted(){
      this.getCate();
    },
    methods: {
      //提交表格
      onSubmit() {
        var that=this;
        var bookInfo=that.$qs.stringify({
          bookInfo:that.form
        });
        console.log(that.form);
        this.$ajax({
          url:'admin/bookInfo/add.do',
          method:'post',
          params:{
            bookInfo:bookInfo,
          }
        })
      },
      //移除照片
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      //预览照片
      handlePreview(file) {
        console.log(file);
      },
      //添加标签
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      //写入标签
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      selectTag(tag){
        this.form.press=tag;
        console.log(tag);
      },
      getCate(){
        var that=this;
        this.$ajax({
          url:"category/list.do",
          method:'post'
        }).then(function(response){
          that.categories=response.data.bookCategoryList;
          console.log(that.categories);
        }).catch(function(response){

        })
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
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>