import './BudgetAccount.css';

import { Button } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { IAccount } from '../../../../contracts';
import { FormatUtility } from '../../../../utilities';

export interface IBudgetAccount extends RouteComponentProps<any>, IAccount {}

class BudgetAccount extends React.Component<IBudgetAccount> {
  public render() {
    const { id, name, balance, match } = this.props;
    return (
      <Button
        style={{ display: 'block', color: 'white' }}
        type="button"
        key={name}
        onClick={() => this.props.history.push(`/account/${id}`)}
      >
        <span>
          {name} - {this.formatAccountBalance(balance)}
        </span>
      </Button>
    );
  }

  public formatAccountBalance(balance: number) {
    const className = balance < 0 ? ' negative-balance' : 'default-balance';
    return (
      <span
        style={{
          backgroundColor: 'white',
          display: 'inline-block',
          borderRadius: 15,
          padding: '2px 4px',
          boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
        }}
        className={className}
      >
        {FormatUtility.toUSD(balance)}
      </span>
    );
  }
}

export default withRouter(BudgetAccount);
