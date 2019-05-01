import { StyleRulesCallback, Theme } from '@material-ui/core';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import React from 'react';

import { YnabAgent } from '../../../../agents';
import { IAccount } from '../../../../contracts';
import BudgetAccount from './BudgetAccount';

export interface IAccountsProps {
  budgetId: string;
  classes: Record<string, string>;
}

export interface IAccountsState {
  accounts: IAccount[];
}

const styles: StyleRulesCallback<string> | StyleRules<string> = (theme: Theme) => ({
  accountLabel: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
});

class AccountsContainer extends React.Component<IAccountsProps, IAccountsState> {
  public state = {
    accounts: [] as IAccount[],
  };

  public render() {
    const { classes } = this.props;
    const { accounts } = this.state;
    return (
      <div>
        <div className={classes.accountLabel}>Accounts</div>
        {accounts.map(props => (
          <BudgetAccount key={props.id} {...props} />
        ))}
      </div>
    );
  }

  public componentDidMount() {
    const { budgetId } = this.props;
    YnabAgent.getAccounts(budgetId).then(accounts => {
      this.setState({ accounts });
    });
  }
}

export default withStyles(styles, { withTheme: true })(AccountsContainer);
