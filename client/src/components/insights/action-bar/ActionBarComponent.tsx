import { Button, StyleRulesCallback, Theme } from '@material-ui/core';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

import { IActionBarComponentProps } from './IActionBarComponentProps';

const styles: StyleRulesCallback<string> | StyleRules<string> = (theme: Theme) => ({
  actionBar: {
    color: 'white',
    height: 'inherit',
    display: 'flex',
    flexFlow: 'column',
  },
  buttonStyle: {
    color: theme.palette.primary.contrastText,
  },
});
class ActionBarComponent extends Component<IActionBarComponentProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.actionBar}>
        {this.props.actionItems.map(item => (
          <Button
            className={classes.buttonStyle}
            type="button"
            key={item.id}
            disabled={item.isDisabled}
            onClick={() => item.onClick()}
          >
            {item.displayName}
          </Button>
        ))}
        {this.props.children}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ActionBarComponent);
