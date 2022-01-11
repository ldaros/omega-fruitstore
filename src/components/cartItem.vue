<template>
  <div class="cart-item">
    <img class="product-image" :src="displayItem.image" />
    <h3 class="product-name">{{ displayItem.name }}</h3>
    <p class="product-price">{{ displayItem.price }}</p>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    displayItem: Object,
  },
};
</script>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #4fc6a6;
  border-radius: 18px;

  height: 8rem;
}

img {
  align-self: center;
  justify-self: center;
  height: 50%;
  width: auto;

  grid-row: span 2;
}
</style>
