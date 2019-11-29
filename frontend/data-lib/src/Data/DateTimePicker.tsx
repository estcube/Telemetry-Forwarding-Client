import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

interface DateTimePickerProps {
  defaultValue: string;
  label: string;
  dateChangeHandler: (value?: string | null) => void;
}

type DateTimePickerState = {
  date: string;
};

/**
 * Component for drawing data graphs. Gets graph info and data as props.
 */
class DateTimePicker extends React.Component<DateTimePickerProps, DateTimePickerState> {
  constructor(props: DateTimePickerProps) {
    super(props);
    const { defaultValue } = this.props;
    this.state = { date: defaultValue };
  }

  handleDateChange(e: any) {
    this.setState({ date: new Date(e).toISOString() });
  }

  sendNewData() {
    const { date } = this.state;
    const { dateChangeHandler } = this.props;
    dateChangeHandler(date);
  }

  renderChartDateSelection() {
    const { date } = this.state;
    const { label } = this.props;
    return (
      <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            variant="inline"
            ampm={false}
            value={date}
            label={label}
            format="yyyy/MM/dd HH:mm:ss"
            onChange={e => this.handleDateChange(e)}
            onClose={() => this.sendNewData()}
          />
        </MuiPickersUtilsProvider>
      </>
    );
  }

  render() {
    return <>{this.renderChartDateSelection()}</>;
  }
}

export default DateTimePicker;
