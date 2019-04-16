import { connect } from 'react-redux';

import { ISiteReducers } from '../../../../../contracts';
import CategoryView from '../category-view';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleCategoryView = connect(
  mapStateToProps,
  null
)(CategoryView);
