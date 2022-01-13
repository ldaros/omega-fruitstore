<template>
  <!-- Navigation -->
  <nav class="container navbar navbar-light">
    <button
      type="button"
      class="btn btn-outline-success fs-3"
      @click="toggleLeftNav"
      id="nav-left-open"
    >
      📖
    </button>

    <h1 class="navbar-brand fs-3">🍆 Fruit 🍆</h1>

    <button
      type="button"
      class="btn btn-outline-success fs-3"
      @click="toggleRightNav"
      id="nav-right-open"
    >
      🛒
    </button>
  </nav>

  <!-- Product List -->
  <div class="container">
    <h1 class="fs-1 my-3 mb-4">Buy fresh fruits and vegetables</h1>
    <hr data-v-0f355728="" />

    <div class="row">
      <product
        v-for="product in products"
        :key="product.id"
        :product="product"
        @onAdd="cartAddItem"
      />
    </div>
  </div>

  <!-- Left side nav -->
  <sideNav title="Info 📖" :open="leftNav" @closeSelf="toggleLeftNav">
    <h4 class="fs-3 text-center">🍆 Fruit 🍆</h4>

    <p class="fs-5 text-center">
      omega-3-rich, high-quality fruits, fresh from the farm, with a delicious
      taste.
    </p>

    <p class="fs-light text-center">
      <strong>Fruit</strong> is a project by
      <a href="https://github.com/ldaros" target="_blank"> @ldaros </a>
    </p>
  </sideNav>

  <!-- Right side nav -->
  <sideNav
    title="🛒 Shopping Cart"
    :flip="true"
    :open="rightNav"
    @closeSelf="toggleRightNav"
  >
    <cartItem
      v-for="item in cartItems"
      :key="item.id + 100"
      :displayItem="item"
      @onRemove="cartRemItem(item)"
    />

    <p class="fs-3 mt-3">💵 Total: ${{ cartCalcTotal() }}</p>
  </sideNav>
</template>

<script>
import product from "./components/Product.vue";
import sideNav from "./components/sideNav.vue";
import cartItem from "./components/cartItem.vue";

import catalog from "./assets/catalog.json";

export default {
  name: "App",
  components: { product, sideNav, cartItem },
  data() {
    return {
      // products are loaded from a json file
      products: catalog,

      // Shopping Cart
      cartItems: [],

      // Controls opening and closing of side navs
      leftNav: false,
      rightNav: false,
    };
  },

  methods: {
    toggleRightNav() {
      this.rightNav = !this.rightNav;
    },
    toggleLeftNav() {
      this.leftNav = !this.leftNav;
    },
    cartAddItem(item) {
      this.cartItems.push(item);
    },
    cartRemItem(item) {
      this.cartItems.splice(this.cartItems.indexOf(item), 1);
    },
    cartCalcTotal() {
      let total = 0;
      this.cartItems.forEach((item) => {
        total += item.price;
      });
      return total.toFixed(2);
    },
  },
};
</script>

<style></style>
