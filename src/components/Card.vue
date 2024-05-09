<template>
  <div class="card">
    <!-- Your card content -->
    <h5>{{ title }}</h5>
    <p>{{ price }}</p>
    <!-- Add more card details if required -->
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    price: Number
    // Add more props as required
  }
};
</script>