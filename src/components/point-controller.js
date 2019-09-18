import {render, Position} from '../utils';
import {EventEditForm} from './edit-event-form';
import {Event} from './event';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export class PointController {
  constructor(container, eventData, onDataChange, onChangeView) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._eventData = eventData;
    this._eventView = new Event(this._eventData);
    this._eventEdit = new EventEditForm(this._eventData);

    this.init();

    flatpickr(this._eventEdit.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._eventData.dateStart,
      altFormat: `d/m/Y H:i`,
    });

    flatpickr(this._eventEdit.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._eventData.dateStart + this._eventData.duration,
      altFormat: `d/m/Y H:i`,
    });
  }

  init() {
    // event <-> eventEditForm
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._eventView.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._container.replaceChild(this._eventEdit.getElement(), this._eventView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._eventEdit.getElement()
      .addEventListener(`submit`, (evt) => {
        // handle event edit
        evt.preventDefault();

        const formData = new FormData(this._eventEdit.getElement());

        const entry = {
          city: formData.get(`event-destination`),
          dateStart: Date.now(), // formData.get(`event-start-time`),
          dateEnd: Date.now() + 3000000, // formData.get(`event-end-time`),
          price: formData.get(`event-price`),
          options: [],
          type: formData.get(`event-type`),
          // TODO: offers:  formData.get(`event-offer-seats) returns `on` or NULL
        };

        // find corresponding event
        this._onDataChange(entry, this._eventData);
        //
        this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._eventEdit.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container, this._eventView.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.contains(this._eventEdit.getElement())) {
      this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
    }
  }
}
