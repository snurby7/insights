import { connect } from 'react-redux';

import { ISiteReducers } from '../../contracts/site-reducers.interface';
import UserManagement from './user-management';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleUsersComponent = connect(
  mapStateToProps,
  null
)(UserManagement);
