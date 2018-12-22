import React from 'react'
import Button from "@material-ui/core/Button";
import { Route } from "react-router-dom";

class RoutingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayData: props.displayData
    };
  }

  render() {
    const displayData = this.state.displayData;
    return (
      <Route
        render={({ history }) => (
          <Button
            variant={displayData.variant}
            color={displayData.color}
            onClick={() => {
              history.push(displayData.route);
            }}
          >
            {displayData.displayName}
          </Button>
        )}
      />
    );
  }
}

export default RoutingButton;
