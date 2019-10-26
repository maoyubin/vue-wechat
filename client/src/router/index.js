import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue';
//import index from '../views/login.vue';
//import index from '../views/register.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/Login.vue") //layze load
  },{
    path: '/register',
    name: 'register',
    component: () => import("../views/Register.vue") //layze load
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

  console.log('localStorage.getItem("mao") = >'+ localStorage.getItem("mao"));
  const isLogin = localStorage.getItem("mao") ? true:false;
  console.log('isLogin = >'+isLogin);
  if(to.path == "/login" || to.path == '/register'){
    next();
  }else{
    isLogin ? next() : next("/login");
  }
});

export default router
