import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginSignUp from '../views/LoginSignUp.vue'
import CreateAdd from '../views/LoginSignUp.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login-signup',
    name: 'login-signup',
    component: LoginSignUp

  },
  {
    path: '/add-ad',
    name: 'add-ad',
    component: CreateAdd

  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
