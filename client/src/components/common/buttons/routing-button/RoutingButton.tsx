import { PropTypes } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';

import { ButtonDisplayType } from './enum/button-display-type.enum';

export interface IRoutingButtonProps {
  variant?: ButtonProps['variant'];
  color?: PropTypes.Color;
  displayType: ButtonDisplayType;
  route: string;
  displayName?: string;
  children?: ReactNode;
}

export const RoutingButton = ({ variant, color, displayType, route, children, displayName }: IRoutingButtonProps) => {
  const getDisplayValue = (): ReactNode | string => {
    switch (displayType) {
      case ButtonDisplayType.Node:
        return children;
      default:
        return displayName;
    }
  };
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
          {getDisplayValue()}
        </Button>
      )}
    />
  );
};
