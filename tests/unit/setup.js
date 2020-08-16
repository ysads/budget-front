import ElementUI from 'element-ui'
import Vue from 'vue'
import store from '@/store'
import { config } from '@vue/test-utils'

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

// Mock i18n fns
const mockI18nFn = (string, params) => {
  return `${string}${params ? JSON.stringify(params) : ''}`
}
config.mocks.$t = mockI18nFn
config.mocks.$n = mockI18nFn

// Mock routing fns
config.mocks.$route = {
  name: 'mock',
  params: {},
}
config.mocks.$router = {
  push: jest.fn(),
  currentRoute: { query: {} },
}
