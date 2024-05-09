import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createWebHistory, createRouter } from 'vue-router'

import homeView from './components/homeView.vue'
import searchResults from './components/searchResults.vue'
import streamView from './components/streamView.vue'

const routes = [
  { path: '/', component: homeView, props: true},
  { path: '/results', component: searchResults, props: true},
  { path: '/stream', component: streamView, props: route => ({ id: route.query.id, imdb: route.query.imdb, type: route.query.type }) },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


createApp(App)
  .use(router)
  .mount('#app');