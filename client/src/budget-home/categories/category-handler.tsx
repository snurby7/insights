import React from 'react';

import { SiteUtility } from '../../utilities/site-utility';
import { YnabDataUtility } from '../../utilities/ynab-data-utility';
import SubCategory from './sub-category';

export interface CategoryHandlerProps {
  name: string;
  activity: number;
  categories: any[]; // TODO type this as ICategories
}

class CategoryHandler extends React.Component<CategoryHandlerProps> {
  public render() {
    const props = this.props;
    return (
      <React.Fragment>
        <h3>
          {props.name}- ({YnabDataUtility.format(SiteUtility.accumulate(props.categories.map(x => x.activity)))})
        </h3>
        <SubCategory subCategories={props.categories} />
      </React.Fragment>
    );
  }
}

export default CategoryHandler;
