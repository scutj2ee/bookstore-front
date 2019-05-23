<template>
 
<el-container 
v-loading="totalLoading"
>
  <el-header >
  <el-row>
  <el-col :span="8"><div class="grid-content left">
  <!-- logo -->
   <img src="../../assets/images/logo/logo.png" width="50px" height="50px" float="left" position="center" margin-top="30px">
   
  </div>
  </el-col>
  <el-col :span="8"><div class="grid-content center">
  <!-- 搜索栏 -->
 <div style="margin-top: 0px;margin-right:50px">
  <el-input type="text" placeholder="请输入内容" v-model="input3" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="书名" value="1"></el-option>
      <el-option label="作者" value="2"></el-option>
      <el-option label="类别" value="3"></el-option>
    </el-select>
    <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>

  </div>
  </el-col>
  <el-col :span="8"><div class="grid-content">
  <!-- 主页菜单 -->
  <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1" @click="outerVisible = true"><i class="el-icon-user"></i>登陆</el-menu-item>
  <el-submenu index="2">
  
    <template slot="title">
    <i class="el-icon-notebook-1"></i>
    书单</template>
    <el-menu-item index="2-1">人文</el-menu-item>
    <el-menu-item index="2-2">文学</el-menu-item>
    <el-menu-item index="2-3">生活</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">技能</template>
      <el-menu-item index="2-4-1">IT技术</el-menu-item>
      <el-menu-item index="2-4-2">摄影</el-menu-item>
      <el-menu-item index="2-4-3">烹饪</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" >
   <i class="el-icon-bell"></i><router-link to="/home/bookcart">消息中心</router-link>
 </el-menu-item>
  <el-menu-item index="4" @click="handleGetItem();" ><i class="el-icon-tickets"></i>订单管理</el-menu-item>
  <el-menu-item index="5" @click="handleGetBookSheet()" ><i class="el-icon-goods"></i>书栏</el-menu-item>
 
</el-menu>
</div>
</el-col>
</el-row>

</el-header>
  <el-container>
    <el-aside width="200px">
    <!-- 侧栏 -->
<el-collapse v-model="activeNames" @change="handleChange"  >
  <el-collapse-item title="生活 LIFE" name="1">
  <i class="el-icon-s-promotion"></i>
    <div><el-link type="primary">主要链接</el-link></div>
    <div><el-link type="primary">主要链接</el-link></div>
  </el-collapse-item>
  <el-collapse-item title="科技 TECHNOLOGY" name="2" >
  <i class="el-icon-s-opportunity"></i>
    <div><el-link type="primary">主要链接</el-link></div>
    <div><el-link type="primary">主要链接</el-link></div>
  </el-collapse-item>
  <el-collapse-item title="效率 EFFICIENCY" name="3">
  <i class="el-icon-s-data"></i>
    <div><el-link type="primary">主要链接</el-link></div>
    <div><el-link type="primary">主要链接</el-link></div>
    <div><el-link type="primary">主要链接</el-link></div>
  </el-collapse-item>
  <el-collapse-item title="文学 LITERATURE" name="4">
  <i class="el-icon-notebook-1"></i>
    <div><el-link type="primary">主要链接</el-link></div>
    <div><el-link type="primary">主要链接</el-link></div>
  </el-collapse-item>
</el-collapse>
    </el-aside>
    <!-- 主体部分 -->
    <el-container>
      <el-main> 
        <!--走马灯  -->
      <div class="block">
    <el-carousel height="700px">
      <el-carousel-item  v-for="item in homeList" :key="item">
         <img  v-bind:src="item.url" class="homelist-img">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="block">
<el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="最新活动" name="first">
      <!-- ADS卡片 -->
  <div class="select-card">
   <el-row :gutter="10">
  <el-col :span="6" v-for="(item, index) in adsList" :key="index" >
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <img  v-bind:src="item.url" class="image">
      <div style="padding: 10px;">
        <span class="sub-tit">{{item.title}}</span><br>
        <div class="bottom clearfix">
          <p class="time" v-html="item.content"></p>
          <el-button type="info" class="button" @click="handleDetail();" icon="el-icon-caret-right" >点击参与</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
    </el-tab-pane>
    <el-tab-pane label="畅销榜" name="second">
    <!-- 畅销榜 -->
    <div class="hot-card">
   <el-row :gutter="20">
  <el-col :span="6" v-for="(item, index) in hotForm" :key="index" >
    <el-card shadow="hover" :body-style="{ padding: '5px' }">
      <img  v-bind:src="item.image_url" class="book_image">
        <span class="sub-tit">{{item.name}}</span><br>
       
        <!-- <p v-html="item.outline"></p>
          <p v-html="item.author"></p>
          <p class="price"  v-html="item.price">活动价：￥</p> -->
        <div class="bottom clearfix">
           <div class="card-show">
           {{item.outline}}</div><br>
           <div class="card-show">
           {{item.author }}</div><br>
           <div class="price">活动价：￥ {{item.member_price}}</div><br>
           <div class="card-show">市场价：￥<del>
           {{item.price }}</del></div>
          <el-button type="info" class="button" @click="handleDetail();" icon="el-icon-caret-right" >查看详情</el-button>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
  
     
    
    </el-tab-pane>
    <el-tab-pane label="热点" name="third">
    <!-- 热点 -->
      <!-- 热点 -->
   <div class="block">
  <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
  </el-tab-pane>
    <el-tab-pane label="留言板" name="fourth">留言板</el-tab-pane>
  </el-tabs>
  </div>

  

 
  </el-main>
      <el-footer> 
  <el-dialog title="用户登陆" :visible.sync="outerVisible" width="30%" >
  <!-- 登陆面板 -->
   <img src="../../assets/images/logo/logo.png" style="width:80px; height:80px;" >
 <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="70px" class="demo-ruleForm">
 <el-form-item label="账号" prop="userName">
    <el-input type="text" v-model="loginForm.userName" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>


 
</el-form>
   
    <el-dialog
      width="30%"
      title="用户注册"
      :visible.sync="innerVisible"
      append-to-body>
      <!-- 注册 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="userName">
    <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input type="e-mail" v-model="ruleForm.email" autocomplete="off"></el-input>
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
      <el-button type="success" icon="el-icon-check"  @click="outerVisible = false">登陆</el-button>
      <el-button type="primary" icon="el-icon-plus"  @click="innerVisible = true;outerVisible= false">注册账号</el-button>
    </div>
  </el-dialog>
  </el-footer>
    </el-container>
  </el-container>
</el-container>

</template>
<script>
import books from "../../assets/js/book.js";
import adLists from "../../assets/js/adList.js"
 export default {
   name: 'index',
    data() {
      // 登陆验证
 
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }

      return {
         activeNames: ['1'],
        loginForm:{
          userName:'',
          password:'',
        },
        //注册检测
         ruleForm: {
           email:'',
           userName:'',
          pass: '',
          checkPass: '',
          phone: ''
        },
        rules: {
          email :[{
            required: true, message:'登陆邮箱不能为空',trigger: 'blur'
          }],
           userName :[{
            required: true, message:'用户名不能为空',trigger: 'blur'
          }],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        phone :[{
            required: true, message:'手机号码不能为空',trigger: 'blur'
          }],
        },
       
      //走马灯
        homeList:[
          {
            title:'ad',
            url:require('../../assets/images/homepages/book1.jpg'),
            aim:''
          },
           {
            title:'ad',
            url:require('../../assets/images/homepages/book2.jpg'),
            aim:''
          },
           {
            title:'ad',
            url:require('../../assets/images/homepages/book3.jpg'),
            aim:''
          }, {
            title:'ad',
            url:require('../../assets/images/homepages/book4.jpg'),
            aim:''
          }
        ],
        //活动广告
        adsList: ad,
            hotForm:book,
        activeIndex: '1',
        activeIndex2: '1',
        currentDate:new Date(),
        input3: '',
        select: '',
        outerVisible: false,//登陆栏
        innerVisible: false,//注册栏
        activeName: 'first',
        loading:true,
        totalLoading:true
      };
    },
     mounted() {
       
       this.totalLoading=false;
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleDetail(){

      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleClick(tab, event) {
        console.log(tab, event);
      }, handleGetBookSheet(){
this.$router.push({path: '/home/bookcart'});
      },
      handleChange(val) {
        console.log(val);
      }
    }
    
  }
</script>
<style >

.logo-image{
  height: 20%;
  width: 20%;
  position: absolute;
 
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 80px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
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
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
   .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 2px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
 .book_image {
    width: 100%;
    display: inline-block;
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
  .hot-card{
    width: 100%;
    height: 25%;
  }
  .select-card{
    width: 100%;
    height: 25%;
  }
  .card-show{
    border:10px;
    padding:5px;
    margin-top:15px;
    font-size:15px;
    color:#999;
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
    background-color: #f9fafc;
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
  .price{
    color:red;
    font-size:18px;
  }
</style>