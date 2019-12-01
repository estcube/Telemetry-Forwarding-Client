import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Chart } from 'react-google-charts';
import DateTimePicker from './DateTimePicker';
import ConfigurationFormTextField from '../Configuration/ConfigurationFormFields/ConfigurationFormTextField';

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
  timelineChartData: any[][];
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
    const anotherDate = new Date();
    const oneDayAgo = new Date(anotherDate.setDate(anotherDate.getDate() - 1));
    this.state = {
      toDate: now.toISOString(),
      fromDate: oneDayAgo.toISOString(),
      maxEntriesPerGraph: 50,
      timelineChartData: [],
      allEnumValues: {},
      enumIdToLabelMapping: {}
    };
  }

  componentDidMount(): void {
    this.makeTimelineFields();
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
    const { allEnumValues, enumIdToLabelMapping } = this.state;
    const { decodedPackets } = this.props;
    const copyOfDecodedPackets = decodedPackets.packets.sort((a, b) => {
      if (a.packet_timestamp < b.packet_timestamp) return -1;
      if (a.packet_timestamp > b.packet_timestamp) return 1;
      return 0;
    });
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
    this.setState({ timelineChartData: dataArray });
  }

  customHandle(e: any, version: string) {
    if (version === 'to') {
      this.setState({ toDate: new Date(e).toISOString() });
    } else {
      this.setState({ fromDate: new Date(e).toISOString() });
    }
  }

  handleLimitChange(e: any) {
    if (e.target.value !== '') {
      this.setState({ maxEntriesPerGraph: parseInt(e.target.value, 10) });
    } else {
      this.setState({ maxEntriesPerGraph: 0 });
    }
  }

  renderChartDateSelection() {
    const { toDate, fromDate, maxEntriesPerGraph } = this.state;
    return (
      <>
        <DateTimePicker
          defaultValue={fromDate}
          label="From"
          dateChangeHandler={(e: any) => this.customHandle(e, 'from')}
        />
        <DateTimePicker defaultValue={toDate} label="To" dateChangeHandler={(e: any) => this.customHandle(e, 'to')} />
        <ConfigurationFormTextField
          diferentWidth
          confElemRequiresRestart={false}
          confElemValue={maxEntriesPerGraph.toString()}
          confElemName="Limit"
          confElemType="int"
          confElemDescription=""
          textChangeHandler={event => this.handleLimitChange(event)}
        />
      </>
    );
  }

  render() {
    const { classes, graphInfo } = this.props;
    const { timelineChartData, maxEntriesPerGraph, toDate, fromDate } = this.state;
    const copyOfFirstElement = timelineChartData[0];
    let modifiedTimelineData = timelineChartData.slice(1, timelineChartData.length - 2).reverse();
    // @ts-ignore
    modifiedTimelineData = modifiedTimelineData.filter(element => element.Start >= fromDate && element.Stop <= toDate);
    modifiedTimelineData.unshift(copyOfFirstElement);
    if (maxEntriesPerGraph > 0) {
      modifiedTimelineData = timelineChartData.slice(0, maxEntriesPerGraph + 1);
    } else {
      modifiedTimelineData = [];
    }
    return (
      <div className={classes.root}>
        <Typography className={classes.chartTitle} variant="h6">
          {graphInfo.title}
          <br />
          {this.renderChartDateSelection()}
        </Typography>
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
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteDataEnumChart);
