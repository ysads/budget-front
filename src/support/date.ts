import { IsoMonth, MonthNumber } from '@/types/models';

export const isoMonth = (date: Date): IsoMonth => {
  const month = date.getMonth() + 1;
  const formattedMonth =
    month < 10 ? (`0${month}` as MonthNumber) : (String(month) as MonthNumber);

  return `${date.getFullYear()}-${formattedMonth}`;
};

export const isoMonthToDate = (isoMonth: IsoMonth): Date => {
  const [year, month] = isoMonth.split('-');

  return new Date(parseInt(year), parseInt(month) - 1, 1, 0, 0, 0);
};

export const addMonths = (date: Date, numberOfMonths: number): Date => {
  const newDate = new Date(date);

  newDate.setMonth(date.getMonth() + numberOfMonths);

  return newDate;
};
