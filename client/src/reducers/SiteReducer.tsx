import { SiteActions } from '../actions/site-actions';
import { IReducerAction } from '../contracts/reducer-action.interface';
import { ISiteState } from '../contracts/site-state.interface';

function siteState(state: ISiteState = {}, action: IReducerAction) {
  switch (action.type) {
    case SiteActions.UPDATE_SELECTED_BUDGET:
      return Object.assign({}, state, { budgetId: action.payload.budgetId });
    default:
      return state;
  }
}

export default siteState;
