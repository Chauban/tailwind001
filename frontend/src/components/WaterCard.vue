<template lang="html">
    <Waterfall :list="list">
        <template #item="{ item, url, index }">

            <!-- 主要的卡片容器，当鼠标悬停或离开时，会改变 hover 的状态 -->
            <div 
                @mouseover="()=>setHoverState(index, true)" 
                @mouseleave="()=>setHoverState(index, false)" 
                class="relative"
            >
                <!-- rounded-lg 为元素提供了大的圆角。图片的四个角都会被稍微圆润处理-->
                <LazyImg 
                    :url=item.src
                    alt="" 
                    class="rounded-lg"/>                
                <!-- 改成当鼠标悬停在卡片上时，显示一个在底部固定高度的半透明覆盖层 -->
                <div v-if="hoverStates[index]" class="absolute bottom-1 inset-x-1 h-40 rounded-lg backdrop-blur-xl bg-white bg-opacity-10"></div>
                <!-- 当鼠标悬停在卡片上时，显示上下两个操作区域 -->
                <div v-if="hoverStates[index]" class="absolute top-0 w-full h-full flex flex-col justify-between p-3">
                    <!-- 上方的操作区域，包括一个下拉按钮和一个保存按钮 -->
                    <div class="flex items-center justify-between">
                        <button type="button" name="button" class="flex items-center">
                        <!-- 显示卡片所属的板块 -->
                        <p class="font-semibold text-white"> {{ item.model }} </p>
                        <!-- 下拉图标 -->
                        <span class="material-icons text-white">expand_more</span>
                        </button>
                        <!-- 保存按钮 -->
                        <button type="button" name="button" class="rounded-full py-3 px-5 text-white bg-primary font-semibold">
                            Save
                        </button>
                    </div>
                <!-- 下方的操作区域，包括分享和更多操作按钮 -->
                    <div class="flex items-center w-full">
                        <!-- 分享按钮 -->
                        <button type="button" name="button" class="ml-auto mr-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-sm text-dark opacity-75 hover:opacity-100">
                            <span class="material-icons text-base">ios_share</span>
                        </button>
                        <!-- 更多操作按钮 -->
                        <button type="button" name="button" class="bg-white rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100">
                            <span class="material-icons text-base">more_horiz</span>
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </Waterfall>
</template>
  

<script setup>
import { ref, watch } from 'vue';
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

// 接收从父组件传递的属性：图片源、板块名称和是否是最后一个元素
const props = defineProps(['list',]);

// 初始化每张图片的悬停状态为 false
const hoverStates = ref([]);

watch(props.list, (newList) => {
  hoverStates.value = newList.map(() => false);
});

const setHoverState = (index, state) => {
    hoverStates.value[index] = state;
};

</script>

  
<!-- 为这个组件定义的样式，scoped 表示这些样式只应用于这个组件 -->
<style lang="css" scoped>
</style>
  