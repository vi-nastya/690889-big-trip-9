export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
export const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;
export const MILLISECONDS_IN_MINUTE = 60 * 1000;

export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getRandomNumber = (maxNumber, minNumber = 0) => Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;

export const getRandomArraySubset = (arr, subsetSize) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, subsetSize);
};

export const getRandomArrayElement = (arr) => arr[getRandomNumber(arr.length - 1)];

// TODO

export const getCities = (events) => {
  events.reduce();
};

const getDurationParts = (duration) => {
  let minutes = 0;
  let hours = 0;
  let days = 0;

  days = Math.floor(duration / MILLISECONDS_IN_DAY);
  hours = Math.floor((duration - days * MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR);
  minutes = Math.round((duration - days * MILLISECONDS_IN_DAY - hours * MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);

  return [days, hours, minutes];
};

const addZero = (interval) => {
  if (interval < 10) {
    return `0` + interval.toString();
  }
  return interval.toString();
};

export const formatDuration = (duration) => {
  const [days, hours, minutes] = getDurationParts(duration);

  if (days === 0 && hours === 0) {
    return addZero(minutes) + `M`;
  } else if (days === 0) {
    return addZero(hours) + `H ` + addZero(minutes) + `M`;
  } else {
    return addZero(days) + `D ` + addZero(hours) + `H ` + addZero(minutes) + `M`;
  }
};

export const getTimeFromTimestamp = (timestamp) => {
  return (new Date(timestamp)).toString().slice(16, 21);
};
