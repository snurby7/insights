import { ReactNode } from 'react';

import { IActionBarAction } from './IActionBarAction';

export interface IActionBarProps {
  actionItems: IActionBarAction[];
  children: ReactNode;
  classes: Record<string, string>;
}
