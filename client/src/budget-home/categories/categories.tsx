import React from 'react';

import YnabAgent from '../../agents/ynab-agent';
import { ICategory } from '../../contracts/category.interface';
import CategoryHandler from './category-handler';

export interface ICategoriesProps {
  budgetId: string;
}

export interface ICategoriesState {
  categories: ICategory[]; // TODO interface ICategories[]
}

class Categories extends React.Component<ICategoriesProps, ICategoriesState> {
  public state = {
    categories: [] as ICategory[],
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

export default Categories;
