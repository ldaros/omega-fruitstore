<template>
  <Nav @openCart="captureCart" />
  <Header />
  <Cart :open="cart.open" @closeCart="captureCart" :items="cart.items" />

  <div class="list-container">
    <Product
      v-for="product in products"
      :key="product.id"
      :product="product"
      @onAdd="addItem"
    />
  </div>
</template>

<script>
import Nav from "./components/Navbar.vue";
import Header from "./components/Header.vue";
import Product from "./components/Product.vue";
import Cart from "./components/Cart.vue";

import banana_img from "./assets/banana.png";
import apple_img from "./assets/apple.png";
import orange_img from "./assets/orange.png";
import strawberry_img from "./assets/strawberry.png";

export default {
  name: "App",
  components: { Nav, Header, Product, Cart },
  data() {
    return {
      cart: {
        open: false,
        items: [],
      },
      products: [
        {
          name: "Banana",
          price: "3.74",
          weight: "1",
          image: banana_img,
          id: 101,
        },
        {
          name: "Strawberry",
          price: "5.99",
          weight: "1",
          image: strawberry_img,
          id: 102,
        },
        {
          name: "Orange",
          price: "2.99",
          weight: "1",
          image: orange_img,
          id: 103,
        },
        {
          name: "Apple",
          price: "4.25",
          weight: "1",
          image: apple_img,
          id: 104,
        },
      ],
    };
  },

  methods: {
    captureCart() {
      this.cart.open = !this.cart.open;
      console.log("cartOpen: " + this.cart.open);
    },
    addItem(item) {
      this.cart.items.push(item);
      console.log(this.cart.items);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

body {
  margin: 0;
  padding: 1em;
  font-family: "Inter", sans-serif;
}

.list-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 46% 46%;
  grid-gap: 10px;
  height: 70vh;
  overflow-y: scroll;
}
</style>
