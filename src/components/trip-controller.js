import {render} from '../utils';
import {TripSort} from './trip-sort';
import {DaysList} from './days-list';
import {Day} from './day';
import {Mode, PointController} from './point-controller';

export class TripController {
  constructor(container, eventsData) {
    this._container = container;
    this._events = eventsData;
    this._sort = new TripSort();
    this._daysList = new DaysList();
    this._eventsContainer = null;
    this._creatingEvent = null;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._eventsElement = document.querySelector(`.trip-events`);
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

  hide() {
    if (!this._eventsElement.classList.contains(`visually-hidden`)) {
      document.querySelector(`.trip-events`).classList.add(`visually-hidden`);
    }
  }

  show() {
    if (this._eventsElement.classList.contains(`visually-hidden`)) {
      document.querySelector(`.trip-events`).classList.remove(`visually-hidden`);
    }
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

  _sortEventsByDate(eventsData) {
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
    const pointController = new PointController(eventsContainer, eventData, Mode.DEFAULT, this._onDataChange, this._onChangeView);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    const defaultEvent = {
      city: ``,
      dateStart: Date.now(),
      duration: 30000,
      price: 0,
      options: [],
      type: `bus`
    };

    this._creatingEvent = new PointController(document.querySelectorAll(`.trip-events__list`)[0], defaultEvent, Mode.ADDING, this._onChangeView, this._onDataChange);
    // this._subscriptions.push(this._creatingEvent.setDefaultView.bind(this._creatingEvent));
  }

  _onDataChange(newData, oldData) {
    console.log(newData, oldData);
    const index = this._events.findIndex((event) => event === oldData);

    if (newData === null && oldData === null) {
      this._creatingEvent = null;
    } else if (newData === null) {
      this._events = [...this._events.slice(0, index), ...this._events.slice(index + 1)];
    } else if (oldData === null) {
      this._creatingEvent = null;
      this._events = [...this._events, newData];
      console.log(this._events);
    } else {
      this._events[index] = newData;
    }

    this._renderEventsByDate(this._events);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    switch (evt.target.dataset.sortType) {
      case `time`:
        const eventsSortedByTime = this._events.slice().sort((e1, e2) => (e2.duration - e1.duration));
        this._renderEventsNoDays(eventsSortedByTime);
        evt.target.previousElementSibling.checked = true;
        break;
      case `price`:
        const eventsSortedByPrice = this._events.slice().sort((e1, e2) => e2.price - e1.price);
        this._renderEventsNoDays(eventsSortedByPrice);

        evt.target.previousElementSibling.checked = true;
        break;
      case `default`:
        this._renderEventsByDate(this._events);
        evt.target.previousElementSibling.checked = true;
        break;
    }
  }
}
