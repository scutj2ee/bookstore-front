<template>
  <div id="admin">
  <el-container>
  <el-header>
  <el-row>
  <el-col :span="6"></el-col>
   <el-col :span="12">
    <el-menu 
    default-active="/admin/index"
    class="el-menu-demo" 
    background-color="#545c64"
    text-color="#fff"
    mode="horizontal"
    :router="true">
    <el-menu-item index="/admin/index">首页</el-menu-item>
    <el-menu-item index="/home/homepage">在线商城</el-menu-item>
    <el-menu-item index="3">客户管理</el-menu-item>
    <el-menu-item index="4">系统设置</el-menu-item>
    <el-menu-item index="5">活动发布</el-menu-item>
    </el-menu>
   </el-col>
   <el-col :span="6"></el-col>
  </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">
    <el-col >
   
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>书架管理</span>
        </template>
          <el-menu-item index="/admin/bookshelf">查看</el-menu-item>
          <el-menu-item index="/admin/bookshelf/add">添加</el-menu-item>
          <!-- <el-menu-item index="/admin/bookshelf/add">修改</el-menu-item>
          <el-menu-item index="/admin/bookshelf/add">删除</el-menu-item> -->
      </el-submenu>
      <el-menu-item index="/admin/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="3" >
       <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">分类管理</span>
        </template>
          <el-menu-item index="/admin/bookshelf">查看</el-menu-item>
          <el-menu-item index="/admin/bookshelf/add">添加</el-menu-item>
          <!-- <el-menu-item index="/admin/bookshelf/add">修改</el-menu-item>
          <el-menu-item index="/admin/bookshelf/add">删除</el-menu-item> -->
      </el-submenu>
      <el-submenu index="3" >
       <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">订单管理</span>
        </template>
          <el-menu-item index="/admin/bookshelf">查看</el-menu-item>
          <el-menu-item index="/admin/bookshelf/add">添加</el-menu-item>
          <!-- <el-menu-item index="/admin/bookshelf/add">修改</el-menu-item>
          <el-menu-item index="/admin/bookshelf/add">删除</el-menu-item> -->
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
    </el-aside>
    <el-main height="100%">
    <router-view class="view"></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
 </template>
 <script>
 
 export default{
  name: 'admin',
  data(){
  return{
   active:true
  }
  },
  methods:{
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }

 }
 </script>
 <style>
 .el-header, .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
 </style>