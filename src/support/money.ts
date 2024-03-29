import accounting from 'accounting';
import currencies, { Currency } from './currencies';
import { Budget } from '@/types/models';
import { Account, AccountTotal } from '@/types/models';

interface Currenciable {
  currency: Currency;
}

export type NonZeroableBalance = 'positive' | 'negative';
export type ZeroableBalance = NonZeroableBalance | 'zero';

export interface CurrencySettings {
  decimal: string;
  thousands: string;
  prefix: string;
  precision: number;
}

export const currencySettings = ({
  currency,
}: Currenciable): CurrencySettings => ({
  decimal: ',',
  thousands: '.',
  prefix: `${currencies[currency]}`,
  precision: 2,
});

export const fromCents = (cents: number): number => cents / 100.0;

export const toCents = (units: number): number => units * 100;

export const cleanMask = (value: string, budget: Budget): number => {
  const settings = currencySettings(budget);

  return parseFloat(
    value
      .replace(settings.thousands, '')
      .replace(settings.decimal, '.')
      .replace(settings.prefix, ''),
  );
};

export const currencyToCents = (
  value: number | string,
  budget: Budget,
): number => {
  const unmasked = typeof value === 'number' ? value : cleanMask(value, budget);

  return toCents(unmasked);
};

export const totalBalance = (
  accounts: Account[],
  field: AccountTotal,
): number => {
  if (!accounts.length) return 0;

  return accounts
    .map((a: Account) => a[field])
    .reduce((total, balance) => total + balance);
};

export const localize = (value: number, budget: Budget): string => {
  const settings = currencySettings(budget);

  return accounting.formatMoney(
    fromCents(value),
    settings.prefix,
    settings.precision,
    settings.thousands,
    settings.decimal,
  );
};

export const format = (
  value: number,
  settings: CurrencySettings,
  withCurrency = true,
): string => {
  const prefix = withCurrency ? settings.prefix : '';

  return accounting.formatMoney(fromCents(value), {
    symbol: prefix,
    precision: settings.precision,
    thousand: settings.thousands,
    decimal: settings.decimal,
    format: {
      pos: '%s%v',
      neg: '-%s%v',
      zero: '%s0,00',
    },
  });
};

export const balanceClasses = (val: number): NonZeroableBalance => {
  return val >= 0 ? 'positive' : 'negative';
};
