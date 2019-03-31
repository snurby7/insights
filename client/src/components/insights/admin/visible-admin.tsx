import { connect } from 'react-redux';

import { ISiteReducers } from '../../../contracts';
import AdminComponent from './admin';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleAdminComponent = connect(
  mapStateToProps,
  null
)(AdminComponent);
