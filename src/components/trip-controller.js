import {AbstractComponent, render, Position} from '../utils';
import {EventEditForm} from './edit-event-form';
import {Event} from './event';
import {TripSort} from './trip-sort';
import {DaysList} from './days-list';

export class TripController {
  constructor(container, eventsData) {
    this._container = container;
    this._events = eventsData;
    this._sort = new TripSort();
    this._daysList = new DaysList();
    this._eventsContainer = null;
  }

  init() {
    // TODO: handle no events case

    render(this._container, this._sort.getElement());
    render(this._container, this._daysList.getElement());

    this._eventsContainer = document.querySelector(`.trip-events__list`);

    this._events.forEach((eventData) => this._renderEvent(eventData));
  }

  _renderEvent(eventData) {
    const event = new Event(eventData);
    const eventEditForm = new EventEditForm(eventData);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._eventsContainer.replaceChild(event.getElement(), eventEditForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    event.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._eventsContainer.replaceChild(eventEditForm.getElement(), event.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    eventEditForm.getElement()
      .addEventListener(`submit`, () => {
        this._eventsContainer.replaceChild(event.getElement(), eventEditForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    eventEditForm.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._eventsContainer.replaceChild(event.getElement(), eventEditForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._eventsContainer, event.getElement(), Position.BEFOREEND);
  }
}
