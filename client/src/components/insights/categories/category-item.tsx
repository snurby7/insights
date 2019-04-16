import React from 'react';
import { Category } from 'ynab';

import { FormatUtility } from '../../../utilities';

export interface CategoryItemProps extends Category {
  biggestCategoryId: string;
}

class CategoryItem extends React.Component<CategoryItemProps> {
  constructor(props: CategoryItemProps) {
    super(props);
  }

  public itemStyles = (categoryId: string) => ({
    color: categoryId === this.props.biggestCategoryId ? 'red' : 'black',
  });

  public render() {
    const props = this.props;
    return (
      <React.Fragment>
        {props.name} - <strong style={this.itemStyles(props.id)}> ({FormatUtility.toUSD(props.activity)})</strong>
      </React.Fragment>
    );
  }
}

export default CategoryItem;
