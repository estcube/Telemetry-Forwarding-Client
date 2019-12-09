import React from 'react';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';

const styles = (theme: Theme) =>
  createStyles({
    tableCellHeader: {
      borderRight: '1px solid',
      borderBottom: '1px solid',
      textAlign: 'center'
    },
    tableCell: {
      borderLeft: '1px solid',
      borderBottom: '1px solid',
      padding: theme.spacing(1),
      textAlign: 'right',
      maxWidth: '120px',
      '&:last-child': {
        padding: theme.spacing(1)
      }
    }
  });

interface SatelliteDataTableRowsProps extends WithStyles<typeof styles> {
  entriesPerTable: number;
  toDate: string;
  fromDate: string;
  combinedVerticalTableData: { [key: string]: string[] };
  verticalTableHeaders: string[];
  headersWithUnits: { [key: string]: string };
}

/**
 * Component for rendering table rows
 */
class SatelliteDataTableRows extends React.Component<SatelliteDataTableRowsProps> {
  render() {
    const {
      headersWithUnits,
      verticalTableHeaders,
      combinedVerticalTableData,
      fromDate,
      toDate,
      entriesPerTable,
      classes
    } = this.props;
    if (
      verticalTableHeaders.includes('Timestamp') &&
      combinedVerticalTableData.Timestamp &&
      combinedVerticalTableData.Timestamp.length > 0
    ) {
      return verticalTableHeaders.map(header => {
        if (header !== 'id' && header !== 'type') {
          return (
            <TableRow key={header}>
              <TableCell className={classes.tableCellHeader} variant="head">
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  {headersWithUnits[header] ? `${header} (${headersWithUnits[header]})` : header}
                </Typography>
              </TableCell>
              {combinedVerticalTableData[header] &&
                combinedVerticalTableData[header].map((element, index) => {
                  if (header === 'Timestamp') {
                    return (
                      <TableCell className={classes.tableCell} key={index}>
                        <Typography variant="body2">{element.replace('T', '\n')}</Typography>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell className={classes.tableCell} key={index}>
                      <Typography variant="body2">{element}</Typography>
                    </TableCell>
                  );
                })}
            </TableRow>
          );
        }
        return null;
      });
    }
    return (
      <TableRow>
        <TableCell className={classes.tableCellHeader}>
          <Typography variant="body1">
            No data available from {fromDate} to {toDate} with limit of {entriesPerTable}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(SatelliteDataTableRows);
