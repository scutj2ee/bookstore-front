<template>
<div id="comment">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home/homepage' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/home/user/index' }">我的个人中心</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/home/user/comment' }">评论管理</el-breadcrumb-item>
</el-breadcrumb>
</div>
</template>