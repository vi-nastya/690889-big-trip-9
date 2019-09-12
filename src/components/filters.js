import {createElement} from '../utils';

const renderFilter = (filterName, isSelected) => {
  return `<div class="trip-filters__filter">
  <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterName}" ${isSelected ? `checked` : ``}>
  <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
</div>`.trim();
};

// export const getFiltersMarkup = (filtersList) => {
//   return `<form class="trip-filters" action="#" method="get">
//               ${filtersList.map((filter) => renderFilter(filter.name, filter.isSelected)).join(`\n`)}
//               <button class="visually-hidden" type="submit">Accept filter</button>
//             </form>`;
// };


export class FiltersList {
  constructor(filtersData) {
    this._data = filtersData;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
              ${this._data.map((filter) => renderFilter(filter.name, filter.isSelected)).join(`\n`)}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
  }
}
