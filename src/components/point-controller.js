import {render, Position, getOffersFromForm, getPicturesDataFromForm} from '../utils';
import {OFFERS, DESTINATIONS} from '../main';
import {EventEditForm} from './edit-event-form';
import {Event} from './event';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export class PointController {
  constructor(container, eventData, mode, onDataChange, onChangeView) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._eventData = eventData;
    this._eventView = new Event(this._eventData);
    this._eventEdit = new EventEditForm(this._eventData);

    this._mode = mode;

    this.init(mode);

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

  init(mode) {
    let renderPosition = Position.BEFOREEND;
    let currentView = this._eventView;

    if (mode === Mode.ADDING) {
      renderPosition = Position.AFTERBEGIN;
      currentView = this._eventEdit;
    }

    // event <-> eventEditForm
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };


    const onEventTypeClick = (evt) => {
      if (evt.target.tagName === `INPUT` && evt.target.value !== this._eventData.type) {
        const eventTypeInput = this._eventEdit.getElement().querySelector(`.event__type-output`);
        const eventTypeIcon = this._eventEdit.getElement().querySelector(`.event__type-icon`);
        const newEventType = evt.target.value;
        eventTypeIcon.src = `img/icons/${newEventType}.png`;
        eventTypeInput.innerText = `${newEventType}`;

        // new type -> refresh offers
        this._eventEdit.refreshOffers(newEventType, OFFERS);
      }
    };

    const onDestinationChange = (evt) => {
      const newCity = evt.target.value;
      this._eventEdit.refreshDestination(newCity, DESTINATIONS);
    };

    this._eventEdit.getElement().querySelector(`.event__type-list`).addEventListener(`click`, onEventTypeClick);
    this._eventEdit.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, onDestinationChange);


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
          destination: {
            name: formData.get(`event-destination`),
            description: this._eventEdit.getElement().querySelector(`.event__destination-description`).innerText,
            pictures: getPicturesDataFromForm()
          },
          dateStart: new Date(formData.get(`event-start-time`)).getTime(),
          duration: new Date(formData.get(`event-end-time`)).getTime() - new Date(formData.get(`event-start-time`)).getTime(),
          price: parseInt(formData.get(`event-price`), 10),
          options: getOffersFromForm(),
          type: formData.get(`event-type`),
        };

        console.log(entry);

        if (this._mode === Mode.ADDING) {
          this._onDataChange(entry, null);
          this._container.removeChild(this._eventEdit.getElement());
        } else {
          this._onDataChange(entry, this._eventData);
          this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      });

    this._eventEdit.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    // handle delete event
    this._eventEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      this._onDataChange(null, this._eventData);
    });

    render(this._container, currentView.getElement(), renderPosition);
  }

  setDefaultView() {
    if (this._container.contains(this._eventEdit.getElement())) {
      this._container.replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
    }
  }
}
