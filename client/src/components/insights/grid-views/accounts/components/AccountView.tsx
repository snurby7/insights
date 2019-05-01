import React, { Component } from 'react';

import { YnabAgent } from '../../../../../agents';
import { ITransaction } from '../../../../../contracts';
import { DxReactGridWrapper, IDxReactGridWrapperColumns, IDxReactGridWrapperProps } from '../../../../common';
import { IAccountViewProps } from '../contracts/AccountViewProps.interface';
import { IAccountViewState } from '../contracts/AccountViewState.interface';

export default class AccountView extends Component<IAccountViewProps, IAccountViewState> {
  public state: IAccountViewState = {} as IAccountViewState;

  public componentDidMount = () => {
    const { accountId, budgetId } = this.props;
    YnabAgent.getAccountDetails(accountId, budgetId).then(details => {
      this.setUpStateFromData(details);
    });
  };

  public render() {
    const { gridProps } = this.state;
    if (!gridProps) {
      return <div>Loading...</div>;
    }
    return <DxReactGridWrapper columns={gridProps.columns} data={gridProps.data} />;
  }

  private setUpStateFromData(transactionDetails: ITransaction[]) {
    const accountViewColumns: IDxReactGridWrapperColumns[] = [
      { name: 'payee_name', title: 'Payee' },
      { name: 'amount', title: 'Amount' },
      { name: 'memo', title: 'memo' },
      { name: 'date', title: 'Date' },
      { name: 'payee_name', title: 'Payee' },
    ];
    const gridProps: IDxReactGridWrapperProps = {
      columns: accountViewColumns,
      data: transactionDetails,
    };
    this.setState({ gridProps });
  }
}
