import React from "react";
import moment from "moment";

import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import YnabAgent from "../../agents/ynab-agent";
import MonthlyExpenseCategoryTable from "./monthly-expense-category-table";

class MonthlyExpenseCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      year: "",
      results: {}
    };
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  async onClickViewReport() {
    const { month, year } = this.state;
    const results = await YnabAgent.getReportForMonthlyExpenses({
      startingMonth: month,
      startingYear: year,
      budgetId: this.props.budgetId
    });
    this.setState({ results });
  }

  render() {
    const months = moment.months();
    const { results } = this.state;
    Object.keys(results).forEach(x => console.log(results[x]))
    // TODO make this better using the current year and since year on the budget
    const years = [2016, 2017, 2018, 2019];

    return (
      <div>
        <div>Generate Report since</div>
        <div>
          <Select
            value={this.state.month}
            onChange={event => this.handleChange(event)}
            inputProps={{
              name: "month",
              id: "month"
            }}
          >
            {Object.keys(months).map((value, index) => (
              <MenuItem key={`month-${index}`} value={value}>
                {months[value]}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={this.state.year}
            onChange={event => this.handleChange(event)}
            inputProps={{
              name: "year",
              id: "year"
            }}
          >
            {years.map((year, index) => (
              <MenuItem key={`year-${index}`} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          {/* TODO need to have this be an actual form */}
          <Button onClick={() => this.onClickViewReport()}>View Report</Button>
        </div>
        <div>
          {Object.keys(results).map(key => (
            <MonthlyExpenseCategoryTable key={key} month={results[key]} />
          ))}
        </div>
      </div>
    );
  }
}

export default MonthlyExpenseCategory;
