import CreateAccountModal from '@/components/accounts/CreateAccountModal';
import factories from '#/factories';
import faker from 'faker';
import flushPromises from 'flush-promises';
import sample from 'lodash/sample';
import setupComponent from '#/setup-component';
import { handleApiError } from '@/api/errors';
import { ACCOUNT_TYPES } from '@/constants/account';
import * as accountsRepository from '@/repositories/accounts';

jest.mock('@/api/errors', () => ({
  handleApiError: jest.fn(),
}));

jest.mock('@/support/alert', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const budget = factories.budget.build();
const form = {
  accountName: faker.finance.accountName(),
  accountType: sample(ACCOUNT_TYPES),
  currentBalance: '2940,90',
};

const factory = (args = {}) => {
  accountsRepository.createAccount =
    args.createAccount || jest.fn(() => Promise.resolve());

  return setupComponent(CreateAccountModal, {
    data: args.data,
    props: { budget: budget, show: true },
    withMount: true,
  });
};

describe.skip('CreateAccountModal', () => {
  it('renders account type select with an option for each account type', () => {
    const wrapper = factory();

    const item = wrapper.findComponent("[data-test='account-type']");

    expect(item.props().options.length).toEqual(ACCOUNT_TYPES.length);
  });

  it('renders account name input', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='account-name']");

    expect(item.props().label).toEqual('CreateAccountModal.accountName');
  });

  it('renders current balance input', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='current-balance']");

    expect(item.props()).toMatchObject({
      label: 'CreateAccountModal.currentBalance',
    });
  });

  describe('#accountTypes', () => {
    it('is an array with each account type and its label', () => {
      const wrapper = factory();
      const typesOptions = ACCOUNT_TYPES.map((type) => ({
        label: expect.stringMatching(`account.type.${type}`),
        value: type,
      }));

      expect(wrapper.vm.accountTypes).toEqual(typesOptions);
    });
  });

  describe('when BaseModal emits close', () => {
    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='modal']").vm.$emit('close');

      expect(wrapper.emitted().close).toBeTruthy();
    });
  });

  describe('when form is submitted', () => {
    it.skip('validates form', async () => {
      const wrapper = factory({ data: { form } });
      const isValid = jest.spyOn(wrapper.vm, 'isValid');

      await wrapper.find("[data-test='form']").trigger('submit.prevent');

      expect(isValid).toHaveBeenCalled();
    });

    it('calls createAccount with form', async () => {
      const createAccount = jest.fn();
      const wrapper = factory({ createAccount });

      await wrapper.find("[data-test='form']").trigger('submit.prevent');

      expect(createAccount).toHaveBeenCalledWith(
        expect.objectContaining({
          budgetId: budget.id,
          payeeName: expect.stringMatching(/startingBalance/),
        }),
      );
    });

    describe('and api fails', () => {
      it('handles api error', async () => {
        const error = new Error();
        const wrapper = factory({
          createAccount: jest.fn(() => Promise.reject(error)),
        });

        await wrapper.find("[data-test='form']").trigger('submit.prevent');

        await flushPromises();

        expect(handleApiError).toHaveBeenCalledWith(error);
      });
    });

    describe.skip('and validation fails', () => {
      it('does call createAccount', async () => {
        const createAccount = jest.fn();
        const wrapper = factory({
          data: { form },
          createAccount,
        });
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false);

        await wrapper.find("[data-test='form']").trigger('submit.prevent');

        expect(createAccount).not.toHaveBeenCalled();
      });
    });
  });
});
