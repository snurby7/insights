import React from 'react';

import YnabAgent from '../../agents/ynab-agent';
import CategoryHandler from './category-handler';

export interface ICategoriesProps {
  budgetId: string;
}

export interface ICategoriesState {
  categories: any[]; // TODO interface ICategories[]
}

class Categories extends React.Component<ICategoriesProps, ICategoriesState> {
  public state = {
    categories: [] as any[],
  };
  public render() {
    const { categories } = this.state;
    return (
      <div>
        <h2>Categories</h2>

        {categories.map(props => (
          <CategoryHandler key={props.id} {...props} />
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
