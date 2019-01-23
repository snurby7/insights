import React from 'react';
import { Category } from 'ynab';

import { SiteUtility } from '../../utilities/site-utility';
import { YnabDataUtility } from '../../utilities/ynab-data-utility';
import SubCategory from './sub-category';

export interface CategoryHandlerProps {
  name: string;
  categories: Category[];
}

class CategoryHandler extends React.Component<CategoryHandlerProps> {
  public render() {
    const { categories, name } = this.props;
    return (
      <React.Fragment>
        <h3>
          {name}- ({YnabDataUtility.format(SiteUtility.accumulate(categories.map(x => x.activity)))})
        </h3>
        <SubCategory subCategories={categories} />
      </React.Fragment>
    );
  }
}

export default CategoryHandler;
