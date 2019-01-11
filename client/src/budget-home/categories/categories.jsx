import React from "react";
import PropTypes from "prop-types";

import SiteUtility from "../../utilities/site-utility";
import SubCategory from "./sub-category";
import YnabDataUtility from "../../utilities/ynab-data-utility";
import YnabAgent from "../../agents/ynab-agent";

function createMasterCategoryView(props) {
  return (
    <div key={props.id}>
      <h3>
        {props.name}- (
        {YnabDataUtility.format(
          SiteUtility.accumulate(props.categories.map(x => x.activity))
        )}
        )
      </h3>
      <SubCategory subCategories={props.categories} />
    </div>
  );
}

class Categories extends React.Component {
  state = {
    categories: []
  };
  render() {
    return (
      <div>
        <h2>Categories</h2>
        {this.state.categories.map(x => createMasterCategoryView(x))}
      </div>
    );
  }

  componentDidMount() {
    this.getCategories(this.props.budgetId);
  }

  async getCategories(budgetId) {
    const categories = await YnabAgent.getCategoriesByBudgetId(budgetId);
    this.setState({ categories });
  }
}

Categories.propTypes = {
  budgetId: PropTypes.string.isRequired
}

export default Categories;
