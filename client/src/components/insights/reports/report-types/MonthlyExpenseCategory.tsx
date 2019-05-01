import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import React from 'react';

import { YnabAgent } from '../../../../agents';
import MonthlyExpenseCategoryTable from './MonthlyExpenseCategoryTable';

export interface IMonthlyExpenseCategoryProps {
  budgetId: string;
}

export interface IMonthlyExpenseCategoryState {
  month: number;
  year: number;
  allowedYears: number[];
  results: any;
}

class MonthlyExpenseCategory extends React.Component<IMonthlyExpenseCategoryProps, IMonthlyExpenseCategoryState> {
  public state = {
    month: moment().month(),
    year: moment().year(),
    allowedYears: [],
    results: {} as any,
  };

  // TODO type this
  public handleChange(event: any) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value } as Pick<IMonthlyExpenseCategoryState, keyof IMonthlyExpenseCategoryState>);
  }

  public componentDidMount() {
    const { budgetId } = this.props;
    YnabAgent.getBudgetYears(budgetId).then(allowedYears => {
      this.setState({ allowedYears });
    });
  }

  public onClickViewReport() {
    const { budgetId } = this.props;
    const { month, year } = this.state;
    YnabAgent.getReportForMonthlyExpenses({
      startingMonth: month as number,
      startingYear: year as number,
      budgetId,
      // TODO type this result
    }).then((results: any) => {
      this.setState({ results });
    });
  }

  public render() {
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
              name: 'month',
              id: 'month',
            }}
          >
            {Object.keys(months).map((value, index) => (
              <MenuItem key={`month-${index}`} value={value}>
                {months[+value]}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={this.state.year}
            onChange={event => this.handleChange(event)}
            inputProps={{
              name: 'year',
              id: 'year',
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
          <Button onClick={() => this.setState({ results: {} })}>Clear</Button>
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

export default MonthlyExpenseCategory;
