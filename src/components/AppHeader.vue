<template>
  <header class="header">
    <div class="container header__inner">
      <a href="#" class="header__logo">
        heavy-smoke.chel
      </a>

      <div class="header__search">
        <input
          v-model="search"
          type="search"
          placeholder="Поиск товаров..."
          aria-label="Поиск товаров"
          @input="$emit('search', search)"
        />
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

defineEmits(['search']);

const search = ref('');
</script>