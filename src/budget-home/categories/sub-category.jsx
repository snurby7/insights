import React from 'react';

function displayCategoryItem(props) {
    return (
        <li key={props.id}>
            {props.name} - ${props.activity / 1000}
        </li>
    )
}

class SubCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategories: props.subCategories
        }
    }

    render() {
        return (
            <div>
                The biggest offender is TODO
                <ol>
                    {this.state.subCategories.map(x => displayCategoryItem(x))}
                </ol>
            </div>
        );
    }
}

export default SubCategory;