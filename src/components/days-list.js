import {AbstractComponent} from '../utils';

export class DaysList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="trip-days">

      </ul>`;
  }
}
