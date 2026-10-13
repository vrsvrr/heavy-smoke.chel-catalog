<template>
  <main class="product-detail">
    <div class="container">
      <RouterLink class="button button--outline product-detail__back" to="/">
        ← Вернуться в каталог
      </RouterLink>

      <!-- Информация о товаре -->
      <div v-if="product" class="product-detail__layout">
        <!-- Галерея -->
        <div class="product-detail__gallery">
          <div class="product-detail__main-image">
            <img
              class="product-detail__image"
              :src="currentImage"
              :alt="product.title"
            />

            <!-- Кнопки переключения -->
            <template v-if="images.length > 1">
              <button
                class="product-detail__arrow product-detail__arrow--prev"
                type="button"
                aria-label="Предыдущее изображение"
                @click="prevImage"
              >
                &#10094;
              </button>

              <button
                class="product-detail__arrow product-detail__arrow--next"
                type="button"
                aria-label="Следующее изображение"
                @click="nextImage"
              >
                &#10095;
              </button>

              <span class="product-detail__counter">
                {{ activeImage + 1 }} / {{ images.length }}
              </span>
            </template>
          </div>

          <!-- Миниатюры -->
          <div v-if="images.length > 1" class="product-detail__thumbnails">
            <button
              v-for="(image, index) in images"
              :key="`${image}-${index}`"
              class="product-detail__thumbnail"
              :class="{ 'is-active': activeImage === index }"
              type="button"
              :aria-label="`Показать изображение ${index + 1}`"
              :aria-pressed="activeImage === index"
              @click="activeImage = index"
            >
              <img :src="image" :alt="`${product.title} — фото ${index + 1}`" />
            </button>
          </div>
        </div>

        <section class="product-detail__specifications">
          <p v-if="category" class="text-small text-muted">
            {{ category.title }}
          </p>

          <h1 class="title" style="margin-bottom: 12px">
            {{ product.title }}
          </h1>

          <p class="product-detail__price">
            {{ formattedPrice }}
          </p>

          <template v-if="product.specifications?.length">
            <h2 class="subtitle product-detail__specifications-title">
              Характеристики
            </h2>

            <div class="product-detail__specifications-list">
              <div
                v-for="specification in product.specifications"
                :key="specification.label"
                class="product-detail__specification"
              >
                <span class="text text-muted">
                  {{ specification.label }}
                </span>

                <span class="text">
                  {{ specification.value }}
                </span>
              </div>
            </div>
          </template>

          <div class="product-detail__description-block">
            <h2 class="subtitle">Описание товара</h2>

            <p class="text product-detail__description">
              {{ product.details || product.description }}
            </p>
          </div>
        </section>
      </div>

      <!-- Видео и описание -->
      <section v-if="product" class="product-detail__info">
        <ProductVideo
          v-if="product.video?.url"
          :video="product.video"
          :title="`Видео: ${product.title}`"
        />
      </section>

      <!-- Товар не найден -->
      <div v-else class="empty-state">
        <h1 class="title">Товар не найден</h1>

        <p class="text text-muted">Возможно, товар был удалён из каталога.</p>

        <RouterLink class="button button--primary" to="/">
          Вернуться в каталог
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { catalog } from "../data/catalog.js";
import ProductVideo from "./ProductVideo.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const activeImage = ref(0);

const category = computed(() => {
  return catalog.find((category) =>
    category.products.some((product) => String(product.id) === props.id),
  );
});

const product = computed(() => {
  return category.value?.products.find(
    (product) => String(product.id) === props.id,
  );
});

// Основное изображение + дополнительные фотографии.
// Если массив gallery не задан, используем product.image.
const images = computed(() => {
  if (!product.value) {
    return [];
  }

  const gallery = product.value.gallery || [];

  return [...new Set([product.value.image, ...gallery].filter(Boolean))];
});

const currentImage = computed(() => {
  return images.value[activeImage.value] || "";
});

function nextImage() {
  activeImage.value = (activeImage.value + 1) % images.value.length;
}

function prevImage() {
  activeImage.value =
    (activeImage.value - 1 + images.value.length) % images.value.length;
}

// При переходе к другому товару начинаем галерею с первой фотографии.
watch(
  () => props.id,
  () => {
    activeImage.value = 0;
  },
);

const formattedPrice = computed(() => {
  if (!product.value || product.value.price == null) {
    return "";
  }

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(product.value.price);
});
</script>
