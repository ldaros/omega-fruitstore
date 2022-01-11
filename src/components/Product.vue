<template>
  <div class="col-6 col-lg-3 col-md-4">
    <div class="card d-flex flex-column align-items-center mb-2 c-shadow">
      <i
        class="bi bi-plus-circle fs-2 w-100 text-end px-2 icon"
        @click="sendItem(product)"
      ></i>

      <div class="card-img d-flex justify-content-center">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="card-body w-100">
        <div class="product-name fs-5">{{ product.name }}</div>

        <div class="row">
          <div class="col fw-bold fs-5 align-self-end">
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
      console.log("Adding " + product.name + " to cart");
    },
  },
};
</script>

<style scoped>
img {
  width: 80%;
  height: auto;
}

.icon {
  cursor: pointer;
  color: #969696;
}

.icon:hover {
  color: #2c5858;
}

.c-shadow {
  -webkit-box-shadow: 0px 0px 5px 0px #2e70ff;
  box-shadow: 0px 0px 5px 0px #2e70ff;
}
</style>
