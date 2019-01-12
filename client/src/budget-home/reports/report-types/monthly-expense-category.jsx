import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import YnabAgent from '../../../agents/ynab-agent';
import MonthlyExpenseCategoryTable from './monthly-expense-category-table';

class MonthlyExpenseCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      year: "",
      allowedYears: [],
      results: {}
    };
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    this.getBudgetInformation();
  }

  async getBudgetInformation() {
    const {budgetId} = this.props;
    const years = await YnabAgent.getBudgetYears(budgetId);
    this.setState({allowedYears: years});
  }

  async onClickViewReport() {
    const {budgetId} = this.props;
    const { month, year } = this.state;
    const results = await YnabAgent.getReportForMonthlyExpenses({
      startingMonth: month,
      startingYear: year,
      budgetId
    });
    this.setState({ results });
  }

  render() {
    const months = moment.months();
    const { results, allowedYears } = this.state;

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
            {allowedYears.map((year, index) => (
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
            <MonthlyExpenseCategoryTable key={key} month={key} monthData={results[key]} />
          ))}
        </div>
      </div>
    );
  }
}

MonthlyExpenseCategory.propTypes = {
  budgetId: PropTypes.string.isRequired
}

export default MonthlyExpenseCategory;
