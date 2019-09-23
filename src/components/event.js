import {formatDuration, getTimeFromTimestamp, AbstractComponent} from '../utils';

const renderOffer = (offerData) => {
  return `<li class="event__offer">
  <span class="event__offer-title">${offerData.title}</span>
  &plus;
  &euro;&nbsp;<span class="event__offer-price">${offerData.price}</span>
 </li>`;
};

export class Event extends AbstractComponent {
  constructor(eventData) {
    super();
    this._type = eventData.type;
    this._destination = eventData.destination;
    this._photos = eventData.photos;
    this._description = eventData.description;
    this._price = eventData.price;
    this._dateStart = eventData.dateStart;
    this._duration = eventData.duration;
    this._options = eventData.options;
  }

  getTemplate() {
    return `<li class="trip-events__item">
  <div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${this._type}</h3>

  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="2019-03-18T10:30">${getTimeFromTimestamp(this._dateStart)}</time>
      &mdash;
      <time class="event__end-time" datetime="2019-03-18T11:00">${getTimeFromTimestamp(this._dateStart + this._duration)}</time>
    </p>
    <p class="event__duration">${formatDuration(this._duration)}</p>
  </div>

  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${this._price}</span>
  </p>

  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${[...this._options].filter((offer) => offer.accepted).map(renderOffer).join(`\n`)}
  </ul>

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`;
  }

}
