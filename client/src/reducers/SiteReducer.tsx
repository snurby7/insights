import { SiteActions } from '../actions/site-actions';
import { IReducerAction, ISiteState } from '../contracts';

function siteState(state: ISiteState = {}, action: IReducerAction) {
  const sessionStorageBudgetId = sessionStorage.getItem('budgetId');
  if (sessionStorageBudgetId) {
    state.budgetId = sessionStorageBudgetId as string;
  }
  switch (action.type) {
    case SiteActions.UPDATE_SELECTED_BUDGET:
      sessionStorage.setItem('budgetId', action.payload.budgetId);
      return Object.assign({}, state, { budgetId: action.payload.budgetId });
    default:
      return state;
  }
}

export default siteState;
