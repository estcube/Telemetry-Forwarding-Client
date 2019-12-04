import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Chart } from 'react-google-charts';
import CustomChartDataSelector from './SatelliteDataSelectionComponents/CustomChartDataSelector';

const styles = (theme: Theme) =>
  createStyles({
    chartTitle: {
      textAlign: 'center'
    },
    root: {
      border: '1px solid',
      borderRadius: 5,
      margin: theme.spacing(1)
    },
    limit: {
      maxWidth: 100
    },
    noDataAvailable: {
      textAlign: 'center'
    }
  });

interface SatelliteDataEnumChartProps extends WithStyles<typeof styles> {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
  graphInfo: { [key: string]: string | number | [] };
}

type SatelliteDataEnumChartState = {
  toDate: string;
  fromDate: string;
  maxEntriesPerGraph: number;
  timelineChartData: string[][] | { [key: string]: any }[];
  allEnumValues: { [key: string]: string[] };
  enumIdToLabelMapping: { [key: string]: string };
};

/**
 * Component for drawing enum charts. Gets graph info and data as props.
 */
class SatelliteDataEnumChart extends React.Component<SatelliteDataEnumChartProps, SatelliteDataEnumChartState> {
  constructor(props: SatelliteDataEnumChartProps) {
    super(props);
    const now = new Date();
    const fromTime = new Date();
    fromTime.setDate(fromTime.getDate() - 1);
    this.state = {
      toDate: now.toISOString(),
      fromDate: fromTime.toISOString(),
      maxEntriesPerGraph: 50,
      timelineChartData: [],
      allEnumValues: {},
      enumIdToLabelMapping: {}
    };
  }

  componentDidMount(): void {
    this.makeTimelineFields();
  }

  componentDidUpdate(
    prevProps: Readonly<SatelliteDataEnumChartProps>,
    prevState: Readonly<SatelliteDataEnumChartState>
  ): void {
    const { toDate, fromDate, maxEntriesPerGraph } = this.state;
    if (
      toDate !== prevState.toDate ||
      fromDate !== prevState.fromDate ||
      maxEntriesPerGraph !== prevState.maxEntriesPerGraph
    ) {
      this.makeTimelineFields();
    }
  }

  getEnumsForLabel(label: string) {
    const { telemetryConfiguration } = this.props;
    const { allEnumValues, enumIdToLabelMapping } = this.state;
    const { fields } = telemetryConfiguration;
    const fieldObject = fields.filter(field => field.id === label);
    const copyOfAllEnumValues: { [key: string]: string[] } = allEnumValues;
    const copyOfAllEnumIdToLabelMapping = enumIdToLabelMapping;
    copyOfAllEnumIdToLabelMapping[label] = fieldObject[0].label;
    copyOfAllEnumValues[label] = fieldObject[0].values;
    this.setState({ allEnumValues: copyOfAllEnumValues, enumIdToLabelMapping: copyOfAllEnumIdToLabelMapping });
  }

  makeTimelineFields() {
    const { graphInfo } = this.props;
    const tempArrayOfChartData: any[][] = [];
    if (typeof graphInfo.yAxis === 'object') {
      tempArrayOfChartData.push([]);
      graphInfo.yAxis.forEach((element: string) => {
        this.getEnumsForLabel(element);
        tempArrayOfChartData[0].push({ type: 'string', id: element });
        tempArrayOfChartData[0].push({ type: 'string', id: 'Name' });
      });
      tempArrayOfChartData[0].push({ type: 'date', id: 'Start' });
      tempArrayOfChartData[0].push({ type: 'date', id: 'End' });
    }
    this.makeTimelineData(tempArrayOfChartData);
  }

  makeTimelineData(dataArray: any[][]) {
    const { allEnumValues, enumIdToLabelMapping, toDate, fromDate } = this.state;
    const { decodedPackets } = this.props;
    let copyOfDecodedPackets = decodedPackets.packets.sort((a, b) => {
      if (a.packet_timestamp < b.packet_timestamp) return -1;
      if (a.packet_timestamp > b.packet_timestamp) return 1;
      return 0;
    });
    copyOfDecodedPackets = copyOfDecodedPackets.filter(
      elem => elem.packet_timestamp >= fromDate && elem.packet_timestamp <= toDate
    );
    let previousTimestamp: string;
    copyOfDecodedPackets.forEach(packet => {
      const { fields } = packet;
      Object.keys(fields).forEach(fieldKey => {
        Object.keys(allEnumValues).forEach(enumValueKey => {
          if (enumValueKey === fieldKey) {
            const endDate = new Date(packet.packet_timestamp);
            if (!previousTimestamp) {
              previousTimestamp = endDate.toISOString();
            }
            const startDate = new Date(previousTimestamp);
            const statusName = allEnumValues[enumValueKey][fields[fieldKey]];
            dataArray.push([enumIdToLabelMapping[fieldKey], statusName, startDate, endDate]);
          }
        });
      });
      previousTimestamp = packet.packet_timestamp;
    });
    if (dataArray.length >= 2) {
      const newFromDate = new Date(dataArray[dataArray.length - 1][3]);
      newFromDate.setDate(newFromDate.getDate() - 1);
      this.setState({
        fromDate: newFromDate.toISOString()
      });
    }
    this.setState({ timelineChartData: dataArray });
  }

  handleDataSelectionChange(toDate: string, fromDate: string, maxSelection: number) {
    this.setState({ toDate, fromDate, maxEntriesPerGraph: maxSelection });
  }

  render() {
    const { classes, graphInfo } = this.props;
    const { maxEntriesPerGraph, fromDate, toDate, timelineChartData } = this.state;
    const copyOfFirstElement = timelineChartData[0];
    let modifiedTimelineData = timelineChartData.slice(
      timelineChartData.length - maxEntriesPerGraph,
      timelineChartData.length
    );
    modifiedTimelineData.unshift(copyOfFirstElement);
    if (maxEntriesPerGraph > 0) {
      modifiedTimelineData = timelineChartData.slice(0, maxEntriesPerGraph + 2);
    } else {
      modifiedTimelineData = [];
    }

    return (
      <div className={classes.root}>
        <Typography className={classes.chartTitle} variant="h6">
          {graphInfo.title}
          <br />
          <CustomChartDataSelector
            changeHandler={(toDates: string, fromDates: string, maxSelections: number) =>
              this.handleDataSelectionChange(toDates, fromDates, maxSelections)
            }
            fromDate={fromDate}
            toDate={toDate}
            maxEntriesPerGraph={maxEntriesPerGraph}
          />
        </Typography>
        {modifiedTimelineData.length > 1 ? (
          <div>
            <Chart
              width="100%"
              height="150px"
              chartType="Timeline"
              loader={<div>Loading Chart</div>}
              data={modifiedTimelineData}
              options={{
                avoidOverlappingGridLines: false
              }}
            />
          </div>
        ) : (
          <Typography variant="body1" className={classes.noDataAvailable}>
            No data available from {fromDate} to {toDate} with limit of {maxEntriesPerGraph}
          </Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteDataEnumChart);
