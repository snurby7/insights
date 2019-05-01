import { connect } from 'react-redux';

import { ISiteReducers } from '../../../../contracts';
import budgetHome from './BudgetHomePage';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

const VisibleBudgetHomePage = connect(
  mapStateToProps,
  null
)(budgetHome);

export default VisibleBudgetHomePage;
