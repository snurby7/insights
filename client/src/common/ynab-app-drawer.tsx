import { IconButton, withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { Component } from 'react';

export const drawerWidth = 240;
const styles = (theme: any) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

export interface IYnabAppDrawerProps {
  classes: any;
  theme: any;
  open: boolean;
  onClose: () => void;
  navItems: [];
}

export interface IYnabAppDrawerState {
  open: boolean;
  navItems: IYnabAppDrawerListItem[];
}

export interface IYnabAppDrawerListItem {
  id: string;
  displayName: string;
  onClick: () => void;
  isDisabled?: boolean;
}

class YnabAppDrawer extends Component<IYnabAppDrawerProps, IYnabAppDrawerState> {
  public static getDerivedStateFromProps(props: IYnabAppDrawerProps): Partial<IYnabAppDrawerState> {
    return {
      navItems: props.navItems || ([] as IYnabAppDrawerListItem[]),
      open: props.open,
    };
  }
  public constructor(props: IYnabAppDrawerProps) {
    super(props);
    this.state = {
      open: props.open,
      navItems: props.navItems || ([] as IYnabAppDrawerListItem[]),
    };
  }

  public handleDrawerClose = () => {
    this.setState(state => ({ open: !state.open }));
    this.props.onClose();
  };

  public render() {
    const { classes, theme } = this.props;
    const { open, navItems } = this.state;

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
          {navItems.map(item => (
            <ListItem button={true} key={item.id} disabled={item.isDisabled} onClick={() => item.onClick()}>
              <ListItemText primary={item.displayName} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}
export default withStyles(styles, { withTheme: true })(YnabAppDrawer);
