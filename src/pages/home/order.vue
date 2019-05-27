<template>
<div id="order">
 <el-menu 
 default-active="/home/order/all"
 class="el-menu-demo" 
 mode="horizontal" 
 @select="handleSelect"
 :router="true">
  <el-menu-item index="/home/order/all">全部订单</el-menu-item>
  <el-menu-item index="/home/order/unpaid">未付款</el-menu-item>
  <el-menu-item index="/home/order/completed" >已完成</el-menu-item>
  <el-menu-item index="/home/order/unevaluated">待评价</el-menu-item>
</el-menu>
<div class="line"></div>
 <router-view class="view"></router-view>
</div>
</template>
<script>
export default {
    data() {
      return {
        
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>

</style>