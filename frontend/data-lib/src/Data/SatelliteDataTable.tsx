import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Paper,
  Typography
} from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    paper: {
      width: 'auto',
      overflowX: 'auto',
      margin: theme.spacing(3, 2, 2, 2),
      border: 'solid',
      borderWidth: 0.5
    },
    tableHeader: {
      textAlign: 'center'
    },
    table: {
      width: '100%'
    }
  });

interface SatelliteDataTableProps extends WithStyles<typeof styles> {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
}

type SateliteDataTableState = {
  selectedPage: string;
  allPages: string[];
  tableData: { [key: string]: { [key: string]: any }[] };
  tableHeaders: string[];
};

/**
 * Component for showing data tables.
 * Takes data and configuration as props, combines them and displays as a table.
 */
class SatelliteDataTable extends React.Component<SatelliteDataTableProps, SateliteDataTableState> {
  constructor(props: SatelliteDataTableProps) {
    super(props);
    this.state = { selectedPage: '', allPages: [], tableData: {}, tableHeaders: [] };
  }

  componentDidMount(): void {
    this.makeCorrectDataForTables();
  }

  handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ selectedPage: event.target.value as string });
  };

  /**
   * Combines fields from configuration with fields from data. Sets paginator state.
   */
  makeCorrectDataForTables() {
    const { decodedPackets } = this.props;
    const telemetryPacketsArray = decodedPackets.packets;
    let telemetryPacketTablePaginatorPages: string[] = [];
    const telemetryPacketTableData: { [key: string]: any } = {};
    telemetryPacketsArray.forEach(packet => {
      telemetryPacketTablePaginatorPages.push(packet.packet_timestamp);
      const dataFields = packet.fields;
      const elements: any[] = [];
      Object.keys(dataFields).forEach(dataFieldKey => {
        const confElemToMatchData = this.dataKeyInConf(dataFieldKey);
        if (Object.keys(confElemToMatchData).length > 0) {
          const dataObjectProperty: { [key: string]: any } = {};
          Object.keys(confElemToMatchData).forEach(confElemKey => {
            dataObjectProperty[confElemKey] = confElemToMatchData[confElemKey];
          });
          dataObjectProperty.value = dataFields[dataFieldKey];
          elements.push(dataObjectProperty);
        }
      });
      telemetryPacketTableData[packet.packet_timestamp] = elements;
    });
    telemetryPacketTablePaginatorPages = telemetryPacketTablePaginatorPages.sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });
    if (telemetryPacketTablePaginatorPages.length > 0) {
      const tableHeaders = Object.keys(telemetryPacketTableData[telemetryPacketTablePaginatorPages[0]][0]);
      this.setState({
        tableData: telemetryPacketTableData,
        selectedPage: telemetryPacketTablePaginatorPages[0],
        allPages: telemetryPacketTablePaginatorPages,
        tableHeaders
      });
    }
  }

  /**
   * Checks if data parameter is defined in configuration.
   * @param key - id of parameter top check
   */
  dataKeyInConf(key: string): { [key: string]: any } {
    const { telemetryConfiguration } = this.props;
    let correctField = null;
    telemetryConfiguration.fields.forEach(field => {
      if (field.id === key) {
        correctField = field;
      }
    });
    return correctField || {};
  }

  renderTabledataSelection() {
    const { selectedPage, allPages } = this.state;
    return (
      <Select value={selectedPage} onChange={this.handleTimeChange}>
        {allPages.map((page, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={index} value={page}>
              {page}
            </MenuItem>
          );
        })}
      </Select>
    );
  }

  renderTableRow() {
    const { tableData, selectedPage, tableHeaders } = this.state;
    if (Object.keys(tableData).length > 0) {
      return tableData[selectedPage].map((dataElement: any) => {
        return (
          <TableRow key={dataElement.id}>
            {tableHeaders.map(header => {
              if (header !== 'id') {
                return <TableCell key={header}>{dataElement[header]}</TableCell>;
              }
              return undefined;
            })}
          </TableRow>
        );
      });
    }
    return [];
  }

  renderTable() {
    const { tableHeaders } = this.state;
    const { classes } = this.props;
    const headerChildren = tableHeaders.map(header => {
      if (header !== 'id') {
        return <TableCell key={header}>{header}</TableCell>;
      }
      return undefined;
    });
    return (
      <>
        <Typography className={classes.tableHeader} variant="h6">
          Data on {this.renderTabledataSelection()}
        </Typography>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>{headerChildren}</TableRow>
          </TableHead>
          <TableBody>{this.renderTableRow()}</TableBody>
        </Table>
      </>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>{this.renderTable()}</Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteDataTable);
