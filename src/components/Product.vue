<template>
  <div class="col-6 col-lg-3 col-md-4">
    <div class="card d-flex flex-column align-items-center mb-2 shadow">
      <div class="d-flex justify-content-end w-100 p-2">
        <button
          type="button"
          class="btn btn-primary add-to-cart"
          @click="sendItem(product)"
        >
          +
        </button>
      </div>

      <div class="card-img d-flex justify-content-center">
        <img :src="product.image" :alt="product.name" class="w-75" />
      </div>
      <div class="card-body w-100">
        <div class="product-name fs-5">{{ product.name }}</div>

        <div class="row">
          <div class="col fw-bold fs-5 align-self-end" id="prod-price">
            ${{ product.price }}
          </div>
          <div class="col text-end align-self-end">{{ product.weight }}Kg</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: { product: Object },
  methods: {
    sendItem(product) {
      this.$emit("onAdd", product);
    },
  },
};
</script>

<style scoped></style>
