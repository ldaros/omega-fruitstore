<template>
  <div class="container">
    <div class="row">
      <a id="icon1" class="col">
        <i class="bi bi-list fs-1 icon"></i>
      </a>

      <a id="icon2" class="col text-end icon" @click="openCart()">
        <i class="bi bi-cart fs-1"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",

  methods: {
    openCart() {
      this.$emit("openCart");
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
  color: #4fc6a6;
}

.icon:hover {
  color: #2c5858;
}
</style>
