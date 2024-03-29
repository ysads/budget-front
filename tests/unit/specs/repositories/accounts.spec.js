import * as api from '@/api';
import * as repository from '@/repositories/accounts';
import * as monthRepository from '@/repositories/months';
import factories from '#/factories';
import omit from 'lodash/omit';

const budget = factories.budget.build();

describe('AccountRepository', () => {
  beforeEach(() => {
    repository.accounts.value = [];
    monthRepository.refreshMonth = jest.fn();
  });

  describe('#getAccounts', () => {
    it('dispatches a GET to api', async () => {
      await repository.getAccounts({ budgetId: budget.id });

      expect(api.get).toHaveBeenCalledWith(`budgets/${budget.id}/accounts`);
    });

    it('commits to accounts object', async () => {
      const accounts = factories.account.buildList(2);

      api.get.mockResolvedValueOnce(accounts);

      await repository.getAccounts({ budgetId: budget.id });

      expect(repository.accounts.value).toEqual(accounts);
    });
  });

  describe('#createAccount', () => {
    it('dispatches a GET to api', async () => {
      const params = {
        budgetId: budget.id,
      };
      await repository.createAccount(params);

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budget.id}/accounts`,
        omit(params, 'budgetId'),
      );
    });

    it('conjoins newly-created account to accounts object', async () => {
      const params = {
        budgetId: budget.id,
        ...factories.account.build(),
      };

      const previousAccounts = factories.account.buildList(2);
      const newAccount = factories.account.build();

      repository.accounts.value = previousAccounts;
      api.post.mockResolvedValueOnce(newAccount);

      await repository.createAccount(params);

      expect(repository.accounts.value).toEqual([
        ...previousAccounts,
        newAccount,
      ]);
    });

    it('refreshes month', async () => {
      const params = {
        budgetId: budget.id,
      };
      await repository.createAccount(params);

      expect(monthRepository.refreshMonth).toHaveBeenCalled();
    });
  });

  describe('#budgetAccounts', () => {
    it('returns only accounts with nature `budget`', () => {
      const accounts = [
        factories.account.budget().build(),
        factories.account.tracking().build(),
      ];

      repository.accounts.value = accounts;

      expect(repository.budgetAccounts.value).toContainEqual(accounts[0]);
    });
  });

  describe('#budgetAccounts', () => {
    it('returns only accounts with nature `tracking`', () => {
      const accounts = [
        factories.account.budget().build(),
        factories.account.tracking().build(),
      ];

      repository.accounts.value = accounts;

      expect(repository.trackingAccounts.value).toContainEqual(accounts[1]);
    });
  });

  describe('#getAccountById', () => {
    it('returns the account matching given id', () => {
      const accounts = factories.account.buildList(2);

      repository.accounts.value = accounts;

      expect(repository.getAccountById(accounts[0].id)).toEqual(accounts[0]);
    });
  });

  describe('#upsertAccount', () => {
    it('adds a new account', () => {
      const newAccount = factories.account.build();

      repository.upsertAccount(newAccount);

      expect(repository.accounts.value).toContainEqual(newAccount);
    });

    it('updates an existing account', () => {
      const account = factories.account.build();
      repository.accounts.value = [factories.account.build()];

      const newAccount = { ...account, clearedBalance: 0 };

      repository.upsertAccount(newAccount);

      expect(repository.accounts.value).toContainEqual(newAccount);
    });
  });
});
