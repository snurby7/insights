import React from "react";
import moment from "moment";

import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class MonthlyExpenseCategory extends React.Component {
  static months = moment.months();

  constructor(props) {
    super(props);
    this.state = {
      month: null,
      year: null
    };
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  onClickViewReport() {

  }

  render() {
    const months = MonthlyExpenseCategory.months;
    return (
      <div>
        <Select
          value={this.state.month}
          onChange={(event) => this.handleChange(event)}
          inputProps={{
            name: "month",
            id: "month"
          }}
        >
          {Object.keys(months).map((value) =>
            <MenuItem value={value}>{months[value]}</MenuItem>
          )}
        </Select>
        <Button onCick={() => this.onClickViewReport()}>View Report</Button>
      </div>
    );
  }
}

export default MonthlyExpenseCategory;
