import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";

class RbButton extends React.Component {
  render() {
    const { displayData } = this.props;
    return (
      <Button
        variant={displayData.variant}
        color={displayData.color}
        onClick={() => displayData.onClick()}
      >
        {displayData.displayName}
      </Button>
    );
  }
}

RbButton.propTypes = {
  displayData: PropTypes.object.isRequired
}

export default RbButton;
