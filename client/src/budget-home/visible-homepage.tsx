import { connect } from 'react-redux';

import { ISiteReducers } from '../contracts/site-reducers.interface';
import budgetHome from './budget-home';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleBudgetHomePage = connect(
  mapStateToProps,
  null
)(budgetHome);
