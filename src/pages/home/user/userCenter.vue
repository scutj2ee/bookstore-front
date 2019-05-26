<template>
<el-container>
  <el-container>
    <el-aside width="400px">
    <div class="container">
    <div class="sub-container">
    <img class="head-pic" src="../../../assets/images/default_profile.jpg"/>
    </div>
    
    </div>
   
   <p> <li class="el-icon-user-solid">用户名：{{user.userName}}</li></p>
    <p> <li class="el-icon-message">邮箱：{{user.email}}</li></p>
   <p>  <li class="el-icon-coin">积分：{{user.integration}}</li></p>
    
   
    </el-aside>
    <el-main>Main</el-main>
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
  
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
</style>