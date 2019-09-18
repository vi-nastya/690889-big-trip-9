import {render} from '../utils';
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

    this._daysContainer = document.querySelector(`.trip-days`);
    render(document.querySelector(`.trip-days`), new Day(``, ``).getElement());


    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    this._renderEventsByDate(this._events);
  }

  _renderEvents(eventsData, container) {
    eventsData.forEach((eventData) => this._renderEvent(eventData, container));
  }

  _unrenderEvents() {
    this._daysContainer.innerHTML = ``;
  }

  _renderEventsNoDays(eventsData) {
    this._unrenderEvents();
    render(document.querySelector(`.trip-days`), new Day(``, ``).getElement());
    const defaultEventsContainer = document.querySelector(`.trip-events__list`);
    this._renderEvents(eventsData, defaultEventsContainer);
  }

  // EventsByDate data: date -> sorted list of events
  // rendering: daysList -> for each date: dateContainer + list of events
  // eventData changes -> sort everything and render

  // [['date', [events]], ...]

  _sortEventsByDate (eventsData) {
    let eventsByDate = {};

    eventsData.forEach((event) => {
      const eventDateAsString = new Date(event.dateStart).toString().slice(4, 10);
      if (eventDateAsString in eventsByDate) {
        eventsByDate[eventDateAsString].push(event);
      } else {
        eventsByDate[eventDateAsString] = [event];
      }
    });
    // result = [{ key: '27th-sep', events: [{...}, {...}, ...] }]
    return eventsByDate;
  }

  _renderEventsByDate(eventsData) {
    const eventsByDateData = this._sortEventsByDate(eventsData);
    const dates = Object.keys(eventsByDateData);
    this._unrenderEvents();
    // render DaysList
    dates.map((date, dayNum) => {
      // render days container
      render(this._daysContainer, new Day(date, dayNum + 1).getElement());
      const currentDayContainer = Array.from(document.querySelectorAll(`.trip-events__list`)).slice(-1)[0];
      // render events for that day
      this._renderEvents(eventsByDateData[date], currentDayContainer);
    });
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

    //this._defaultEventsContainer.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `time`:
        const eventsSortedByTime = this._events.slice().sort((e1, e2) => (e2.duration - e1.duration));
        this._renderEventsNoDays(eventsSortedByTime);
        //eventsSortedByTime.forEach((eventData) => this._renderEvent(eventData, this._defaultEventsContainer));
        evt.target.previousElementSibling.checked = true;
        break;
      case `price`:
        const eventsSortedByPrice = this._events.slice().sort((e1, e2) => e2.price - e1.price);
        this._renderEventsNoDays(eventsSortedByPrice);
        //eventsSortedByPrice.forEach((eventData) => this._renderEvent(eventData, this._defaultEventsContainer));

        evt.target.previousElementSibling.checked = true;
        break;
      case `default`:
        this._renderEventsByDate(this._events);

        //this._events.forEach((eventData) => this._renderEvent(eventData, this._eventsContainer));
        evt.target.previousElementSibling.checked = true;
        break;
    }
  }
}
