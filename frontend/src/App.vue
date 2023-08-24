<template>
  <TopNav/>

  <WaterCard :list="cards" :width="400" :animationDuration=0 :animationDelay=0 />
  <InfiniteLoading @infinite="fetchMoreData" />

  <!-- Card组件，用于显示图片 -->
  <!-- <div v-masonry ref="masonry"> -->
    <!-- <div v-masonry-tile v-for="(card, i) in cards" :key="i">
      <Card 
        @loadMore="fetchMoreData"
        :isLast="i === cards.length - 1"
        :src="card.src" 
        class="w-80" 
        :board="card.recommended" />
    </div> -->
  <!-- </div>   -->
</template>

<script setup>
import axios from 'axios';
import TopNav from './components/TopNav.vue'
import WaterCard from './components/WaterCard.vue';      // 导入Card组件
import { ref, onMounted } from 'vue';
import InfiniteLoading from "v3-infinite-loading";
// import "v3-infinite-loading/lib/style.css";

// const numberOfPhotos = 27;
// const recommendedValue = 'Travel';
// const cards = Array.from({ length: numberOfPhotos }, (_, i) => ({
//   src: `${i + 1}.webp`,
//   recommended: recommendedValue
// }));
const cards = ref([]);
const page = ref(1);
const perPage = 30;       //每页30张，这个 页 可以理解为 组
const isLoading = ref(false);  // 加载状态


const fetchMoreData = async () => {
  if (isLoading.value) return;  // 如果正在加载，直接返回
  isLoading.value = true;  // 设置为正在加载

  try {
    console.log('page = ', page.value);
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
    }));

    // 将新数据添加到cards中
    cards.value = [...cards.value, ...newCards];

    // 增加页数，为下次请求做准备
    page.value++;

  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    isLoading.value = false;  // 设置为加载完成
  }
};

// 首次加载时请求数据
onMounted(fetchMoreData);  

</script>



<style scoped>

</style>
