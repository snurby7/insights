import React from 'react';

import { FormatUtility } from '../../../utilities';
import RoutingButton, { ButtonDisplayType } from '../../common';
import { ICategoryItemProps } from './category-item-props.interface';

class CategoryItem extends React.Component<ICategoryItemProps> {
  public itemStyles = (categoryId: string): React.CSSProperties => ({
    color: categoryId === this.props.biggestCategoryId ? 'red' : 'black',
  });

  public render() {
    const { activity, id: categoryId, name: categoryName } = this.props;
    return (
      <React.Fragment>
        <RoutingButton displayType={ButtonDisplayType.Node} route={`/category/${categoryId}`}>
          {categoryName} - <strong style={this.itemStyles(categoryId)}> ({FormatUtility.toUSD(activity)})</strong>
        </RoutingButton>
      </React.Fragment>
    );
  }
}

export default CategoryItem;
