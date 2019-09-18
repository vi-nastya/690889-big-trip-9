import {render, Position, createElement} from '../utils';
import {EventEditForm} from './edit-event-form';
import {Event} from './event';

export class PointController {
  constructor(container, eventData) {
    this._container = container;
    this._eventData = eventData;
    this._eventView = new Event(this._eventData);
    this._eventEdit = new EventEditForm(this._eventData);

    this.create();
  }

  create() {
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
        this._container.replaceChild(this._eventEdit.getElement(), this._eventView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._eventEdit.getElement()
      .addEventListener(`submit`, (evt) => {
        // handle event edit
        evt.preventDefault();

        const formData = new FormData(this._eventEdit.getElement().querySelector(`.event--edit`));

        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate: new Date(formData.get(`date`)),
        };

        // find corresponding event
        this._tasks[this._tasks.findIndex((it) => it === task)] = entry;

        // rerender events
        this._renderBoard(this._tasks);
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

  onDataChange() {

  }

  onChangeView() {

  }

  setDefaultView() {
    if (this._container.getElement().contains(this._eventEdit.getElement())) {
      this._container.getElement().replaceChild(this._eventView.getElement(), this._eventEdit.getElement());
    }
  }
}
