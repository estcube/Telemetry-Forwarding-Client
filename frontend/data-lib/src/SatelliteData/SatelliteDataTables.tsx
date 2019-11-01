import React from 'react';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography
  // @ts-ignore
} from '@material-ui/core';

const styles = ((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: 'auto',
      overflowX: 'auto',
      margin: theme.spacing(3,1,2,1),
      border: 'solid',
      borderWidth: 0.5
    },
    tableHeader: {
      margin: theme.spacing(1, 0, 0,2),
    },
    table: {
      width: '100%',
    },
  })
);

type MyProps = {classes: any};

class SatelliteDataTables extends React.Component<MyProps>{

  static createData(id: number, name: string, value: number) {
    return {id, name, value};
  }

  rows = [
    SatelliteDataTables.createData(1, 'Param 1', 1),
    SatelliteDataTables.createData(2, 'Param 2', 12),
    SatelliteDataTables.createData(3, 'Param 3', 123),
    SatelliteDataTables.createData(4, 'Param 4', 1234),
    SatelliteDataTables.createData(5, 'Param 5', 12345)
  ];
  
  render (){

    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <Typography variant='body1'>Some plotted sample data</Typography>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.tableHeader}>
          A table
          </Typography>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Param name</TableCell>
                <TableCell align="right">Param value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteDataTables);