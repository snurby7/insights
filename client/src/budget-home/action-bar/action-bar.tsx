import './action-bar.css';

import { Button } from '@material-ui/core';
import React, { Component, ReactNode } from 'react';

export interface IActionBarAction {
  id: string;
  displayName: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export interface IActionBarComponentProps {
  children: ReactNode;
  actionItems: IActionBarAction[];
}

export default class ActionBarComponent extends Component<IActionBarComponentProps> {
  public render() {
    return (
      <div className="display-flex-flow">
        {this.props.actionItems.map(item => (
          <Button type="button" key={item.id} disabled={item.isDisabled} onClick={() => item.onClick()} color="primary">
            {item.displayName}
          </Button>
        ))}
        {this.props.children}
      </div>
    );
  }
}
