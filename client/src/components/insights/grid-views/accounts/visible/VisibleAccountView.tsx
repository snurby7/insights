import { connect } from 'react-redux';

import { ISiteReducers } from '../../../../../contracts';
import AccountView from '../view/AccountView';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleAcountView = connect(
  mapStateToProps,
  null
)(AccountView);
