import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createMemoryHistory, createRouter } from 'vue-router'
// import VueCarousel from 'vue-carousel';

import homeView from './components/homeView.vue'
import searchResults from './components/searchResults.vue'

const routes = [
  { path: '/', component: homeView },
  { path: '/results', component: searchResults },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


createApp(App)
  .use(router)
  // .use(VueCarousel)
  .mount('#app');