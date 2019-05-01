import { IReducerAction } from '../../../../contracts';

export interface IBudgetHomePageProps {
  budgetId: string;
  dispatch: (action: IReducerAction) => void;
  classes: Record<string, string>;
}
