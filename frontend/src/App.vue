<template>
  <TopNav/>
  <!-- Card组件，用于显示图片 -->
  <div v-masonry ref="masonry">
    <div v-masonry-tile v-for="(card, i) in cards" :key="i">
      <Card 
        @loadMore="fetchMoreData"
        :isLast="i === cards.length - 1"
        :src="card.src" 
        class="w-80" 
        :board="card.recommended" />
    </div>
  </div>  
</template>

<script setup>
import axios from 'axios';
import TopNav from './components/TopNav.vue'
import Card from './components/Card.vue';      // 导入Card组件
import { ref, onMounted } from 'vue';

// const numberOfPhotos = 27;
// const recommendedValue = 'Travel';
// const cards = Array.from({ length: numberOfPhotos }, (_, i) => ({
//   src: `${i + 1}.webp`,
//   recommended: recommendedValue
// }));
const cards = ref([]);
const page = ref(1);
const perPage = 30;       //每页30张，这个 页 可以理解为 组




const fetchMoreData = async () => {
  try {
    // 使用axios发送GET请求
    const response = await axios.get('http://localhost:3000/images', {
      params: {
        page: page.value,
        limit: perPage
      }
    });

    // axios会自动处理JSON转换，所以直接使用response.data即可
    const newCards = response.data.map(item => ({
      src: item.url,
      cmd: item.cmd,
      prompt: item.prompt,
      model: "Midjourney",
      height:1000,
    }));

    // 将新数据添加到cards中
    cards.value = [...cards.value, ...newCards];

    // 增加页数，为下次请求做准备
    page.value++;

  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

// 首次加载时请求数据
onMounted(fetchMoreData);  

</script>



<style scoped>

</style>
