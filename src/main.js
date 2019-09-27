import {getTripInfoData, getFilters} from './data';
import {render, unrender, Position} from './utils';
import {Menu} from './components/menu';
import {FiltersList} from './components/filters';
import {TripInfo} from './components/trip-info';
import {TripController} from './components/trip-controller';
import {Statistics} from './components/statistics';
import {ScreenController} from './screen-controller';

import {API} from './api';
import {EventAdapter} from './event-adapter';

// API -------------------------------
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;


const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

// const onDataChange = (actionType, update) => {
//   switch (actionType) {
//     case `update`:
//       api.updateEvent({
//         id: update.id,
//         data: update.toRAW()
//       }).then((events) => boardController.show(events));
//       break;
//     case `delete`:
//       api.updateEvent({
//         id: update.id
//       })
//         .then(() => api.getEvents())
//         .then((tasks) => boardController.show(tasks));
//       break;
//   }
// };

const tripInfoContainer = document.querySelector(`.trip-info`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const menuHeader = document.querySelectorAll(`.trip-controls h2`)[0];
const filtersHeader = document.querySelectorAll(`.trip-controls h2`)[1];

let OFFERS = [];
let DESTINATIONS = [];

// API -------------------------------------------
api.getOffers().then((offers) => {
  OFFERS = offers;
  api.getDestinations().then((destinations) => {
    DESTINATIONS = destinations;

    api.getEvents().then((APIevents) => {
      const events = EventAdapter.parseEvents(APIevents);

      const tripInfoData = getTripInfoData(events);
      const priceElement = document.querySelector(`.trip-info__cost-value`);
      priceElement.textContent = tripInfoData.cost;

      render(tripInfoContainer, new TripInfo(tripInfoData).getElement(), Position.AFTERBEGIN);
      const menu = new Menu();
      render(menuHeader, menu.getElement(), Position.AFTEREND);

      let filters = new FiltersList(getFilters(events));
      render(filtersHeader, filters.getElement(), Position.AFTEREND);

      let tripController = new TripController(tripEventsContainer, events, api);
      tripController.init();

      const statsContainer = document.querySelectorAll(`.page-body__container`)[1];
      const statistics = new Statistics(events);
      statistics.getElement().classList.add(`visually-hidden`);
      render(statsContainer, statistics.getElement(), Position.BEFOREEND);

      const screenController = new ScreenController(menu, filters, tripController, statistics);
      screenController.init();
    });
  });
});
export {DESTINATIONS, OFFERS};
