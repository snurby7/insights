import { StyleRulesCallback, Theme } from '@material-ui/core';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { YnabAgent } from '../../../../agents';
import { IAccount } from '../../../../contracts';
import BudgetAccount from './BudgetAccount';

export interface IAccountsProps {
  budgetId: string;
  classes: Record<string, string>;
}

const styles: StyleRulesCallback<string> | StyleRules<string> = (theme: Theme) => ({
  accountLabel: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
});

const AccountsContainer = ({ classes, budgetId }: IAccountsProps) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    YnabAgent.getAccounts(budgetId).then(results => {
      setAccounts(results);
    });
  }, []);

  return (
    <div>
      <div className={classes.accountLabel}>Accounts</div>
      {accounts.map(account => (
        <BudgetAccount key={account.id} {...account} />
      ))}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AccountsContainer);
