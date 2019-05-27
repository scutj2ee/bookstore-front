<template>

<el-container>
  <el-aside width="500px">
  <div class="container">
    <div class="sub-container">
    <img class="head-pic" v-bind:src="tableData.image_url" @click="openImg(tableData.image_url)" />
    </div>
    </div>
    <p><i class="el-icon-notebook-2">书名：{{tableData.name}}</i></p>
    <p><i class="el-icon-coin">价格：￥{{tableData.price}}</i></p>
    <p> <i class="el-icon-edit">作者：{{tableData.author}}</i></p>
    <p> <i class="el-icon-coin">出版日期：{{tableData.date}}</i></p>
    <p><i class="el-icon-notebook-2">大纲：{{tableData.outline}}</i></p>
  </el-aside>
    <el-main>
    <!-- 主体-->
    <div class="title"><h2 >{{tableData.name}}</h2></div>
    

    
    <el-tabs v-model="card" @tab-click="handleClick">
    <el-tab-pane label="详细信息" name="first">
    
    
    </el-tab-pane>
    <el-tab-pane label="用户评论" name="second">
    <div class="block">
     <el-timeline  >
    <el-timeline-item 
        v-for="(comment, index) in tableData.comments"
        :key="index"
        :timestamp="comment.date"
        icon="el-icon-s-comment"
        size="large"
        type="primary"
     placement="top">
      <el-card class="box-card">
      <div class="text item">
      <h4>{{comment.userName}}:{{comment.content}}</h4>
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
  <el-button type="info" icon="el-icon-star-on" >加入收藏夹</el-button>
  <el-button type="primary" icon="el-icon-shopping-cart-2"  :disabled="!tableData.store_mount" >加入购物车</el-button>
  </div>



  </el-main>
</el-container>
  
</template>
<script>
import book  from "../../assets/js/book_detail.js";
export default {
    data(){
      return {
        tableData: bookDetail,
        card:1,
        dialogImgUrl:null,//展示照片
        imgVisible:false,//展示照片的对话
      }
    },
      methods:{
          // 展示图片
    openImg(url) {
      if (url) {
        this.imgVisible = true;
        this.dialogImgUrl = url;
      }
    },
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
    text-align: center;
    line-height: 30px;
    min-height:100vh;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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