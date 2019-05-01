import { connect } from 'react-redux';

import { ISiteReducers } from '../../../../../contracts';
import AdminComponent from './AdminPage';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleAdminPage = connect(
  mapStateToProps,
  null
)(AdminComponent);
