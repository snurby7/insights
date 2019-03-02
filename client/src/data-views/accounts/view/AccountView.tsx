import React, { Component } from 'react';

import YnabAgent from '../../../agents/ynab-agent';
import { IAccountViewProps } from './AccountViewProps.interface';

export default class AccountView extends Component<IAccountViewProps> {
  public componentDidMount = () => {
    const { accountId } = this.props;
    YnabAgent.getAccountDetails(accountId).then(detail => {
      console.log(detail);
    });
  };

  public render() {
    return <div>words</div>;
  }
}
