import * as Money from '@/support/money';
import AccountAccordion from '@/components/accounts/AccountAccordion';
import faker from 'faker';
import factories from '#/factories';
import setupComponent from '#/setup-component';
import SadCollapse from '@/components/sad/SadCollapse';
import { Events, eventBus } from '@/events';

const accounts = factories.account.buildList(2);
const budget = factories.budget.build();
const label = faker.name.findName();

const factory = (args = {}) => {
  return setupComponent(AccountAccordion, {
    props: {
      accounts,
      budget,
      label,
      ...args.props,
    },
    route: args.route,
    renderSlots: true,
    withMount: args.withMount,
  });
};

describe('AccountAccordion', () => {
  it('renders open by default', () => {
    const wrapper = factory();
    const item = wrapper.findComponent(SadCollapse);

    expect(item.props().startOpen).toEqual(true);
  });

  it('renders account totals', () => {
    const wrapper = factory({ withMount: true });
    const item = wrapper.find("[data-test='title']");

    const total = accounts.reduce((total, a) => total + a.balance, 0);

    expect(item.text()).toMatch(label);
    expect(item.text()).toMatch(Money.localize(total, budget));
  });

  it('renders a list item to each account', () => {
    const wrapper = factory();
    const items = wrapper.findAll("[data-test='account-item']");

    expect(items.length).toBe(accounts.length);
  });

  it('renders the open account item with active class', () => {
    const route = { params: { id: accounts[1].id } };
    const wrapper = factory({ route });
    const items = wrapper.findAll("[data-test='account-item']");

    expect(items[0].classes()).not.toContain('active');
    expect(items[1].classes()).toContain('active');
  });

  it.skip('renders a link to each account', () => {
    const wrapper = factory();
    const items = wrapper.findAllComponents("[data-test='account-link']");

    accounts.map((account, index) => {
      expect(items[index].props().to).toEqual({
        name: 'AccountShow',
        params: { id: account.id },
      });
      expect(items[index].text()).toMatch(
        Money.localize(account.balance, budget),
      );
      expect(items[index].text()).toMatch(account.name);
    });
  });

  describe('when there is no account', () => {
    it('does not render accordion', () => {
      const wrapper = factory({ props: { accounts: [] } });
      const item = wrapper.find("[data-test='accordion']");

      expect(item.exists()).toBe(false);
    });
  });

  describe('when account item is clicked', () => {
    it('emits CLOSE_DASHBOARD_MENU event', async () => {
      const wrapper = factory();
      const mockHandler = jest.fn();

      eventBus.on(Events.CLOSE_DASHBOARD_MENU, mockHandler);

      await wrapper.find("[data-test='account-item']").trigger('click');

      expect(mockHandler).toHaveBeenCalled();
    });
  });
});
