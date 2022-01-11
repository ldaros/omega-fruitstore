<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-outline-success fs-3">📖</button>
      </div>

      <div class="col d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-outline-success fs-3"
          @click="openCart()"
        >
          🛒
        </button>
      </div>
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

<style scoped></style>
