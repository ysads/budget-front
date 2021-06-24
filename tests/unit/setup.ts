import { config } from '@vue/test-utils';
import 'vue-router';

// Mock api fns
jest.mock('@/api', () => ({
  get: jest.fn(() => Promise.resolve({})),
  post: jest.fn(() => Promise.resolve({})),
  put: jest.fn(() => Promise.resolve({})),
  patch: jest.fn(() => Promise.resolve({})),
  del: jest.fn(() => Promise.resolve({})),
}));

// Mock i18n functions
jest.mock('@/i18n', () => ({
  global: {
    t: (str: string, params = null) =>
      params ? `${str}${JSON.stringify(params)}` : str,
    d: (str: string, format: string) => `${str}${format}`,
  },
}));

// Mock routing fns
jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock vue higher-order components
config.global.components['router-link'] = {
  name: 'RouterLink',
  props: { to: [Object, String] },
  template: '<a><slot /></a>',
};

config.global.components['transition'] = {
  name: 'Transition',
  template: '<div><slot/></div>',
};

config.global.components['transition-group'] = {
  name: 'TransitionGroup',
  template: '<div>olá meninas</div>',
};
