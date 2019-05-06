import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home' //新添加，之后在下方的component: NewContact才会生效
import { resolve } from 'url';
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/home', //和router-link to相呼应，导航到/
      name: 'home',
      component: resolve=>require(['../components/home.vue'],resolve), 
      children:[{
        path: '/home/detail',
      component: resolve => require(['../pages/home/detail.vue'], resolve),
      name: 'detail',

      }
      ,{
          path: '/home/checkpsw',
          component: resolve => require(['../pages/home/checkpsw.vue'], resolve),
          name: 'checkpsw',
        meta: { title: '更改用户密码' }
      }
    ]
    },{
    
        path: '/home/index',
        component: resolve => require(['../pages/home/index.vue'], resolve),
        name: 'index',
      meta: { title: '书城主页' }

    }
    ,{
      path: '/home/cart',
      component: resolve => require(['../pages/home/cart.vue'], resolve),
      name: 'cart',
    }
  ]
})
export default router