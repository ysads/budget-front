import {
  mount,
  MountingOptions,
  shallowMount,
  VueWrapper,
} from '@vue/test-utils';
import { ComponentPublicInstance, DefineComponent } from 'vue';
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
  route?: router.RouteLocationNormalized;
  router?: router.Router;
  stubs?: Record<string, string>;
  renderSlots?: boolean;
  withMount?: boolean;
}

export default function setupComponent(
  component: DefineComponent,
  args: SetupComponentArgs = {},
): VueWrapper<ComponentPublicInstance> {
  const mountingFn = args.withMount ? mount : shallowMount;
  const useRoute = router.useRoute as jest.MockedFunction<
    typeof router.useRoute
  >;

  const useRouter = router.useRouter as jest.MockedFunction<
    typeof router.useRouter
  >;

  useRoute.mockReturnValueOnce(args.route || mockRoute);
  useRouter.mockReturnValueOnce(args.router || mockRouter);

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
