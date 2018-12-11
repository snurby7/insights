import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Redirect } from "react-router";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  }
});

class YnabAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      navigateRoute: ''
     }
  }
  render() {
    const navigateRoute = this.state.navigateRoute;
    if(navigateRoute !== null && navigateRoute.length > 0) {
      return <Redirect to={navigateRoute} push={true}/>
    }

    return (
      <AppBar
          position="static"
          color="default"
          className={this.state.classes.appBar}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={this.state.classes.toolbarTitle}
            >
              Insights
            </Typography>
            <Button onClick={() => this.setState({navigateRoute: 'admin'})}>Admin</Button>
            <Button color="primary" variant="outlined">
              Login
            </Button>
          </Toolbar>
        </AppBar>
     );
  }
}

YnabAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YnabAppBar);