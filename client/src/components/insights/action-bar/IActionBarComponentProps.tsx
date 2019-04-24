import { ReactNode } from 'react';

import { IActionBarAction } from './IActionBarAction';

export interface IActionBarComponentProps {
  actionItems: IActionBarAction[];
  children: ReactNode;
  classes: Record<string, string>;
}
