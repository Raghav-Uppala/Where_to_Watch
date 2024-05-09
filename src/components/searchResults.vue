<template>
  <div>
    <div v-if="this.windowWidth > 1000">
      <div v-if="this.data.result != false" id="grid">
        <div v-for="(item, index) in this.data.results" :key="index">  
          <displayContainer :data=item :countryCode=countryCode>/</displayContainer>
        </div>
      </div>
    </div>
    <div v-else>
      <swiper
        class="swiper"
        style="align-items:center;"
        :modules="modules"
        :width="400"
        :slides-per-view="auto"
        navigation
      >
      <swiper-slide class="swiper_slide" v-for="(item, index) in this.data.results" :key="index">
        <displayContainer :data=item :countryCode=countryCode>/</displayContainer>
      </swiper-slide>
    </swiper>
    </div>
  </div>
</template>

<script>
import displayContainer from './displayContainer.vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default {
  name: 'searchResults',
  components: {
    displayContainer,
    Swiper,
    SwiperSlide,
  },
  props: {
    countryCode: Object,
    data: Object
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  data: () => ({
    windowWidth: window.innerWidth
  }),
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeUnmount() { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {  
    onResize() {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style>
#grid {
  display: grid;
  grid-gap: 5px;
  row-gap: 1em;
  justify-items:center;
}
@media only screen and (max-width: 1000px) {
  #grid {
    grid-template-columns: 1fr;
  }
}
@media only screen and (min-width: 1000px) {
  #grid {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  }
}
</style>