import './BudgetAccount.css';

import { Button } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import { IAccount } from '../../../../contracts';
import { FormatUtility } from '../../../../utilities';

export interface IBudgetAccount extends RouteComponentProps<any>, IAccount {}

const StyledAccountBalance = styled.span`
  background-color: 'white';
  display: 'inline-block';
  border-radius: 15;
  padding: '2px 4px';
  box-shadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
`;

const BudgetAccount = ({ id, name, balance, history }: IBudgetAccount) => {
  return (
    <Button
      style={{ display: 'block', color: 'white' }}
      type="button"
      key={name}
      onClick={() => history.push(`/account/${id}`)}
    >
      <span>
        {name} -{' '}
        <StyledAccountBalance className={balance < 0 ? ' negative-balance' : 'default-balance'}>
          {FormatUtility.toUSD(balance)}
        </StyledAccountBalance>
      </span>
    </Button>
  );
};

export default withRouter(BudgetAccount);
