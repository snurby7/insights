import { Icon } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme, withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { SiteActions } from '../actions/site-actions';
import { IReducerAction } from '../contracts/reducer-action.interface';
import YnabAppDrawer, { drawerWidth, IYnabAppDrawerListItem } from './ynab-app-drawer';

const styles = (theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    position: 'relative' as 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute' as 'absolute',
    pointerEvents: 'none' as 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: '100%',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: `2px 2px 5px ${fade(theme.palette.common.black, 0.4)}`,
    position: 'fixed' as 'fixed',
    top: 0,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
});

export interface IYnabAppBarProps extends RouteComponentProps<any> {
  classes: any;
  theme: Theme;
  navItems: IYnabAppDrawerListItem[];
  budgetId: string;
  dispatch: (action: IReducerAction) => void;
}

export interface IYnabAppBarState {
  anchorEl: any;
  mobileMoreAnchorEl: any;
  open: boolean;
}

class YnabAppBar extends React.Component<IYnabAppBarProps, IYnabAppBarState> {
  public state = {
    open: false,
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  public handleProfileMenuOpen = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  public handleMobileMenuOpen = (event: any) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  public handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  public closeBudget() {
    this.props.dispatch({
      type: SiteActions.UPDATE_SELECTED_BUDGET,
      payload: { budgetId: '' },
    });
    this.props.history.push('/');
  }

  public render() {
    const { budgetId, classes, navItems } = this.props;
    const { anchorEl, mobileMoreAnchorEl, open } = this.state;

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    // TODO: Fix this to have proper routing in the mobile menu as well
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Icon>home</Icon>
          </IconButton>
          <p>Home</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Icon>sync</Icon>
          </IconButton>
          <p>Sync</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Icon>close</Icon>
          </IconButton>
          <p>Logout</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="static"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              disabled={!navItems || navItems.length === 0}
              color="inherit"
              aria-label="Open drawer"
              onClick={() => {
                this.setState({ open: true });
              }}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap={true}>
              Insights
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {budgetId.length > 0 && (
                <React.Fragment>
                  <IconButton onClick={() => this.props.history.push(`/budget/${budgetId}`)} color="inherit">
                    <Icon>home</Icon>
                  </IconButton>
                  <IconButton onClick={() => this.props.history.push(`/budget/update`)} color="inherit">
                    <Icon>sync</Icon>
                  </IconButton>
                  <IconButton onClick={() => this.closeBudget()} color="inherit">
                    <Icon>close</Icon>
                  </IconButton>
                </React.Fragment>
              )}
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <YnabAppDrawer navItems={navItems} open={open} onClose={() => this.setState({ open: false })} />
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

export const YnabAppBarComponent = withStyles(styles, { withTheme: true })(connect()(withRouter(YnabAppBar)));
