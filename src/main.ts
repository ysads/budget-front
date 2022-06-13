import { createApp } from 'vue';
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

import '@/assets/styles/themes/main.scss';

const auth0 = createAuth0({
  domain: process.env.VUE_APP_AUTH0_DOMAIN || '',
  client_id: process.env.VUE_APP_AUTH0_CLIENT_ID || '',
  audience: process.env.VUE_APP_AUTH0_AUDIENCE || '',
  redirect_uri: window.location.origin,
});

createApp(App).use(router).use(i18n).use(auth0).mount('#app');
