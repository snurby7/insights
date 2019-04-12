import { PropTypes } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';

export enum ButtonDisplayType {
  Text = 1,
  Node = 2,
}

// Move this to an interface file
export interface IRoutingButtonProps {
  variant?: ButtonProps['variant'];
  color?: PropTypes.Color;
  displayType: ButtonDisplayType;
  route: string;
  displayName?: string;
  children?: ReactNode;
}

class RoutingButton extends React.Component<IRoutingButtonProps> {
  public render() {
    const { variant, color, displayName, route } = this.props;
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
            {displayName}
          </Button>
        )}
      />
    );
  }
}

export default RoutingButton;
