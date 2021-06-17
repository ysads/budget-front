import DashboardMenu from '@/components/DashboardMenu';
import factories from '#/factories';
import flushPromises from 'flush-promises';
import setupComponent from '#/setup-component';
import * as budgetsRepository from '@/repositories/budgets';
import * as accountsRepository from '@/repositories/accounts';

const accounts = factories.account.buildList(2);
const openBudget = factories.budget.build();

const factory = (args = {}) => {
  accountsRepository.accounts.value = args.accounts || accounts;
  budgetsRepository.openBudget.value = openBudget;

  return setupComponent(DashboardMenu, {
    props: args.props,
    mocks: args.mocks || {},
    ...args,
  });
};

describe('DashboardMenu', () => {
  it('renders a link to all accounts', async () => {
    const wrapper = factory();
    await flushPromises();

    const item = wrapper.findComponent("[data-test='all-accounts-link']");

    expect(item.props().to).toEqual({ name: 'AllAccounts' });
  });

  it('renders a add account button', async () => {
    const wrapper = factory();
    await flushPromises();

    const item = wrapper.findComponent("[data-test='add-account-btn']");

    expect(item.exists()).toEqual(true);
  });

  describe('when at the AllAccounts pages ', () => {
    it('renders all accounts menu item as active', async () => {
      const wrapper = factory({ route: { name: 'AllAccounts' } });
      await flushPromises();

      const item = wrapper.find("[data-test='all-accounts-item']");

      expect(item.classes()).toContain('active');
    });
  });

  describe('when create account button is clicked', () => {
    it('shows create account modal', async () => {
      const wrapper = factory();
      await flushPromises();

      await wrapper
        .findComponent("[data-test='add-account-btn']")
        .vm.$emit('click');

      const modal = wrapper.findComponent("[data-test='create-account-modal']");
      expect(modal.exists()).toBe(true);
    });

    describe('and modal emits close', () => {
      it('hides create account modal', async () => {
        const wrapper = factory();
        await flushPromises();

        await wrapper
          .findComponent("[data-test='add-account-btn']")
          .vm.$emit('click');
        await wrapper
          .findComponent("[data-test='create-account-modal']")
          .vm.$emit('close');

        const modal = wrapper.findComponent(
          "[data-test='create-account-modal']",
        );
        expect(modal.exists()).toBe(false);
      });
    });
  });

  describe('when there are budget accounts', () => {
    it('renders an account accordion with them', async () => {
      const budgetAccounts = factories.account.budget().buildList(1);
      const wrapper = factory({ accounts: budgetAccounts });
      await flushPromises();

      const item = wrapper.findComponent(
        "[data-test='budget-accounts-accordion']",
      );

      expect(item.props()).toEqual({
        accounts: budgetAccounts,
        budget: openBudget,
        label: expect.stringMatching(/budgetAccounts/),
      });
    });
  });

  describe('when there are tracking accounts', () => {
    it('renders an account accordion with them', async () => {
      const trackingAccounts = factories.account.tracking().buildList(1);
      const wrapper = factory({ accounts: trackingAccounts });
      await flushPromises();

      const item = wrapper.findComponent(
        "[data-test='tracking-accounts-accordion']",
      );

      expect(item.props()).toEqual({
        accounts: trackingAccounts,
        budget: openBudget,
        label: expect.stringMatching(/trackingAccounts/),
      });
    });
  });

  describe('when there are neither budget nor tracking accounts', () => {
    it('renders a message', async () => {
      const wrapper = factory({ accounts: [] });
      await flushPromises();

      const accordion = wrapper.findComponent(
        "[data-test='accounts-accordion']",
      );
      const emptyAccounts = wrapper.find("[data-test='empty-accounts-text']");

      expect(accordion.exists()).toEqual(false);
      expect(emptyAccounts.text()).toMatch(/noAccounts/);
      expect(emptyAccounts.text()).toMatch(/noAccountsTip/);
    });
  });
});
