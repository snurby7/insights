import React from 'react';

import { YnabAgent } from '../../../agents';
import { ICategoryGroupWithCategories } from '../../../contracts';
import CategoryHandler from './CategoryGroupHandler';

export interface ICategoriesProps {
  /**
   * @description A given budgetId to get the categories for.
   * @type {string}
   * @memberof ICategoriesProps
   */
  budgetId: string;
}

export interface ICategoriesState {
  categories: ICategoryGroupWithCategories[];
}

class CategoryGroupWithCategories extends React.Component<ICategoriesProps, ICategoriesState> {
  public state = {
    categories: [] as ICategoryGroupWithCategories[],
  };
  public render() {
    const { categories } = this.state;
    return (
      <div>
        <h2>Categories</h2>

        {categories.map(category => (
          <CategoryHandler key={category.id} categories={category.categories} {...category} />
        ))}
      </div>
    );
  }

  public componentDidMount() {
    const { budgetId } = this.props;
    YnabAgent.getCategoriesByBudgetId(budgetId).then(categories => {
      this.setState({ categories });
    });
  }
}

export default CategoryGroupWithCategories;
