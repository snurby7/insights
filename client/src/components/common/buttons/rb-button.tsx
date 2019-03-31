import { PropTypes } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

export interface IRbButtonOptions {
  variant?: ButtonProps['variant'];
  color?: PropTypes.Color;
  displayName: string;
  onClick: () => void;
}

class RbButton extends React.Component<IRbButtonOptions> {
  public render() {
    const { variant, color, onClick, displayName } = this.props;
    return (
      <Button variant={variant} color={color} onClick={() => onClick()}>
        {displayName}
      </Button>
    );
  }
}

export default RbButton;
