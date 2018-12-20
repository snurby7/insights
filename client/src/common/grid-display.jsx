import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/StarBorder";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  displayCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2
    }
  }
});

class GridDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      displayData: props.displayData
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      displayData: props.displayData
    };
  }

  render() {
    return (
      <div>
        <Grid container spacing={40} alignItems="flex-end">
          {this.state.displayData.map(data => (
            <Grid item key={data.id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={data.cardTitle}
                  subheader={data.cardSubHeader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={data.enableAction ? <StarIcon />: null}
                  className={this.state.classes.cardHeader}
                />
                <CardContent>
                  <div className={this.state.classes.displayCard}>
                    <Typography component="h4" variant="h3" color="textPrimary">
                      {data.name}
                    </Typography>
                  </div>
                  {data.subTitles && data.subTitles.map((x, index) => {
                    return (
                      <Typography key={index} variant="subtitle1" align="center">
                        {x}
                      </Typography>
                    );
                  })}
                </CardContent>
                {/* TODO this could probably be made to accept an array of buttons */}
                {data.buttonText && <CardActions className={this.state.classes.cardActions}>
                  {<Button
                    fullWidth
                    variant={data.buttonVariant}
                    color="primary"
                    disabled={data.isDisabled}
                    onClick={() => data.onClick()}
                  >
                    {data.buttonText}
                  </Button>}
                </CardActions>}
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

GridDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(GridDisplay);
