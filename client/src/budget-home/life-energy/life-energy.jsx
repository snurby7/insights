import React from "react";
class LifeEnergy extends React.Component {
  constructor(props) {
    super(props);
    this.state = { budgetId: props.budgetId };
  }
  render() {
    return (
      <div>
        This section will be to do the following
        <ol>
          <li>Convert all transactions into how many hours of work it cost</li>
        </ol>
      </div>
    );
  }
}
export default LifeEnergy;
