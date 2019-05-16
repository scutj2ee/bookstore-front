<template>
 <div id="bookshelf">
  <!-- 步骤组件 -->
  <el-steps :space="200" :active="step" class="step" align-center>
  <el-step title="活动信息" description=""></el-step>
  <el-step title="报名签到" description=""></el-step>
  <el-step title="分享设置" description=""></el-step>
  <el-step title="个性设置" description=""></el-step>
  </el-steps>
  <!-- 视图 -->
  <router-view class="view"></router-view>
  <div class="but-group">
  <el-button >预览</el-button>
  <el-button >上一步</el-button>
  <el-button type="primary">下一步</el-button>
  <el-button type="primary">发布活动</el-button>
  </div>
 </div>
</template>