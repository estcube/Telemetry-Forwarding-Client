import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { MenuItem, Select, Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    chartTitle: {
      textAlign: 'center'
    },
    root: {
      border: '1px solid',
      borderRadius: 5,
      margin: theme.spacing(1)
    }
  });

interface SatelliteDataChartProps extends WithStyles<typeof styles> {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
  graphInfo: { [key: string]: string | number | [] };
}

type SatelliteDataChartState = {
  yAxis: any;
  chartData: { [key: string]: any }[];
  chartLineNames: string[];
  selectedRange: string;
  chartDomain: number;
};

/**
 * Component for drawing data graphs. Gets graph info and data as props.
 */
class SatelliteDataChart extends React.Component<SatelliteDataChartProps, SatelliteDataChartState> {
  constructor(props: SatelliteDataChartProps) {
    super(props);
    const { graphInfo } = this.props;
    const { yAxis } = graphInfo;
    this.state = { yAxis, chartData: [], chartLineNames: [], selectedRange: '10', chartDomain: 300 };
  }

  componentDidMount(): void {
    this.setChartDataWhenMounted();
  }

  setChartDataWhenMounted() {
    const { decodedPackets, telemetryConfiguration } = this.props;
    let localChartData: { [key: string]: any }[] = [];
    const { yAxis } = this.state;
    const lineNames: string[] = [];
    let chartYaxisName = '';
    let bestDomain = 0;
    decodedPackets.packets.forEach(packet => {
      const tempObject: { [key: string]: any } = {};
      tempObject.name = packet.packet_timestamp;
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
        tempObject[realValueName] = packet.fields[yAxisValue];
        const value = parseInt(packet.fields[yAxisValue], 10);
        if (value > bestDomain) bestDomain = value;
        tempObject.unit = chartYaxisName;
      });
      localChartData.push(tempObject);
    });
    localChartData = localChartData.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.setState({ chartData: localChartData, chartLineNames: lineNames, chartDomain: bestDomain });
  }

  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  handleRangeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ selectedRange: event.target.value as string });
  };

  renderChartDataSelection() {
    const { selectedRange } = this.state;
    const allSelections = [
      { value: 10, text: 'last 10' },
      { value: 20, text: 'last 20' },
      { value: 30, text: 'last 30' },
      { value: 40, text: 'last 40' },
      { value: 50, text: 'last 50' },
      { value: 'all', text: 'all' }
    ];
    return (
      <Select value={selectedRange} onChange={this.handleRangeChange}>
        {allSelections.map((value, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={index} value={value.value}>
              {value.text}
            </MenuItem>
          );
        })}
      </Select>
    );
  }

  renderLines() {
    const { chartLineNames } = this.state;
    const children: any[] = [];
    chartLineNames.forEach((lineName: string) => {
      children.push(
        <Line
          key={lineName}
          name={lineName}
          type="monotone"
          dataKey={lineName}
          stroke={SatelliteDataChart.getRandomColor()}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      );
    });
    return children;
  }

  renderChart() {
    const { graphInfo, classes } = this.props;
    const { chartData, selectedRange, chartDomain } = this.state;
    let modifiedChartData = chartData;
    if (selectedRange !== 'all') {
      modifiedChartData = chartData.slice(chartData.length - parseInt(selectedRange, 10), chartData.length);
    }
    if (graphInfo.type === 'line') {
      return (
        <>
          <Typography className={classes.chartTitle} variant="h6">
            {graphInfo.title} - {this.renderChartDataSelection()} entries
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
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
              <XAxis dataKey="name" angle={-60} textAnchor="end" scaleToFit height={150}>
                <Label value={graphInfo.xAxis} position="top" />
              </XAxis>
              <YAxis domain={[0, chartDomain]}>
                <Label value={chartData.length > 0 ? chartData[0].unit : ''} angle={-90} offset={0} position="left" />
              </YAxis>
              <Tooltip />
              <Legend />
              {this.renderLines()}
            </LineChart>
          </ResponsiveContainer>
        </>
      );
    }
    return <></>;
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.renderChart()}</div>;
  }
}

export default withStyles(styles)(SatelliteDataChart);
