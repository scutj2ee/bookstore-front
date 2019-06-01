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
   <p>  <i class="el-icon-setting"></i> <router-link to="/home/user/checkpsw"  >修改密码</router-link></p>
   <p>  <i class="el-icon-s-comment"></i> <router-link to="/home/user/comment"  >评论管理</router-link></p>
   <p>  <i class="el-icon-location"></i> <router-link to="/home/user/address"  >地址管理</router-link></p>
    </div>
    </el-aside>
    <el-main>
     <router-view class="view"></router-view>
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
    },
    mounted(){
        this.$router.push('/home/user/index');//默认打开主页
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
</style>