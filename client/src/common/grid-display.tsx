import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { ICardDisplay } from '../contracts/card-display.interface';

export interface IGridDisplayProps {
  classes: any;
  displayData: ICardDisplay[];
}

const styles = (theme: Theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  displayCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
});

class GridDisplay extends React.Component<IGridDisplayProps, IGridDisplayProps> {
  public static getDerivedStateFromProps(props: IGridDisplayProps) {
    return {
      displayData: props.displayData,
    };
  }
  constructor(props: IGridDisplayProps) {
    super(props);
    this.state = {
      ...props,
    };
  }

  public render() {
    const { classes, displayData } = this.state;
    return (
      <div>
        <Grid container={true} spacing={40} alignItems="flex-end">
          {displayData.map(data => (
            <Grid item={true} key={data.id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={data.cardTitle}
                  subheader={data.cardSubHeader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  {data.name && (
                    <div className={classes.displayCard}>
                      <Typography component="h4" variant="h3" color="textPrimary">
                        {data.name}
                      </Typography>
                    </div>
                  )}
                  {data.subTitles &&
                    data.subTitles.map((x: string, index: number) => {
                      return (
                        <Typography key={index} variant="subtitle1" align="center">
                          {x}
                        </Typography>
                      );
                    })}
                </CardContent>
                {/* TODO this could probably be made to accept an array of buttons */}
                {data.buttonText && (
                  <CardActions className={classes.cardActions}>
                    {
                      <Button
                        fullWidth={true}
                        variant={data.buttonVariant}
                        color="primary"
                        disabled={data.isDisabled}
                        onClick={() => data.onClick()}
                      >
                        {data.buttonText}
                      </Button>
                    }
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(GridDisplay);
