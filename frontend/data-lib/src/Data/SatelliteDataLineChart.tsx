import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
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
    tooltipBox: { backgroundColor: '#fff', boxShadow: '1px 1px grey' },
    noDataAvailable: {
      textAlign: 'center'
    }
  });

interface SatelliteDataLineChartProps extends WithStyles<typeof styles> {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
  graphInfo: { [key: string]: string | number | [] };
}

type SatelliteDataLineChartState = {
  yAxis: any;
  chartData: { [key: string]: any }[];
  chartLineNames: string[];
  chartDomain: number;
  lineVisibility: { [key: string]: any }[];
  highlightedLine: string | null;
  toDate: string;
  fromDate: string;
  maxEntriesPerGraph: number;
};

/**
 * Component for drawing data graphs. Gets graph info and data as props.
 */
class SatelliteDataLineChart extends React.Component<SatelliteDataLineChartProps, SatelliteDataLineChartState> {
  constructor(props: SatelliteDataLineChartProps) {
    super(props);
    const { graphInfo } = this.props;
    const now = new Date();
    now.setHours(now.getHours() - now.getUTCDate());
    const fromTime = new Date();
    fromTime.setHours(fromTime.getHours() - fromTime.getUTCDate());
    fromTime.setDate(fromTime.getDate() - 1);
    this.state = {
      lineVisibility: [],
      yAxis: graphInfo.yAxis,
      chartData: [],
      chartLineNames: [],
      chartDomain: 300,
      highlightedLine: null,
      toDate: now.toISOString(),
      fromDate: fromTime.toISOString(),
      maxEntriesPerGraph: 100
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
    const lineNames: string[] = [];
    let chartYaxisName = '';
    let bestDomain = 0;
    decodedPackets.packets.forEach(packet => {
      const tempDataPacket: { [key: string]: any } = {};
      const time = packet.packet_timestamp;
      const month = new Date(time).getMonth();
      tempDataPacket.name = `${time.substr(8, 2)}${months[month]}-${time.substr(11, 5)}`;
      tempDataPacket.timestamp = packet.packet_timestamp;
      yAxis.forEach((yAxisValue: string) => {
        const telemetryFields: { [key: number]: any } = telemetryConfiguration.fields;
        let realValueName = '';
        Object.keys(telemetryFields).forEach((field: any) => {
          if (telemetryFields[field].id === yAxisValue) {
            chartYaxisName = telemetryFields[field].unit;
            realValueName = telemetryFields[field].label;
            if (!lineNames.includes(realValueName)) {
              lineNames.push(realValueName);
            }
          }
        });
        tempDataPacket[realValueName] = packet.fields[yAxisValue];
        const value = parseInt(packet.fields[yAxisValue], 10);
        if (value > bestDomain) bestDomain = value;
        tempDataPacket.unit = chartYaxisName;
      });
      localChartData.push(tempDataPacket);
    });
    localChartData = localChartData.sort((a, b) => {
      if (a.timestamp < b.timestamp) return -1;
      if (a.timestamp > b.timestamp) return 1;
      return 0;
    });
    const visibilityTempObject = lineNames.map(lineName => {
      return { lineName, visibility: true };
    });
    this.setState({
      lineVisibility: visibilityTempObject,
      chartData: localChartData,
      chartLineNames: lineNames,
      chartDomain: bestDomain
    });
    if (localChartData.length > 0) {
      const fromDate = new Date(localChartData[localChartData.length - 1].timestamp);
      fromDate.setDate(fromDate.getDate() - 1);
      this.setState({
        fromDate: fromDate.toISOString()
      });
    }
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

  hideOtherLines(e: any) {
    const { lineVisibility, highlightedLine } = this.state;
    let newVisibility: { [key: string]: any }[];
    if (!highlightedLine) {
      newVisibility = lineVisibility.map(line => {
        if (line.lineName !== e.dataKey) {
          return {
            lineName: line.lineName,
            visibility: !line.visibility
          };
        }
        return line;
      });
      this.setState({ highlightedLine: e.dataKey });
    } else if (highlightedLine === e.dataKey) {
      newVisibility = this.restoreVisibility();
      this.setState({ highlightedLine: null });
    } else {
      newVisibility = lineVisibility.map(line => {
        if (line.lineName !== e.dataKey) {
          return {
            lineName: line.lineName,
            visibility: false
          };
        }
        return {
          lineName: line.lineName,
          visibility: true
        };
      });
      this.setState({ highlightedLine: e.dataKey });
    }
    this.setState({ lineVisibility: newVisibility });
  }

  restoreVisibility() {
    const { lineVisibility } = this.state;
    const newVisibility: { [key: string]: any }[] = lineVisibility.map(line => {
      return {
        lineName: line.lineName,
        visibility: true
      };
    });
    return newVisibility;
  }

  handleToFromChange(e: any, version: string) {
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
          dateChangeHandler={(e: any) => this.handleToFromChange(e, 'from')}
        />
        <DateTimePicker
          defaultValue={toDate}
          label="To"
          dateChangeHandler={(e: any) => this.handleToFromChange(e, 'to')}
        />
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

  renderLines() {
    const { chartLineNames, lineVisibility } = this.state;
    const children: any[] = [];
    chartLineNames.forEach((lineName: string, index: number) => {
      let show = false;
      lineVisibility.forEach(line => {
        if (line.lineName === lineName) {
          show = line.visibility;
        }
      });
      children.push(
        <Line
          key={lineName}
          name={lineName}
          type="monotone"
          dataKey={lineName}
          stroke={SatelliteDataLineChart.getColor(index)}
          strokeWidth={2}
          activeDot={{ r: 8 }}
          ref={lineName}
          opacity={show ? 1 : 0}
        />
      );
    });
    return children;
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
    const { chartDomain, maxEntriesPerGraph, fromDate, toDate } = this.state;
    let modifiedChartData = this.getSelectedDataInWindow();
    const modifiedDataLength = modifiedChartData.length;
    if (modifiedDataLength > maxEntriesPerGraph) {
      modifiedChartData = modifiedChartData.slice(modifiedDataLength - maxEntriesPerGraph, modifiedDataLength);
    }
    return (
      <>
        <Typography className={classes.chartTitle} variant="h6">
          {graphInfo.title}
          <br />
          {this.renderChartDateSelection()}
        </Typography>
        {modifiedChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={modifiedChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="name" angle={-15} textAnchor="end" scaleToFit height={50}>
                <Label value={graphInfo.xAxis} position="top" />
              </XAxis>
              <YAxis domain={[0, chartDomain]}>
                <Label
                  value={modifiedChartData.length > 0 && modifiedChartData[0] ? modifiedChartData[0].unit : ''}
                  angle={-90}
                  offset={0}
                  position="left"
                />
              </YAxis>
              <Tooltip content={(current: { [key: string]: any }) => this.renderCustomTooltip(current)} />
              <Legend onClick={(event: React.ChangeEvent<HTMLInputElement>) => this.hideOtherLines(event)} />
              {this.renderLines()}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body1" className={classes.noDataAvailable}>
            No data available from {fromDate} to {toDate} with limit of {maxEntriesPerGraph}
          </Typography>
        )}
      </>
    );
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.renderChart()}</div>;
  }
}

export default withStyles(styles)(SatelliteDataLineChart);
