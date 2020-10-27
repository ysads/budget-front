import ElementUI from 'element-ui'
import Vue from 'vue'
import store from '@/store'
import { config } from '@vue/test-utils'

import '@/plugins/composition-api'
import '@/plugins/validation'

Vue.use(ElementUI)
Vue.use(store)

// Mock api fns
jest.mock('@/api', () => ({
  get: jest.fn(() => Promise.resolve({})),
  post: jest.fn(() => Promise.resolve({})),
  put: jest.fn(() => Promise.resolve({})),
  patch: jest.fn(() => Promise.resolve({})),
  del: jest.fn(() => Promise.resolve({})),
}))

// Mock i18n functions
jest.mock('vue-i18n-composable', () => ({
  useI18n: () => ({
    t: (string) => string,
  }),
}))

// Mock routing fns
config.mocks.$route = {
  name: 'mock',
  params: {},
}
config.mocks.$router = {
  push: jest.fn(),
  currentRoute: { query: {} },
}

Vue.component('router-link', {
  name: 'RouterLink',
  props: { to: [Object, String] },
})
