import React from 'react';

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
        this.getCategories(`http://${window.location.hostname}:5000/api/categories`, this.props.budgetId);
    }

    async getCategories(route, budgetId) {
        const url = new URL(route);
        const params = {budgetId};
        url.search = new URLSearchParams(params);
        const response = await fetch(url);
        const categories = await response.json();
        this.setState({categories})
    };
}

export default Categories;