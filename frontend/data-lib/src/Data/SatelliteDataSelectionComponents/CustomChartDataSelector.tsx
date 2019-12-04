import React from 'react';
import DateTimePicker from './DateTimePicker';
import LimitTextField from './LimitTextField';

interface CustomChartDataSelectorProps {
  fromDate: string;
  toDate: string;
  maxEntriesPerGraph: number;
  changeHandler: (toDates: any, fromDates: any, maxSelections: any) => void;
}

/**
 * Component for drawing custom legend when legend is toggled.
 */
class CustomChartDataSelector extends React.Component<CustomChartDataSelectorProps> {
  handleToFromChange(e: any, version: string) {
    const { changeHandler, toDate, fromDate, maxEntriesPerGraph } = this.props;
    if (version === 'to') {
      changeHandler(new Date(e).toISOString(), fromDate, maxEntriesPerGraph);
    } else {
      changeHandler(toDate, new Date(e).toISOString(), maxEntriesPerGraph);
    }
  }

  handleLimitChange(e: any) {
    const { changeHandler, toDate, fromDate } = this.props;
    if (e.target.value !== '') {
      changeHandler(toDate, fromDate, parseInt(e.target.value, 10));
    } else {
      changeHandler(toDate, fromDate, 0);
    }
  }

  render() {
    const { fromDate, toDate, maxEntriesPerGraph } = this.props;
    return (
      <div>
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
        <LimitTextField
          fieldValue={maxEntriesPerGraph.toString()}
          textChangeHandler={event => this.handleLimitChange(event)}
        />
      </div>
    );
  }
}

export default CustomChartDataSelector;
