import useTip from '@/use/tip';

describe('useTip', () => {
  describe('#errorClass', () => {
    describe('when error prop is set', () => {
      it('returns `error`', () => {
        const { errorClass } = useTip({ error: 'an error' });

        expect(errorClass.value).toEqual('error');
      });
    });

    describe('when error prop is falsy', () => {
      it('returns empty string', () => {
        const { errorClass } = useTip({ error: undefined });

        expect(errorClass.value).toEqual('');
      });
    });
  });

  describe('#tipText', () => {
    describe('when error prop is present', () => {
      it('is error prop', () => {
        const { tipText } = useTip({ error: 'Invalid' });

        expect(tipText.value).toEqual('Invalid');
      });
    });

    describe('when tip prop is present but error is not', () => {
      it('is tip prop', () => {
        const { tipText } = useTip({ tip: 'A guide text' });

        expect(tipText.value).toEqual('A guide text');
      });
    });

    describe('when neither error nor tip props are present', () => {
      it('is falsy', () => {
        const { tipText } = useTip({ error: undefined, tip: undefined });

        expect(tipText.value).toBeFalsy();
      });
    });
  });

  describe('#tipVariant', () => {
    describe('when error prop is present', () => {
      it('equals to error', () => {
        const { tipVariant } = useTip({ error: 'Invalid' });

        expect(tipVariant.value).toEqual('error');
      });
    });

    it('defaults to info', () => {
      const { tipVariant } = useTip({ tip: 'A guide text' });

      expect(tipVariant.value).toEqual('info');
    });
  });
});
