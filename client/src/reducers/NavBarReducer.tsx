import { NavBarActions } from '../actions/nav-bar-actions';
import { IReducerAction } from '../contracts/reducer-action.interface';

export function InsightsNavBar(state = {}, action: IReducerAction) {
  switch (action.type) {
    case NavBarActions.UPDATE:
      return {};
    default:
      return state;
  }
}
