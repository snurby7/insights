import React from "react";
import PropTypes from "prop-types";

import YnabAgent from "../../agents/ynab-agent";
import CategoryHandler from "./category-handler";

export interface ICategoriesProps {
  budgetId: string;
}

export interface ICategoriesState {
  categories: any[]; // TODO interface ICategories[]
}

class Categories extends React.Component<ICategoriesProps, ICategoriesState> {
  state = {
    categories: [] as any[]
  };
  render() {
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

  componentDidMount() {
    const { budgetId } = this.props;
    YnabAgent.getCategoriesByBudgetId(budgetId).then(categories => {
      this.setState({ categories });
    });
  }
}

export default Categories;
