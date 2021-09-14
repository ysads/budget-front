import { Currency } from '@/support/currencies';

export type NullishDate = string | null | undefined;

export type AccountNature = 'tracking' | 'budget';

export type AccountTotal = 'clearedBalance' | 'unclearedBalance' | 'balance';

export type AccountType = 'asset' | 'cash' | 'checking' | 'credit' | 'savings';

export interface Account {
  id: string;
  balance: number;
  budgetId?: string;
  clearedBalance: number;
  closedAt: NullishDate;
  isBudget: boolean;
  isTracking: boolean;
  name: string;
  nature: AccountNature;
  type: AccountType;
  unclearedBalance: number;
}

export interface Budget {
  id: string;
  currency: Currency;
  dateFormat: string;
  name: string;
}

export interface CategoryGroup {
  budgetId: string;
  id: string;
  name: string;
}

export interface Category {
  budgetId: string;
  categoryGroupId: string;
  id: string;
  name: string;
}

export type MonthNumber =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';

export type IsoMonth = `${number}-${MonthNumber}`;

export interface Month {
  id: string;
  activity: number;
  budgeted: number;
  budgetId: string;
  income: number;
  isoMonth: IsoMonth;
  toBeBudgeted: number;
}

export interface MonthlyBudget {
  id: string;
  activity: number;
  available: number;
  budgeted: number;
  categoryId: string;
  categoryGroupId: string;
  monthId: string;
}

export interface Payee {
  id: string;
  name: string;
}

export interface Transaction {
  id?: string;
  amount: number;
  categoryId?: string;
  clearedAt: NullishDate;
  destinationId: string | undefined;
  memo: string | undefined;
  monthlyBudgetId: string | undefined;
  account: Account;
  accountId: string | undefined;
  outflow: boolean;
  payee: Payee;
  payeeName: string;
  referenceAt: string;
  unsignedAmount: number;
}

export interface User {
  id?: string;
  defaultBudgetId: string;
  email: string;
  name: string;
}
