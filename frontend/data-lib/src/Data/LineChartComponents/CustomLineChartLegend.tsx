import React from 'react';

interface CustomLineChartLegendProps {
  value: string;
  entry: { [key: string]: any };
  lineVisibility: { [key: string]: any }[];
}

/**
 * Component for drawing custom legend when legend is toggled.
 */
class CustomLineChartLegend extends React.Component<CustomLineChartLegendProps> {
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
    const { value, entry } = this.props;
    const opacity = this.lineIsVisible(value) ? '1' : '0.2';
    return <span style={{ color: entry.color, opacity }}>{value}</span>;
  }
}

export default CustomLineChartLegend;
