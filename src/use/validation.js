import i18n from '@/plugins/i18n'

export const useValidation = () => {
  const touchFields = new WeakMap()

  const validate = (field) => {
    field.$reset()
    if (touchFields.has(field)) {
      clearTimeout(touchFields.get(field))
    }
    touchFields.set(field, setTimeout(field.$touch, 1000))
  }

  const hasError = (field, validator) => {
    return field.$error && !field[validator]
  }

  const errorMessage = (field) => {
    if (!field.$error) return ''

    const key = Object.keys(field.$params).find(key => !field[key])
    const params = field.$params[key]

    return i18n.t(`validations.${key}`, params)
  }

  const isValid = (v) => {
    v.$touch()
    return !v.$invalid
  }

  return { errorMessage, hasError, validate, isValid }
}
