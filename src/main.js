import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VueMasonryPlugin } from 'vue-masonry';

//链式写法，简洁
createApp(App).use(VueMasonryPlugin).mount('#app')

// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import { VueMasonryPlugin } from 'vue-masonry';

// const app = createApp(App);

// // 使用 vue-masonry 插件
// app.use(VueMasonryPlugin);

// app.mount('#app');
