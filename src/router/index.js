import { createRouter, createWebHistory } from 'vue-router';

import ProductCatalog from '../components/ProductCatalog.vue';
import ProductDetail from '../components/ProductDetail.vue';

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: ProductCatalog,
  },

  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});

export default router;