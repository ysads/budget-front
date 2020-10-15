import { useI18n as baseI18n } from 'vue-i18n-composable'

export const useI18n = (scope) => {
  const i18n = baseI18n()
  const st = (path, args = {}) => i18n.t(`${scope}.${path}`, args)

  return {
    ...i18n,
    st,
  }
}
