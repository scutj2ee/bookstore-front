<template>

<el-container>
  <el-aside width="500px">
  <div class="container">
    <div class="sub-container">
     <el-image class="head-pic" v-bind:src="tableData.imageUrl" @click="openImg(tableData.imageUrl)">
      <div slot="error" class="image-slot" >
        <!-- <i  class="el-icon-picture-outline" style="font-size:160px;"></i> -->
        <el-image v-bind:src="default_img"></el-image>
       
      </div>
    </el-image>
    <!-- <img class="head-pic" v-bind:src="tableData.imageUrl||default_img" @click="openImg(tableData.imageUrl)" /> -->
    </div>
    </div>
    <p><i class="el-icon-notebook-2">书名：{{tableData.name}}</i></p>
    <p><i class="el-icon-coin">价格：￥{{tableData.price}}</i></p>
    <p> <i class="el-icon-edit">作者：{{tableData.author}}</i></p>
    <p> <i class="el-icon-coin">出版日期：{{tableData.publishDate}}</i></p>
    <p><i class="el-icon-notebook-2">大纲：{{tableData.outline}}</i></p>
  </el-aside>
    <el-main>
    <!-- 主体-->
    <div class="title"><h2 >{{tableData.name}}</h2></div>
    <el-tabs v-model="card" @tab-click="handleClick">
    <el-tab-pane label="详细信息" name="first">
    <p></p>
  
    </el-tab-pane>
    <el-tab-pane label="用户评论" name="second">
    <div class="block">
     <el-timeline  >
    <el-timeline-item 
        v-for="(comment, index) in comments"
        :key="index"
        :timestamp="comment.date"
        icon="el-icon-s-comment"
        size="large"
        type="primary"
     placement="top">
      <el-card class="box-card">
      <div class="text item">
      <h4>{{comment.username}}:{{comment.content}}</h4>
      </div>
      </el-card>
    </el-timeline-item>
     </el-timeline>
   </div> 
    
    </el-tab-pane>
  </el-tabs>
  <el-dialog width="500px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img v-bind:src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
  <div>
  <el-input-number v-model="num" @change="handleChange" :min="1" :max="tableData.storeMount" label="数目"></el-input-number>
  <el-button type="info" icon="el-icon-star-on" >加入收藏夹</el-button>
  <el-button type="primary" icon="el-icon-shopping-cart-2"  :disabled="!tableData.storeMount" @click="handleToCart()" >加入购物车</el-button>
  </div>



  </el-main>
</el-container>
  
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
import dateUtil  from "../../assets/util/DateUtil.js"
export default {
    data(){
      return {
        tableData: {
          author: "",
          bookCategory: null,
          bookCategoryId: 1,
          bookId: 1,
          catalog: "",
          dealMount: 213,
          detail: "",
          discount: 312,
          imageUrl: "",
          isShelf: 1,
          isbn: "",
          lookMount: 123,
          marketPrice: 213,
          memberPrice: 213,
          name: "",
          outline: "",
          packStyle: "",
          pages: 211,
          press: "",
          price: 231,
          publishDate: 1559779960000,
          size: "",
          storeMount: 21,
          storeTime: 1559607191000,
          translator: "",
          version: "",
        },
        comments:[],
        num:1,//数目
        subTotal:0,//总价格
        card:1,
        dialogImgUrl:null,//展示照片
        imgVisible:false,//展示照片的对话
        default_img:null,
      }
    },
    mounted(){
      this.handleGet();
      this.default_img=require('../../assets/images/default.jpg');
    },
      methods:{
      handleGet(){
        var that=this;
        this.$ajax({
          method:"get",
          url:"book/info.do",
          params:{
            bookInfoId:1,
          }
        }).then(function (response) {
          if(response.data.success){
            that.tableData=response.data.BookInfoDto.bookInfo;
             that.comments=response.data.BookInfoDto.commentDtoList;
            for(var i=0;i<that.comments.length;i++){
              that.comments[i].date=dateUtil.formatTime(that.comments[i].date);
            }
           
            console.log(that.comments);
             console.log(dateUtil.formatTime(that.tableData.publishDate));
             that.tableData.publishDate=dateUtil.formatTime(that.tableData.publishDate);
             that.tableData.storeTime=dateUtil.formatTime(that.tableData.storeTime);

            console.log(that.tableData);
          }
       
        });

      },
      handleToCart(){
        var that=this;
        var id=that.$store.state.user.id;
        var bookId=that.tableData.bookId;
        var buyNum=that.num;
        var subTotal=that.subTotal;
        if(id<1||id==null){
          that.$message({
            type:'warning',
            message:'您还没登录，请登录，再加入购物车'
          })
        }else{
          this.$ajax({
          method:"post",
          url:"/cart/add.do",
          params:{
            bookId:bookId,
            userId:id,
            buyNum:buyNum,
            subTotal:subTotal,
          }
        }).then(function(response){
          that.$message({
            type:'success',
            message:'添加成功'
          });
        }).catch(function (response) {
          that.$message({
            type:'error',
            message:response.data.msg
          });
        });

        }
        
      },
          // 展示图片
    openImg(url) {
      if (url) {

        this.imgVisible = true;
        this.dialogImgUrl = url;
      }
    },
     handleChange(value) {
        this.subTotal=this.tableData.memberPrice*this.num;
      }
    }  
  }
</script>
<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 30px;
    font-size:22px;
    min-height:100vh;
    padding-left:15px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 30px;
    min-height:100vh;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

.title{
 
  font-family:"微软雅黑";
  color:#feb9c8;
}

.text {
   position:relative;
    left:0;
    top:50%;
  float:center;
  transform:translate(0,-50%);
    font-size: 18px;
  }

  .item {
    
  }

  .box-card {
   
    float:center;
    height:100px;
    
  }
   .container{
    height:60%;
    width:100%;
    /* background-color:red; */
  }
  .sub-container{
    height:400px;
    width:400px;
    position:relative;
    top:50%;
    left:50%;
    margin: -200px 0px 0px -200px;
    
  }
  .head-pic{
    max-width:400px;
    overflow:hidden;
  }
</style>