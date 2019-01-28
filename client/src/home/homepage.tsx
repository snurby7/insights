import { Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import { Redirect } from 'react-router';

import YnabAgent from '../agents/ynab-agent';
import GridDisplay from '../common/grid-display';
import { IBudget } from '../contracts/budget.interface';
import { ICardDisplay } from '../contracts/card-display.interface';

export interface IHomePageProps {
  classes: any;
}

export interface IHomePageState {
  budgets: IBudget[];
  budgetId: string;
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
      const cardDisplayData = this.convertBudgetsToDisplayData(budgets);
      this.setState({ cardDisplayData });
    });
  }

  public convertBudgetsToDisplayData(budgets: IBudget[]): ICardDisplay[] {
    return budgets.map(x => ({
      buttonText: `View ${x.name}`,
      cardSubHeader: `Last Refreshed: ${moment(x.last_modified_on).format('MMMM Do, YYYY')}`,
      cardTitle: x.name,
      id: x.id,
      onClick: () => this.setState({ budgetId: x.id }),
    }));
  }

  public render() {
    const { budgetId, cardDisplayData } = this.state;
    const { classes } = this.props;
    if (budgetId.length > 0) {
      const budgetRoute = `/budget/${budgetId}`;
      return <Redirect to={budgetRoute} push={true} />;
    }

    return (
      <React.Fragment>
        <main className={classes.layout}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom={true}>
              Insights Budget Selection
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" component="p">
              Let's see what we can make of your data!
            </Typography>
          </div>
          {/* End hero unit */}
          <GridDisplay displayData={cardDisplayData} />
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
