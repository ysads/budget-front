import accounting from 'accounting';
import factories from '#/factories';
import * as money from '@/support/money';
import { Currency } from '@/support/currencies';
import { AccountTotal } from '@/types/models';

describe('Money', () => {
  describe('#cleanMask', () => {
    it('converts string with decimal and thousands markers to float', () => {
      const budget = factories.budget.build({ currency: 'GBP' });

      expect(money.cleanMask('5.452,96', budget)).toStrictEqual(5452.96);
      expect(money.cleanMask('£ 5.452,96', budget)).toStrictEqual(5452.96);
    });
  });

  describe('#currencyToCents', () => {
    it('cleans formatted value converting it to cents', () => {
      const budget = factories.budget.build();

      expect(money.currencyToCents('5.452,96', budget)).toStrictEqual(545296);
      expect(money.currencyToCents(5452.96, budget)).toStrictEqual(545296);
      expect(money.currencyToCents(545296, budget)).toStrictEqual(54529600);
    });
  });

  describe('#currencySettings', () => {
    it('maps a budget to an object with currency mapped to its symbol', () => {
      const mockBudget = { currency: 'JPY' as Currency };

      expect(money.currencySettings(mockBudget)).toEqual({
        decimal: ',',
        thousands: '.',
        prefix: '¥ ',
        precision: 2,
      });
    });
  });

  describe('#fromCents', () => {
    it('is unities representation of a given amount in cents', () => {
      expect(money.fromCents(-200)).toStrictEqual(-2.0);
      expect(money.fromCents(0)).toStrictEqual(0.0);
      expect(money.fromCents(23405)).toStrictEqual(234.05);
    });
  });

  describe('#toCents', () => {
    it('is the cents representation of a given amount in unities', () => {
      expect(money.toCents(-2.0)).toStrictEqual(-200);
      expect(money.toCents(0)).toStrictEqual(0);
      expect(money.toCents(234.05)).toStrictEqual(23405);
    });
  });

  describe('#totalBalance', () => {
    it('sums the value of each account at a particular field', () => {
      const accounts = factories.account.buildList(3);
      const fields: AccountTotal[] = [
        'balance',
        'clearedBalance',
        'unclearedBalance',
      ];

      fields.map((field) => {
        const sum =
          accounts[0][field] + accounts[1][field] + accounts[2][field];

        expect(money.totalBalance(accounts, field)).toEqual(sum);
      });
    });

    describe('when accounts array is empty', () => {
      it('is zero', () => {
        const fields: AccountTotal[] = [
          'balance',
          'clearedBalance',
          'unclearedBalance',
        ];

        fields.map((field) => {
          expect(money.totalBalance([], field)).toEqual(0);
        });
      });
    });
  });

  describe('#localize', () => {
    it('formats at value using budget settings using account', () => {
      const value = 29800;
      const budget = factories.budget.build();
      const settings = money.currencySettings(budget);

      accounting.formatMoney = jest.fn();
      money.localize(value, budget);

      expect(accounting.formatMoney).toHaveBeenCalledWith(
        money.fromCents(value),
        settings.prefix,
        settings.precision,
        settings.thousands,
        settings.decimal,
      );
    });
  });

  describe('#balanceClasses', () => {
    describe('when value is greater than or equals to 0', () => {
      it('is `positive`', () => {
        expect(money.balanceClasses(5)).toEqual('positive');
        expect(money.balanceClasses(0)).toEqual('positive');
        expect(money.balanceClasses(1.5)).toEqual('positive');
      });
    });

    describe('when value is smaller than 0', () => {
      it('is `negative`', () => {
        expect(money.balanceClasses(-5)).toEqual('negative');
        expect(money.balanceClasses(-1.5)).toEqual('negative');
      });
    });
  });
});
