import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters' //导入相应的模块，*相当于引入了这个组件下所有导出的事例
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
const state = {

  userList: []

}