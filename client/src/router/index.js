import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue';
//import index from '../views/login.vue';
//import index from '../views/register.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children:[
      {
        path: '',
        redirect: '/chats'
      },
      {
        path: '/chats',
        name: 'chats',
        component:  () => import('../views/Chats.vue'),
      },
      {
        path: '/contact',
        name: 'contacts',
        component:  () => import('../views/Contacts.vue'),
      },
      {
        path: '/discover',
        name: 'discover',
        component:  () => import('../views/Discover.vue'),
      },
      {
        path: '/me',
        name: 'me',
        component:  () => import('../views/Me.vue'),
      }
    ]
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
