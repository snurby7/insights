import { PropTypes } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { ReactNode } from 'react';

import { ButtonDisplayType } from './enum/button-display-type.enum';

export interface IRoutingButtonProps {
  variant?: ButtonProps['variant'];
  color?: PropTypes.Color;
  displayType: ButtonDisplayType;
  route: string;
  displayName?: string;
  children?: ReactNode;
}
