<template>
  <div class="card mb-2">
    <div class="row g-0 align-items-center">
      <div class="col-4 big-text text-center">
        {{ displayItem.image }}
      </div>

      <div class="col-8 card-body">
        <h5 class="card-title">{{ displayItem.name }}</h5>
        <p class="card-text fs-5 fw-bold">${{ displayItem.price }}</p>

        <button
          class="btn btn-outline-danger btn-sm"
          @click="$emit('onRemove', displayItem)"
        >
          Remove
        </button>
      </div>
    </div>
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
.big-text {
  font-size: 5rem;
}
</style>
