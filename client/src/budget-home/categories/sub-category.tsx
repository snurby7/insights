import React from 'react';

import CategoryItem from './category-item';

export interface ISubCategoryProps{
  subCategories: any[]
}

export interface ISubCategoryState {
  subCategories: any[]; // TODO ICategory[] ?
  biggestSpendingCategory: any; // TODO ICategory
}

class SubCategory extends React.Component<ISubCategoryProps, ISubCategoryState> {
  constructor(props: ISubCategoryProps) {
    super(props);
    this.state = {
      subCategories: props.subCategories,
      biggestSpendingCategory: this.getBiggestSpendingCategory(
        props.subCategories
      )
    };
  }

  render() {
    const {subCategories, biggestSpendingCategory} = this.state;
    return (
      <div>
        The biggest offender is {biggestSpendingCategory.name}
        <ol>
          {subCategories.map(props =>
            <li key={props.id}>
              <CategoryItem biggestCategoryId={biggestSpendingCategory.id} {...props} />
            </li>
          )}
        </ol>
      </div>
    );
  }

  getBiggestSpendingCategory(subCategories: any[] /* TODO ISubCategory[]? */) {
    let biggestSpendingCategory: any = null;
    subCategories.forEach(subCategory => {
      if (!biggestSpendingCategory) {
        biggestSpendingCategory = subCategory;
      } else if (subCategory.activity < biggestSpendingCategory.activity) {
        biggestSpendingCategory = subCategory;
      }
    });
    return biggestSpendingCategory;
  }
}

export default SubCategory;
