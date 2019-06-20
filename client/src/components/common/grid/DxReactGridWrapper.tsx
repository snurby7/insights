import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import React, { Component } from 'react';

export interface IDxReactGridWrapperColumns {
  name: string;
  title: string;
}

export interface IDxReactGridWrapperProps {
  columns: IDxReactGridWrapperColumns[];
  data: any[];
}

export const DxReactGridWrapper = ({ columns, data }: IDxReactGridWrapperProps) => {
  return (
    <Grid rows={data} columns={columns}>
      <Table />
      <TableHeaderRow />
    </Grid>
  );
};
