import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);
// @ts-ignore
library.add(fab);
dom.watch();

app.component('FontAwesome', FontAwesomeIcon);
app.use(createPinia());

app.mount('#app');
