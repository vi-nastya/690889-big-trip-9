import {AbstractComponent} from '../utils';

export class Menu extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" id="menu-table" href="#">Table</a>
    <a class="trip-tabs__btn" href="#" id="menu-stats">Stats</a>
  </nav>`;
  }
}
