import React, { useEffect, useState } from 'react';

import { YnabAgent } from '../../../../agents';
import { ITransaction } from '../../../../contracts';
import { DxReactGridWrapper, IDxReactGridWrapperProps } from '../../../common';


export interface IAccountViewProps {
  accountId: string;
  budgetId: string;
}

export const AccountView = ({ accountId, budgetId }: IAccountViewProps) => {
  const [gridProps, setGridProps] = useState<IDxReactGridWrapperProps | null>(
    null
  );

  useEffect(() => {
    YnabAgent.getAccountDetails(accountId, budgetId).then(data => {
      let name: keyof ITransaction;
      setGridProps({
        columns: [
          { name: name = 'payee_name', title: 'Payee' },
          { name: name = 'amount', title: 'Amount' },
          { name: name = 'memo', title: 'memo' },
          { name: name = 'date', title: 'Date' },
        ],
        data,
      });
    });
  }, []);

  return gridProps ? (
    <DxReactGridWrapper {...gridProps} />
  ) : (
    <div>Loading...</div>
  );
};
