import factories from '#/factories';
import MockDate from 'mockdate';
import MonthHeader from '@/components/months/MonthHeader';
import setupComponent from '#/setup-component';
import { addMonths, isoMonthToDate } from '@/support/date';

const budget = factories.budget.build();
const month = factories.month.build();

const factory = (args = {}) =>
  setupComponent(MonthHeader, {
    props: {
      budget,
      month,
      ...args,
    },
  });

describe('MonthHeader', () => {
  beforeAll(() => MockDate.set(new Date()));
  afterAll(() => MockDate.reset());

  it('renders prev button', () => {
    const wrapper = factory();
    const button = wrapper.find("[data-test='prev']");
    const icon = button.findComponent("[data-test='icon-prev']");

    expect(button.attributes('aria-label')).toEqual('MonthHeader.prevMonth');
    expect(icon.props().name).toEqual('chevron-circle-left');
  });

  it('renders next button', () => {
    const wrapper = factory();

    const button = wrapper.find("[data-test='next']");
    const icon = button.findComponent("[data-test='icon-next']");

    expect(button.attributes('aria-label')).toEqual('MonthHeader.nextMonth');
    expect(icon.props().name).toEqual('chevron-circle-right');
  });

  it('renders month name', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='month-name']");

    expect(item.text()).toMatch(isoMonthToDate(month.isoMonth).toString());
  });

  it('renders current month to-be-budgeted', () => {
    const wrapper = factory({
      budget: factories.budget.build({ currency: 'NOK' }),
      month: factories.month.build({ toBeBudgeted: 34000 }),
    });
    const item = wrapper.find("[data-test='to-be-budgeted']");

    expect(item.text()).toMatch('MonthHeader.toBeBudgeted');
    expect(item.text()).toMatch('kr340,00');
  });

  describe('when prev button is clicked', () => {
    it('emits update with previous month as payload', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='prev']").trigger('click');

      expect(wrapper.emitted().update).toEqual([
        [addMonths(isoMonthToDate(month.isoMonth), -1)],
      ]);
    });
  });

  describe('when next button is clicked', () => {
    it('emits update with next month as payload', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='next']").trigger('click');

      expect(wrapper.emitted().update).toEqual([
        [addMonths(isoMonthToDate(month.isoMonth), 1)],
      ]);
    });
  });
});
