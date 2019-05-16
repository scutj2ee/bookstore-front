import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home' //新添加，之后在下方的component: NewContact才会生效
import bookShelf from '../pages/admin/book/bookShelf.vue'
import { resolve } from 'url';
Vue.use(Router)

const router= new Router({
  mode:'history',
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
      , {

        path: '/home/homepage',
        component: resolve => require(['../pages/home/homepage.vue'], resolve),
        name: 'homepage',
        meta: {
          title: '书城主页'
        }

      }

    ]
    }, {

       path: '/home/index',
       component: resolve => require(['../pages/home/index.vue'], resolve),
       name: 'index',
       meta: {
         title: '书城主页'
       }

     },{
      path: '/home/cart',
      component: resolve => require(['../pages/home/cart.vue'], resolve),
      name: 'cart',
    }
    , {
      path: '/home/bookcart',
      component: resolve => require(['../pages/home/bookCart.vue'], resolve),
      name: 'bookcart',
    },
       {
        path: '/test',
        component: resolve => require(['../pages/test/test.vue'], resolve),
        name: 'test',
      }, {
        path: '/admin/home',
        component: resolve => require(['../pages/admin/home.vue'], resolve),
        name: 'admin',

        children:[
          {
        path: '/admin/bookshelf',
        component: resolve => require(['../pages/admin/book/bookShelf.vue'], resolve),
        name: 'bookShelf',
        meta: {
          title: '新书上架'
        }
          }
        ]
      }, 
      
      {
        path: '/bookshelf',
         component:bookShelf,
      }
    
  ]
})
export default router
