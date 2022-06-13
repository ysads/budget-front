import * as api from '@/api';
import * as repository from '@/repositories/auth';
import factories from '#/factories';
import faker from 'faker';

describe('AuthRepository', () => {
  beforeEach(() => {
    repository.currentUser.value = {};
  });

  describe('#getMe', () => {
    it('dispatches a GET to api', async () => {
      await repository.getMe();

      expect(api.get).toHaveBeenCalledWith('me');
    });

    it('updates monthly budgets with newly-created resource', async () => {
      const currentUser = factories.currentUser.build();

      api.get.mockResolvedValueOnce(currentUser);

      await repository.getMe();

      expect(repository.currentUser.value).toEqual(currentUser);
    });

    describe('when there is already a current user', () => {
      it('does not dispatch a GET to api', async () => {
        repository.currentUser.value = factories.currentUser.build();

        await repository.getMe();

        expect(api.get).not.toHaveBeenCalled();
      });
    });
  });

  describe('#updateToken', () => {
    it('saves the given token to local storage', () => {
      repository.updateAuthToken('T0k3ń');

      expect(localStorage.getItem('auth_token')).toEqual('T0k3ń');
    });
  });
});
