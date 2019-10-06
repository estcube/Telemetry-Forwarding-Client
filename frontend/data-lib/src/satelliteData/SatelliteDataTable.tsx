import React from 'react';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
  // @ts-ignore
} from '@material-ui/core';

const SatelliteDataTable = () => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
      paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
      },
      table: {
        width: 'inherit',
      },
    }),
  );

  function createData(id: number, name: string, value: number) {
    return {id, name, value};
  }

  const rows = [
    createData(1, 'Param 1', 1),
    createData(2, 'Param 2', 12),
    createData(3, 'Param 3', 123),
    createData(4, 'Param 4', 1234),
    createData(5, 'Param 5', 12345)
  ];

  const classes = useStyles();

  return(
    <div className={classes.root}>
      Some plotted sample data
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Param name</TableCell>
              <TableCell align="right">Param value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
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
};

export default SatelliteDataTable;