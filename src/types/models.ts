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
  groupName: string;
  id: string;
  isRecurring: boolean;
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

export interface StatementItem {
  id: string;
  amount: number;
  categoryId: string;
  clearedAt: NullishDate;
  memo: string | null;
  monthlyBudgetId: string | null;
  account: Account;
  accountId: string;
  outflow: boolean;
  referenceAt: string;
  unsignedAmount: number;
}

export interface Transaction extends StatementItem {
  payee: Payee;
  payeeName: string;
  linkedTransactionId: null;
  linkedTransactionAccountId: null;
}

export interface Transfer extends StatementItem {
  payee: null;
  payeeName: null;
  linkedTransactionId: string;
  linkedTransactionAccountId: string;
}

export type Transactionable = Transaction | Transfer;

export type TransferType =
  | 'spending' // Moving money into a tracking account requires a budget
  | 'income' // Moving money out of tracking accounts make it available to budget
  | 'rebalance'; // Moving money between accounts of same type is just a balance update

export interface User {
  id?: string;
  defaultBudgetId: string;
  email: string;
  name: string;
}
