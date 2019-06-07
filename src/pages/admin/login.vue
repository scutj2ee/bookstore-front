<template>
    <video-bg :sources="[path]" img="../../assets/images/homepages/add1.jpg" >
  <!-- If you want to add content here, a slot is waiting! -->
  <div class="container">
  <div class="loginForm">
  <img class="head-img" src="../../assets/images/logo/scuthub.png">
  <p>SCUT-BOOKSTORE后台管理系统</p>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
 <el-form-item label="账号" prop="userName">
    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
  </el-form-item>
   <el-button type="success" icon="el-icon-check"  @click="submitLoginForm('loginForm'); ">登陆</el-button>
   <el-button type="primary" icon="el-icon-goods"  @click="handleToStore() ">商城</el-button>
</el-form>
  </div>
  </div>
</video-bg>
</template>
<script>
 import {mapActions,mapGetters} from 'vuex';
export default{
    data () {
       // 登陆验证
      var validatePassword=(rule,value,callback)=>{
          if(!value){
            callback(new Error("请输入密码"));
          }
            callback();
          
      };
   return {
     path: require('../../assets/videos/video1.mp4'),
     loginForm: {
          username: '',
          password: ''
        },
        rules:{
           username :[{
            required: true, message:'用户名不能为空',trigger: 'blur'
          }],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
        }
   }
 }, 
 methods: {
      submitLoginForm(formName){
         this.$refs[formName].validate((valid) => {
         if (valid) {
            const that = this;
          // 传输信息给后台
          // 这一部分等完善登录功能的后台再进行联调
          // let request=this.$qs.stringify({
          //   username:that.loginForm.username,
          //   password:that.loginForm.password,
          // });
          console.log(that.loginForm.password);
          this.$ajax({
            method:'post',
            url:'adminUser/login.do',
            params: {
               username:that.loginForm.username,
              password:that.loginForm.password,
            }
          }).then(function(response){
            
            if(response.data.success){
            console.log(response.data);
            that.$store.commit('modifyAdminUser',response.data.adminUser);
            //写入seesionStorage来保存数据
            sessionStorage.setItem('state',JSON.stringify(that.$store.state.adminUser));
            that.$message({
                message: '登录成功',
                type: 'success'
            });
            that.$router.push('/admin/index');
            }else{
              that.$msgbox({
                  title: '登录失败',
                  message: response.data.msg,
                  type: 'error'
                });
            }
          }).catch(function (error) {
              that.$msgbox({
                title: '登录失败',
                message: '服务器异常',
                type: 'error'
              });
            });
            // this.$router.push({ name: 'Home',params:{user:that.ruleForm.username,pwd:that.ruleForm.password}});
          } else {
            this.$message.error('登录失败');
            console.log('error submit!!');
            return false;
          }
        });
      },

      handleToStore(){
        this.$router.push('/home/homepage');
      },

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
  width:240px;
  height:80px;
  margin:10px;
  border-radius:10px;
}
</style>