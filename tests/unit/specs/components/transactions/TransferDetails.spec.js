import alert from '@/support/alert';
import factories from '#/factories';
import MockDate from 'mockdate';
import TransferDetails from '@/components/transactions/TransferDetails';
import setupComponent from '#/setup-component';
import * as budgetsRepo from '@/repositories/budgets';
import * as accountsRepo from '@/repositories/accounts';
import * as transfersRepository from '@/repositories/transfers';
import { handleApiError } from '@/api/errors';
import { flushPromises } from '@vue/test-utils';

jest.mock('@/api/errors', () => ({
  handleApiError: jest.fn(),
}));

jest.mock('@/support/alert', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const budgetAccount = factories.account.budget().build();
const trackingAccount = factories.account.tracking().build();

const allAccounts = [budgetAccount, trackingAccount];
const origin = budgetAccount;

const budget = factories.budget.build();
const originTransaction = factories.transfer.origin().build();

const factory = (args = {}) => {
  accountsRepo.accounts.value = allAccounts;
  budgetsRepo.openBudget.value = budget;
  transfersRepository.createTransfer = jest.fn();
  transfersRepository.deleteTransfer = jest.fn();

  return setupComponent(TransferDetails, {
    props: {
      origin: 'origin' in args ? args.origin : origin,
      show: true,
      transaction: args.transaction,
    },
    stubs: {
      transition: false,
    },
    withMount: true,
  });
};

describe('TransferDetails', () => {
  beforeAll(() => MockDate.set(new Date()));
  afterAll(() => MockDate.reset());

  it('renders reference-at datepicker', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='reference-at']");

    expect(item.props()).toMatchObject({
      format: budget.dateFormat,
      label: expect.stringMatching(/referenceAt/),
    });
  });

  it('renders amount input', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='amount']");

    expect(item.props()).toMatchObject({
      label: expect.stringMatching(/amount/),
    });
  });

  it('renders memo input', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='memo']");

    expect(item.props()).toMatchObject({
      label: expect.stringMatching(/memo/),
      tip: expect.stringMatching(/memoTip/),
    });
  });

  it('does not render delete button when creating transfers', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='delete-btn']");

    expect(item.exists()).toBe(false);
  });

  describe('origin account select', () => {
    it('is disabled when editing', () => {
      const wrapper = factory({ transaction: originTransaction });
      const item = wrapper.findComponent("[data-test='origin']");

      expect(item.props().disabled).toBeTruthy();
    });

    it('is disabled when origin account is present', () => {
      const wrapper = factory({ origin });
      const item = wrapper.findComponent("[data-test='origin']");

      expect(item.props().disabled).toBeTruthy();
    });

    it('is enabled otherwise', () => {
      const wrapper = factory({ origin: null, transaction: {} });
      const item = wrapper.findComponent("[data-test='origin']");

      expect(item.props()).toMatchObject({
        disabled: false,
        label: expect.stringMatching(/origin/),
        options: allAccounts.map((a) => ({ label: a.name, value: a.id })),
      });
    });
  });

  describe('destination account select', () => {
    it('is disabled when editing', () => {
      const wrapper = factory({ transaction: originTransaction });
      const item = wrapper.findComponent("[data-test='destination']");

      expect(item.props().disabled).toBeTruthy();
    });

    it('is enabled when editing', () => {
      const wrapper = factory({ origin: null, transaction: {} });
      const item = wrapper.findComponent("[data-test='destination']");

      expect(item.props().disabled).toBeFalsy();
    });
  });

  describe('when save button emits click', () => {
    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');
      await flushPromises();

      expect(wrapper.emitted().close).toBeTruthy();
    });

    it('alerts a success', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');
      await flushPromises();

      expect(alert.success).toHaveBeenCalled();
    });

    describe('and request fails', () => {
      it('handles api error', async () => {
        const wrapper = factory();
        const error = new Error();

        transfersRepository.createTransfer.mockResolvedValueOnce(
          Promise.reject(error),
        );

        await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');
        await flushPromises();

        expect(handleApiError).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('when delete button emits click', () => {
    it('calls deleteTransfer method', async () => {
      const wrapper = factory({ transaction: originTransaction });

      await wrapper.find("[data-test='delete-btn']").trigger('click');
      await flushPromises();

      expect(transfersRepository.deleteTransfer).toHaveBeenCalledWith({
        budgetId: budget.id,
        originTransactionId: originTransaction.id,
        destinationTransactionId: originTransaction.linkedTransactionId,
      });
    });

    it('alerts a success', async () => {
      const wrapper = factory({ transaction: originTransaction });

      await wrapper.find("[data-test='delete-btn']").trigger('click');
      await flushPromises();

      expect(alert.success).toHaveBeenCalledWith('general.deleted');
    });

    it('emits close', async () => {
      const wrapper = factory({ transaction: originTransaction });

      await wrapper.find("[data-test='delete-btn']").trigger('click');
      await flushPromises();

      expect(wrapper.emitted().close).toBeTruthy();
    });

    describe('and something fails', () => {
      it('alerts an error', async () => {
        const wrapper = factory({ transaction: originTransaction });
        transfersRepository.deleteTransfer.mockRejectedValueOnce(new Error());

        await wrapper.find("[data-test='delete-btn']").trigger('click');
        await flushPromises();

        expect(alert.error).toHaveBeenCalledWith(
          'TransferDetails.failedToDelete',
        );
      });
    });
  });
});
