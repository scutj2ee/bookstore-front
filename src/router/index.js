import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { resolve } from 'url';
import {mapActions,mapGetters} from 'vuex';
import store from '../store/index'
Vue.use(Router)
const router= new Router({
  mode:'history',
  routes: [
    {
      path: '/',
       name: 'home',
      component: resolve => require(['../components/home.vue'], resolve),
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
    , {
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
        },
        children:[
           {
             path: '/home/user/index',
             component: resolve => require(['../pages/home/user/index.vue'], resolve),
             name: 'index',
             meta: {
               title: '用户中心'
             }
           },
             {
              path: '/home/user/checkpsw',
              component: resolve => require(['../pages/home/user/checkpsw.vue'], resolve),
              name: 'checkpsw',
              meta: {
                title: '更改用户密码'
              }
            },
              {
                path: '/home/user/address',
                component: resolve => require(['../pages/home/user/address.vue'], resolve),
                name: 'address',
                meta: {
                  title: '地址管理'
                }
              }, {
                path: '/home/user/comment',
                component: resolve => require(['../pages/home/user/comment.vue'], resolve),
                name: 'comment',
                meta: {
                  title: '评论管理'
                }
              }
        ]
      }
      , {

        path: '/home/bookcart',
        component: resolve => require(['../pages/home/bookCart.vue'], resolve),
        name: 'bookcart',
        meta: {
          title: '购物车'
        }
      }, {

        path: '/home/list',
        component: resolve => require(['../pages/home/list.vue'], resolve),
        name: 'list',
        meta: {
          title: '分类选择'
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

    }, 
    {
      path: '/admin/login',
      component: resolve => require(['../pages/admin/login.vue'], resolve),
      name: 'adminLogin',
      meta: {
        title: '后台登录页面'
      }
    },
    {
      path: '/admin',
      component: resolve => require(['../pages/admin/home.vue'], resolve),
      name: 'admin',
      meta:{
         title:"后台管理"
      },
      beforeEnter: (to,from,next)=> {   //导航守卫
            console.log(to)
            console.log(from)
            console.log(store.state.adminUser);
            if(store.state.adminUser.username==""||store.state.adminUser.username==null||store.state.adminUser.username==undefined){
              console.log('用户未登录');
              next({path: '/admin/login',query:{ Rurl: to.fullPath}});  //未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来
              
            }else{
              console.log('用户已经登录');
              next();
          }},
      children:[
      {
        path: '/admin/index',
        component: resolve => require(['../pages/admin/index.vue'], resolve),
        name: 'adminIndex',
        meta: {
          title:"后台主页" 
        }
      }, {
        path: '/admin/bookshelf',
        component: resolve => require(['../pages/admin/book/bookShelf.vue'], resolve),
        name: 'bookShelf',
        meta: {
          title: '书架管理'
        }
      }, {
        path: '/admin/classification',
        component: resolve => require(['../pages/admin/classification/classification.vue'], resolve),
        name: 'classification',
        meta: {
          title: '分类管理'
        }
      }, {
        path: '/admin/classification/add',
        component: resolve => require(['../pages/admin/classification/addClass.vue'], resolve),
        name: 'addClass',
        meta: {
          title: '新增分类'
        }
      }, {
        path: '/admin/order',
        component: resolve => require(['../pages/admin/order/bookOrder.vue'], resolve),
        name: 'bookOrder',
        meta: {
          title: '订单管理'
        }
      }, {
        path: '/admin/bookshelf/add',
        component: resolve => require(['../pages/admin/book/addBook.vue'], resolve),
        name: 'add',
        meta: {
          title: '新书上架'
        }
      }, {
        path: '/admin/user',
        component: resolve => require(['../pages/admin/user/user.vue'], resolve),
        name: 'user',
        meta: {
          title: '用户管理'
        }
      }]
    },  {
      path: '/test',
      component: resolve => require(['../pages/test/test.vue'], resolve),
      name: 'test',
    }, {
      path: '/403',
      component: resolve => require(['../pages/403.vue'], resolve),
      name: '403',
      meta: {
        title: '错误页面'
      }
    }

  ]
})
 

export default router
