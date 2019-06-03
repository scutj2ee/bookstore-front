<template>
    <video-bg :sources="[path]" img="../../assets/images/homepages/add1.jpg" >
  <!-- If you want to add content here, a slot is waiting! -->
  <div class="container">
  <div class="loginForm">
  <img class="head-img" src="../../assets/images/logo/SCUTBOOK.png">
  <p>SCUT-BOOKSTORE后台管理系统</p>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
 <el-form-item label="账号" prop="userName">
    <el-input type="text" v-model="loginForm.userName" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
  </el-form-item>
   <el-button type="success" icon="el-icon-check"  @click="submitLoginForm('loginForm'); ">登陆</el-button>
   <el-button type="success" icon="el-icon-check"  @click="submitLoginForm('loginForm'); ">商城</el-button>
</el-form>
  </div>
  </div>
</video-bg>
</template>
<script>
export default{
    data () {
   return {
     path: require('../../assets/videos/video1.mp4'),
     loginForm: {
          userName: '',
          password: ''
        }
   }
 }, 
 methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>
<style>
.container{
  width:100%;
  height:100%;
  position:absolute;
  
}
.loginForm{
  position:relative;
  background-color: rgba(255,255,255,0.6);
  width:500px;
  height:400px;
  top:50%;
  left:50%;
  margin: -200px 0 0 -250px;
  border-radius: 20px;
  text-align:center;
}
.head-img{
  width:400px;
  height:80px;
  margin:10px;
  border-radius:10px;
}
</style>