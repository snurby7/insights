import { connect } from 'react-redux';

import { ISiteReducers } from '../../../../../contracts';
import AccountView from '../components/AccountView';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleAccountView = connect(
  mapStateToProps,
  null
)(AccountView);
