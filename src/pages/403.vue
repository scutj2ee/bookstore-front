<template>
  <div class="error-page">
      <div class="error-code">4<span>0</span>3</div>
    <div class="error-desc">若未登录,请先登录</div>
      <div class="error-desc">非法操作,若是按步骤操作,请从第一步开始;</div>
      <div class="error-handle">
          <el-button type="primary" size="large" @click="backHome()">返回首页</el-button>
          <el-button class="error-btn" type="primary" size="large" @click="$router.go(-2)">返回上一页</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
      backHome() {
        //如果是登录状态则返回登录时的首页
        // if (sessionStorage.getItem('username') != null) {
        //   this.$router.push({path: '/user/index'});
        // } else {
        //   this.$router.push({path: '/home'});
        // }
        this.$router.push('/');
      }
  }
}
</script>


<style scoped>
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #f02d2d;
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 200px;
    }
    .error-btn{
        margin-left: 100px;
    }
</style>
