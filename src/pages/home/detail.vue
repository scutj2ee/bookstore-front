<template>

<el-container>
  <el-aside width="500px">
    <div class="block">
    <el-image v-bind:src="tableData.image_url">
    </el-image>
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
    <el-tab-pane label="用户评论" name="second">配置管理</el-tab-pane>
  </el-tabs>
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
    data() {
      return {
        tableData: bookDetail,
        card:1,
      }
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
</style>