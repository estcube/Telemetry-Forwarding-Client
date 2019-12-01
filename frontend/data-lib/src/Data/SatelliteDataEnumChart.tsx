import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Typography } from '@material-ui/core';
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
    },
    tooltipBox: { backgroundColor: '#fff', boxShadow: '1px 1px grey' }
  });

interface SatelliteDataEnumChartProps extends WithStyles<typeof styles> {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
  graphInfo: { [key: string]: string | number | [] };
}

type SatelliteDataEnumChartState = {
  yAxis: any;
  chartData: { [key: string]: any }[];
  toDate: string;
  fromDate: string;
  maxEntriesPerGraph: number;
  enumValues: string[];
};

/**
 * Component for drawing data graphs. Gets graph info and data as props.
 */
class SatelliteDataEnumChart extends React.Component<SatelliteDataEnumChartProps, SatelliteDataEnumChartState> {
  constructor(props: SatelliteDataEnumChartProps) {
    super(props);
    const { graphInfo } = this.props;
    const { yAxis } = graphInfo;
    const now = new Date();
    const anotherDate = new Date();
    const oneDayAgo = new Date(anotherDate.setDate(anotherDate.getDate() - 1));
    this.state = {
      yAxis,
      chartData: [],
      toDate: now.toISOString(),
      fromDate: oneDayAgo.toISOString(),
      maxEntriesPerGraph: 100,
      enumValues: []
    };
  }

  componentDidMount(): void {
    this.setChartDataWhenMounted();
  }

  setChartDataWhenMounted() {
    const months: { [key: number]: string } = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    };
    const { decodedPackets, telemetryConfiguration } = this.props;
    let localChartData: { [key: string]: any }[] = [];
    const { yAxis } = this.state;
    let chartYaxisName = '';
    decodedPackets.packets.forEach(packet => {
      const tempObject: { [key: string]: any } = {};
      const time = packet.packet_timestamp;
      const month = new Date(time).getMonth();
      tempObject.name = `${time.substr(8, 2)}${months[month]}-${time.substr(11, 5)}`;
      tempObject.timestamp = packet.packet_timestamp;
      yAxis.forEach((yAxisValue: string) => {
        const telemetryFields: { [key: number]: any } = telemetryConfiguration.fields;
        let realValueName = '';
        Object.keys(telemetryFields).forEach((field: any) => {
          if (telemetryFields[field].type === 'enum') {
            this.setState({ enumValues: telemetryFields[field].values });
          }
          if (telemetryFields[field].id === yAxisValue) {
            chartYaxisName = telemetryFields[field].unit;
            realValueName = telemetryFields[field].id;
          }
        });

        tempObject[realValueName] = packet.fields[yAxisValue];

        tempObject.unit = chartYaxisName;
      });
      localChartData.push(tempObject);
    });
    localChartData = localChartData.sort((a, b) => {
      if (a.timestamp < b.timestamp) return -1;
      if (a.timestamp > b.timestamp) return 1;
      return 0;
    });

    this.setState({
      chartData: localChartData
    });
  }

  static getColor(index: number) {
    const colours = [
      '#e6194b',
      '#3cb44b',
      '#ffe119',
      '#4363d8',
      '#f58231',
      '#911eb4',
      '#46f0f0',
      '#f032e6',
      '#bcf60c',
      '#fabebe',
      '#008080',
      '#e6beff',
      '#9a6324',
      '#fffac8',
      '#800000',
      '#aaffc3',
      '#808000',
      '#ffd8b1',
      '#000075',
      '#808080',
      '#000000'
    ];
    return colours[index];
  }

  getSelectedDataInWindow() {
    const { fromDate, toDate, chartData } = this.state;
    const filtered = chartData.filter(
      dataElement => dataElement.timestamp <= toDate && dataElement.timestamp >= fromDate
    );
    return filtered.sort((a, b) => {
      if (a.timestamp < b.timestamp) return -1;
      if (a.timestamp > b.timestamp) return 1;
      return 0;
    });
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

  renderCustomTooltip(current: { [key: string]: any }) {
    const { active, payload } = current;
    const { classes } = this.props;
    if (active && payload) {
      return (
        <div className={classes.tooltipBox}>
          <Typography variant="body2" style={{ margin: '0', fontWeight: 'bold' }}>
            {payload[0].payload.timestamp}
          </Typography>
          {payload.map((payloadElem: any, index: number) => {
            return (
              <Typography variant="body2" key={index} style={{ color: payloadElem.stroke, margin: '0' }}>
                {payloadElem.name}: {payloadElem.value} {payloadElem.payload.unit || ''}
              </Typography>
            );
          })}
        </div>
      );
    }
    return null;
  }

  renderChart() {
    const { graphInfo, classes } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { maxEntriesPerGraph, enumValues, yAxis } = this.state;
    let modifiedChartData = this.getSelectedDataInWindow();
    const modifiedDataLength = modifiedChartData.length;
    if (modifiedDataLength > maxEntriesPerGraph) {
      modifiedChartData = modifiedChartData.slice(modifiedDataLength - maxEntriesPerGraph, modifiedDataLength);
    }
    return (
      <div>
        <Typography className={classes.chartTitle} variant="h6">
          {graphInfo.title}
          <br />
          {this.renderChartDateSelection()}
        </Typography>
        <p>
          {modifiedChartData.map(dataObject => {
            return enumValues[dataObject[yAxis[0]]];
          })}
        </p>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.renderChart()}</div>;
  }
}

export default withStyles(styles)(SatelliteDataEnumChart);
