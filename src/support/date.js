export const isoMonth = (date) => {
  const month = date.getMonth() + 1
  const formattedMonth = month < 10
    ? '0' + month
    : month

  return `${date.getFullYear()}-${formattedMonth}`
}

export const isoMonthToDate = (isoMonth) => {
  const newDate = new Date(isoMonth)

  newDate.setMonth(newDate.getMonth() + 1)
  newDate.setDate(0)

  return newDate
}

export const addMonths = (date, numberOfMonths) => {
  const newDate = new Date(date)

  newDate.setMonth(date.getMonth() + numberOfMonths)

  return newDate
}
