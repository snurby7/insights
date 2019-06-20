import { PropTypes } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

export interface IRbButtonProps {
  style?: React.CSSProperties;
  type?: ButtonProps['type'];
  variant?: ButtonProps['variant'];
  color?: PropTypes.Color;
  displayName: string;
  onClick: () => void;
}

export const RbButton = ({ variant, color, onClick, type, displayName }: IRbButtonProps) => {
  return (
    <Button type={type} variant={variant} color={color} onClick={() => onClick()}>
      {displayName}
    </Button>
  );
};
