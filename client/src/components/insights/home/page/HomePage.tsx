import { Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { YnabAgent } from '../../../../agents';
import { setBudgetId } from '../../../../api/BudgetApi';
import { IBudget, ICardDisplay } from '../../../../contracts';
import { GridDisplay } from '../../../common';

export interface IHomePageProps extends RouteComponentProps<any> {
  classes: any;
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

const HomePage = ({ history, classes }: IHomePageProps) => {
  const [cardDisplayData, setCardDisplayData] = useState<ICardDisplay[]>([]);

  useEffect(() => {
    YnabAgent.getBudgets().then(budgets =>
      setCardDisplayData(convertBudgetsToDisplayData(budgets))
    );
  }, []);

  const setBudgetIdAndNavigate = (budgetId: string): void => {
    setBudgetId(budgetId);
    history.push('/budget');
  };

  const convertBudgetsToDisplayData = (budgets: IBudget[]): ICardDisplay[] => {
    return budgets.map(budget => ({
      buttonText: `View ${budget.name}`,
      cardSubHeader: `Last Refreshed: ${moment(budget.last_modified_on).format(
        'MMMM Do, YYYY'
      )}`,
      cardTitle: budget.name,
      id: budget.id,
      onClick: () => setBudgetIdAndNavigate(budget.id),
    }));
  };

  return (
    <>
      <main className={classes.layout}>
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom={true}
          >
            Welcome to Insights!
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="p"
          >
            Please select your budget below! <br /> Let's find the money!
          </Typography>
        </div>
        <GridDisplay displayData={cardDisplayData} />
      </main>
    </>
  );
};

export default withStyles(styles)(withRouter(HomePage));
