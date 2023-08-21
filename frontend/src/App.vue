<template>
  <TopNav/>
  <!-- Card组件，用于显示图片 -->
  <div v-masonry>
    <div v-masonry-tile v-for="(card, i) in cards" :key="i">
      <Card class="w-80" :src="card.src" :board="card.recommended" />
    </div>
  </div>
  
</template>



<script setup>
import TopNav from './components/TopNav.vue'
import Card from './components/Card.vue';      // 导入Card组件
import { ref } from 'vue';

const numberOfPhotos = 27;
const recommendedValue = 'Travel';

const cards = Array.from({ length: numberOfPhotos }, (_, i) => ({
  src: `${i + 1}.webp`,
  recommended: recommendedValue
}));


</script>



<style scoped>

</style>
