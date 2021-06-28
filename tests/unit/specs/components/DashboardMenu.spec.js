import * as accountsRepo from '@/repositories/accounts';
import * as budgetsRepo from '@/repositories/budgets';
import DashboardMenu from '@/components/DashboardMenu.vue';
import factories from '#/factories';
import setupComponent from '#/setup-component';
import { Events, eventBus } from '@/events';

const accounts = factories.account.buildList(2);
const openBudget = factories.budget.build();

const factory = (args = {}) => {
  accountsRepo.accounts.value = args.accounts || accounts;
  budgetsRepo.openBudget.value = args.openBudget || openBudget;

  return setupComponent(DashboardMenu, {
    route: args.route,
    renderSlots: true,
    withMount: args.withMount,
  });
};

describe('DashboardMenu', () => {
  it('renders link to Budget', () => {
    const wrapper = factory();

    const item = wrapper.findComponent("[data-test='budget-link']");

    expect(item.props().to).toEqual({ name: 'Budget' });
    expect(item.text()).toMatch(/budget/);
  });

  it('renders link to AllAccounts', () => {
    const wrapper = factory();

    const item = wrapper.findComponent("[data-test='all-accounts-link']");

    expect(item.props().to).toEqual({ name: 'AllAccounts' });
    expect(item.text()).toMatch(/allAccounts/);
  });

  it('renders accordion with budget accounts', () => {
    const budgetAccounts = factories.account.budget().buildList(1);
    const wrapper = factory({ accounts: budgetAccounts });

    const item = wrapper.findComponent(
      "[data-test='budget-accounts-accordion']",
    );

    expect(item.props()).toMatchObject({
      accounts: budgetAccounts,
      label: expect.stringMatching(/budgetAccounts/),
    });
  });

  it('renders accordion with tracking accounts', () => {
    const trackingAccounts = factories.account.tracking().buildList(1);
    const wrapper = factory({ accounts: trackingAccounts });

    const item = wrapper.findComponent(
      "[data-test='tracking-accounts-accordion']",
    );

    expect(item.props()).toMatchObject({
      accounts: trackingAccounts,
      label: expect.stringMatching(/trackingAccounts/),
    });
  });

  it('applies active class to item matching current route', () => {
    const wrapper = factory({ route: { name: 'AllAccounts' } });

    const budget = wrapper.find("[data-test='budget-item']");
    const allAccounts = wrapper.find("[data-test='all-accounts-item']");

    expect(budget.classes()).not.toContain('active');
    expect(allAccounts.classes()).toContain('active');
  });

  describe('when there is no account', () => {
    it('does not render accordions', () => {
      const wrapper = factory({ accounts: [] });

      expect(
        wrapper
          .findComponent("[data-test='budget-accounts-accordion']")
          .exists(),
      ).toBeFalsy();
      expect(
        wrapper
          .findComponent("[data-test='tracking-accounts-accordion']")
          .exists(),
      ).toBeFalsy();
    });

    it('renders tips', () => {
      const wrapper = factory({ accounts: [] });
      const item = wrapper.find("[data-test='empty-accounts-text']");

      expect(item.text()).toMatch(/noAccounts/);
      expect(item.text()).toMatch(/noAccountsTip/);
    });
  });

  describe('when there is no account', () => {
    it('does not render accordion', () => {
      const wrapper = factory({ props: { accounts: [] } });
      const item = wrapper.find("[data-test='accordion']");

      expect(item.exists()).toBe(false);
    });
  });

  describe('when add account button is clicked', () => {
    it('displays modal', async () => {
      const wrapper = factory({ accounts: [] });

      await wrapper
        .findComponent("[data-test='add-account-btn']")
        .vm.$emit('click');
      const modal = wrapper.findComponent("[data-test='create-account-modal']");

      expect(modal.props().show).toBeTruthy();
    });

    describe('and modal emits close', () => {
      it('hides modal', async () => {
        const wrapper = factory({ accounts: [] });
        const modal = wrapper.findComponent(
          "[data-test='create-account-modal']",
        );

        await wrapper
          .findComponent("[data-test='add-account-btn']")
          .vm.$emit('click');
        await modal.vm.$emit('close');

        expect(modal.props().show).toBeFalsy();
      });
    });
  });

  describe('clicking on menu links', () => {
    it('emits CloseDrawer event for Budget', async () => {
      const wrapper = factory();
      const mockHandler = jest.fn();

      eventBus.on(Events.CLOSE_DRAWER, mockHandler);

      await wrapper.find("[data-test='budget-link']").trigger('click');

      expect(mockHandler).toHaveBeenCalled();
    });

    it('emits CloseDrawer event for AllAccounts', async () => {
      const wrapper = factory();
      const mockHandler = jest.fn();

      eventBus.on(Events.CLOSE_DRAWER, mockHandler);

      await wrapper.find("[data-test='all-accounts-link']").trigger('click');

      expect(mockHandler).toHaveBeenCalled();
    });
  });
});
