import {createElement} from '../utils';

export class TripInfo {
  constructor(tripInfoData) {
    this._route = tripInfoData.route;
    this._dateStart = tripInfoData.dateStart;
    this._dateEnd = tripInfoData.dateEnd;
    this._cost = tripInfoData.cost;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._route}</h1>

    <p class="trip-info__dates">${this._dateStart}&nbsp;&mdash;&nbsp;${this._dateEnd}</p>

  </div>`;
  }
}
