import AccountToolbar from '@/components/accounts/AccountToolbar';
import factories from '#/factories';
import setupComponent from '#/setup-component';

const account = factories.account.build();

const factory = () =>
  setupComponent(AccountToolbar, {
    props: {
      account,
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

    expect(item.exists()).toBeFalsy();
  });

  describe('when new transaction button is clicked', () => {
    it('renders transaction drawer with origin account', async () => {
      const wrapper = factory();
      await wrapper
        .findComponent("[data-test='new-transaction']")
        .vm.$emit('click');

      const drawer = wrapper.findComponent("[data-test='transaction-drawer']");

      expect(drawer.props().originAccount).toEqual(account);
    });
  });
});
