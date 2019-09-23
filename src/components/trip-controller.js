import {render} from '../utils';
import {TripSort} from './trip-sort';
import {DaysList} from './days-list';
import {Day} from './day';
import {Mode, PointController} from './point-controller';

const Sorting = {
  DEFAULT: `default`,
  PRICE: `price`,
  TIME: `time`
};

const Filters = {
  DEFAULT: `everything`,
  PAST: `past`,
  FUTURE: `future`
};

export class TripController {
  constructor(container, eventsData) {
    this._container = container;
    this._events = eventsData;
    this._sort = new TripSort();
    this._daysList = new DaysList();
    this._eventsContainer = null;
    this._creatingEvent = null;
    this._sortType = Sorting.DEFAULT;
    this._filter = Filters.DEFAULT;

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

    // filters
    document.querySelector(`.trip-filters`).addEventListener(`click`, (evt) => this._onFilterClick(evt));

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

  _sortAndRenderEvents() {
    this._unrenderEvents();
    let eventsToRender = this._events;

    switch (this._filter) {
      case Filters.DEFAULT: {
        break;
      }

      case Filters.PAST: {
        eventsToRender = eventsToRender.filter((event) => event.dateStart + event.duration < Date.now());
        break;
      }

      case Filters.FUTURE: {
        eventsToRender = eventsToRender.filter((event) => event.dateStart > Date.now());
        break;
      }
    }

    switch (this._sortType) {
      case Sorting.DEFAULT:
        this._renderEventsByDate(eventsToRender);
        break;
      case Sorting.PRICE:
        const eventsSortedByPrice = eventsToRender.slice().sort((e1, e2) => e2.price - e1.price);
        this._renderEventsNoDays(eventsSortedByPrice);
        break;
      case Sorting.TIME:
        const eventsSortedByTime = eventsToRender.slice().sort((e1, e2) => (e2.duration - e1.duration));
        this._renderEventsNoDays(eventsSortedByTime);
        break;
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

    eventsData.slice().sort((e1, e2) => e1.dateStart - e2.dateStart).forEach((event) => {
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
      destination: ``,
      dateStart: Date.now(),
      duration: 30000,
      price: 0,
      options: [],
      type: `bus`
    };

    this._creatingEvent = new PointController(this._eventsElement, defaultEvent, Mode.ADDING, this._onDataChange, this._onChangeView);
    // this._subscriptions.push(this._creatingEvent.setDefaultView.bind(this._creatingEvent));
  }

  _onDataChange(newData, oldData) {
    const index = this._events.findIndex((event) => event === oldData);

    if (newData === null && oldData === null) {
      this._creatingEvent = null;
    } else if (newData === null) {
      this._events = [...this._events.slice(0, index), ...this._events.slice(index + 1)];
    } else if (oldData === null) {
      this._creatingEvent = null;
      this._events = [...this._events, newData];
    } else {
      this._events[index] = newData;
    }

    this._sortAndRenderEvents();
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onFilterClick(evt) {
    if (evt.target.tagName === `INPUT` && evt.target.value !== this._currentFilter) {
      this._filter = evt.target.value;
      this._sortAndRenderEvents();
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    this._sortType = evt.target.dataset.sortType;
    this._sortAndRenderEvents();
    evt.target.previousElementSibling.checked = true;
  }
}
