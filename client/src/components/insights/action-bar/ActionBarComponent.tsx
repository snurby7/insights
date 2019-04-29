import { Button, Divider, Icon, StyleRulesCallback, Theme } from '@material-ui/core';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

import { IActionBarComponentProps } from './IActionBarComponentProps';

const styles: StyleRulesCallback<string> | StyleRules<string> = (theme: Theme) => ({
  actionBar: {
    color: 'white',
    height: 'inherit',
    display: 'flex',
    flexFlow: 'column',
    paddingTop: 8,
  },
  buttonStyle: {
    color: theme.palette.primary.contrastText,
    display: 'block',
    textAlign: 'left',
    padding: theme.spacing.unit,
  },
  iconStyle: {
    marginRight: theme.spacing.unit,
    fontSize: 14,
  },
  dividerPadding: {
    margin: '10px 0',
  },
});
class ActionBarComponent extends Component<IActionBarComponentProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.actionBar}>
        <div>
          {this.props.actionItems.map(item => (
            <Button
              className={classes.buttonStyle}
              type="button"
              key={item.id}
              disabled={item.isDisabled}
              fullWidth={true}
              onClick={() => item.onClick()}
            >
              {item.iconName ? <Icon className={classes.iconStyle}>{item.iconName}</Icon> : ''}
              {item.displayName}
            </Button>
          ))}
        </div>
        <Divider className={classes.dividerPadding} variant="fullWidth" />
        {this.props.children}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ActionBarComponent);
