import {getEventData, getTripInfoData, getFilters} from './data';
import {render, unrender, Position} from './utils';
import {Menu} from './components/menu';
import {FiltersList} from './components/filters';
import {TripInfo} from './components/trip-info';
import {TripController} from './components/trip-controller';
import {Statistics} from './components/statistics';

const NUM_EVENTS = 15;

const generateEventsData = (numEvents) => {
  let events = [];
  for (let i = 0; i < numEvents; i++) {
    events.push(getEventData());
  }
  return events.sort((e1, e2) => {
    return e1.dateStart < e2.dateStart;
  });
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
const menu = new Menu();
render(menuHeader, menu.getElement(), Position.AFTEREND);

let filters = getFilters(events);
render(filtersHeader, new FiltersList(filters).getElement(), Position.AFTEREND);
// render(tripEventsContainer, new TripSort().getElement());
// render(tripEventsContainer, new DaysList().getElement());

let tripController = new TripController(tripEventsContainer, events);
tripController.init();

const statsContainer = document.querySelectorAll(`.page-body__container`)[1];
const statistics = new Statistics(events);
statistics.getElement().classList.add(`visually-hidden`);
render(statsContainer, statistics.getElement(), Position.BEFOREEND);

menu.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `A`) {
    return;
  }

  switch (evt.target.id) {
    case `menu-table`:
      if (!statistics.getElement().classList.contains(`visually-hidden`)) {
        statistics.getElement().classList.add(`visually-hidden`);
      }
      tripController.show();
      break;
    case `menu-stats`:
      statistics.getElement().classList.remove(`visually-hidden`);
      statistics.init();
      tripController.hide();
      break;
  }
});

const addNewEventButton = document.querySelector(`.trip-main__event-add-btn`);
addNewEventButton.addEventListener(`click`, () => {
  tripController.createEvent();
});
