import { BehaviorSubject, Observable } from 'rxjs';

const BUDGET_STORAGE_KEY = 'insights_budgetId';

const budgetSubject = new BehaviorSubject<string>('');

export const budget$: Observable<string> = budgetSubject.asObservable();

export const setBudgetId = (budgetId: string) => {
  budgetSubject.next(budgetId);
  sessionStorage.setItem(BUDGET_STORAGE_KEY, budgetId);
};

export const getBudgetId = (): string => {
  return budgetSubject.value;
};

const existingBudgetId: string | null = sessionStorage.getItem(BUDGET_STORAGE_KEY);

if (existingBudgetId) {
  setBudgetId(existingBudgetId);
}
