<template>
  <TopNav/>
  <!-- Card组件，用于显示图片 -->
  <div v-for="(card, i) in cards" :key="i">
    <Card :src="card.src" :board="card.recommended" />
  </div>
</template>



<script setup>
import TopNav from './components/TopNav.vue'
import Card from './components/Card.vue';      // 导入Card组件
import { ref } from 'vue';

const cards = [
        {
          src: '1.jpg',
          recommended: 'Travel'
        },
        {
          src: '2.jpg',
          recommended: 'Travel'
        },
      ]

</script>



<style scoped>

</style>
