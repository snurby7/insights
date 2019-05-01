import React from 'react';
import { Category } from 'ynab';

import CategoryItem from './CategoryItem';

export interface ISubCategoryProps {
  subCategories: Category[];
}

export interface ISubCategoryState {
  subCategories: Category[];
  biggestSpendingCategory: Category;
}

class SubCategory extends React.Component<ISubCategoryProps, ISubCategoryState> {
  constructor(props: ISubCategoryProps) {
    super(props);
    this.state = {
      subCategories: props.subCategories,
      biggestSpendingCategory: this.getBiggestSpendingCategory(props.subCategories),
    };
  }

  public render() {
    const { subCategories, biggestSpendingCategory } = this.state;
    return (
      <div>
        The biggest offender is {biggestSpendingCategory.name}
        <ol>
          {subCategories.map(props => (
            <li key={props.id}>
              <CategoryItem biggestCategoryId={biggestSpendingCategory.id} {...props} />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  public getBiggestSpendingCategory(subCategories: Category[]): Category {
    let biggestSpendingCategory: Category = { activity: 0 } as Category;
    subCategories.forEach(subCategory => {
      if (subCategory.activity < biggestSpendingCategory.activity) {
        biggestSpendingCategory = subCategory;
      }
    });
    return biggestSpendingCategory;
  }
}

export default SubCategory;
