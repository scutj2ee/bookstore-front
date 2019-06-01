<template>
<div id="address">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home/homepage' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/home/user/index' }">我的个人中心</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/home/user/address' }">地址管理</el-breadcrumb-item>
</el-breadcrumb>
</div>
</template>