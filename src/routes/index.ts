import { createRouter, createWebHashHistory } from "vue-router";
let routes = [
    {
        path: '/',
        name: 'Global',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('../view/GlobalView.vue'),
        redirect: { path: '/ykJoke/joke' },
        children: [
            {
                path: '/Home/home',
                name: 'Home',
                component: () => import("@/view/HomeView.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/chuku/chuku',
                name: 'chuku',
                component: () => import("@/components/chuku/chuku.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/ruku/ruku',
                name: 'ruku',
                component: () => import("@/components/ruku/ruku.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/kehu/kehu',
                name: 'kehu',
                component: () => import("@/components/kehu.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/ruliao/ruliao',
                name: 'ruliao',
                component: () => import("@/components/liao/ruliao.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/huopin/huopin',
                name: 'huopin',
                component: () => import("@/components/detail/huopinDetail.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/liaoming/liaoming',
                name: 'liaoming',
                component: () => import("@/components/detail/liaoDetail.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/kucun/kucun',
                name: 'kucun',
                component: () => import("@/components/detail/kucun.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/shoufu/shoufu',
                name: 'shoufu',
                component: () => import("@/components/yinhang/shoufu.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/yinhan/yinhan',
                name: 'yinhan',
                component: () => import("@/components/yinhang/yinhan.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/faliao/faliao',
                name: 'faliao',
                component: () => import("@/components/liao/faliao.vue"),
                meta: {
                    needLogin: true,
                },

            },
            {
                path: '/purchase',
                name: 'purchase',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                // component: () => import('@/view/PurchaseView.vue'),
                children: [
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/purchase/puOrder',
                        component: () => import('@/view/purchase/PurchaseOrder.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/purchase/puStorage',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/purchase/puReturn',
                        component: () => import('../view/purchase/purchaseReturn.vue')
                    }
                ]
            },
            {
                path: '/retail',
                name: 'retail',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                // component: () => import('@/view/PurchaseView.vue'),
                children: [
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/retail/reRemoval',
                        component: () => import('@/view/purchase/PurchaseOrder.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/retail/reReturn',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },

                ]
            },
            {
                path: '/sell',
                name: 'sell',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                // component: () => import('@/view/PurchaseView.vue'),
                children: [
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/sell/sellOrder',
                        component: () => import('@/view/purchase/PurchaseOrder.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/sell/sellReturn',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/sell/sellRemoval',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },

                ]
            },
            {
                path: '/store',
                name: 'store',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                // component: () => import('@/view/PurchaseView.vue'),
                children: [
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/store/stStorage',
                        component: () => import('@/view/purchase/PurchaseOrder.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/store/stReturn',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/store/stRemoval',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },

                ]
            },
            {
                path: '/finance',
                name: 'finance',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                // component: () => import('@/view/PurchaseView.vue'),
                children: [
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/finance/fiStorage',
                        component: () => import('@/view/purchase/PurchaseOrder.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/finance/fiReturn',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/finance/fiRemoval',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },

                ]
            },
            {
                path: '/shopping',
                name: 'shopping',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                // component: () => import('@/view/PurchaseView.vue'),
                children: [
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/shopping/shopInfo',
                        component: () => import('@/view/purchase/PurchaseOrder.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/shopping/shopType',
                        component: () => import('../view/purchase/purchaseStorage.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/shopping/shopping',
                        component: () => import('../view/shopstore/shopstoreStorage.vue')
                    },

                ]
            },
            {
                path: '/userControl',
                name: 'userControl',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                // component: () => import('@/view/PurchaseView.vue'),
                children: [
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/userControl/userInfo',
                        component: () => import('@/view/userControl/userInfo.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/userControl/userControl',
                        component: () => import('@/view/userControl/userInfo.vue')
                    }


                ]
            },
            {
                path: '/ykJoke',
                name: 'ykJoke',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                // component: () => import('@/view/PurchaseView.vue'),
                children: [
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/ykJoke/joke',
                        component: () => import('@/view/ykJoke/JokeView.vue')
                    },
                    {
                        meta: {
                            needLogin: true,
                        },
                        path: '/ykJoke/riddle',
                        component: () => import('@/view/ykJoke/RiddleView.vue')
                    }


                ]
            },

        ]

    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/view/LoginView.vue"),


    },


];



// 路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        if (sessionStorage.getItem("loginPlag")) {
            next()
        }
        else {
            next({
                query: { redirect: to.fullPath }, // 记录当前路由，以便登录后自动跳转
                path: '/login'
            })
        }
    } else {
        next()
    }

    // console.log(to.meta.needLogin, sessionStorage.getItem("loginPlag"), "333333333", to.fullPath)
    /*   if (!to.meta.needLogin) {
          next();
      } else {
  
          if (sessionStorage.getItem("loginPlag") || false) {
              next()
          } else {
              next({
                  query: { redirect: to.fullPath }, // 记录当前路由，以便登录后自动跳转
                  path: '/login'
              })
          }
  
      } */
})



// 导出
export default router 