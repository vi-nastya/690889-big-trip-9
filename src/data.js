const EVENT_TYPES = [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`];
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
const CITIES = [`Vancouver`, `Squamish`, `Whistler`, `Kamloops`, `Revelstoke`, `Canmore`, `Banff`, `Calgary`];
const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 3;
const MIN_PRICE = 0;
const MAX_PRICE = 300;
const MAX_DATE_DELTA = 7 * 24 * 60 * 60 * 1000;
const MIN_EVENT_DURATION = 10 * 60 * 1000; // 10 min
const MAX_EVENT_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 days

export const getFilters = () => {
  return [
    {name: `everything`, isSelected: true},
    {name: `future`, isSelected: false},
    {name: `past`, isSelected: false}
  ];
};

import {getRandomBoolean, getRandomNumber, getRandomArraySubset, getRandomArrayElement} from './utils';


export const getEventData = () => ({
  type: getRandomArrayElement(EVENT_TYPES),
  title: ``,
  city: getRandomArrayElement(CITIES),
  photos: `http://picsum.photos/300/150?r=${Math.random()}`,
  description: getRandomArraySubset(DESCRIPTION_SENTENCES, getRandomNumber(MAX_DESCRIPTION_LENGTH, MIN_DESCRIPTION_LENGTH)).join(` `),
  price: getRandomNumber(MAX_PRICE, MIN_PRICE),
  time: 0,
  dateStart: Date.now() + 1 + getRandomNumber(MAX_DATE_DELTA),
  duration: getRandomNumber(MAX_EVENT_DURATION, MIN_EVENT_DURATION),
  options: new Set([
    {
      name: `Add luggage`,
      price: 10,
      flag: getRandomBoolean()
    },
    {
      name: `Switch to comfort class`,
      price: 150,
      flag: getRandomBoolean()
    },
    {
      name: `Add meal`,
      price: 2,
      flag: getRandomBoolean()
    },
    {
      name: `Choose seats`,
      price: 9,
      flag: getRandomBoolean()
    }
  ])
});

export const formatRoute = (cities) => {
  if (cities.length > 3) {
    return cities[0] + `&mdash;` + cities[cities.length - 1];
  }
  return cities.join(`&mdash;`);
};

export const getTripInfoData = (points) => {
  return {
    route: formatRoute(points.map((p) => p.city)),
    dateStart: points[0].dateStart,
    dateEnd: points[points.length - 1].dateEnd,
    cost: points.reduce() // TODO
  };
};
