import AccountHeader from '@/components/accounts/AccountHeader';
import faker from 'faker';
import factories from '#/factories';
import setupComponent from '#/setup-component';

const account = factories.account.build();
const cleared = account.clearedBalance;
const uncleared = account.unclearedBalance;
const budget = factories.budget.build();
const name = faker.name.findName();

const factory = (args = {}) => {
  return setupComponent(AccountHeader, {
    props: {
      budget,
      name,
      cleared,
      uncleared,
      ...args,
    },
  });
};

describe('AccountHeader', () => {
  it('renders account name', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='account-name']");

    expect(item.text()).toEqual(name);
  });

  it('renders cleared balance', () => {
    const wrapper = factory({
      budget: factories.budget.build({ currency: 'CZK' }),
      cleared: 12000,
      uncleared: 0,
    });
    const item = wrapper.find("[data-test='balance']");

    expect(item.text()).toMatch('Kč120,00');
  });

  describe('when total balance is positive', () => {
    it('adds positive class', () => {
      const wrapper = factory({ uncleared: 0, cleared: 9000 });
      const item = wrapper.find("[data-test='balance']");

      expect(item.classes()).toContain('positive');
    });
  });

  describe('when total balance is negative', () => {
    it('adds negative class', () => {
      const wrapper = factory({ uncleared: 0, cleared: -9000 });
      const item = wrapper.find("[data-test='balance']");

      expect(item.classes()).toContain('negative');
    });
  });

  it('does not render uncleared balance', () => {
    const wrapper = factory({ uncleared: 9000, cleared: 5000 });

    expect(wrapper.text()).not.toContain('90');
  });
});
