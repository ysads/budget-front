import alert from '@/support/alert';
import { handleApiError, MAPPED_ERRORS } from '@/api/errors';
import { sample } from '@/support/collection';

jest.mock('@/support/alert', () => ({
  error: jest.fn(),
}));

describe('handleApiError', () => {
  describe('when error is not mapped', () => {
    it('dispatches a generic error alert', () => {
      const error = { response: { data: { code: 'random-error' } } };

      expect(() => handleApiError(error)).toThrowError();
      expect(alert.error).toHaveBeenCalledWith('errors.generic');
    });

    it('throws error', () => {
      const error = { response: { data: { code: 'random-error' } } };

      expect(() => handleApiError(error)).toThrowError();
    });
  });

  describe('when response contains a mapped error code', () => {
    it('dispatches an error alert', () => {
      const code = sample(MAPPED_ERRORS);
      const [namespace, type] = code.split('/');
      const error = { response: { data: { code } } };

      expect(() => handleApiError(error)).toThrowError();
      expect(alert.error).toHaveBeenCalledWith(
        expect.stringMatching(`errors.${namespace}.${type}`),
      );
    });

    it('throws error', () => {
      const error = { response: { data: { code: sample(MAPPED_ERRORS) } } };

      expect(() => handleApiError(error)).toThrowError();
    });
  });
});
