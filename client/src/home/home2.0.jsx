import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import ApiUtility from "../utilities/api-utility";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
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

const footers = [];

class HomePage2 extends React.Component {
  constructor(props) {
    super(props);
    console.log();

    this.state = {
      classes: props.classes,
      budgets: []
    };
  }

  componentDidMount() {
    this.getBudgets("/api/budgets");
  }

  async getBudgets(route) {
    ApiUtility.getRequest(route, null, budgets => this.setState({ budgets }));
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          className={this.state.classes.appBar}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={this.state.classes.toolbarTitle}
            >
              Insights
            </Typography>
            <Button>Admin</Button>
            <Button color="primary" variant="outlined">
              Login
            </Button>
          </Toolbar>
        </AppBar>
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
                key={budget.title}
                xs={12}
                sm={budget.title === "Enterprise" ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={budget.title}
                    subheader={budget.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographytProps={{ align: "center" }}
                    action={budget.title === "Pro" ? <StarIcon /> : null}
                    className={this.state.classes.cardHeader}
                  />
                  <CardContent>
                    <div className={this.state.classes.budgetCard}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        ${budget.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>

                    <Typography variant="subtitle1" align="center">
                      example
                    </Typography>
                  </CardContent>
                  <CardActions className={this.state.classes.cardActions}>
                    <Button
                      fullWidth
                      variant={budget.buttonVariant}
                      color="primary"
                    >
                      {budget.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
        {/* Footer */}
        <footer
          className={classNames(
            this.state.classes.footer,
            this.state.classes.layout
          )}
        >
          <Grid container spacing={32} justify="space-evenly">
            {footers.map(footer => (
              <Grid item xs key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {footer.title}
                </Typography>
                {footer.description.map(item => (
                  <Typography
                    key={item}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {item}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

HomePage2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage2);
