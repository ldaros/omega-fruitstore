<template>
  <div class="card mb-2">
    <div class="row g-0">
      <div class="col-4">
        <img
          :src="displayItem.image"
          class="img-fluid rounded-start"
          alt="..."
        />
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title">{{ displayItem.name }}</h5>
          <p class="card-text text-end fs-5 fw-bold">
            ${{ displayItem.price }}
          </p>

          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm justify-end"
              @click="$emit('onRemove', displayItem)"
            >
              Remove
            </button>
          </div>
        </div>
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
img {
  width: 80%;
  height: auto;
}
</style>
