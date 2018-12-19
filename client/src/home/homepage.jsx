import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import ApiUtility from "../utilities/api-utility";

import { Redirect } from "react-router";
import GridDisplay from "../common/grid-display";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  }
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      budgets: [],
      budgetId: null
    };
  }

  componentDidMount() {
    this.getBudgets("/api/budgets");
  }

  async getBudgets(route) {
    ApiUtility.getRequest(route, null, budgets => this.convertBudgetsToDisplayData(budgets));
  }

  convertBudgetsToDisplayData(budgets) {
    const convertedBudgets = budgets.map(x => ({
      id: x.id,
      cardTitle: x.name,
      cardSubHeader: x.last_month,
      subTitles: [`Began - ${x.first_month}`, `Latest - ${x.last_month}`],
      onClick: () => this.setState({budgetId: x.id}),
      buttonText: `View ${x.name}`
    }));
    this.setState({budgets: convertedBudgets});
  }

  render() {
    const { budgetId } = this.state;
    if (budgetId !== null) {
      const budgetRoute = `/budget/${budgetId}`;
      return <Redirect to={budgetRoute} push={true} />;
    }

    return (
      <React.Fragment>
        <main className={this.state.classes.layout}>
          {/* Hero unit */}
          <div className={this.state.classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Insights Budget Selection
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              component="p"
            >
              Let's see what we can make of your data!
            </Typography>
          </div>
          {/* End hero unit */}
          <GridDisplay displayData={this.state.budgets}/>
        </main>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
