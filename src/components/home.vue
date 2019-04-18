<template>
<el-container>
  <el-header >
  <el-row>
  <el-col :span="8"><div class="grid-content ">
  <!-- logo -->
   <img src="../assets/images/logo/logo.png" class="logo-image">
  </div>
  </el-col>
  <el-col :span="8"><div class="grid-content center">
  <!-- 搜索栏 -->
 <div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
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
  <el-menu-item index="1" @click="outerVisible = true">登陆</el-menu-item>
  <el-submenu index="2">
    <template slot="title">书单</template>
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
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
</el-menu>
</div>
</el-col>
</el-row>

</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
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
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
  </div>
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
          <el-button type="text" class="button" @click="handleDetail();">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
  

 
  </el-main>
      <el-footer> 
  <el-dialog title="用户登陆" :visible.sync="outerVisible">
  <!-- 登陆面板 -->
 
   
    <el-dialog
      width="30%"
      title="用户注册"
      :visible.sync="innerVisible"
      append-to-body>
      <!-- 注册 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="邮箱" prop="mail">
    <el-input type="e-mail" v-model="ruleForm.email" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </el-dialog>

    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="success" icon="el-icon-check"  @click="outerVisible = false">登陆</el-button>
      <el-button type="primary" icon="el-icon-plus"  @click="innerVisible = true">注册账号</el-button>
    </div>
  </el-dialog>
  </el-footer>
    </el-container>
  </el-container>
</el-container>

</template>
<script>
 export default {
    data() {
      // 登陆验证
 var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
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
         ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
      
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
        adsList: [
            {
              title:'The Polaroid Book',
              url:require('../assets/images/homepages/add1.jpg'),
               content: '宝丽来珍藏版摄影--光影盛宴',
               aim:''},
            {
              title : 'The Polaroid Book--the story about Polaroid',
              url: require('../assets/images/homepages/add2.jpg'),
               content: '新书发售，白金收藏',
               aim:''},
            { 
              title:'买书送女朋友' ,
              url:require('../assets/images/homepages/add3.jpg'),
               content: '快过来抱走我',
               aim:''},
            { title:'公益藏书活动',
             url: require('../assets/images/homepages/add4.jpg'),
              content: '响应世界沙雕日，你敢买我敢送',
              aim:''}
            ],
        activeIndex: '1',
        activeIndex2: '1',
        currentDate:new Date(),
         input3: '',
      select: '',
        outerVisible: false,
        innerVisible: false,
        activeName: 'second',
      };
    },
     mounted() {
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
      }
    }
    
  }
</script>
<style>
.logo-image{
  
  position: absolute;
  top:50%;
  left: 50%;
  display: inline-block;
}
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
</style>