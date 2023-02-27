// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
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
        path: 'instructions/vc',
        name: 'vcInstructions',
        component: () => import(/* webpackChunkName: "vcinstruction" */ '@/views/VCInstruction.vue'),
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/train/vc',
    component: () => import(/* webpackChunkName: "vctrain" */ '@/views/VCTrain.vue'),
  }
  // {
  //   path: '/train',
  //   children: [
  //     {
  //       path: '/vc',
  //       name: 'vctrain',
  //       component: () => import(/* webpackChunkName: "vctrain" */ '@/views/VCTrain.vue')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', , '/', '/instructions/vc'];
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