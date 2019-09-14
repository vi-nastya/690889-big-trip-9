import {AbstractComponent, render, Position} from '../utils';
import {EventEditForm} from './edit-event-form';
import {Event} from './event';

const renderEvent = (eventData, eventsContainer) => {
  const event = new Event(eventData);
  const eventEditForm = new EventEditForm(eventData);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      eventsContainer.replaceChild(event.getElement(), eventEditForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  event.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      eventsContainer.replaceChild(eventEditForm.getElement(), event.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  eventEditForm.getElement()
    .addEventListener(`submit`, () => {
      eventsContainer.replaceChild(event.getElement(), eventEditForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  eventEditForm.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      eventsContainer.replaceChild(event.getElement(), eventEditForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(eventsContainer, event.getElement(), Position.BEFOREEND);
};


export class TripController extends AbstractComponent {
  constructor(container, eventsData) {
    super();
    this._container = container;
    this._events = eventsData;
  }

  init() {
    // TODO: handle no events case
    this._events.forEach((eventData) => renderEvent(eventData, this._container));
  }
}
