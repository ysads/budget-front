import useI18n from '@/use/i18n';

describe('useI18n', () => {
  describe('#st', () => {
    it('returns a string prefixed with a scoped', () => {
      const { st } = useI18n('prefix');

      expect(st('hello')).toEqual('prefix.hello');
    });
  });
});
