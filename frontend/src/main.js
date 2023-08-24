import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import infiniteScroll from 'vue-infinite-scroll'
// import { VueMasonryPlugin } from 'vue-masonry';
// import VueLazyload from 'vue-lazyload'






//链式写法，简洁
// createApp(App).use(VueMasonryPlugin).mount('#app')


const app = createApp(App);
// app.use(infiniteScroll);


// 使用 vue-lazyload
// app.use(VueLazyload, {
//     preLoad: 1.3,
//     error: 'wrong.webp',  // 错误时显示的图片路径
//     loading: 'loading.gif',  // 加载时显示的GIF图片路径
//     attempt: 1,    
// });

// 使用 vue-masonry 插件
// app.use(VueMasonryPlugin);

app.mount('#app');
