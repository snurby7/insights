import { connect } from 'react-redux';

import { ISiteReducers } from '../../../../contracts';
import CategoryViewPage from './CategoryViewPage';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

const VisibleCategoryViewPage = connect(
  mapStateToProps,
  null
)(CategoryViewPage);

export default VisibleCategoryViewPage;
