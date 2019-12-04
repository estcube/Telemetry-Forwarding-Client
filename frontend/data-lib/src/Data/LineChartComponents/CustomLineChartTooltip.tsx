import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const styles = () =>
  createStyles({
    tooltipBox: { backgroundColor: '#fff', boxShadow: '1px 1px grey' }
  });

interface CustomLineChartTooltipProps extends WithStyles<typeof styles> {
  current: { [key: string]: any };
  lineVisibility: { [key: string]: any }[];
}

/**
 * Component for drawing custom tooltip.
 */
class CustomLineChartTooltip extends React.Component<CustomLineChartTooltipProps> {
  lineIsVisible(lineName: string) {
    const { lineVisibility } = this.props;
    let isVisible = false;
    lineVisibility.forEach(line => {
      if (line.lineName === lineName && line.visibility) {
        isVisible = true;
      }
    });
    return isVisible;
  }

  render() {
    const { classes, current } = this.props;
    const { active, payload } = current;
    if (active && payload) {
      return (
        <div className={classes.tooltipBox}>
          <Typography variant="body2" style={{ margin: '0', fontWeight: 'bold' }}>
            {payload[0].payload.timestamp}
          </Typography>
          {payload.map((payloadElem: any, index: number) => {
            if (this.lineIsVisible(payloadElem.name)) {
              return (
                <Typography variant="body2" key={index} style={{ color: payloadElem.stroke, margin: '0' }}>
                  {payloadElem.name}: {payloadElem.value} {payloadElem.payload.unit || ''}
                </Typography>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return null;
  }
}

export default withStyles(styles)(CustomLineChartTooltip);
