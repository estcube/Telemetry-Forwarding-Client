import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker as SomePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

interface DateTimePickerProps {
  defaultValue: string;
  label: string;
  dateChangeHandler: (value?: string | null) => void;
}

type DateTimePickerState = {
  date: string;
};

/**
 * Component for rendering datetime picker
 */
class DateTimePicker extends React.Component<DateTimePickerProps, DateTimePickerState> {
  constructor(props: DateTimePickerProps) {
    super(props);
    const { defaultValue } = this.props;
    this.state = { date: defaultValue };
  }

  componentDidUpdate(prevProps: Readonly<DateTimePickerProps>): void {
    const { defaultValue } = this.props;
    if (prevProps.defaultValue !== defaultValue) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        date: defaultValue
      });
    }
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
          <SomePicker
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
