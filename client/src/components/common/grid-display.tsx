import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { ICardDisplay } from '../../contracts';

export interface IGridDisplayProps {
  classes: any;
  displayData: ICardDisplay[];
}

interface IGridDisplayState {
  loadingState: { [id: string]: boolean };
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

class GridDisplayClass extends React.Component<IGridDisplayProps, IGridDisplayState> {
  constructor(props: IGridDisplayProps) {
    super(props);
    const loadingState: { [id: string]: boolean } = {};
    props.displayData.forEach(item => {
      loadingState[item.id] = false;
    });
    this.state = {
      loadingState,
    };
  }

  public handleItemClick(item: ICardDisplay): void {
    if (item.onAsyncClick) {
      const currentState = this.state;
      const { loadingState } = currentState;
      loadingState[item.id] = true;
      this.setState(currentState);
      item.onAsyncClick().finally(() => {
        loadingState[item.id] = false;
        this.setState(currentState);
      });
      return;
    }
    if (item.onClick) {
      item.onClick();
    }
  }

  public render() {
    const { classes, displayData } = this.props;
    const { loadingState } = this.state;
    return (
      <div>
        <Grid container={true} spacing={40} alignItems="flex-end">
          {displayData.map(item => (
            <Grid item={true} key={item.id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={item.cardTitle}
                  subheader={item.cardSubHeader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  {item.name && (
                    <div className={classes.displayCard}>
                      <Typography component="h4" variant="h3" color="textPrimary">
                        {item.name}
                      </Typography>
                    </div>
                  )}
                  {item.subTitles &&
                    item.subTitles.map((x: string, index: number) => {
                      return (
                        <Typography key={index} variant="subtitle1" align="center">
                          {x}
                        </Typography>
                      );
                    })}
                </CardContent>
                {/* TODO: this could probably be made to accept an array of buttons */}
                {item.buttonText && (
                  <CardActions className={classes.cardActions}>
                    {
                      <Button
                        fullWidth={true}
                        variant={item.buttonVariant}
                        color="primary"
                        onClick={() => this.handleItemClick(item)}
                      >
                        {loadingState[item.id] && <CircularProgress size={20} />}
                        {loadingState[item.id] ? 'Loading...' : item.buttonText}
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

export const GridDisplay = withStyles(styles)(GridDisplayClass);
