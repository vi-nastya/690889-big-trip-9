import {getEventData, getTripInfoData, getFilters} from './data';
import {render, unrender, Position} from './utils';
import {Menu} from './components/menu';
import {FiltersList} from './components/filters';
import {EventEditForm} from './components/edit-event-form';
import {DaysList} from './components/days-list';
import {Event} from './components/event';
import {TripInfo} from './components/trip-info';
import {TripSort} from './components/trip-sort';

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

const renderEvent = (eventData) => {
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

const events = generateEventsData(NUM_EVENTS);

const tripInfoContainer = document.querySelector(`.trip-info`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const menuHeader = document.querySelectorAll(`.trip-controls h2`)[0];
const filtersHeader = document.querySelectorAll(`.trip-controls h2`)[1];

const tripInfoData = getTripInfoData(events);
const priceElement = document.querySelector(`.trip-info__cost-value`);
priceElement.textContent = tripInfoData.cost;

render(tripInfoContainer, new TripInfo(tripInfoData).getElement(), Position.AFTERBEGIN);
render(menuHeader, new Menu().getElement(), Position.AFTEREND);

let filters = getFilters(events);
render(filtersHeader, new FiltersList(filters).getElement(), Position.AFTEREND);
render(tripEventsContainer, new TripSort().getElement());
render(tripEventsContainer, new DaysList().getElement());

const eventsContainer = document.querySelector(`.trip-events__list`);
events.forEach((eventData) => renderEvent(eventData));

