<template>
  <article class="product-card">
    <div class="product-card__image-wrapper">
      <img
        class="product-card__image"
        :src="product.image"
        :alt="product.title"
        loading="lazy"
      />
    </div>

    <div class="product-card__content">
      <h3 class="product-card__title">
        {{ product.title }}
      </h3>

      <p class="product-card__description">
        {{ product.description }}
      </p>

      <div class="product-card__footer">
        <span class="product-card__price">
          {{ formattedPrice }}
        </span>

        <RouterLink
          class="button button--primary"
          :to="{
            name: 'product-detail',
            params: { id: product.id },
          }"
        >
          Подробнее
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(['select']);

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(props.product.price);
});
</script>