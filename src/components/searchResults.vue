<template>
  <div>
    <div v-if="this.data.result != false" id="grid" style="justify-items:center;">
      <div v-for="(item, index) in this.data.results" :key="index">  
        <displayContainer :data=item :countryCode=countryCode>/</displayContainer>
      </div>
    </div>
  </div>
</template>

<script>
import displayContainer from './displayContainer.vue'

export default {
  name: 'searchResults',
  components: {
    displayContainer
  },
  props: {
    countryCode: Object,
    data: Object
  }
}
</script>

<style>
#grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 5px;
  row-gap: 1em;
}
</style>