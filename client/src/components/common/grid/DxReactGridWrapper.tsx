import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import React, { Component } from 'react';

import { IDxReactGridWrapperProps } from './DxReactGridWrapperProps.interface';

export const DxReactGridWrapper = class DxReactGridWrapperClass extends Component<IDxReactGridWrapperProps> {
  public render() {
    const { columns, data } = this.props;

    return (
      <Grid rows={data} columns={columns}>
        <Table />
        <TableHeaderRow />
      </Grid>
    );
  }
};
