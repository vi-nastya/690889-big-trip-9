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

import {getRandomBoolean, getRandomNumber, getRandomArraySubset, getRandomArrayElement} from './utils';


export const eventData = () => ({
  type: getRandomArrayElement(EVENT_TYPES),
  title: ``,
  city: getRandomArrayElement(CITIES),
  photos: `http://picsum.photos/300/150?r=${Math.random()}`,
  description: getRandomArraySubset(DESCRIPTION_SENTENCES, getRandomNumber(MAX_DESCRIPTION_LENGTH, MIN_DESCRIPTION_LENGTH)).join(` `),
  price: getRandomNumber(MAX_PRICE, MIN_PRICE),
  time: 0,
  date: ``,
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

