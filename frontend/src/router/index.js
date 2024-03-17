import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProductView from '@/views/CreateProductView.vue'
import EditProductView from '@/views/EditProductView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'CreateProduct',
    component: CreateProductView
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: EditProductView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
