import AccountToolbar from '@/components/accounts/AccountToolbar';
import factories from '#/factories';
import setupComponent from '#/setup-component';

const account = factories.account.build();

const factory = (args = {}) =>
  setupComponent(AccountToolbar, {
    props: {
      account: 'account' in args ? args.account : account,
    },
  });

describe('AccountToolbar', () => {
  it('renders new group button', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='new-transaction']");

    expect(item.exists()).toBeTruthy();
  });

  it('does not render transaction drawer by default', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='transaction-drawer']");

    expect(item.props().show).toBeFalsy();
  });

  describe('when new transaction button is clicked', () => {
    it('renders transaction drawer with account account', async () => {
      const wrapper = factory();
      await wrapper
        .findComponent("[data-test='new-transaction']")
        .vm.$emit('click');

      const drawer = wrapper.findComponent("[data-test='transaction-drawer']");

      expect(drawer.props().account).toEqual(account);
    });
  });

  describe('when no account prop is given', () => {
    it('passes a null account to TransactionDetails', () => {
      const wrapper = factory({ account: null });
      const item = wrapper.findComponent("[data-test='transaction-drawer']");

      expect(item.props().account).toBeNull();
    });
  });
});
