import { connect } from 'react-redux';

import { ISiteReducers } from '../contracts/site-reducers.interface';
import { YnabAppBarComponent } from './ynab-app-bar';

const mapStateToProps = (reducers: ISiteReducers) => {
  const { navItems = [] } = reducers.siteState;
  return { navItems };
};

export const VisibleYnabAppBar = connect(
  mapStateToProps,
  null
)(YnabAppBarComponent);
