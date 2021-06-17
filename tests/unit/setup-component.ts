import { shallowMount, mount } from '@vue/test-utils';
import * as router from 'vue-router';

const mockRoute: router.RouteLocationNormalized = {
  params: {},
  query: {},
  name: '',
  fullPath: '',
  hash: '',
  path: '',
  matched: [],
  redirectedFrom: undefined,
  meta: {},
};

const mockRouter: router.Router = {
  // @ts-ignore
  currentRoute: mockRoute,
  push: () => Promise.resolve(),
};

interface SetupComponentArgs {
  props?: Record<string, any>;
  mocks?: Record<string, any>;
  slots?: Record<string, any>;
  data?: Record<string, any>;
  route?: router.RouteLocationNormalized;
  router?: any;
  renderSlots?: boolean;
  withMount?: boolean;
}

export default function setupComponent(
  component: any,
  args: SetupComponentArgs = {},
) {
  const mountingFn = args.withMount ? mount : shallowMount;

  // @ts-ignore
  router.useRoute.mockReturnValueOnce(args.route || mockRoute);
  // @ts-ignore
  router.useRouter.mockReturnValueOnce(args.router || mockRouter);

  return mountingFn(component, {
    props: args.props,
    slots: args.slots,
    data() {
      return args.data || {};
    },
    global: {
      mocks: args.mocks,
      renderStubDefaultSlot: args.renderSlots,
    },
  });
}
