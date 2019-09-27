export class ScreenController {
  constructor(menu, filters, table, statistics) {
    this._menu = menu;
    this._filters = filters;
    this._table = table;
    this._statistics = statistics;

    this._statistics.init();
  }
  init() {
    this._menu.getElement().addEventListener(`click`, (evt) => {
      this._menu.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
      evt.target.classList.add(`trip-tabs__btn--active`);
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      switch (evt.target.id) {
        case `menu-table`:
          this._statistics.hide();
          this._filters.show();
          this._table.show();
          break;
        case `menu-stats`:
          this._filters.hide();
          this._table.hide();
          this._statistics.refreshCharts(this._table.getEvents());
          this._statistics.show();
          break;
      }
    });
  }
}
