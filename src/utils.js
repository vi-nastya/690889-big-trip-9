export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
export const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;
export const MILLISECONDS_IN_MINUTE = 60 * 1000;

export const EVENT_TYPES = [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`];
export const TRANSFER_TYPES = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
export const ACTIVITY_TYPES = [`check-in`, `restaurant`, `sightseeing`];
export const CITIES = [`Vancouver`, `Squamish`, `Whistler`, `Kamloops`, `Revelstoke`, `Canmore`, `Banff`, `Calgary`];

export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getRandomNumber = (maxNumber, minNumber = 0) => Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;

export const getRandomArraySubset = (arr, subsetSize) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, subsetSize);
};

export const getRandomArrayElement = (arr) => arr[getRandomNumber(arr.length - 1)];

export const getCities = (events) => {
  events.reduce(); // TODO
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

export const getTimeFromTimestamp = (timestamp) => new Date(timestamp).toString().slice(16, 21);

// -----------------------------------
export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
    element.removeElement();
  }
};

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    throw Error(`Abstract method not implemented: getTemplate`);
  }
}

// get all rendered offers -> construct offers array
export const getOffersFromForm = () => {
  const offerLabels = document.querySelectorAll(`.event__offer-label`);
  const offers = [...offerLabels].map((label) => {
    return {
      title: label.querySelector(`.event__offer-title`).textContent,
      price: parseInt(label.querySelector(`.event__offer-price`).textContent, 10),
      accepted: label.control.checked
    };
  });
  return offers;
};

export const getOffersForType = (type, offersForTypes) => {
  return offersForTypes.filter((it) => it.type === type)[0].offers
  .map((offer) => {
    return {
      title: offer.title,
      price: offer.price,
      accepted: false
    };
  });
};
