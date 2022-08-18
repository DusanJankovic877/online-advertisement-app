import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginSignUp from '../views/LoginSignUp.vue'
import CreateAdd from '../views/LoginSignUp.vue'
import NotFound from '../views/NotFound.vue'
import Advertisement from '../views/Advertisement.vue'
import CreateAdvertisement from '../views/CreateAdvertisement.vue'
import EditAdvertisement from '../views/EditAdvertisement.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/advertisement/:id',
    name: 'advertisement',
    component: Advertisement
  },
  {
    path: '/advertisement/create',
    name: 'create-advertisement',
    component: CreateAdvertisement
  },
  {
    path: '/advertisement/edit/:id',
    name: 'edit-advertisement',
    component: EditAdvertisement
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
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({block: "start", behavior: 'smooth' });
}
})

export default router
