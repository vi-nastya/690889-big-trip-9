import {AbstractComponent} from '../utils';

export class TripInfo extends AbstractComponent {
  constructor(tripInfoData) {
    super();
    this._route = tripInfoData.route;
    this._dateStart = tripInfoData.dateStart;
    this._dateEnd = tripInfoData.dateEnd;
    this._cost = tripInfoData.cost;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._route}</h1>

    <p class="trip-info__dates">${this._dateStart}&nbsp;&mdash;&nbsp;${this._dateEnd}</p>

  </div>`;
  }
}
