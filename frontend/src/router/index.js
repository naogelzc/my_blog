import Vue from 'vue'
import Router from 'vue-router'

const originPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err)
}

Vue.use(Router)

/**
 * 默认路由
 * 不需要权限的页面，所有角色都可以访问，不需要动态加载
 */
export const defaultRoutes = [
  {
    path: '/',
    component: () => import('@/layout/blog/index.vue'),
    name: 'Blog',
    redirect: 'home',
    children: [
      { path: '/home', component: () => import('@/views/home/index.vue'), name: 'Home', meta: { title: '首页', keepAlive: false }},
      { path: '/categories', component: () => import('@/views/categories/index.vue'), name: 'Categories', meta: { title: '文章', keepAlive: true }},
      { path: '/about', component: () => import('@/views/about/index.vue'), name: 'About', meta: { title: '关于', keepAlive: true }},
      { path: '/page', component: () => import('@/views/page/index.vue'), name: 'Page', meta: { title: '关于', keepAlive: false }},
    ],
  },
  // {
  //   path: '/',
  //   component: () => import('@/components/HelloWorld.vue'),
  //   name: 'HelloWorld',
  // },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    mode: 'hash',
    routes: defaultRoutes,
  })

// 创建路由，测试环境路由为本地testRouterMap, 生产环境动态获取
const router = createRouter()

// 重置路由,如切换用户时
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
