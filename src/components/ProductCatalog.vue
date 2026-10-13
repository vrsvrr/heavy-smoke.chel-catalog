<template>
  <AppHeader @search="searchQuery = $event" />

  <main class="page">
    <div class="container page__layout">
      <AppSidebar :categories="catalog" />

      <div class="catalog">
        <header class="catalog__header">
          <h1 class="title">
            Каталог товаров
          </h1>

          <p class="text text-muted catalog__description">
            Выбирай товары из разных категорий.
          </p>
        </header>

        <div
          v-if="!filteredCatalog.length"
          class="empty-state"
        >
          <p class="text">
            Ничего не найдено.
          </p>
        </div>

        <CatalogSection
          v-for="category in filteredCatalog"
          :key="category.id"
          :category="category"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';

import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import CatalogSection from './CatalogSection.vue';

import { catalog } from '../data/catalog.js';

const searchQuery = ref('');

const filteredCatalog = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return catalog;
  }

  return catalog
    .map((category) => {
      const categoryMatches = category.title
        .toLowerCase()
        .includes(query);

      const products = category.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      });

      return {
        ...category,
        products: categoryMatches
          ? category.products
          : products,
      };
    })
    .filter((category) => {
      return (
        category.title.toLowerCase().includes(query) ||
        category.products.length > 0
      );
    });
});
</script>