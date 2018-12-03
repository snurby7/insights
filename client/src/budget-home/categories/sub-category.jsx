import React from 'react';

function displayCategoryItem(props, biggestCatgory) {
    const styles = {
        color: props.id === biggestCatgory.id ? 'red': 'black'
    }
    return (
        <li key={props.id}>
            {props.name} - <strong style={styles}>${props.activity / 1000}</strong>
        </li>
    )
}

class SubCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategories: props.subCategories,
            biggestSpendingCategory: this.getBiggestSpendingCategory(props.subCategories)
        }
    }

    render() {
        return (
            <div>
                The biggest offender is {this.getBiggestOffender()}
                <ol>
                    {this.state.subCategories.map(x => displayCategoryItem(x, this.state.biggestSpendingCategory))}
                </ol>
            </div>
        );
    }

    getBiggestSpendingCategory(subCategories) {
        let biggestSpendingCategory = null;
        subCategories.forEach(subCategory => {
            if(!biggestSpendingCategory) {
                biggestSpendingCategory = subCategory;
            } else if(subCategory.activity < biggestSpendingCategory.activity){
                biggestSpendingCategory = subCategory;
            }
        });
        return biggestSpendingCategory
    }

    getBiggestOffender() {
        if(!this.state.biggestSpendingCategory) return '';
        return this.state.biggestSpendingCategory.name;
    }
}

export default SubCategory;