import {AbstractComponent} from '../utils';

export class Day extends AbstractComponent {
  constructor(date) {
    super();
    this._date = date;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="${this._date}">${this._date}</time>
    </div>

    <ul class="trip-events__list">
    </ul>

    </li>`;
  }
}
