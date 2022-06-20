import {
  mount,
  MountingOptions,
  shallowMount,
  VueWrapper,
} from '@vue/test-utils';
import { Stubs } from '@vue/test-utils/dist/types';
import { ComponentPublicInstance } from 'vue';
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
  // @ts-expect-error: we just want to mock what is needed, not everything
  currentRoute: mockRoute,
  push: () => Promise.resolve(),
};

export interface SetupComponentArgs extends MountingOptions<never> {
  route?: Partial<router.RouteLocationNormalized>;
  router?: Partial<router.Router>;
  stubs?: Stubs;
  renderSlots?: boolean;
  withMount?: boolean;
}

export default function setupComponent(
  component: never,
  args: SetupComponentArgs = {},
): VueWrapper<ComponentPublicInstance> {
  const mountingFn = args.withMount ? mount : shallowMount;
  const useRoute = router.useRoute as jest.MockedFunction<
    typeof router.useRoute
  >;

  const useRouter = router.useRouter as jest.MockedFunction<
    typeof router.useRouter
  >;

  useRoute.mockReturnValueOnce({ ...mockRoute, ...args.route });
  useRouter.mockReturnValueOnce({ ...mockRouter, ...args.router });

  return mountingFn(component, {
    props: args.props,
    slots: args.slots,
    data() {
      return args.data || {};
    },
    global: {
      renderStubDefaultSlot: args.renderSlots,
      stubs: args.stubs || {},
    },
  });
}
