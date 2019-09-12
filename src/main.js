import {getEventData, getTripInfoData, getFilters} from './data';
import {render, Position} from './utils';
import {getMenuMarkup} from './components/menu';
import {getFiltersMarkup} from './components/filters';
import {getEditEventFormMarkup} from './components/edit-event-form';
import {getDaysListMarkup} from './components/days-list';
import {getEventMarkup, Event} from './components/event';
import {getTripInfoMarkup} from './components/trip-info';
import {getTripSortMarkup} from './components/trip-sort';

const NUM_EVENTS = 4;

const generateEventsData = (numEvents) => {
  let events = [];
  for (let i = 0; i < numEvents; i++) {
    events.push(getEventData());
  }
  return events.sort((e1, e2) => {
    return e1.dateStart < e2.dateStart;
  });
};

const renderComponent = (element, componentMarkup, position = `beforeend`) => {
  element.insertAdjacentHTML(position, componentMarkup);
};

const renderEvent = (eventData) => {
  const event = new Event(eventData);
  render(eventsContainer, event.getElement(), Position.BEFOREEND);
};

const renderEvents = (element, events) => {
  for (let i = 0; i < events.length; i++) {
    renderComponent(element, getEventMarkup(events[i]));
  }
};

const events = generateEventsData(NUM_EVENTS);
console.log(events);

const tripInfoContainer = document.querySelector(`.trip-info`);
const menuHeader = document.querySelector(`.trip-controls h2`);
const filtersHeader = document.querySelectorAll(`.trip-controls h2`)[1];
const tripEventsContainer = document.querySelector(`.trip-events`);

const tripInfoData = getTripInfoData(events);
const priceElement = document.querySelector(`.trip-info__cost-value`);
priceElement.textContent = tripInfoData.cost;

renderComponent(tripInfoContainer, getTripInfoMarkup(tripInfoData), `afterbegin`);
renderComponent(menuHeader, getMenuMarkup(), `afterend`);

let filters = getFilters(events);
renderComponent(filtersHeader, getFiltersMarkup(filters), `afterend`);
renderComponent(tripEventsContainer, getTripSortMarkup());
renderComponent(tripEventsContainer, getEditEventFormMarkup(events[0]));
renderComponent(tripEventsContainer, getDaysListMarkup());

const eventsContainer = document.querySelector(`.trip-events__list`);
// renderEvents(eventsContainer, events.slice(1));
events.slice(1).forEach((eventData) => renderEvent(eventData));

