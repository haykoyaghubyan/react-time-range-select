import moment from "moment";

function validTimes(startTime, endTime) {
  return startTime.isValid() && endTime.isValid();
}

function validRange(startTime, endTime, sameIsValid) {
  if (startTime.isSame(endTime)) {
    if (!sameIsValid) {
      return "equal";
    } else {
      return null;
    }
  }
  return startTime.isBefore(endTime) ? "lesser" : "greater";
}

function getTimeIncrement(minuteIncrementProp) {

  const minuteIncrement = 60 / minuteIncrementProp;
  let timeArray = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < minuteIncrement; j++) {
      const time = {
        value: ("0" + i).slice(-2) + ("0" + j * minuteIncrementProp).slice(-2),
        HH: ("0" + i).slice(-2),
        MM: ("0" + j * minuteIncrementProp).slice(-2),
        hh:
          i === 0
            ? "12"
            : (i === 12 ? "12" : i > 12 ? "0" + (i - 12) : "0" + i).slice(-2),
        mm: ("0" + j * minuteIncrementProp).slice(-2),
        active: true,
        period: i >= 12 ? "PM" : "AM"
      };
      timeArray.push(time);
    }
  }
  return timeArray;
}

function calculateRoundedTimeValue(moment, minuteIncrementProp) {

  const roundedTime =
    Math.round((moment.hour() * 60 + moment.minutes()) / minuteIncrementProp) *
    minuteIncrementProp;
  return (
    ("0" + Math.floor(roundedTime / 60)).slice(-2) +
    ("0" + (roundedTime % 60)).slice(-2)
  );
}

export function createTimeObjects(props) {
  let startTimeMoment,
    endTimeMoment,
    startTimeIncrement,
    endTimeIncrement,
    startTimeValue,
    endTimeValue,
    error;

  let startTimeObject = moment(props.startTime);
  let endTimeObject = moment(props.endTime);

  if (validTimes(startTimeObject, endTimeObject)) {
    startTimeMoment = startTimeObject.set("seconds", 0);
    endTimeMoment = endTimeObject.set("seconds", 0);
  } else {
    startTimeMoment = moment().set("hour", 8);
    endTimeMoment = moment().set("hour", 10);
  }
  startTimeValue = calculateRoundedTimeValue(
    startTimeMoment,
    props.minuteIncrement
  );
  endTimeValue = calculateRoundedTimeValue(
    endTimeMoment,
    props.minuteIncrement
  );

  startTimeObject.set("hour", parseInt(startTimeValue.substring(0, 2)));
  startTimeObject.set("minutes", parseInt(startTimeValue.substring(2, 4)));
  startTimeObject.set("seconds", 0);
  endTimeObject.set("hour", parseInt(endTimeValue.substring(0, 2)));
  endTimeObject.set("minutes", parseInt(endTimeValue.substring(2, 4)));
  endTimeObject.set("seconds", 0);

  const validity = validRange(
    startTimeMoment,
    endTimeMoment,
    props.sameIsValid
  );
  if (!props.sameIsValid) {
    if (validity === "equal") {
      error = props.equalTimeError;
    } else if (validity === "greater") {
      error = props.endTimeError;
    } else {
      error = null;
    }
  } else if (validity === "greater") {
    error = props.endTimeError;
  }

  startTimeIncrement = getTimeIncrement(props.minuteIncrement);
  endTimeIncrement = getTimeIncrement(props.minuteIncrement);


  return {
    startTimeIncrement,
    endTimeIncrement,
    startTimeValue,
    endTimeValue,
    error
  };
}

export function changeTimeObject(momentObject, newTimeValue) {
  let time = moment(momentObject);
  time.set("hour", parseInt(newTimeValue.substring(0, 2)));
  time.set("minutes", parseInt(newTimeValue.substring(2, 4)));
  time.set("seconds", 0);
  return time.toISOString();
}
