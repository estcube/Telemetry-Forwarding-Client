import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { Typography } from '@material-ui/core';

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
};

/**
 * Component for drawing data graphs. Gets graph info and data as props.
 */
class SatelliteDataChart extends React.Component<SatelliteDataChartProps, SatelliteDataChartState> {
  constructor(props: SatelliteDataChartProps) {
    super(props);
    const { graphInfo } = this.props;
    const { yAxis } = graphInfo;
    this.state = { yAxis, chartData: [], chartLineNames: [] };
  }

  componentDidMount(): void {
    this.setChartDataWhenMounted();
  }

  setChartDataWhenMounted() {
    const { decodedPackets, telemetryConfiguration } = this.props;
    const localChartData: { [key: string]: any }[] = [];
    const { yAxis } = this.state;
    const lineNames: string[] = [];
    let chartYaxisName = '';
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
        tempObject.unit = chartYaxisName;
      });
      localChartData.push(tempObject);
    });
    this.setState({ chartData: localChartData, chartLineNames: lineNames });
  }

  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
          activeDot={{ r: 8 }}
        />
      );
    });
    return children;
  }

  renderChart() {
    const { graphInfo, classes } = this.props;
    const { chartData } = this.state;
    if (graphInfo.type === 'line') {
      return (
        <>
          <Typography className={classes.chartTitle} variant="h6">
            {graphInfo.title}
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
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
              <YAxis>
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
