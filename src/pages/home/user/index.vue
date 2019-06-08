<template>
<div id="index">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home/homepage' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/home/user/index' }">我的个人中心</el-breadcrumb-item>
</el-breadcrumb>
<div class="main-container">
    <div class="head-main-container">
    <!-- 标题 -->
     <h2 style="margin-left:10px;"><i class="el-icon-s-order"></i>我的订单</h2>
    </div>
    <div class="body-main-container">
    <router-link :to="{path:'/home/order/unpaid'}">
     <el-card shadow="hover" class="sub-main-container" >
     <i class="main-i el-icon-goods"></i><p>待付款</p>
    </el-card>
    </router-link>
    <router-link :to="{path:'/home/order/unevaluated'}">
    <el-card shadow="hover" class="sub-main-container">
    <i class="main-i el-icon-s-comment"></i><p>未评价</p>
    </el-card>
    </router-link>
    <router-link :to="{path:'/home/order/completed'}">
    <el-card shadow="hover" class="sub-main-container">
    <i class="main-i el-icon-shopping-bag-2"></i><p>已完成</p>
    </el-card>
    </router-link>
    <router-link :to="{path:'/home/order/all'}">
    <el-card shadow="hover" class="sub-main-container">
   <i class="main-i el-icon-more-outline"></i> <p>所有订单</p>
    </el-card>
    </router-link>
    </div>
    </div>
    </div>
    </template>
<script>

</script>

    <style>
    .main-container{
    height:440px;
    width:1200px;
    background-color:#ff9900;
  }
  .head-main-container{
    height:80px;
    width:100%;
    margin:0 auto;
    position:relative;
    background-color:#ff9900;
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
    background-color:#ff9900;
  }
  .sub-main-container{
    margin:10px 8px 10px 8px;
    position:relative;
    width:280px;
    height:280px;
    float:left;
    background-color:#fff;
    border-radius:5px;
    border: 2px #000000 dashed ;
    line-height: 10px;
    font-size:30px;
  }
  .main-i{
font-size:160px;
  }
    </style>