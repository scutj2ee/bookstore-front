<template>

<el-container>
  <el-aside width="500px">
    <div class="block">
    <img v-bind:src="tableData.image_url" @click="openImg(tableData.image_url)">
    </img>
    </div>
    <div class="line">书名：{{tableData.name}}</div>
    <div class="line">作者：{{tableData.author}}</div>
    <div class="line price">会员价：{{tableData.member_price}}</div>
    <div class="line" ><del>市场价：{{tableData.price}}</del></div> 
    <div class="line">出版日期：{{tableData.date}}</div>   
    <div class="line rate">评分
    <el-rate
  v-model="tableData.star"
  disabled
  allow-half="true"
  show-score
  text-color="#ff9900"
  score-template="{value}"
  size="30px">
</el-rate>
</div>

  </div>
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
<style>
.rate{
  
  float:center;
}
.title{
 
  font-family:"微软雅黑";
  color:#feb9c8;
}
.block{
  margin-top:25px;
}
.line{
  font-size:20px;
  height:40px;
  width:350px;
  word-wrap:break-word;
}
.price{
color:red;
font-size:25px;
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
</style>