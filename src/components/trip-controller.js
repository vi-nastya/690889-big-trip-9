import {render, Position} from '../utils';
import {EventEditForm} from './edit-event-form';
import {Event} from './event';
import {TripSort} from './trip-sort';
import {DaysList} from './days-list';
import {Day} from './day';
import {PointController} from './point-controller';

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

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    this._eventsContainer = document.querySelector(`.trip-events__list`);

    this._events.forEach((eventData) => this._renderEvent(eventData, this._eventsContainer));
  }

  _renderEvents(eventsData, container) {
    eventsData.forEach((eventData) => this._renderEvent(eventData, container));
  }


  // EventsByDate data: date -> sorted list of events
  // rendering: daysList -> for each date: dateContainer + list of events
  // eventData changes -> sort everything and render

  // [['date', [events]], ...]

  _renderEventsByDate (eventsByDateData) {
    // render DaysList
    eventsByDateData.map((date, eventsList) => {
      // render days container
      render(this._container, new Day(date).getElement());
      const currentDayContainer = document.querySelectorAll(`.trip-events__list`).slice(-1)[0];
      // render events for that day
      this._renderEvents(eventsList, currentDayContainer);
    });
    // render events to that container
  }

  _renderEvent(eventData, eventsContainer) {
    new PointController(eventsContainer, eventData, this._onDataChange, this._onChangeView);
  }

  _onDataChange(newData, oldData) {
    this._events[this._events.findIndex((it) => it === oldData)] = newData;

    this._renderEvents();
  }

  _onChangeView() {}

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    this._eventsContainer.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `time`:
        const eventsSortedByTime = this._events.slice().sort((e1, e2) => (e2.duration - e1.duration));
        eventsSortedByTime.forEach((eventData) => this._renderEvent(eventData, this._eventsContainer));
        evt.target.previousElementSibling.checked = true;
        break;
      case `price`:
        const eventsSortedByPrice = this._events.slice().sort((e1, e2) => e2.price - e1.price);
        eventsSortedByPrice.forEach((eventData) => this._renderEvent(eventData, this._eventsContainer));
        evt.target.previousElementSibling.checked = true;
        break;
      case `default`:
        // TODO: split events by date, render by date
        this._events.forEach((eventData) => this._renderEvent(eventData, this._eventsContainer));
        evt.target.previousElementSibling.checked = true;
        break;
    }
  }
}
