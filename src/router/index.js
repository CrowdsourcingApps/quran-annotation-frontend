// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    // component: () => import('@/layouts/default/Default.vue'),
    component: () => import('@/layouts/training/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      },
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/train',
    component: () => import('@/layouts/training/Default.vue'),
    children: [
      {
        path: 'vc',
        name: 'vctrain',
        component: () => import(/* webpackChunkName: "vctrain" */ '@/views/VCTrain.vue')
      }
    ]
  },
  {
    path: '/task',
    component: () => import('@/layouts/training/Default.vue'),
    children: [
      {
        path: 'vc',
        name: 'vctask',
        component: () => import(/* webpackChunkName: "vctask" */'@/views/VCTask.vue')
      }
    ]
  },
  {
    path: '/instructions',
    component: () => import('@/layouts/training/Default.vue'),
    children: [
      {
        path: 'vc',
        name: 'vcInstructions',
        component: () => import(/* webpackChunkName: "vcinstruction" */ '@/views/VCInstruction.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', , '/', '/instructions/vc', '/about'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }, // save the original route as a query parameter
    });
  } else {
    next();
  }
});

export default router