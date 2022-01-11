<template>
  <Nav @openCart="captureCart" />
  <Header />

  <!-- Product List -->
  <div class="container">
    <div class="row">
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
        @onAdd="addItem"
      />
    </div>
  </div>

  <!-- Sidenav -->
  <Cart
    :open="cart.open"
    :items="cart.items"
    :total="calcTotal()"
    @closeCart="captureCart"
    @onRemove="removeItem"
  />
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
          price: 3.74,
          weight: "1",
          image: banana_img,
          id: 101,
        },
        {
          name: "Strawberry",
          price: 5.99,
          weight: "1",
          image: strawberry_img,
          id: 102,
        },
        {
          name: "Orange",
          price: 2.99,
          weight: "1",
          image: orange_img,
          id: 103,
        },
        {
          name: "Apple",
          price: 4.25,
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
    },
    addItem(item) {
      this.cart.items.push(item);
    },
    removeItem(item) {
      this.cart.items.splice(this.cart.items.indexOf(item), 1);
    },
    calcTotal() {
      let total = 0;
      this.cart.items.forEach((item) => {
        total += item.price;
      });
      return total;
    },
  },
};
</script>

<style>
body {
  padding: 1em;
}

@media screen and (max-width: 500px) {
  body {
    padding: 1em 0.5em;
  }
}
</style>
