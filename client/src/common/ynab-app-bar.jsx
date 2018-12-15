import React from "react";
import PropTypes from "prop-types";

import { Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

// TODO make this a component for reuse.
function createLinkButton(props) {
  return (
    <Route
      render={({ history }) => (
        <Button
          variant={props.variant}
          color={props.color}
          onClick={() => {
            history.push(props.route);
          }}
        >
          {props.displayName}
        </Button>
      )}
    />
  );
}

class YnabAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      navigateRoute: ""
    };
  }
  render() {
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
            {createLinkButton({ displayName: "Insights", route: "/" })}
          </Typography>
          {createLinkButton({ displayName: "Admin", route: "/admin" })}
          {createLinkButton({ displayName: "Login", variant: "outlined", color: "primary" })}
        </Toolbar>
      </AppBar>
    );
  }
}

YnabAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YnabAppBar);
