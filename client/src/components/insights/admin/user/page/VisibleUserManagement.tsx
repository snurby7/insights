import { connect } from 'react-redux';

import { ISiteReducers } from '../../../../../contracts';
import UserManagement from '../user-management/UserManagement';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleUsersComponent = connect(
  mapStateToProps,
  null
)(UserManagement);
