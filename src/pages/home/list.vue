<template>

<el-container>
<el-header>Header</el-header>
<el-main>
    <!-- 畅销榜 -->
    <div class="hot-card">
   <el-row :gutter="20">
  <el-col :span="6" v-for="(item, index) in hotForm" :key="index" >
    <el-card shadow="hover" :body-style="{ padding: '5px' }">
      <img  v-bind:src="item.image_url" class="book_image">

        <!-- <p v-html="item.outline"></p>
          <p v-html="item.author"></p>
          <p class="price"  v-html="item.price">活动价：￥</p> -->
        <div class="bottom clearfix">
                <span>{{item.name}}</span>
           <div class="card-show">{{item.author }}</div><br>
           <div class="price">活动价：￥ {{item.member_price}}</div>
           <div class="card-show">市场价：￥<del>
           {{item.price }}</del></div>    
          <el-button type="info" class="button" @click="handleDetail();" icon="el-icon-caret-right" >查看详情</el-button>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>   
</el-main>
</el-container>

  
</template>
<script>
import books from "../../assets/js/book.js";

export default {
     name: 'index',
    data(){
      return {
      hotForm:book
      }
    }

    
  }
</script>
<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 50px;
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
    line-height: 70px;
    min-height:0px;
  }
  
  body > .el-container {
    margin-bottom: 600px;
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

  div.hot-card span{
    font-weight:bold;
    font-size:x-large;
  }

  .el-row {
    margin-bottom: 30px;

  }
</style>