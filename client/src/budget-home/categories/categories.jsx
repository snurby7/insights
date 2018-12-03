import React from 'react';
import YnabService from '../../ynab/ynab.service';

import SiteUtility from '../../utilities/site-utility';
import SubCategory from './sub-category';

function createMasterCategoryView(props) {
    if(props.hidden) return null;
    return (
        <div key={props.id}>
            <h3>{props.name} - ${SiteUtility.accumulate(props.categories.map(x => x.activity)) / 1000}</h3>
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
        YnabService
            .getCategories(this.props.budgetId)
            .then(response => {
                this.setState({categories: response.data.category_groups})
            })
    }
}

export default Categories;