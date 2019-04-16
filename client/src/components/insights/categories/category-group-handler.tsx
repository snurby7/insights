import React from 'react';
import { Category } from 'ynab';

<<<<<<< HEAD:client/src/components/insights/categories/category-group-handler.tsx
import { SiteUtility, YnabDataUtility } from '../../../utilities';
=======
import { FormatUtility, SiteUtility } from '../../../utilities';
>>>>>>> categories-building-36:client/src/components/insights/categories/category-group-handler.tsx
import SubCategory from './sub-category';

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
