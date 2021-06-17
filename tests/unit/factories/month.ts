import faker from 'faker';
import { Factory } from 'fishery';
import { IsoMonth, Month, MonthNumber } from '@/types/models';
import { sample } from '@/support/collection';

const MONTHS: MonthNumber[] = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const randomMonth = (): IsoMonth => {
  const years = [2019, 2020, 2021];
  const month = sample(MONTHS);

  return `${sample(years)}-${month}` as IsoMonth;
};

export default Factory.define<Month>(() => {
  return {
    id: faker.datatype.uuid(),
    budgeted: faker.datatype.number(3000),
    activity: faker.datatype.number(6500),
    income: faker.datatype.number(5000),
    isoMonth: randomMonth(),
    toBeBudgeted: faker.datatype.number(6000),
  };
});
