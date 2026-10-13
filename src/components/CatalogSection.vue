<template>
  <section
    class="catalog-section"
    :id="category.id"
  >
    <div class="catalog-section__header">
      <h2 class="title">
        {{ category.title }}
      </h2>

      <p
        v-if="category.description"
        class="text text-muted catalog-section__description"
      >
        {{ category.description }}
      </p>
    </div>

    <div
      v-if="category.products.length"
      class="product-grid"
    >
      <ProductCard
        v-for="product in category.products"
        :key="product.id"
        :product="product"
        @select="$emit('select-product', $event)"
      />
    </div>

    <div
      v-else
      class="empty-state"
    >
      <p class="text">
        В этой категории пока нет товаров.
      </p>
    </div>
  </section>
</template>

<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
  category: {
    type: Object,
    required: true,
  },
});

defineEmits(['select-product']);
</script>