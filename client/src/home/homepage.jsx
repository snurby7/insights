import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/StarBorder";

import ApiUtility from "../utilities/api-utility";

import { Redirect } from "react-router";
import YnabAppBar from "../common/ynab-app-bar";

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
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  budgetCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2
    }
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
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
    ApiUtility.getRequest(route, null, budgets => this.setState({ budgets }));
  }

  render() {
    const { budgetId } = this.state;
    if (budgetId !== null) {
      const budgetRoute = `/budget/${budgetId}`;
      return <Redirect to={budgetRoute} push={true} />;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <YnabAppBar />
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
              Let's see what we can deduce from your data!
            </Typography>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40} alignItems="flex-end">
            {this.state.budgets.map(budget => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={budget.id}
                xs={12}
                sm={budget.name === "Sample" ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={budget.title}
                    subheader={budget.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    action={budget.title === "Pro" ? <StarIcon /> : null}
                    className={this.state.classes.cardHeader}
                  />
                  <CardContent>
                    <div className={this.state.classes.budgetCard}>
                      <Typography
                        component="h4"
                        variant="h3"
                        color="textPrimary"
                      >
                        {budget.name}
                      </Typography>
                    </div>
                    <Typography variant="subtitle1" align="center">
                      Began - {budget.first_month}
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      Latest - {budget.last_month}
                    </Typography>
                  </CardContent>
                  <CardActions className={this.state.classes.cardActions}>
                    <Button
                      fullWidth
                      variant={budget.buttonVariant}
                      color="primary"
                      onClick={() => this.setState({ budgetId: budget.id })}
                    >
                      View {budget.name}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
