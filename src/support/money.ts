import accounting from 'accounting';
import currencies, { Currency } from './currencies';
import { Budget } from '@/types/models';
import { Account, AccountTotal } from '@/types/models';

interface Currenciable {
  currency: Currency;
}

interface CurrencySettings {
  decimal: string;
  thousands: string;
  prefix: string;
  precision: number;
}

export const currencySettings = ({ currency }: Currenciable) => ({
  decimal: ',',
  thousands: '.',
  prefix: `${currencies[currency]} `,
  precision: 2,
});

export const fromCents = (cents: number): number => cents / 100.0;

export const toCents = (units: number): number => units * 100;

export const cleanMask = (value: string, budget: Budget) => {
  const settings = currencySettings(budget);

  return parseFloat(
    value
      .replace(settings.thousands, '')
      .replace(settings.decimal, '.')
      .replace(settings.prefix, ''),
  );
};

export const currencyToCents = (value: number | string, budget: Budget) => {
  const unmasked = typeof value === 'number' ? value : cleanMask(value, budget);

  return toCents(unmasked);
};

export const totalBalance = (accounts: Account[], field: AccountTotal) => {
  if (!accounts.length) return 0;

  return accounts
    .map((a: Account) => a[field])
    .reduce((total, balance) => total + balance);
};

export const localize = (value: number, budget: Budget) => {
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

  return accounting.formatMoney(
    fromCents(value),
    prefix,
    settings.precision,
    settings.thousands,
    settings.decimal,
  );
};

export const balanceClasses = (val: number) => {
  return val >= 0 ? 'positive' : 'negative';
};
