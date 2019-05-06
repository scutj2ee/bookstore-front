<template>
<el-container>
  <el-header>
  <el-row>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
</el-header>
  
    <el-aside width="400px">
  
      side
  </el-aside>
    <el-main>
    <!-- 主体 -->
<div class="demo-image__lazy">
  <el-image v-for="url in urls" :key="url" :src="url" lazy>
  </el-image>
    </div>

    </el-main>
  </el-container>

  
</template>
<script>
export default {
    data() {
      return {
        urls: [
          '../../assets/images/homepages/add1.jpg',
          '../../assets/images/homepages/add1.jpg',
          '../../assets/images/homepages/add1.jpg',
          '../../assets/images/homepages/add1.jpg',
          '../../assets/images/homepages/add1.jpg',
          '../../assets/images/homepages/add1.jpg',
    
        ]
      }
    }
  }
</script>
<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
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
</style>