export const isoMonth = (date) => {
  const month = date.getMonth() + 1
  const formattedMonth = month < 10
    ? '0' + month
    : month

  return `${date.getFullYear()}-${formattedMonth}`
}

export const isoMonthToDate = (isoMonth) => {
  const [year, month] = isoMonth.split('-')

  return new Date(year, month - 1, 1, 0, 0, 0)
}

export const addMonths = (date, numberOfMonths) => {
  const newDate = new Date(date)

  newDate.setMonth(date.getMonth() + numberOfMonths)

  return newDate
}
