import MockDate from 'mockdate';
import factories from '#/factories';
import useTransferForm from '@/use/forms/transfer';
import * as accountsRepository from '@/repositories/accounts';
import { currencySettings } from '@/support/money';
import { ref, nextTick } from 'vue';
import { createTransfer, updateTransfer } from '@/repositories/transfers';
import { ApiTransferMutation } from '@/types/api';
import { Account, NullishDate, Transfer } from '@/types/models';
import { sample } from '@/support/collection';

jest.mock('@/repositories/transfers', () => ({
  createTransfer: jest.fn(),
  updateTransfer: jest.fn(),
}));

const trackingAccount = factories.account.tracking().build();
const budgetAccount = factories.account.budget().build();

const origin = sample([trackingAccount, budgetAccount]);
const transaction = factories.transfer.build({
  unsignedAmount: 2550,
  outflow: true,
});
const budget = factories.budget.build();
const moneySettings = currencySettings(budget);

describe('useTransferForm', () => {
  beforeAll(() => {
    MockDate.set('2021-01-01');
    jest
      .spyOn(accountsRepository.accounts, 'value', 'get')
      .mockReturnValue([trackingAccount, budgetAccount]);
  });
  afterAll(() => MockDate.reset());

  describe('#form', () => {
    it('has defaults for amount and dates when not editing', () => {
      const { form } = useTransferForm({
        props: { transaction },
        isEdit: ref(false),
        moneySettings,
      });

      expect(form).toMatchObject({
        amount: '',
        referenceAt: new Date(),
        clearedAt: new Date().toISOString(),
      });
    });

    it('gets originId and destinationId from transaction', () => {
      const { form } = useTransferForm({
        props: { transaction },
        isEdit: ref(false),
        moneySettings,
      });

      expect(form).toMatchObject({
        destinationId: transaction.linkedTransactionAccountId,
        originId: transaction.accountId,
      });
    });

    describe('when is editing', () => {
      it('formats amount, account ids and date fields', () => {
        const { form } = useTransferForm({
          props: { transaction },
          isEdit: ref(true),
          moneySettings,
        });

        expect(form).toMatchObject({
          amount: '25,50',
          referenceAt: new Date(transaction.referenceAt),
          clearedAt: new Date(
            transaction.clearedAt || '',
          ).toISOString() as NullishDate,
        });
      });
    });

    describe('when transaction has no accountId', () => {
      describe('but account prop is present', () => {
        it('takes originId from origin prop', () => {
          const { form } = useTransferForm({
            props: { origin, transaction: {} as Transfer },
            isEdit: ref(false),
            moneySettings,
          });

          expect(form.originId).toEqual(origin.id);
        });
      });

      describe('and no origin prop is present', () => {
        it('defaults originId to empty string', () => {
          const { form } = useTransferForm({
            props: {
              origin: {} as Account,
              transaction: {} as Transfer,
            },
            isEdit: ref(false),
            moneySettings,
          });

          expect(form.originId).toEqual('');
        });
      });
    });

    describe('destinationTransactionId', () => {
      it('is the linkedTransactionId when transaction is outflow', () => {
        const transaction = factories.transfer.build({
          outflow: true,
        });
        const { form } = useTransferForm({
          props: {
            origin: {} as Account,
            transaction,
          },
          isEdit: ref(true),
          moneySettings,
        });

        expect(form.destinationTransactionId).toEqual(
          transaction.linkedTransactionId,
        );
      });

      it('is the own transactionId otherwise', () => {
        const transaction = factories.transfer.build({
          outflow: false,
        });
        const { form } = useTransferForm({
          props: {
            origin: {} as Account,
            transaction,
          },
          isEdit: ref(true),
          moneySettings,
        });

        expect(form.destinationTransactionId).toEqual(transaction.id);
      });
    });

    describe('originTransactionId', () => {
      it('is the linkedTransactionId when transaction is inflow', () => {
        const transaction = factories.transfer.build({
          outflow: false,
        });
        const { form } = useTransferForm({
          props: {
            origin: {} as Account,
            transaction,
          },
          isEdit: ref(true),
          moneySettings,
        });

        expect(form.originTransactionId).toEqual(
          transaction.linkedTransactionId,
        );
      });

      it('is the own transactionId otherwise', () => {
        const transaction = factories.transfer.build({
          outflow: true,
        });
        const { form } = useTransferForm({
          props: {
            origin: {} as Account,
            transaction,
          },
          isEdit: ref(true),
          moneySettings,
        });

        expect(form.originTransactionId).toEqual(transaction.id);
      });
    });

    describe('type', () => {
      describe('when both originId and destinationId have same nature', () => {
        it('uses `rebalance`type', async () => {
          const { form } = useTransferForm({
            props: { transaction },
            isEdit: ref(true),
            moneySettings,
          });

          form.originId = trackingAccount.id;
          form.destinationId = trackingAccount.id;
          await nextTick();

          expect(form.type).toEqual('rebalance');
        });
      });

      describe('when origin is tracking and destination is budget', () => {
        it('uses `income`type', async () => {
          const { form } = useTransferForm({
            props: { transaction },
            isEdit: ref(true),
            moneySettings,
          });

          form.originId = trackingAccount.id;
          form.destinationId = budgetAccount.id;
          await nextTick();

          expect(form.type).toEqual('income');
          expect(form.categoryId).toEqual('');
        });
      });

      it('uses `spending` type otherwise', async () => {
        const { form } = useTransferForm({
          props: { transaction },
          isEdit: ref(true),
          moneySettings,
        });

        form.originId = budgetAccount.id;
        form.destinationId = trackingAccount.id;
        await nextTick();

        expect(form.type).toEqual('spending');
      });
    });
  });

  describe('#resetForm', () => {
    it('clears form fields to default values', async () => {
      const { form, resetForm } = useTransferForm({
        props: { transaction },
        isEdit: ref(true),
        moneySettings,
      });

      expect(form).toMatchObject({
        amount: '25,50',
        categoryId: transaction.categoryId,
        destinationId: transaction.linkedTransactionAccountId,
        id: transaction.id,
        memo: transaction.memo,
        originId: transaction.accountId,
      });

      resetForm();

      // INFO: originId doesn't need to become an empty string since it will
      // be ovewritten when origin prop changes
      expect(form).toMatchObject({
        amount: '0,00',
        categoryId: '',
        destinationId: '',
        id: '',
        memo: '',
        originId: transaction.accountId,
      });
    });
  });

  describe('#saveForm', () => {
    it('calls updateTransfer for edits', () => {
      const { saveForm } = useTransferForm({
        props: { transaction },
        isEdit: ref(true),
        moneySettings,
      });

      saveForm({} as ApiTransferMutation);

      expect(updateTransfer).toHaveBeenCalled();
    });

    it('calls createTransfer otherwise', () => {
      const { saveForm } = useTransferForm({
        props: { transaction },
        isEdit: ref(false),
        moneySettings,
      });

      saveForm({} as ApiTransferMutation);

      expect(createTransfer).toHaveBeenCalled();
    });
  });

  describe('#saveMessage', () => {
    it('is `updated` when editing', () => {
      const { saveMessage } = useTransferForm({
        props: { transaction },
        isEdit: ref(true),
        moneySettings,
      });

      expect(saveMessage.value).toMatch(/updated/);
    });

    it('is `created` otherwise', () => {
      const { saveMessage } = useTransferForm({
        props: { transaction },
        isEdit: ref(false),
        moneySettings,
      });

      expect(saveMessage.value).toMatch(/created/);
    });
  });
});
