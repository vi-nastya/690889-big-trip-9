import {TRANSFER_TYPES, ACTIVITY_TYPES, AbstractComponent} from '../utils';
import {DESTINATIONS} from '../main';

const renderTypeSelector = (type, selectedType) => {
  return `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === selectedType ? `checked` : ``}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`;
};

export class EventEditForm extends AbstractComponent {
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
    return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            ${TRANSFER_TYPES.map((t) => renderTypeSelector(t, this._type)).join(`\n`)}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            ${ACTIVITY_TYPES.map((t) => renderTypeSelector(t, this._type)).join(`\n`)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${this._type} at
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join(`\n`)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

                      <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                      </button>
                    </header>

                    <section class="event__details">

                      <section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                        <div class="event__available-offers">
                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                            <label class="event__offer-label" for="event-offer-luggage-1">
                              <span class="event__offer-title">Add luggage</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">30</span>
                            </label>
                          </div>

                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                            <label class="event__offer-label" for="event-offer-comfort-1">
                              <span class="event__offer-title">Switch to comfort class</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">100</span>
                            </label>
                          </div>

                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                            <label class="event__offer-label" for="event-offer-meal-1">
                              <span class="event__offer-title">Add meal</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">15</span>
                            </label>
                          </div>

                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                            <label class="event__offer-label" for="event-offer-seats-1">
                              <span class="event__offer-title">Choose seats</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">5</span>
                            </label>
                          </div>

                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                            <label class="event__offer-label" for="event-offer-train-1">
                              <span class="event__offer-title">Travel by train</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">40</span>
                            </label>
                          </div>
                        </div>
                      </section>

                      <section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

                        <div class="event__photos-container">
                          <div class="event__photos-tape">
                            <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                            <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                            <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                            <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                            <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
                          </div>
                        </div>
                      </section>
                    </section>
                  </form>`;
  }
}
