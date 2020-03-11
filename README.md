# React-Time-Range-Select

React time range select with validation and powered with hooks.

Installation
-----

```
npm install react-time-range-select --save
```

Dependencies
-----
- React.JS
- Moment.JS

Usage
-----

```
import TimeRangeSelect from "react-time-range-select";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "2019-10-05T01:48:00.000Z",
      endTime: "2019-10-05T03:48:00.000Z"
    };
  }

  changeStartTime = value => {
    this.setState({ startTime: value });
  };

  changeEndTime = value => {
    this.setState({ endTime: value });
  };

  render() {
    return (
      <TimeRangeSelect
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        mode24Hours
        onChangeStart={this.changeStartTime}
        onChangeEnd={this.changeEndTime}
      />
    );
  }
}
export default Home;
```

Component Props
-----

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `startLabel` | string | "Start Time" | Text label that appears before the start time select. |
| `endLabel` | string | "End Time" | Text label that appears before the end time select. |
| `startTime` | string | undefined | A moment ISO 8601 time string for start time. |
| `endTime` | string | undefined | A moment ISO 8601 time string for end time. |
| `mode24Hours` | bool | false | Display 12 hour or 24 hour time. |
| `className` | string | undefined | It's for handling custom styling of the component. |
| `minuteIncrement` | Number | 30 | Defines the increments in time that should appear in the select. Increments must be one of these `1, 2, 5, 10, 15, 20, 30, 60` minutes. |
| `sameIsValid` | boolean | true | If both the start and end times are the same. |
| `onClick` | function | undefined | Function that is called when one of the time select options is clicked. |
| `onChange` | function | undefined | Function that is called when one of the values in the time select changes. |
| `showErrors` | boolean | true | Display an error message when the input times are invalid. |
| `equalTimeError` | string | "Please enter a valid time. Start and End times cannot be the same." | Error is rendered when both start and time values are the same, and this is considered invalid when `sameIsValid={true}`|
| `endTimeError` | string | "Please enter a valid time. End time cannot be before start time." | Error string that is showing when the selected end time is before the start time.|
| `onStartTimeClick` | function | undefined | Function that is called when the start time select is clicked. |
| `onStartTimeChange` | function | undefined |Function that is called when the start time select value is changed. |
| `onEndTimeClick` | function | undefined | Function that is called when the end time select option is clicked. |
| `onEndTimeChange` | function | undefined |Function that is called when the end time select value is changed. |

# License

MIT
