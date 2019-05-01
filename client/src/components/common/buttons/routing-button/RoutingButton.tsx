import Button from '@material-ui/core/Button';
import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';

import { ButtonDisplayType } from './enum/button-display-type.enum';
import { IRoutingButtonProps } from './IRoutingButtonProps';

export const RoutingButton = class RoutingButtonClass extends React.Component<IRoutingButtonProps> {
  public render() {
    const { variant, color, displayType, route } = this.props;
    return (
      <Route
        render={({ history }) => (
          <Button
            variant={variant}
            color={color}
            onClick={() => {
              history.push(route);
            }}
          >
            {this.getDisplayValue(displayType)}
          </Button>
        )}
      />
    );
  }

  /**
   * @description Function to get a variable display type since Children can be passed it needs to render them also
   * @param {ButtonDisplayType} displayType The display type
   * @returns {(ReactNode | string)} Either the children or a string
   */
  private getDisplayValue(displayType: ButtonDisplayType): ReactNode | string {
    switch (displayType) {
      case ButtonDisplayType.Node:
        return this.props.children;
      default:
        return this.props.displayName;
    }
  }
};
