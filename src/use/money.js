import * as Money from '@/support/money'

export const useMoney = () => {
  const balanceClasses = (val) => {
    return val >= 0 ? 'positive' : 'negative'
  }

  return { ...Money, balanceClasses }
}
