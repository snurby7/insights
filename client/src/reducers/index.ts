import { combineReducers } from 'redux';

import { InsightsNavBar } from './NavBarReducer';

const InsightAppStore = combineReducers({
  InsightsNavBar,
});

export default InsightAppStore;
