import {getRandomBoolean, getRandomNumber, getRandomArraySubset, getRandomArrayElement,
  MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE,
  EVENT_TYPES, CITIES} from './utils';

const DESCRIPTION_SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 3;
const MIN_PRICE = 0;
const MAX_PRICE = 300;
const MAX_DATE_DELTA = 14 * MILLISECONDS_IN_DAY;
const MIN_EVENT_DURATION = 10 * MILLISECONDS_IN_MINUTE;
const MAX_EVENT_DURATION = 4 * MILLISECONDS_IN_HOUR;

export const getFilters = () => {
  return [
    {name: `everything`, isSelected: true},
    {name: `future`, isSelected: false},
    {name: `past`, isSelected: false}
  ];
};

export const getEventData = () => ({
  type: getRandomArrayElement(EVENT_TYPES),
  destination: getRandomArrayElement(CITIES),
  photos: `http://picsum.photos/300/150?r=${Math.random()}`,
  description: getRandomArraySubset(DESCRIPTION_SENTENCES, getRandomNumber(MAX_DESCRIPTION_LENGTH, MIN_DESCRIPTION_LENGTH)).join(` `),
  price: getRandomNumber(MAX_PRICE, MIN_PRICE),
  dateStart: Date.now() + 1 + getRandomNumber(MAX_DATE_DELTA, -1 * MAX_DATE_DELTA),
  duration: getRandomNumber(MAX_EVENT_DURATION, MIN_EVENT_DURATION),
  options: new Set([
    {
      title: `Add luggage`,
      price: 10,
      accepted: getRandomBoolean()
    },
    {
      title: `Switch to comfort class`,
      price: 150,
      accepted: getRandomBoolean()
    },
    {
      title: `Add meal`,
      price: 2,
      accepted: getRandomBoolean()
    },
    {
      title: `Choose seats`,
      price: 9,
      accepted: getRandomBoolean()
    }
  ])
});

export const formatRoute = (cities) => {
  if (cities.length === 1) {
    return cities[0];
  } else if (cities.length === 2 || cities.length === 3) {
    return cities.join(` &mdash; `);
  } else {
    return cities[0] + ` &mdash; ... &mdash; ` + cities[cities.length - 1];
  }
};

const getEndDate = (events) => {
  return Math.max(...events.map((e) => e.dateStart + e.duration));
};

export const getTripInfoData = (events) => {
  return {
    route: formatRoute(events.map((e) => e.destination.name)),
    dateStart: (new Date(events[0].dateStart)).toString().slice(4, 10),
    dateEnd: (new Date(getEndDate(events))).toString().slice(4, 10),
    cost: events.map((e) => e.price).reduce((total, currenPrice) => {
      return total + currenPrice;
    })
  };
};
