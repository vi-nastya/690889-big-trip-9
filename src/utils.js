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


export const formatDuration = (duration) => {
  let minutes = 0;
  let hours = 0;
  let days = 0;

  // Todo: if < 10, add 0 at the beginning

  if (duration < MILLISECONDS_IN_HOUR) {

    // a можно getHours(), getMinutes() использовать

    // Date.prototype.yyyymmdd = function() {
    //   var mm = this.getMonth() + 1; // getMonth() is zero-based
    //   var dd = this.getDate();

    //   return [this.getFullYear(),
    //           (mm>9 ? '' : '0') + mm,
    //           (dd>9 ? '' : '0') + dd
    //          ].join('');
    // };

    minutes = Math.round(duration / MILLISECONDS_IN_MINUTE);
    return minutes.toString() + `M`;
  } else if (duration < MILLISECONDS_IN_DAY) {
    hours = Math.round(duration / MILLISECONDS_IN_HOUR);
    minutes = Math.round((duration - hours * MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
    return hours.toString() + `H ` + minutes.toString() + `M`;
  } else {
    days = Math.round(duration / MILLISECONDS_IN_DAY);
    hours = Math.round((duration - days * MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR);
    minutes = Math.round((duration - days * MILLISECONDS_IN_DAY - hours * MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
    return days.toString() + `D ` + hours.toString() + `H ` + minutes.toString() + `M`;
  }
};
