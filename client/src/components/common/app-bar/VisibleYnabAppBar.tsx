import { connect } from 'react-redux';

import { ISiteReducers } from '../../../contracts';
import { IYnabAppBarProps, YnabAppBarComponent } from './YnabAppBar';

const mapStateToProps = (reducers: ISiteReducers): Partial<IYnabAppBarProps> => {
  const { budgetId = '' } = reducers.siteState;
  return { budgetId };
};

export const VisibleYnabAppBar = connect(
  mapStateToProps,
  null
)(YnabAppBarComponent);
