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

  const isValid = (v) => {
    v.$touch()
    return !v.$invalid
  }

  return { hasError, validate, isValid }
}
