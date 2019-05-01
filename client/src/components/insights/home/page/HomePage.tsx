import { Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { SiteActions } from '../../../../actions/site-actions';
import { YnabAgent } from '../../../../agents';
import { IBudget, ICardDisplay } from '../../../../contracts';
import { GridDisplay } from '../../../common';
import { IHomePageProps } from '../contracts/IHomePageProps';

export interface IHomePageState {
  budgets: IBudget[];
  cardDisplayData: ICardDisplay[];
}

const styles = (theme: Theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  heroContent: {
    margin: '0 auto',
    maxWidth: 600,
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  layout: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: 'auto',
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 1000,
    },
  },
});

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  public state = {
    budgets: [] as IBudget[],
    budgetId: '',
    cardDisplayData: [] as ICardDisplay[],
  };

  public componentDidMount() {
    YnabAgent.getBudgets().then(budgets => {
      this.setState({
        cardDisplayData: this.convertBudgetsToDisplayData(budgets),
      });
    });
  }

  public convertBudgetsToDisplayData(budgets: IBudget[]): ICardDisplay[] {
    return budgets.map(x => ({
      buttonText: `View ${x.name}`,
      cardSubHeader: `Last Refreshed: ${moment(x.last_modified_on).format('MMMM Do, YYYY')}`,
      cardTitle: x.name,
      id: x.id,
      onClick: () => this.dispatchBudgetIdAndNavigate(x.id),
    }));
  }

  public dispatchBudgetIdAndNavigate(budgetId: string): void {
    this.props.dispatch({
      type: SiteActions.UPDATE_SELECTED_BUDGET,
      payload: { budgetId },
    });
    this.props.history.push('/budget');
  }

  public render() {
    const { cardDisplayData } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom={true}>
              Welcome to Insights!
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" component="p">
              Please select your budget below! <br /> Let's find the money!
            </Typography>
          </div>
          <GridDisplay displayData={cardDisplayData} />
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(connect()(withRouter(HomePage)));
