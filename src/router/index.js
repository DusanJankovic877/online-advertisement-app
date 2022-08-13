import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginSignUp from '../views/LoginSignUp.vue'
import CreateAdd from '../views/LoginSignUp.vue'
import NotFound from '../views/NotFound.vue'
import Advertisement from '../views/Advertisement.vue'
import CreateEditAdvertisement from '../views/CreateEditAdvertisement.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/advertisement/:id',
    name: 'advertisement',
    component: Advertisement
  },
  {
    path: '/advertisement/edit/:id',
    name: 'create-edit-advertisement',
    component: CreateEditAdvertisement
  },
  {
    path: '/login-signup',
    name: 'loginSignup',
    component: LoginSignUp
  },
  {
    path: '/add-ad',
    name: 'addAd',
    component: CreateAdd
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
