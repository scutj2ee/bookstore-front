<template>
<el-container>
  <el-container>
    <el-aside width="400px">
    <div class="container">
    <div class="sub-container">
    <img class="head-pic" src="../../../assets/images/default_profile.jpg"/>
    </div>
    
    </div>
   <div style="font-size:24px; color:#33313b"> 
   <p> <i class="el-icon-user-solid"></i>用户名：{{user.userName}}</p>
    <p> <i class="el-icon-message"></i>邮箱：{{user.email}}</p>
   <p>  <i class="el-icon-coin"></i>积分：{{user.integration}}</p>
   <p>  <i class="el-icon-setting"></i> <router-link to="/home/checkpsw"  >修改密码</router-link></p>
    </div>
   
    </el-aside>
    <el-main>
    <div class="main-container">
    <div class="head-main-container">
    <!-- 标题 -->
     <h2 style="margin-left:10px;"><i class="el-icon-s-order"></i>我的订单</h2>
    </div>
    <div class="body-main-container">
     <el-card shadow="hover" class="sub-main-container">
     <i class="main-i el-icon-goods"></i><p>待付款</p>
    </el-card>
    <el-card shadow="hover" class="sub-main-container">
    <i class="main-i el-icon-s-comment"></i><p>未评价</p>
    </el-card>
    <el-card shadow="hover" class="sub-main-container">
    <i class="main-i el-icon-shopping-bag-2"></i><p>已完成</p>
    </el-card>
    <el-card shadow="hover" class="sub-main-container">
   <i class="main-i el-icon-more-outline"></i> <p>所有订单</p>
    </el-card>
    </div>
   
    </div>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import user from "../../../assets/js/userDetail.js";
export default{
    data(){
      return{
        user:userDetail,

      }
    }

}


</script>
<style scoped>
a {
    text-decoraction: none;
}
  .router-link-active {
    text-decoration: none;
  }
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #d2f3e0;
    color: #333;
    text-align: left;
    line-height: 30px;
  
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    min-height:100vh;
  }
  
  body > .el-container {
  
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .container{
    height:40%;
    width:100%;
    /* background-color:red; */
  }
  .sub-container{
    height:120px;
    width:120px;
    position:relative;
    top:50%;
    left:50%;
    margin: -60px 0px 0px -60px;
    background-color:#fff;
    border-radius:50%;
  }
  .head-pic{
    max-width:120px;
    overflow:hidden;
    border-radius:50%;
  }
  .main-container{
    height:440px;
    width:1200px;
    background-color:#348498;
  }
  .head-main-container{
    height:80px;
    width:100%;
    margin:0 auto;
    position:relative;
    background-color:#348498;
    color:white;
    float:top;
    text-align:left;
    line-height: 80px;
    
  }
  .body-main-container{
    height:300px;
    width:1200px;
    margin:80 auto;
    position:relative;
    background-color:#5bd1d7;
  }
  .sub-main-container{
    margin:10px 8px 10px 8px;
    position:relative;
    width:280px;
    height:280px;
    float:left;
    background-color:#fcf9ec;
    border-radius:5px;
    border: 2px #2d132c dashed ;
    line-height: 10px;
    font-size:30px;
  }
  .main-i{
font-size:160px;
  }
</style>