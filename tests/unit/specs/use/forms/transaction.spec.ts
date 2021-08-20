import MockDate from 'mockdate';
import factories from '#/factories';
import useTransactionForm, {
  ApiTransactionForm,
} from '@/use/forms/transaction';
import { currencySettings } from '@/support/money';
import { reactive, ref } from 'vue';
import { Account, NullishDate, Transaction } from '@/types/models';
import {
  createTransaction,
  updateTransaction,
} from '@/repositories/transactions';

jest.mock('@/repositories/transactions', () => ({
  createTransaction: jest.fn(),
  updateTransaction: jest.fn(),
}));

const originAccount = factories.account.build();
const transaction = factories.transaction.build({
  unsignedAmount: 2550,
  outflow: true,
});
const budget = factories.budget.build();
const moneySettings = currencySettings(budget);

describe('useTransactionForm', () => {
  beforeAll(() => MockDate.set('2021-01-01'));
  afterAll(() => MockDate.reset());

  describe('#form', () => {
    describe('when isEdit is true', () => {
      it('formats amount and date fields', () => {
        const { form } = useTransactionForm({
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
          originId: transaction.originId,
        });
      });
    });

    it('has defaults for amount and date fields', () => {
      const { form } = useTransactionForm({
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

    describe('when categoryId changes', () => {
      describe('and new value is blank', () => {
        it('sets outflow to false', () => {
          const reactiveTransaction = reactive({ ...transaction });
          const { form } = useTransactionForm({
            props: { transaction: reactiveTransaction },
            isEdit: ref(true),
            moneySettings,
          });

          expect(form).toMatchObject({
            categoryId: reactiveTransaction.categoryId,
            outflow: true,
          });

          reactiveTransaction.categoryId = '';

          // FIXME: see #334
          setTimeout(() => {
            expect(form).toMatchObject({
              categoryId: '',
              outflow: false,
            });
          }, 200);
        });
      });

      it('keeps form own outflow otherwise', () => {
        const reactiveTransaction = reactive({ ...transaction });
        const { form } = useTransactionForm({
          props: { transaction: reactiveTransaction },
          isEdit: ref(true),
          moneySettings,
        });

        expect(form).toMatchObject({
          categoryId: reactiveTransaction.categoryId,
          outflow: true,
        });

        reactiveTransaction.categoryId = 'fake-uuid';

        // FIXME: see #334
        setTimeout(() => {
          expect(form).toMatchObject({
            categoryId: 'faker-uuid',
            outflow: true,
          });
        }, 200);
      });
    });

    describe('when transaction has no originId', () => {
      describe('but account prop is present', () => {
        it('uses account id as originId', () => {
          const { form } = useTransactionForm({
            props: { originAccount, transaction: {} as Transaction },
            isEdit: ref(false),
            moneySettings,
          });

          expect(form.originId).toEqual(originAccount.id);
        });
      });

      describe('and no account prop is present', () => {
        it('defaults account id to empty string', () => {
          const { form } = useTransactionForm({
            props: {
              originAccount: {} as Account,
              transaction: {} as Transaction,
            },
            isEdit: ref(false),
            moneySettings,
          });

          expect(form.originId).toEqual('');
        });
      });
    });
  });

  describe('#saveForm', () => {
    it('calls updateTransaction for edits', () => {
      const { saveForm } = useTransactionForm({
        props: { transaction },
        isEdit: ref(true),
        moneySettings,
      });

      saveForm({} as ApiTransactionForm);

      expect(updateTransaction).toHaveBeenCalled();
    });

    it('calls createTransaction otherwise', () => {
      const { saveForm } = useTransactionForm({
        props: { transaction },
        isEdit: ref(false),
        moneySettings,
      });

      saveForm({} as ApiTransactionForm);

      expect(createTransaction).toHaveBeenCalled();
    });
  });

  describe('#resetForm', () => {
    it('clears form fields to default values', () => {
      const { form, resetForm } = useTransactionForm({
        props: { transaction },
        isEdit: ref(true),
        moneySettings,
      });

      expect(form).toMatchObject({
        amount: '25,50',
        categoryId: transaction.categoryId,
        id: transaction.id,
        memo: transaction.memo,
        payeeName: transaction.payeeName,
      });

      resetForm();

      expect(form).toMatchObject({
        amount: '0,00',
        categoryId: '',
        id: '',
        memo: '',
        payeeName: '',
      });
    });
  });

  describe('#saveMessage', () => {
    it('is `updated` when editing', () => {
      const { saveMessage } = useTransactionForm({
        props: { transaction },
        isEdit: ref(true),
        moneySettings,
      });

      expect(saveMessage.value).toMatch(/updated/);
    });

    it('is `created` otherwise', () => {
      const { saveMessage } = useTransactionForm({
        props: { transaction },
        isEdit: ref(false),
        moneySettings,
      });

      expect(saveMessage.value).toMatch(/created/);
    });
  });
});
