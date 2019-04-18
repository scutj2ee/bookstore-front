import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home' //新添加，之后在下方的component: NewContact才会生效

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/home', //和router-link to相呼应，导航到/newcontact
      name: 'home',
      component: home
    }
  ]
})
