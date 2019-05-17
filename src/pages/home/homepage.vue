<template>
 <div id="homepage">
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

  
</div>
</template>
<script>
import books from "../../assets/js/book.js";
import adLists from "../../assets/js/adList.js"
 export default {
   name: 'index',
    data() {
      
      return {
        
       
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