import { RouteComponentProps } from 'react-router';

import { IReducerAction } from '../../../../contracts';

export interface IHomePageProps extends RouteComponentProps<any> {
  classes: any;
  dispatch: (action: IReducerAction) => void;
}
