import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import RoutingButton from "./routing-button";

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
      classes: props.classes
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
            <RoutingButton
              displayData={{ displayName: "Insights", route: "/" }}
            />
          </Typography>
          <RoutingButton
            displayData={{ displayName: "Admin", route: "/admin" }}
          />
          <RoutingButton
            displayData={{
              displayName: "Login",
              variant: "outlined",
              color: "primary"
            }}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

YnabAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YnabAppBar);
