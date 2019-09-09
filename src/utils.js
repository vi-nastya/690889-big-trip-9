export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getRandomNumber = (maxNumber, minNumber = 0) => Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;

export const getRandomArraySubset = (arr, subsetSize) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, subsetSize);
};

export const getRandomArrayElement = (arr) => arr[getRandomNumber(arr.length - 1)];
