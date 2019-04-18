<template>
  <router-link to="home"><h1>{{ msg }}</h1></router-link>
</template>
<script>
export default { //ES6语法，用于输出到外部，这样就可以在其他文件内用import输入
  name: 'HelloWorld',
  data () {    //由于是组件，data必须是个函数，这是ES6写法，data后面加括号相当于data: function () {}
    return {   //记得return不然接收不到数据
      msg: 'Welcome' //上面的 msg 就是这里输出的
    }
  }
}
</script>
<style>
h1 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>

