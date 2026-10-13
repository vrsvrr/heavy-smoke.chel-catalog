<template>
  <aside class="sidebar">
    <h2 class="subtitle sidebar__title">
      Категории
    </h2>

    <nav aria-label="Категории каталога">
      <ul class="sidebar__list">
        <li
          v-for="category in categories"
          :key="category.id"
        >
          <a
            class="sidebar__link"
            :href="`#${category.id}`"
          >
            {{ category.title }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>