import React, { Component } from 'react';

import { ICategoryViewProps } from './category-view-props.interface';

/**
 * @description Component used to view a given category to tweeze out more information
 * TODO: Using the categoryId get transactions over last three months or so
 * TODO: Aggregate the last three months to find an average spending on that category.
 * TODO: Show the amount of funding a given category is receiving
 * @class CategoryView
 * @extends {Component<ICategoryViewProps>}
 */
export default class CategoryView extends Component<ICategoryViewProps> {
  public render() {
    return <div>Category View</div>;
  }
}
