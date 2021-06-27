import TransactionTableHeader from '@/components/transactions/TransactionTableHeader';
import setupComponent from '#/setup-component';

const factory = () => setupComponent(TransactionTableHeader);

describe('TransactionTableHeader', () => {
  it('renders date', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='date']");

    expect(item.text()).toMatch(/date/);
  });

  it('renders payee', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='payee']");

    expect(item.text()).toMatch(/payee/);
  });

  it('renders category', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='category']");

    expect(item.text()).toMatch(/category/);
  });

  it('renders amount', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='amount']");

    expect(item.text()).toMatch(/amount/);
  });

  it('renders cleared', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='cleared']");

    expect(item.text()).toMatch(/cleared/);
  });
});
