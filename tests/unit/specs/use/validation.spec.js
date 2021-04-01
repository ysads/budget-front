import { useValidation } from '@/use/validation'
import i18n from '@/plugins/i18n'
import sample from 'lodash/sample'

jest.mock('@/plugins/i18n', () => ({
  t: (str, params) => `${str}${JSON.stringify(params)}`,
}))

describe('useValidation', () => {
  describe('#hasError', () => {
    describe('when $error is false', () => {
      it('is always false', () => {
        const { hasError } = useValidation()
        const field = {
          $error: false,
          validator: sample([false, true]),
        }

        expect(hasError(field, 'validator')).toBe(false)
      })
    })

    describe('when $error is true and validator is true', () => {
      it('is false', () => {
        const { hasError } = useValidation()
        const field = {
          $error: true,
          validator: true,
        }

        expect(hasError(field, 'validator')).toBe(false)
      })
    })

    describe('when $error is true and validator is false', () => {
      it('is true', () => {
        const { hasError } = useValidation()
        const field = {
          $error: true,
          validator: false,
        }

        expect(hasError(field, 'validator')).toBe(true)
      })
    })
  })

  describe('#isValid', () => {
    it('touches the validations object', () => {
      const v = {
        $touch: jest.fn(),
        $invalid: sample([true, false]),
      }
      const { isValid } = useValidation()

      isValid(v)

      expect(v.$touch).toHaveBeenCalled()
    })

    describe('when object is invalid', () => {
      it('is false', () => {
        const v = {
          $touch: jest.fn(),
          $invalid: true,
        }
        const { isValid } = useValidation()

        expect(isValid(v)).toBe(false)
      })
    })

    describe('when object is not invalid', () => {
      it('is true', () => {
        const v = {
          $touch: jest.fn(),
          $invalid: false,
        }
        const { isValid } = useValidation()

        expect(isValid(v)).toBe(true)
      })
    })
  })

  describe('#validate', () => {
    it('resets field validation', () => {
      const field = {
        $reset: jest.fn(),
      }
      const { validate } = useValidation()
      validate(field)

      expect(field.$reset).toHaveBeenCalled()
    })

    it('delays field touching', () => {
      const field = {
        $reset: jest.fn(),
        $touch: jest.fn(),
      }
      const { validate } = useValidation()

      jest.useFakeTimers()
      validate(field)
      jest.advanceTimersByTime(1000)

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000)
      expect(field.$touch).toHaveBeenCalled()
    })

    describe('when validate is called more than once within delay time', () => {
      it('clears the timeout', () => {
        jest.useFakeTimers()

        const field = {
          $reset: jest.fn(),
          $touch: jest.fn(),
        }
        const { validate } = useValidation()

        validate(field)
        jest.advanceTimersByTime(500)
        validate(field)
        jest.advanceTimersByTime(500)

        expect(clearTimeout).toHaveBeenCalled()
      })

      it('reset the timeout', () => {
        jest.useFakeTimers()

        const field = {
          $reset: jest.fn(),
          $touch: jest.fn(),
        }
        const { validate } = useValidation()

        validate(field)
        jest.advanceTimersByTime(500)
        validate(field)
        jest.advanceTimersByTime(500)

        expect(field.$touch).not.toHaveBeenCalled()
        expect(setTimeout).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('#errorMessage', () => {
    it('interpolates error message for first failed rule using params', () => {
      const { errorMessage } = useValidation()
      const field = {
        $error: true,
        $params: {
          ruleOne: { min: 1, max: 2 },
          ruleTwo: { type: 'required' },
        },
        ruleOne: false,
        ruleTwo: false,
      }

      expect(errorMessage(field)).toEqual(
        'validations.ruleOne{"min":1,"max":2}',
      )
    })

    describe('when there is no error on field', () => {
      it('returns []', () => {
        const { errorMessage } = useValidation()
        const field = { $error: false }

        expect(errorMessage(field)).toEqual('')
      })
    })
  })
})
