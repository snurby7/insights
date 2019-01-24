import { IYnabAppDrawerListItem } from '../common/ynab-app-drawer';

export interface ISiteState {
  navItems?: IYnabAppDrawerListItem[]; // TODO this can have a type once it abstracts in the drawer
  budgetId?: string;
}
