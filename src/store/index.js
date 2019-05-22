import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters' //导入相应的模块，*相当于引入了这个组件下所有导出的事例
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {

  loginForm: {
    userName: "abc",
    password: 123456
  },
  //注册表单
  ruleForm:{
  email: '',
  code: '',
  userName: '',
  pass: '',
  checkPass: '',
  phone: ''
  }

}
const store = new Vuex.Store({
  state, //共同维护的一个状态，state里面可以是很多个全局状态
  getters, //获取数据并渲染
  actions, //数据的异步操作
  mutations, //处理数据的唯一途径，state的改变或赋值只能在这里
})

export default store //导出store并在main.js中应用注册