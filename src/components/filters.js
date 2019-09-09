const renderFilter = (filterName, isSelected) => {
  return `<div class="trip-filters__filter">
  <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterName}" ${isSelected ? `checked` : ``}>
  <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
</div>`.trim();
};

export const getFiltersMarkup = (filtersList) => {
  return `<form class="trip-filters" action="#" method="get">
              ${filtersList.map((filter) => renderFilter(filter.name, filter.isSelected)).join(`\n`)}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};
