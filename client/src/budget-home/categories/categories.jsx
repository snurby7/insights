import React from 'react';

import SiteUtility from '../../utilities/site-utility';
import SubCategory from './sub-category';
import ApiUtility from '../../utilities/api-utility';
import YnabDataUtility from '../../utilities/ynab-data-utility';

function createMasterCategoryView(props) {
    if (props.hidden)
        return null;
    return (
        <div key={props.id}>
            <h3>{props.name}
                - ({YnabDataUtility.format(SiteUtility.accumulate(props.categories.map(x => x.activity)))})</h3>
            <SubCategory subCategories={props.categories}/>
        </div>

    )
}

class Categories extends React.Component {
    state = {
        categories: []
    }
    render() {
        return (
            <div>
                <h2>Categories</h2>
                {this
                    .state
                    .categories
                    .map(x => createMasterCategoryView(x))}
            </div>
        );
    }

    componentDidMount() {
        this.getCategories(`/api/categories`, this.props.budgetId);
    }

    async getCategories(route, budgetId) {
        ApiUtility.getRequest(route, {
            budgetId
        }, (categories) => this.setState({categories}))
    };
}

export default Categories;