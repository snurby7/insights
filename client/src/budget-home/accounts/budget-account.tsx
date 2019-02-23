import './budget-account.css';

import { Button } from '@material-ui/core';
import React from 'react';

import { IAccount } from '../../contracts/account.interface';
import { YnabDataUtility } from '../../utilities/ynab-data-utility';

class BudgetAccount extends React.Component<IAccount> {
  public render() {
    const { name, balance } = this.props;
    return (
      <Button style={{ display: 'block' }} type="button" key={name} color="primary">
        <span>
          {name} - {this.formatAccountBalance(balance)}
        </span>
      </Button>
    );
  }

  public formatAccountBalance(balance: number) {
    const className = balance < 0 ? ' negative-balance' : '';
    return (
      <span
        style={{
          display: 'inline-block',
          borderRadius: 15,
          padding: 4,
          boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
          transition: '0.2s ease-out',
        }}
        className={className}
      >
        {' '}
        ({YnabDataUtility.format(balance)}){' '}
      </span>
    );
  }
}

export default BudgetAccount;
