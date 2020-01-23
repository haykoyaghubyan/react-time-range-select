import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createTimeObjects, changeTimeObject } from "./time";
import "./styles.css";

const TimeRange = props => {
  const initialState = {
    startTimeValue: "",
    startTimeIncrement: [],
    endTimeValue: "",
    endTimeIncrement: [],
    error: ""
  };

  const [timeModel, setTimeModel] = useState(initialState);

  useEffect(() => {
    buildModel(props);
  }, [props]);

  const buildModel = props => {
    const timeModel = createTimeObjects({ ...props });
    setTimeModel(timeModel);
  };

  const changeTime = evt => {
    let sValue = props.startTime;
    let eValue = props.endTime;
    if (evt.target.id === "select-start") {
      sValue = changeTimeObject(sValue, evt.target.value);
      props.onChangeStart(sValue);
    } else if (evt.target.id === "select-end") {
      eValue = changeTimeObject(eValue, evt.target.value);
      props.onChangeEnd(eValue);
    }
  };

  const calendar = React.Children.toArray(props.children);

  return (
    <div id="react-time-range" className={props.className}>
      <div id="start-component" className="component">
        {props.startLabel && <span className="label">{props.startLabel}</span>}
        {calendar[0] && <span className="component">{calendar[0]}</span>}
        <select
          id="select-start"
          value={timeModel.startTimeValue && timeModel.startTimeValue}
          onChange={changeTime}
        >
          {timeModel.startTimeIncrement &&
            timeModel.startTimeIncrement.map((resp, index) => (
              <option key={index} value={resp.value} disabled={!resp.active}>
                {props.mode24Hours
                  ? `${resp.HH}:${resp.MM}`
                  : `${resp.hh}:${resp.mm} ${resp.period}`}
              </option>
            ))}
        </select>
      </div>
      <div id="end-component" className="component">
        {props.endLabel && <span className="label">{props.endLabel}</span>}
        {calendar[1] && <span className="component">{calendar[1]}</span>}
        <select
          id="select-end"
          value={timeModel.endTimeValue && timeModel.endTimeValue}
          onChange={changeTime}
        >
          {timeModel.endTimeIncrement &&
            timeModel.endTimeIncrement.map((resp, index) => (
              <option key={index} value={resp.value} disabled={!resp.active}>
                {props.mode24Hours
                  ? `${resp.HH}:${resp.MM}`
                  : `${resp.hh}:${resp.mm} ${resp.period}`}
              </option>
            ))}
        </select>
      </div>
      {props.showErrors && timeModel.error && (
        <div className="error">{timeModel.error}</div>
      )}
    </div>
  );
};

TimeRange.defaultProps = {
  mode24Hours: false,
  useCalendarChildren: false,
  sameIsValid: true,
  calendarChildren: 0,
  minuteIncrement: 30,
  startLabel: "Start Time",
  endLabel: "End Time",
  showErrors: true,
  repositionTimes: false,
  equalTimeError:
    "Please enter a valid time. Start and End times cannot be the same.",
  endTimeError:
    "Please enter a valid time. End time cannot be before start time."
};

TimeRange.propTypes = {
  mode24Hours: PropTypes.bool,
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  minuteIncrement: PropTypes.oneOf([1, 2, 5, 10, 15, 20, 30, 60]),
  sameIsValid: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  showErrors: PropTypes.bool,
  equalTimeError: PropTypes.string,
  endTimeError: PropTypes.string,
  onStartTimeClick: PropTypes.func,
  onStartTimeChange: PropTypes.func,
  onEndTimeClick: PropTypes.func,
  onEndTimeChange: PropTypes.func
};

export default TimeRange;
