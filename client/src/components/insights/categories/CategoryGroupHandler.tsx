import React from 'react';
import { Category } from 'ynab';

import { FormatUtility, SiteUtility } from '../../../utilities';
import SubCategory from './SubCategory';

export interface CategoryHandlerProps {
  name: string;
  categories: Category[];
}

class CategoryGroupHandler extends React.Component<CategoryHandlerProps> {
  public render() {
    const { categories, name } = this.props;
    return (
      <React.Fragment>
        <h3>
          {name}- ({FormatUtility.toUSD(SiteUtility.accumulate(categories.map(x => x.activity)))})
        </h3>
        <SubCategory subCategories={categories} />
      </React.Fragment>
    );
  }
}

export default CategoryGroupHandler;
