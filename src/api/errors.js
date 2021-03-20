import alert from '@/support/alert'
import i18n from '@/plugins/i18n'

export const MAPPED_ERRORS = [
  'monthly-budgets/already-exists',
]

export const handleApiError = (err) => {
  const errorCode = err.response?.data?.code

  if (MAPPED_ERRORS.includes(errorCode)) {
    const [namespace, type] = errorCode.split('/')

    alert.error(i18n.t(`errors.${namespace}.${type}`))
  } else {
    alert.error(i18n.t('errors.generic'))
  }
  throw err
}
