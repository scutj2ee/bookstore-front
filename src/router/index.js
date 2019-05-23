import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home' //新添加，之后在下方的component: NewContact才会生效
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
        //TODO:子页面定义
        path: '/home/detail',
      component: resolve => require(['../pages/home/detail.vue'], resolve),
      name: 'detail',
      }
      ,{
          path: '/home/checkpsw',
          component: resolve => require(['../pages/home/checkpsw.vue'], resolve),
          name: 'checkpsw',
        meta: { title: '更改用户密码' }
      }, {
        path: '/home/order',
        component: resolve => require(['../pages/home/order.vue'], resolve),
        name: 'order',
        meta: {
          title: '订单中心'
        },
        children:[
          {
            path: '/home/order/all',
              component: resolve => require(['../pages/home/order/all.vue'], resolve),
              name: 'allorder',
              meta: {
                title: '所有订单'
              }
          }, {
            path: '/home/order/unpaid',
            component: resolve => require(['../pages/home/order/unpaid.vue'], resolve),
            name: 'unpaidorder',
            meta: {
              title: '未付款'
            }, 
          },{
              path: '/home/order/completed',
              component: resolve => require(['../pages/home/order/completed.vue'], resolve),
              name: 'completedorder',
              meta: {
                title: '已完成'
              }
            }, {
              path: '/home/order/unevaluated',
              component: resolve => require(['../pages/home/order/unevaluated.vue'], resolve),
              name: 'unevaluatedorder',
              meta: {
                title: '未评价'
              }
            }
        ]
      }
      , {
        path: '/home/homepage',
        component: resolve => require(['../pages/home/homepage.vue'], resolve),
        name: 'homepage',
        meta: {
          title: '书城主页'
        }
      }, {
        path: '/home/user/usercenter',
        component: resolve => require(['../pages/home/user/userCenter.vue'], resolve),
        name: 'usercenter',
        meta: {
          title: '用户中心'
        }
      }
      , {

        path: '/home/bookcart',
        component: resolve => require(['../pages/home/bookCart.vue'], resolve),
        name: 'bookcart',
        meta: {
          title: '购物车'
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

     }
    // , {
    //   path: '/home/bookcart',
    //   component: resolve => require(['../pages/home/bookCart.vue'], resolve),
    //   name: 'bookcart',
    // }
       ,{
        path: '/test',
        component: resolve => require(['../pages/test/test.vue'], resolve),
        name: 'test',
      }, {
        path: '/admin',
        component: resolve => require(['../pages/admin/home.vue'], resolve),
        name: 'admin',

        children:[
            {
              path: '/admin/index',
              component: resolve => require(['../pages/admin/index.vue'], resolve),
              name: 'adminIndex',
              meta: {
                title:"后台主页"
              }
            },{
        path: '/admin/bookshelf',
        component: resolve => require(['../pages/admin/book/bookShelf.vue'], resolve),
        name: 'bookShelf',
        meta: {
          title: '书架管理'
          }
        }, {
          path: '/admin/bookshelf/add',
          component: resolve => require(['../pages/admin/book/addBook.vue'], resolve),
          name: 'add',
          meta: {
            title: '新书上架'
          },
        }, {

          path: '/admin/user',
          component: resolve => require(['../pages/admin/user/user.vue'], resolve),
          name: 'user',
          meta: {
            title: '用户管理'
          }

        }

        ]
      }
    
  ]
})

// router.beforEach((to,from,next) => {
//   //登陆界面登陆成功后，会把信息保存在会话里面
//   let user=sessionStorage.getItem('state');
// });
export default router
