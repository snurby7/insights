import { PropTypes } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import { Route } from 'react-router-dom';

export interface IRoutingButtonProps {
  variant?: ButtonProps['variant'];
  color?: PropTypes.Color;
  displayName: string;
  route: string;
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
