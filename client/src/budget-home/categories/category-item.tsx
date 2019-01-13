import React from 'react';

import { YnabDataUtility } from '../../utilities/ynab-data-utility';

export interface CategoryItemProps {
  id: string;
  hidden: boolean;
  name: string;
  activity: number;
  biggestCategoryId: string;
}

export interface CategoryItemState {

}

class CategoryItem extends React.Component<CategoryItemProps, CategoryItemState> {
  constructor(props: CategoryItemProps) {
    super(props);
  }

  itemStyles = (categoryId: string) => ({
    color: categoryId === this.props.biggestCategoryId ? "red" : "black"
  });

  render() {
    const props = this.props;
    return ( <React.Fragment>
      {props.name} - <strong style={this.itemStyles(props.id)}>
          {" "}
          ({YnabDataUtility.format(props.activity)})
        </strong>
    </React.Fragment> );
  }
}

export default CategoryItem;