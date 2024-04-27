<!-- components/ItemsSlider.vue -->

<template>
  <div class="item-slider-container">
    <h4 class="px-3 mb-3 item-title">{{ title }}</h4>
    <div class="item-slider">
      <div @click="slide(-100)" :class="{ 'is-disabled-hide': scrollX < 1 }" class="left-arrow-left">
        <p>L</p>
      </div>
      <div ref="scrl" @scroll="scrollCheck" class="item-container">
        <slot></slot>
      </div>
      <div @click="slide(100)" :class="{ 'is-disabled-hide': scrollEnd }" class="right-arrow-right">
        <p>H</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { MdArrowForwardIos, MdArrowBackIos } from "vue-icons/md";

export default {
  name: 'ItemsSlider',
  data() {
    return {
      scrollX: 0,
      scrollEnd: false
    };
  },
  methods: {
    slide(shift) {
      this.$refs.scrl.scrollBy({
        left: shift,
        behavior: 'smooth'
      });

      this.$refs.scrl.scrollLeft += shift;
      this.scrollX += shift;

      if (Math.floor(this.$refs.scrl.scrollWidth - this.$refs.scrl.scrollLeft) <= this.$refs.scrl.offsetWidth) {
        this.scrollEnd = true;
      } else {
        this.scrollEnd = false;
      }
    },
    scrollCheck() {
      this.scrollX = this.$refs.scrl.scrollLeft;

      if (Math.floor(this.$refs.scrl.scrollWidth - this.$refs.scrl.scrollLeft) <= this.$refs.scrl.offsetWidth) {
        this.scrollEnd = true;
      } else {
        this.scrollEnd = false;
      }
    }
  },
  props: {
    title: String
  }
};
</script>