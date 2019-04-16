import './budget-account.css';

import { Button } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { IAccount } from '../../../contracts';
import { FormatUtility } from '../../../utilities';

export interface IBudgetAccount extends RouteComponentProps<any>, IAccount {}

class BudgetAccount extends React.Component<IBudgetAccount> {
  public render() {
    const { id, name, balance, match } = this.props;
    return (
      <Button
        style={{ display: 'block' }}
        type="button"
        key={name}
        color="primary"
        onClick={() => this.props.history.push(`/account/${id}`)}
      >
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
        ({FormatUtility.toUSD(balance)}){' '}
      </span>
    );
  }
}

export default withRouter(BudgetAccount);
