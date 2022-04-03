import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faDiscord, fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);
library.add(fab, fas);
dom.watch();

app.component('FontAwesome', FontAwesomeIcon);
app.use(createPinia());

app.mount('#app');
