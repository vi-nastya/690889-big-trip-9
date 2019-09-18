import {AbstractComponent} from '../utils';

export class Day extends AbstractComponent {
  constructor(date, dayNum) {
    super();
    this._date = date;
    this._dayNum = dayNum;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${this._dayNum}</span>
      <time class="day__date" datetime="${this._date}">${this._date}</time>
    </div>

    <ul class="trip-events__list">
    </ul>

    </li>`;
  }
}
