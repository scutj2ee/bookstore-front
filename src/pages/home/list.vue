<template>

<el-container>
<el-header>Header</el-header>
<el-main v-loading="loading">
    <!-- 畅销榜 -->
    <div class="hot-card">
   <el-row :gutter="20">
  <el-col :span="6" v-for="(item, index) in bookList" :key="index" >
    <el-card shadow="hover" :body-style="{ padding: '5px' }">
      <img  v-bind:src="item.image_url" class="book_image">

        <!-- <p v-html="item.outline"></p>
          <p v-html="item.author"></p>
          <p class="price"  v-html="item.price">活动价：￥</p> -->
        <div class="bottom clearfix">
                <span>{{item.name}}</span>
           <div class="card-show">{{item.author }}</div><br>
           <div class="price">活动价：￥ {{item.price}}</div>
           <div class="card-show">市场价：￥<del>
           {{item.marketPrice }}</del></div>    
          <el-button type="info" class="button" @click="handleDetail(item.bookId);" icon="el-icon-caret-right" >查看详情</el-button>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
<el-pagination
  background
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :currentPage="currentPage"
  :page-sizes="[10, 20,30,40]"
  :page-size="pageSize"
  layout="prev, pager, next,jumper, total, sizes"
  :total="total">
</el-pagination>   
</el-main>
</el-container>

  
</template>
<script>
// import books from "../../assets/js/book.js";

export default {
     name: 'index',
    data(){
      return {
        pageSize:10,//页面大小
        total:0,//总数
        currentPage:1,//当前页面
        bookList:[],
        cate_id:0,
        loading:true,
      }
    },
    mounted(){
      this.cate_id=this.$store.state.cate_id;
      console.log("cate+++"+ this.cate_id);
      this.getList();
    },
    watch:{
   
    },
    methods:{
      //更改页码
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
       this.getList();
      },
      //更改每一页大小
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
       this.getList();
      },
      getList(){
        var that=this;
        var BookCategoryId=that.cate_id;
        this.$ajax({
          url:'/book/bookCategorySecond.do',
          method:'post',
          params:{
            BookCategoryId:BookCategoryId,
            pageNo: that.currentPage,
            pageSize:that.pageSize,
          }
        }).then(function(response){
          if(response.data.success){
            that.bookList=response.data.totalData;
            that.loading=false;
            console.log("bookList"+that.bookList);
          }
        }).catch(function(response){
          that.loading=false;
          that.$msgbox({
            type:'error',
            message:'服务器异常'
          });
        })
      },
      handleDetail(bookId){
        console.log(bookId);
        this.$router.push({ path: '/home/detail',query:{bookId:bookId} });
      }
    }

    
  }
</script>
<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 30px;
    font-size:22px;
    min-height:100vh;
    padding-left:15px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 70px;
    min-height:0px;
  }
  
  body > .el-container {
    margin-bottom: 600px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

.title{
 
  font-family:"微软雅黑";
  color:#feb9c8;
}

.text {
   position:relative;
    left:0;
    top:50%;
  float:center;
  transform:translate(0,-50%);
    font-size: 18px;
  }

  .item {
    
  }

  .box-card {
   
    float:center;
    height:100px;
    
  }
   .container{
    height:60%;
    width:100%;
    /* background-color:red; */
  }
  .sub-container{
    height:400px;
    width:400px;
    position:relative;
    top:50%;
    left:50%;
    margin: -200px 0px 0px -200px;
    
  }
  .head-pic{
    max-width:400px;
    overflow:hidden;
  }

  div.hot-card span{
    font-weight:bold;
    font-size:x-large;
  }

  .el-row {
    margin-bottom: 30px;

  }
</style>