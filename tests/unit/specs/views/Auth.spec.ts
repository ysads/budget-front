import Auth from '@/views/Auth.vue';
import setupComponent, { SetupComponentArgs } from '#/setup-component';
import { nextTick, ref } from 'vue';
import factories from '#/factories';
import * as auth0 from '@auth0/auth0-vue';
import * as repository from '@/repositories/auth';

jest.mock('@auth0/auth0-vue', () => ({
  useAuth0: jest.fn(),
}));
jest.mock('@/repositories/auth', () => ({
  getMe: jest.fn(() => Promise.resolve()),
  updateAuthToken: jest.fn(),
}));

type FactoryArgs = SetupComponentArgs & {
  getMe?: typeof repository.getMe;
  updateAuthToken?: typeof repository.updateAuthToken;
  auth0Args?: Partial<auth0.Auth0VueClient>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFn = <T>(fn: (...args: any[]) => T, impl?: (...args: any[]) => T) => {
  const mocked = fn as jest.MockedFunction<typeof fn>;

  if (impl) {
    mocked.mockImplementation(impl);
  }

  return mocked;
};

const user = factories.currentUser.build();

const factory = (args: FactoryArgs = {}) => {
  mockFn(auth0.useAuth0, () => ({
    getAccessTokenSilently: jest.fn(() => Promise.resolve('token')),
    isAuthenticated: ref(false),
    loginWithPopup: jest.fn(() => Promise.resolve()),
    ...args.auth0Args,
  }));

  mockFn(repository.getMe, args.getMe || (() => Promise.resolve(user)));
  mockFn(repository.updateAuthToken, args.updateAuthToken || jest.fn());

  // @ts-expect-error FIXME: how to properly type components?
  return setupComponent(Auth, args);
};

describe('Auth', () => {
  it('renders sign in button', () => {
    const wrapper = factory({ withMount: true });
    expect(wrapper.find('[data-test="button"]').text()).toMatch(
      /signInWithAuth0/,
    );
  });

  it('renders no loading by default', () => {
    const wrapper = factory();
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  });

  describe('when user is already authenticated on auth0', () => {
    it('renders page with loading', () => {
      const wrapper = factory({ auth0Args: { isAuthenticated: ref(true) } });

      expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    });

    it('requests an auth token to auth0 and save it locally', async () => {
      const getAccessTokenSilently = jest.fn(() => Promise.resolve('token'));
      const updateAuthToken = jest.fn();

      factory({
        // @ts-expect-error TS chooses the wrong overload of getAccessTokenSilently
        auth0Args: { isAuthenticated: ref(true), getAccessTokenSilently },
        updateAuthToken,
      });
      await nextTick();

      expect(getAccessTokenSilently).toHaveBeenCalled();
      await nextTick();

      expect(updateAuthToken).toHaveBeenCalledWith('token');
    });

    it('gets user data on api', async () => {
      const getMe = jest.fn(() => Promise.resolve(user));

      factory({
        auth0Args: { isAuthenticated: ref(true) },
        getMe,
      });
      await nextTick();

      expect(getMe).toHaveBeenCalled();
    });

    it('navigates to Budget route with user default budget', async () => {
      const router = { push: jest.fn() };

      factory({
        auth0Args: { isAuthenticated: ref(true) },
        router,
      });
      await nextTick();
      await nextTick();

      expect(router.push).toHaveBeenCalledWith({
        name: 'Budget',
        params: {
          budgetId: user.defaultBudgetId,
        },
      });
    });
  });

  describe('when button is clicked', () => {
    it('opens auth0 popup', async () => {
      const loginWithPopup = jest.fn();
      const wrapper = factory({ auth0Args: { loginWithPopup } });

      await wrapper.find('[data-test="button"]').trigger('click');
      await nextTick();

      expect(loginWithPopup).toHaveBeenCalled();
    });

    it('renders loading', async () => {
      const wrapper = factory();

      await wrapper.find('[data-test="button"]').trigger('click');
      await nextTick();

      expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    });

    describe('and auth0 authenticates successfully', () => {
      it('requests an auth token to auth0 and save it locally', async () => {
        const getAccessTokenSilently = jest.fn(() => Promise.resolve('token'));
        const updateAuthToken = jest.fn();
        const wrapper = factory({
          // @ts-expect-error TS chooses the wrong overload of getAccessTokenSilently
          auth0Args: { getAccessTokenSilently },
          updateAuthToken,
        });

        await wrapper.find('[data-test="button"]').trigger('click');
        await nextTick();

        expect(getAccessTokenSilently).toHaveBeenCalled();
        await nextTick();

        expect(updateAuthToken).toHaveBeenCalledWith('token');
      });

      it('gets user data on api', async () => {
        const getMe = jest.fn(() => Promise.resolve(user));
        const wrapper = factory({ getMe });

        await wrapper.find('[data-test="button"]').trigger('click');
        await nextTick();
        await nextTick();

        expect(getMe).toHaveBeenCalled();
      });

      it('navigates to Budget route with user default budget', async () => {
        const router = { push: jest.fn() };
        const wrapper = factory({ router });

        await wrapper.find('[data-test="button"]').trigger('click');
        await nextTick();

        expect(router.push).toHaveBeenCalledWith({
          name: 'Budget',
          params: {
            budgetId: user.defaultBudgetId,
          },
        });
      });
    });
  });
});
