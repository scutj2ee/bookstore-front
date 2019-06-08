<template>
<el-container 
v-loading="totalLoading"
>
  <el-header class="el-header">
  <el-row type="flex">
  <el-col :xs="0" :sm="2" :md="2" :lg="2" :xl="8" ><div class="grid-content left">
  <!-- logo -->
  <div class="round">
  <div class="logo-image">
  <router-link to="/home/homepage"> <img  src="../assets/images/logo/scuthub.png" width="150px" height="50px"   margin-top="30px" style="border-radius:10px;" ></router-link>
  </div>
   </div>
  </div>
  </el-col>
  <el-col :xs="0" :sm="6" :md="6" :lg="14" :xl="8"><div class="grid-content center hidden-md-and-down">
  <!-- 搜索栏 -->
  
  </div>
  </el-col>
  <el-col :xs="24" :sm="16" :md="16" :lg="10" :xl="8"><div class="grid-content">
  <!-- 主页菜单 -->
  <el-menu
  unique-open="true"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#000"
  text-color="#fff"
  active-text-color="#ff9900"
  default-active="/home/homepage"
  :router="true"
  >
  <el-submenu index=1>
  <template slot="title">
    <i class="el-icon-user"></i>{{loginTitle}}</template>

    <el-menu-item index="/home/user/index" v-if="loginState" > <img  src="../assets/images/default_profile.jpg" width="30px" height="30px"  />个人中心</el-menu-item>
    <el-menu-item @click="handleLogin();"  ><i class="el-icon-switch-button"></i>{{isLogin}}</el-menu-item>
      
  </el-submenu>

  <el-submenu index="2" >
    <template slot="title">
    <i  class="el-icon-notebook-1"></i>书单
    </template>
  <el-menu-item>所有图书</el-menu-item>
  <el-submenu unique-open="true" index="item.index" v-for="(item,index) in categories" :key="index">

  <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">{{item.name}}</span>
    </template>
    <div v-if="item.child.length">
      <el-menu-item v-for="(second,index) in item.child" :key="index">
      {{second.name}}
      </el-menu-item>
    </div>
  </el-submenu>

  </el-submenu>
  <el-menu-item index="/home/order/all" class="hidden-md-and-down" >
  <i class="el-icon-tickets"  ></i>
  订单管理</el-menu-item>
  <el-menu-item index="/home/bookcart" ><i class="el-icon-goods"></i>书栏</el-menu-item>
</el-menu>
</div>
</el-col>
</el-row>

</el-header>
 <el-container ref="aside" >
    <el-aside  width="200px" class="hidden-md-and-down" >
 

  <!-- 侧栏 -->

 <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#000000"
             text-color="#ff9900" active-text-color="#20a0ff" unique-opened @select="handleList">
      <template v-for="item in categories">
        <template v-if="item.child.length>0">
          <el-submenu :index="String(item.id)" :key="item.id">
            <template slot="title">
             <span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.child" :key="i" :index="String(subItem.id)">
              {{ subItem.name }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="String(item.id)" :key="item.id">
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

<!-- <el-menu 
 
 class="el-menu-vertical-demo"
 background-color="#000"
  text-color="#ff9900"
  active-text-color="#ffd04b"
  :router="true"
 >
  <el-menu-item index="1">所有图书</el-menu-item>

  
  <NavMenu :navMenus="categories"></NavMenu>
  <el-menu-item :index="item.name" v-for="(item,index) in categories" :key="item.id" v-if="item.child.length==0">
  <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">{{item.name}}</span>
    </template>
  </el-menu-item>

  <el-submenu  v-for="(item,index) in categories" :key="item.id" v-if="item.child.length>0">
  <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">{{item.name}}</span>
    </template>
      <el-menu-item v-for="(sub,index) in item.child" :key="sub.id" >
      <template slot="title">
      <span slot="title">{{sub.name}}</span>
      </template>
      </el-menu-item>
  </el-submenu>
</el-menu> -->


<el-button type="primary"  icon="el-icon-setting" @click="handleList()">测试</el-button>


    </el-aside>
    <!-- 主体部分 -->
   <el-container>
      <el-main> 
       <router-view v-if="isRouterAlive" class="view"></router-view>
  </el-main>
      <el-footer> 
  <el-dialog  title="用户登陆" :visible.sync="outerVisible" width="30%" >
  <!-- 登陆面板 -->
  <div style="position:relative;  width:100%; height:100px;" >
   <img src="../assets/images/logo/scuthub.png" style="position:absolute; width:240px; height:80px; top:50%;left:50%; margin: -40px 0px 0px -120px; border-radius:10px;" >
   </div>
 <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="70px" class="demo-ruleForm">
 <el-form-item label="账号" prop="username">
    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item >
 <el-checkbox v-model="checked" style="float:left; color:#a0a0a0;">一周内自动登录</el-checkbox>
 </el-form-item>
</el-form>
   
    <el-dialog
      width="30%"
      title="用户注册"
      :visible.sync="innerVisible"
      append-to-body>
      <!-- 注册 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input type="e-mail" v-model="ruleForm.email" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="验证码" prop="code" class="pr">
        <el-input prop="code" v-model="ruleForm.code" placeholder="验证码"></el-input>
        <el-button type="primary" plain @click="getCode()" class="code-btn" :disabled="!show">
          <span v-show="show">发送验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-button>
      </el-form-item>
   <el-form-item label="手机号码" prop="phone">
    <el-input v-model.number="ruleForm.phone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
  <el-button type="info" @click="innerVisible=false; outerVisible=true "  icon="el-icon-arrow-left" >返回登陆</el-button>
    <el-button type="primary"  icon="el-icon-plus" @click="submitForm('ruleForm')">注册</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </el-dialog>

    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false" icon="el-icon-arrow-left">取 消</el-button>
      
      <el-button type="success" icon="el-icon-check"  @click="submitLoginForm('loginForm'); ">登陆</el-button>
      <el-button type="primary" icon="el-icon-plus"  @click="innerVisible = true;outerVisible= false">注册账号</el-button>
    </div>
  </el-dialog>
  <!-- 底部信息 -->
  <div  ref="aside" class="demo-badge-content" color="transparent">
      <label style="color:#fff;"> Copyright</label>
      <span style="font-size: 20px; color: #ff9900;" slot="content">&copy;</span>
       <label style="color:#fff;"> 2019 SCUTBOOKSTORE &nbsp All Rights Reserved.</label>
    </div>
  </el-footer>
    </el-container>
    </el-container>
    </el-container>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
import {mapActions,mapGetters} from 'vuex';
import NavMenu from './NavMenu.vue';

import bus from './utils/bus';
const TIME_COUNT = 60 // 设置一个全局的倒计时的时间
 export default {
   name: 'home',
  components: {NavMenu},

    data() {
      //手机验证
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'))
        }
        if (!phoneReg.test(value)) {
          callback(new Error('手机号码输入格式有误'))
        } else {
          callback()
        }
      };

      // 登陆验证
      var validatePassword=(rule,value,callback)=>{
          if(!value){
            callback(new Error("请输入密码"));
          }
            callback();
          
      };
      //注册密码验证
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      //再次输入密码验证
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
         // 验证码校验
    let validateCheckCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不可为空'))
      } else {
        if (value !== '') {
          let reg = /^[0-9]{6}$/;//正则验证
          if (!reg.test(value)) {
            callback(new Error('请输入收到的6位随机验证码'))
          }
        }
        callback();
      }
    }
    //验证邮箱
       var emailReg = /^\w+@\w+\.(com|cn|gov)$/
      var validateEmail = (rule, value, callback) => {
        //电子邮箱可不填
        if (value) {
          if (!emailReg.test(value)) {
            callback(new Error('电子邮箱输入格式有误'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      };
      return {
        isRouterAlive:true,
        collapse: false,
        //分类
        categories:[{
          id:1,
          name:"科技",
          children:[{
            id:3,
            name:"天文学"
          },{
            id:4,
            name:"数学"
          }]
          },{
            id:2,
            name:"生活"
          }
        ],
        //用户名
        loginTitle:"请登录",
        //是否登陆校验
        isLogin: "登录",
        //登录状态
        loginState:0,
      //登陆表格
        loginForm:{
          username:'',
          password:'',
        },
        checked:false,//记住密码七天内免登陆
        //注册检测
         ruleForm: {
           email:'',
           code: '',
           username:'',
            pass: '',
            checkPass: '',
            phone: ''
        },
        //约束规则表格
        rules: {
          email :[{
            required: true,validator: validateEmail,trigger: 'blur'
          }],
          code: [
            { validator: validateCheckCode, trigger: 'blur' }
          ],
           username :[{
            required: true, message:'用户名不能为空',trigger: 'blur'
          }],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone :[{
            required: true, validator: validatePhone,trigger: 'blur'
          }],
        },
       
      //走马灯
        homeList:[
          {
            title:'ad',
            url:require('../assets/images/homepages/book1.jpg'),
            aim:''

          },
           {
            title:'ad',
            url:require('../assets/images/homepages/book2.jpg'),
            aim:''
          },
           {
            title:'ad',
            url:require('../assets/images/homepages/book3.jpg'),
            aim:''
          }, {
            title:'ad',
            url:require('../assets/images/homepages/book4.jpg'),
            aim:''
          }
        ],
        //活动广告
        adsList: [
            {
              title:'The Polaroid Book',
              url:require('../assets/images/homepages/add1.jpg'),
               content: '宝丽来珍藏版摄影--光影盛宴',
               aim:'',
               star: 4
               },
            {
              title : 'The story of Polaroid',
              url: require('../assets/images/homepages/add2.jpg'),
               content: '新书发售，白金收藏',
                aim:'',
               star: 4},
            { 
              title:'买书送女朋友' ,
              url:require('../assets/images/homepages/add3.jpg'),
               content: '快过来抱走我',
                aim:'',
               star: 4},
            { title:'公益藏书活动',
             url: require('../assets/images/homepages/add4.jpg'),
              content: '响应世界沙雕日，你敢买我敢送',
             aim:'',
               star: 4}
            ],
        outerVisible: false,//登陆栏
        innerVisible: false,//注册栏
        totalLoading:false,//加载中
        show: true,//验证码按钮
        count: '',//验证倒计时
        timer: null,//计时器变量
        clientHeight:'',//浏览器高度
      };
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
       
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    },
     mounted() {
       this.getCategories();
      this.ruleForm=this.$store.state.ruleForm;
      this.getCookie();//读取cookie
       this.$router.push('/home/homepage');//默认打开链接
        // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`              
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
  watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },

    methods: {

      //动态修改样式
      changeFixed(clientHeight){ 
        // console.log(clientHeight);
        // console.log(this.$refs.homePage.$el.style.height);
        this.$refs.aside.$el.style.height = clientHeight-20+'px';
      },
      getCategories(){
        var that=this;
        this.$ajax({
          url:"category/list.do",
          method:'post'
        }).then(function(response){
          that.categories=response.data.bookCategoryList;
          console.log(that.categories);
        }).catch(function(response){

        })
      },

      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleDetail(){

      },
      // 向后端发请求的点击事件 获取验证码
      getCode () {
      let that = this
      
      if (this.ruleForm.email === '') {
        that.$message.error('请先输入邮箱再点击获取验证码')
      } else {
       // 注释为重要代码，不可删除，这里是写一个测试方法
        this.$ajax({
          method: 'post',
          url: 'user/code.do',
          params: {
            'email': that.ruleForm.email,
            'username':that.ruleForm.username
          }
        }).then(function (res) {
          this.$message({
              message: '发送验证码成功',
              type: 'success'
            });
          sessionStorage.setItem('checkCode', res.data.data)  // 这里我没用redis做缓存，用的浏览器sessionStorage+md5加密存下来的
        });
        //测试验证码
        // 验证码倒计时
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    },
    //登陆功能
    
    submitLoginForm(formName){
        this.$refs[formName].validate((valid) => {
         if (valid) {
            const that = this;
            //判断复选框是否被勾选 勾选则调用配置cookie方法
            if (that.checked == true) {
                //传入账号名，密码，和保存天数3个参数
                that.setCookie(that.loginForm.username, that.loginForm.password, 7);
            }else {
              console.log("清空Cookie");
              //清空Cookie
              that.clearCookie();
          }

          // 传输信息给后台
          // 这一部分等完善登录功能的后台再进行联调
          // let request=this.$qs.stringify({
          //   username:username,
          //   password:password,
          // });
          this.$ajax({
            method:'post',
            url:'user/login.do',
            params: {
              username:that.loginForm.username,
              password:that.loginForm.password,
            }
          }).then(function(response){
            
            if(response.data.success){
            console.log(response.data);
            that.$store.commit('modifyUser',response.data.user);
            //写入seesionStorage来保存数据
            // sessionStorage.setItem('state',JSON.stringify(that.$store.state.user));
            that.$message({
                message: '登录成功',
                type: 'success'
            });
            that.loginState=1;//登录成功
            that.outerVisible = false;
            that.checkUser();//更新状态
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
     //注册
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var that=this;
          if (valid) {
            // localStorage.setItem('user_name',this.ruleForm.username);
            // localStorage.setItem('user_password',this.ruleForm.pass);
            var user={
              username: that.ruleForm.username,
              password:that.ruleForm.pass,
              email:that.ruleForm.email,
              phone:that.ruleForm.phone,
              integration:50 //618新用户送50积分
            };
            var userStr=JSON.stringify(user);
            var request=this.$qs.stringify({
              user:userStr,
              verifyCode:that.ruleForm.code,
            });
            
            this.$ajax({
              method:'post',
              url:'user/register.do',
              data: request,
            }).then(function(response){
              if(response.data.success){
                 that.$message({
          message: '注册成功！',
          type: 'success'
            });
            
            
            console.log(JSON.stringify(that.ruleForm));
            that.$store.commit('modifyRuleForm',that.ruleForm);
            sessionStorage.removeItem('state');
            sessionStorage.setItem('state',JSON.stringify(that.$store.state));
            
            that.innerVisible=false;
            that.loginForm.username=that.ruleForm.username;
            that.loginForm.password=that.ruleForm.pass;
            that.checked=true;
            that.submitLoginForm(that.loginForm);//自动登录

              }
              else{
                this.$message({
          message: response.data.msg,
          type: 'error'
            });
              }
            })
           
          } else {
           this.$message.error('注册失败！');
            console.log('注册失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleClick(tab, event) {
        console.log(tab, event);
      }, 
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
          var exdate = new Date(); //获取时间
          exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
          //字符串拼接cookie
          window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
          window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();

      },
      //读取cookie
      getCookie: function() {
          if (document.cookie.length > 0) {
              var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
              for (var i = 0; i < arr.length; i++) {
                  var arr2 = arr[i].split('='); //再次切割
                  //判断查找相对应的值
                  if (arr2[0] == 'username') {
                    //  console.log(arr2[1])
                      this.loginForm.username = arr2[1]; //保存到保存数据的地方
                  } else if (arr2[0] == 'password') {
                    // console.log(arr2[1])
                      this.loginForm.password = arr2[1];
                  }
              }
               this.checked = true;
          }
      },
       //清除cookie
      clearCookie: function() {
          this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
          //清空登录
          this.loginForm.username="";
          this.loginForm.password="";
      },
      //修改DOM
      checkUser(){
        if(this.$store.state.user!=null){
          this.loginTitle=this.$store.state.user.username;
          this.loginState=1;
          this.isLogin="退出登录";
        }else{
           this.loginState=0;//退出登录
          this.loginTitle="请登录";
          this.isLogin="登录";

        }
      },
      //跳转登录或者退出登录
      handleLogin(){
        //登录
        if( this.loginState==0){
          this.outerVisible=true;
        }else{
          //退出
        var that = this;
        var id=that.$store.state.user.id;
        this.$ajax({
          method: 'get',
          url: '/user/logout.do',
          params:{
            userId:id
          }
        }).then(function (response) {
          if (response.data.success) {
            that.$message({
              type:'success',
              message:"登出成功"
            });
          that.clearCookie();
          that.$store.commit('modifyUser',null);
          that.checkUser();
         
            that.$router.push({
              path: '/home/homepage',
            });

          } else {
            that.$message.error('登出失败');
          }
        })
          
        }
      },
      //跳转
      handleList(index,indexPath){
        // console.log(index);
        //进行页面的跳转，但是不刷新，可使DOM重新加载
        this.isRouterAlive = false
        this.$nextTick(function () {
        this.isRouterAlive = true
        });
        console.log('path'+index);
        this.$router.push({ path: '/home/list'});
        this.$store.commit('modifyCateId',index);
        sessionStorage.setItem('cate_id',index);
      }
    
  }
 }
</script>
<style >

.demo-badge-content {
  padding: 12px;
  margin-left: 16px;
  margin-right: 16px;

}
.round{
  height: 60px;
  width: 260px;
  position:absolute;
  border-radius:10px;
}

.logo-image{
  position:relative;
  top:50%;
  left:50%;
  margin:-25px 0 0 -125px;
 border-radius:10px;
 height: 20%;
  width: 20%;
  position: absolute;
 
}

.el-header, .el-footer {
    background-color: #000;
    color: #333;
    text-align: center;
    line-height: 60px;
    
    
  }
  
  .el-aside {
    background-color: #000000;
    color: #ff9900;
    text-align: center;
    line-height: 30px;
   min-height:100vh;
  }
  
  .el-main {
    background-color: #d9d9d9;
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
 .el-carousel__item h3 {
    color: #004d61;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #004d61;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #004d61;
  }
   .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .select-card{
    width: 100%;
    height: 25%;
  }
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
  }
 .center{
   height:15px;
 }
  .grid-content {
  
    min-height: 15px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #004d61;
  }
    .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
    .image {
    width: 382px;
    height: 520px;
    display: block;
  }
  
.sub-tit {
    font-weight: bolder;
    font-size: 16px;
    float: left;
    /*width: 100%;*/
  }
  .homelist-img{
     
    width: 100%;
    height: 100%;
  
  }
  .item {
  
  margin-right: 0px;
}
.code-btn{
margin-top :15px;
}
.board{
  background-color:#000;
  color:rgba(255,153,0)
}
</style>