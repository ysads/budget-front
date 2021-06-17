import currencies from '@/support/currencies';
import faker from 'faker';
import { sample } from '@/support/collection';
import { Factory } from 'fishery';

export default Factory.define<string>(({ params }: any) => {
  const currency = params.currency || sample(Object.values(currencies));
  const units = params.units || faker.datatype.number(5000);
  const cents = params.cents || faker.datatype.number(99);

  return `${currency} ${units},${cents}`;
});
