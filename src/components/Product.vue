<template>
  <div class="product-container">
    <a class="add-to-cart" @click="sendItem(product)">
      <Icon icon="carbon:add-alt" />
    </a>

    <img :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p class="product-price">{{ product.price }}</p>
    <p class="product-weight">{{ product.weight }}</p>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "Product",
  components: { Icon },
  props: { product: Object },
  methods: {
    sendItem(product) {
      this.$emit("onAdd", product);
      console.log("Adding " + product.name + " to cart");
    },
  },
};
</script>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  border: 1px solid #4fc6a6;
  border-radius: 18px;

  padding: 0.8rem;
}

.add-to-cart {
  grid-column: span 2;
  justify-self: end;
  align-self: center;
  color: #303030;
}

.add-to-cart svg {
  width: 2rem;
  height: 2rem;
}

.product-container img {
  grid-column: span 2;

  align-self: center;
  justify-self: center;

  height: 100%;
  width: auto;
}
.product-container h3 {
  grid-column: span 2;
  margin: 0;
  padding: 0;
}

.product-price::before {
  content: "$";
}
.product-price {
  font-weight: bold;
  font-size: 1.1rem;
  align-self: end;
  padding: 0;
}

.product-weight {
  font-size: 0.9rem;
  color: #363636;
  align-self: end;
  justify-self: end;
  padding: 0;
}
.product-weight::after {
  content: "kg";
}
</style>
