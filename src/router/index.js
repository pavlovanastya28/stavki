import Vue from 'vue'
import VueRouter from 'vue-router'
import StaticFlat from '../views/StaticFlat.vue'
import DynamicFlat from '../views/DynamicFlat.vue'
import Kelly from '../views/Kelly.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/static-flat/',
  },
  {
    path: '/static-flat/',
    name: 'Static Flat',
    component: StaticFlat,
    meta: {title: 'Статичный Флэт'}
  },
  {
    path: '/dynamic-flat/',
    name: 'Dynamic Flat',
    component: DynamicFlat,
    meta: {title: 'Динамический Флэт'}
  },
  {
    path: '/kelly/',
    name: 'Kelly',
    component: Kelly,
    meta: {title: 'Критерий Келли'}
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
